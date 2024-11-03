<template>
  <div class="container cont-parent d-flex justify-content-center m-auto align-items-center">
    <div class="card p-4 shadow w-100" style="max-width: 600px;">
      <h4 class="text-center mb-4">{{ t("reservationEdit.title") }}</h4>
      <form @submit.prevent="addReservation">
        <!-- Sélection du client -->
        <div class="mb-3">
          <label for="client" class="form-label">{{ t("reservationAdd.client") }}</label>
          <select
            v-model="store.reservation.customerId"
            id="client"
            class="form-select bg-opacity-50"
            required
          >
            <option
              v-for="customer in storeCustomer().customers"
              :key="customer.id"
              :value="customer.id"
            >
              {{ customer.name }}
            </option>
          </select>
        </div>

        <!-- Statut et Salle sur la même ligne -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="status" class="form-label">{{ t("reservationAdd.status") }}</label>
            <select
              v-model="store.reservation.status"
              id="status"
              class="form-select bg-opacity-50"
              required
            >
              <option value="CONFIRMED">{{ t("reservationAdd.confirmed") }}</option>
              <option value="PENDING">{{ t("reservationAdd.pending") }}</option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="room" class="form-label">{{ t("reservationAdd.room") }}</label>
            <select
              v-model="store.reservation.roomId"
              id="room"
              class="form-select bg-opacity-50"
              required
            >
              <option
                v-for="room in storeRoom().rooms"
                :key="room.id"
                :value="room.id"
              >
                {{ room.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Date et Heure de début sur la même ligne -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="startDate" class="form-label">{{ t("reservationAdd.startDate") }}</label>
            <input
              type="date"
              v-model="store.reservation.dateStart"
              id="startDate"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="startTime" class="form-label">{{ t("reservationAdd.startTime") }}</label>
            <input
              type="time"
              v-model="store.reservation.timeStart"
              id="startTime"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <!-- Date et Heure de fin sur la même ligne -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="endDate" class="form-label">{{ t("reservationAdd.endDate") }}</label>
            <input
              type="date"
              v-model="store.reservation.dateEnd"
              id="endDate"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="endTime" class="form-label">{{ t("reservationAdd.endTime") }}</label>
            <input
              type="time"
              v-model="store.reservation.timeEnd"
              id="endTime"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <!-- Bouton d'envoi -->
        <button type="submit" class="btn btn-primary w-100">
          {{ t("reservationAdd.save") }}
        </button>
      </form>
    </div>
  </div>
  <div class="div">
    <SuccessModal />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import SuccessModal from "@/components/MessageModal.vue";
import { storeReservation } from "@/stores/storeReservation";
import { globalyStore } from "@/stores/storeGlobaly";
import { onMounted } from "vue";
import { storeRoom } from "@/stores/storeRoom";
import { storeCustomer } from "@/stores/storeCustomer";
import router from "@/router";

onMounted(async () => {
  await storeCustomer().loadingData();
  await storeRoom().loadingData();
});

const { t } = useI18n();
const storeGlobaly = globalyStore();
const store = storeReservation();
const addReservation = async () => {
  try {
    await store.addReservation();
    await storeGlobaly.MessageModalSuccess(
      t("reservationAdd.successMessage"),
      t("reservationAdd.successTitle")
    );
    router.push({name: 'list-reservation'})
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      t("reservationAdd.errorMessage"),
      t("reservationAdd.errorTitle")
    );
  }
};
</script>

<style scoped>
.input-group {
  flex-direction: column;
}
</style>
