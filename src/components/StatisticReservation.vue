<template>
  <div class="container pt-4">
    <Line
      :key="chartDataKey"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { storeReservation } from "@/stores/storeReservation";
const { fetchRoomStatistics } = storeReservation();

const roomStatistics = ref([]);
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Toute les Réservations",
      data: [],
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54, 162, 235, 0.1)",
      borderWidth: 2,
      pointRadius: 2,
      fill: true,
      tension: 0.4, 
    },
    {
      label: "Réservations Confirmées",
      data: [],
      borderColor: "#4CAF50",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      borderWidth: 2,
      pointRadius: 2,
      tension: 0.1,
    },
    {
      label: "Réservations En Attente",
      data: [],
      borderColor: "#FFC107",
      backgroundColor: "rgba(255, 193, 7, 0.3)",
      borderWidth: 2,
      pointRadius: 2,
      tension: 0.2, 
    },
    {
      label: "Réservations Annulées",
      data: [],
      borderColor: "#F44336",
      backgroundColor: "rgba(244, 67, 54)",
      borderWidth: 2,
      pointRadius: 2,
      tension: 0.5, 
      fill: false
    },
  ],
});
const chartDataKey = ref(0);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Statistiques des Réservations par Salle",
    },
  },
  fill: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});

onMounted(async () => {
  try {
    const { result } = await fetchRoomStatistics();
    roomStatistics.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
  }
});

watch(
  roomStatistics,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      chartData.value.labels = newValue.map((room) => room.roomName);
      chartData.value.datasets[0].data = newValue.map(
        (room) => room.reservationsCount || 0
      );
      chartData.value.datasets[1].data = newValue.map(
        (room) => room.groupedReservations?.CONFIRMED?.count || 0
      );
      chartData.value.datasets[2].data = newValue.map(
        (room) => room.groupedReservations?.PENDING?.count || 0
      );
      chartData.value.datasets[3].data = newValue.map(
        (room) => room.groupedReservations?.CANCELED?.count || 0
      );

      // Mise à jour des totaux
      const totalReservations = chartData.value.datasets[0].data.reduce((a, b) => a + b, 0);
      const totalConfirmed = chartData.value.datasets[1].data.reduce((a, b) => a + b, 0);
      const totalPending = chartData.value.datasets[2].data.reduce((a, b) => a + b, 0);
      const totalCanceled = chartData.value.datasets[3].data.reduce((a, b) => a + b, 0);

      chartData.value.datasets[0].label = `Toute les Réservations (${totalReservations})`;
      chartData.value.datasets[1].label = `Réservations Confirmées (${totalConfirmed})`;
      chartData.value.datasets[2].label = `Réservations En Attente (${totalPending})`;
      chartData.value.datasets[3].label = `Réservations Annulées (${totalCanceled})`;

      chartDataKey.value++; 
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Ajouter des styles si nécessaire */
</style>
