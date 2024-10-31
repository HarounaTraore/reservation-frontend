<script setup>
import { onMounted, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { storeReservation } from "@/stores/storeReservation";
import frLocale from "@fullcalendar/core/locales/fr";
import Swal from "sweetalert2";

const store = storeReservation();
const calendarOptions = ref({});

const loadReservations = async () => {
  await store.loadingData();
  calendarOptions.value.events = store.reservations.map((reservation) => ({
    start: reservation.dateStart,
    end: reservation.dateEnd,
    title: "Réservation",
  }));
};

onMounted(loadReservations);

const handleDateClick = (info) => {
  Swal.fire({
    title: "Vous avez cliqué sur une date!",
    text: `Date sélectionnée : ${info.dateStr}`,
    icon: "info",
    confirmButtonText: "Ok",
  });
};

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

calendarOptions.value = {
  plugins: [dayGridPlugin],
  initialView: window.innerWidth < 768 ? "dayGridWeek" : "dayGridMonth",
  weekends: true,
  locale: frLocale,
  events: [],
  dateClick: handleDateClick,
  eventClick: handleEventClick,
  height: "auto",
  contentHeight: 50,
  with: "auto",
  contentWidth: "auto",

};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-3">Application de démonstration</h1>
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<style>
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

