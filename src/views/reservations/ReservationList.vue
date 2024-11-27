<template>
  <div class="container-fluid">
    <h1 class="text-center fs-4 fw-bold mb-0">Liste des Réservations</h1>
  </div>
  <div class="container-fluid mt-3 p-0 d-flex justify-content-end mb-2">
    <button
      class="btn btn-primary fw-bold"
      @click="
        store.resetData();
        router.push({ name: 'add-reservation' });
      "
    >
      <i class="fa fa-plus me-1"></i>
      {{ t("reservationList.newReservation") }}
    </button>
  </div>
  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center text-truncate">
          {{ t("reservationList.startDate") }}
        </th>
        <th scope="col" class="text-center text-truncate">
          {{ t("reservationList.endDate") }}
        </th>
        <th scope="col" class="responsive-hide text-truncate">
          {{ t("reservationList.room") }}
        </th>
        <th scope="col" class="responsive-hide text-truncate">
          {{ t("reservationList.client") }}
        </th>
        <th scope="col" class="responsive-hide text-truncate">Statut</th>
        <th scope="col" class="text-center">
          {{ t("reservationList.actions") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.reservations.length === 0">
        <td colspan="7" class="text-danger text-center fw-bold">
          {{ t("reservationList.noReservation") }}
        </td>
      </tr>
      <tr v-else v-for="(reservation, index) in sortedReservation" :key="index">
        <td class="text-center">{{ reservation?.id }}</td>
        <td class="text-center">{{ formatDateTime(reservation.dateStart) }}</td>
        <td class="text-center">{{ formatDateTime(reservation.dateEnd) }}</td>
        <td class="responsive-hide">{{ reservation.room.name }}</td>
        <td class="responsive-hide">{{ reservation.customer.name }}</td>
        <td class="responsive-hide">
          <select
            v-model="reservation.status"
            :disabled="isPastReservation(reservation)"
            @change="updateReservationStatus(reservation)"
            :class="statusClass(reservation.status)"
            class="form-select bg-opacity-50"
            required
          >
            <option value="CONFIRMED">
              {{ t("reservationAdd.confirmed") }}
            </option>
            <option value="PENDING">{{ t("reservationAdd.pending") }}</option>
            <option value="CANCELED">{{ t("reservationAdd.canceled") }}</option>
          </select>
        </td>
        <td class="text-center">
          <button
            class="btn-sm btn btn-outline-primary ms-2"
            @click="
              store.findReservation(reservation.id);
              router.push({ name: 'show-reservation' });
            "
          >
            <i class="fas fa-eye"></i>
          </button>
          <button
            v-if="
              !isPastReservation(reservation) &&
              reservation.status !== 'CONFIRMED'
            "
            :disabled="
              isPastReservation(reservation) ||
              reservation.status === 'CONFIRMED'
            "
            class="btn-sm btn btn-outline-secondary ms-2"
            @click="editReservation(reservation.id)"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            v-if="
              !isPastReservation(reservation) &&
              reservation.status !== 'CONFIRMED'
            "
            @click="destroyReservation(reservation.id)"
            class="btn-sm btn btn-outline-danger ms-2"
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <customerModal />
  <MessageModal valid="OK" />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
import { storeReservation } from "@/stores/storeReservation";
import { globalyStore } from "@/stores/storeGlobaly";
import { computed, onMounted } from "vue";
import { useDateTimeFormatter } from "./useDateForatter";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { formatDateTime } = useDateTimeFormatter();
const store = storeReservation();
const storeGlobaly = globalyStore();
const router = useRouter();

// Charger les données au montage
onMounted(async () => {
  await store.loadingData();
  updatePendingReservations();
});

// Trier les réservations
const sortedReservation = computed(() => {
  return [...store.reservations].sort((a, b) => b.id - a.id);
});

// Vérifier si une réservation est passée
const isPastReservation = (reservation) => {
  return new Date(reservation.dateEnd) < new Date();
};

// Mettre à jour les statuts automatiquement
const updatePendingReservations = async () => {
  store.reservations.forEach(async (reservation) => {
    if (isPastReservation(reservation) && reservation.status === "PENDING") {
      await store.updateStatus(reservation.id, "CANCELED");
      reservation.status = "CANCELED"; // Mise à jour locale
    }
  });
};

// Modifier une réservation
const editReservation = async (id) => {
  await store.findReservation(id);
  router.push({ name: "edit-reservation", params: { id } });
};

// Supprimer une réservation
const destroyReservation = async (id) => {
  try {
    if (confirm(t("reservationList.confirmDelete"))) {
      await store.deleteReservation(id);
      await storeGlobaly.MessageModalSuccess(
        t("reservationList.deleteSuccess"),
        t("reservationList.deleteTitle")
      );
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      t("reservationList.deleteError"),
      t("reservationList.deleteTitle")
    );
    console.log(error);
  }
};

// Mettre à jour le statut via le menu déroulant
const updateReservationStatus = async (reservation) => {
  await store.updateStatus(reservation.id, reservation.status);
};

// Appliquer une classe aux statuts
const statusClass = (status) => {
  return status === "CONFIRMED"
    ? "text-success"
    : status === "CANCELED"
    ? "text-danger"
    : "text-warning";
};
</script>

<style scoped>
@media (max-width: 650px) {
  .responsive-hide {
    display: none;
  }
}
</style>
