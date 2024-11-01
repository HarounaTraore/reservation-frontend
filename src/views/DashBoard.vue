<script setup>
import { onMounted, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { storeReservation } from "@/stores/storeReservation";
import frLocale from "@fullcalendar/core/locales/fr";
import Swal from "sweetalert2";
import router from "@/router";

const store = storeReservation();
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: window.innerWidth < 768 ? "timeGridDay" : "timeGridWeek",
  locale: frLocale,
  weekends: true,
  height: "auto",
  events: [],
  dateClick: (info) => handleDateClick(info),
  eventClick: (info) => handleEventClick(info),
  slotDuration: "01:00:00",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  }
});

const loadReservations = async () => {
  await store.loadingData();
  calendarOptions.value.events = store.reservations.map((reservation) => ({
    start: reservation.dateStart,
    end: reservation.dateEnd,
    title: "Réservation",
  }));
};

onMounted(loadReservations);

// const handleDateClick = (info) => {
//   Swal.fire({
//     title: "Vous avez cliqué sur une date!",
//     text: `Date sélectionnée : ${info.dateStr}`,
//     icon: "info",
//     confirmButtonText: "Ok",
//   });
// };

const handleEventClick = (info) => {
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  Swal.fire({
    title: "Détails de l'événement",
    text: `Événement de ${info.event.start.toLocaleDateString()} ${info.event.start.toLocaleTimeString(
      [],
      timeOptions
    )} à ${info.event.end.toLocaleDateString()} ${info.event.end.toLocaleTimeString(
      [],
      timeOptions
    )}`,
    icon: "info",
    confirmButtonText: "Ok",
  });
};
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center my-3">
      <h3 class="text-center mb-0">Tableau de bord</h3>
      <button
        class="btn btn-primary fw-bold"
        @click="router.push({ name: 'list-reservation' })"
      >
        Liste des réservations
      </button>
    </div>
    <div class="calendar-container mt-3">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<style>
.container {
  max-width: 90%;
  margin: auto;
}

.calendar-container {
  max-width: 100%;
}

.fc .fc-event {
  cursor: pointer !important;
}

@media (max-width: 768px) {
  .calendar-container {
    padding: 10px;
  }
}
</style>
