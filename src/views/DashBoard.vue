<script setup>
import { onMounted, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { storeReservation } from "@/stores/storeReservation";
import frLocale from "@fullcalendar/core/locales/fr";
import { useDateTimeFormatter } from "@/views/reservations/useDateForatter";
import StatisticReservation from "@/components/StatisticReservation.vue";
import Swal from "sweetalert2";
import router from "@/router";
const { formatDateTime } = useDateTimeFormatter();
const store = storeReservation();
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: window.innerWidth < 768 ? "timeGridDay" : "dayGridMonth",
  locale: frLocale,
  timeZone: "local",
  weekends: true,
  height: "auto",
  events: [],
  dateClick: (info) => handleDateClick(info),
  eventClick: (info) => handleEventClick(info),
  slotDuration: "01:00:00",
  // slotMinTime: "00:00:00",
  // slotMaxTime: "23:59:00",
  allDaySlot: false,
  headerToolbar: {
    left: `listReservationsButton,prev,next today`,
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  customButtons: {
    listReservationsButton: {
      text: "Liste",
      click: () => {
        router.push({ name: "list-reservation" });
      },
    },
  },
});

const loadReservations = async () => {
  await store.loadingData();
  calendarOptions.value.events = store.reservations.map((reservation) => ({
    start: reservation.dateStart,
    end: reservation.dateEnd,
    title: `${reservation.customer.name}`,
    extendedProps: {
      room: reservation.room.name,
    },
  }));
};

onMounted(async()=>{

   await loadReservations()
  await store.fetchRoomStatistics();

}
);

const handleDateClick = (info) => {
  let dateAt = info.dateStr;
  dateAt = new Date(dateAt);
  store.reservation.dateStart = formatDateTime(dateAt);
  store.reservation.timeStart = formatDateTime(dateAt, "HH:mm");

  if (dateAt) {
    router.push({ name: "add-reservation" });
  }
};

const handleEventClick = (info) => {
  const roomName = info.event.extendedProps.room;
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  Swal.fire({
    title: "Détails de la Réservation",
    html: `Date Début: ${info.event.start.toLocaleDateString()} à ${info.event.start.toLocaleTimeString(
      [],
      timeOptions
    )} <br>
    Date Fin: ${info.event.end.toLocaleDateString()} à ${info.event.end.toLocaleTimeString(
      [],
      timeOptions
    )}<br><br>
    Salle: <strong>${roomName}</strong>
      <br> Resérvée par : <strong>${info.event.title}</strong>`,
    icon: "info",
    confirmButtonText: "Ok",
  });
};

</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center my-3">
      <!-- <h3 class="text-center mb-0">Tableau de bord</h3> -->
    </div>
    <div class="calendar-container mt-3">
      <FullCalendar :options="calendarOptions" />
    </div>
    <StatisticReservation />
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
