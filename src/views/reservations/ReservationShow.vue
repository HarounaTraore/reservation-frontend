<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4">{{ t("reservationShow.title") }}</h4>
      <form>
        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ t("reservationShow.id") }}</label>
            <input
              type="text"
              disabled
              v-model="reservation.id"
              class="form-control bg-opacity-50"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">{{ t("reservationAdd.status") }}</label>
            <select
              v-model="store.reservation.status"
              id="status"
              class="form-select bg-opacity-50"
              required
              disabled
            >
              <option value="CONFIRMED">
                {{ t("reservationAdd.confirmed") }}
              </option>
              <option value="PENDING">{{ t("reservationAdd.pending") }}</option>
              <option value="CANCELED">
                {{ t("reservationAdd.canceled") }}
              </option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ t("reservationShow.room") }}</label>
            <input
              type="text"
              disabled
              v-model="reservation.roomId"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ t("reservationShow.client") }}</label>
            <input
              type="text"
              disabled
              v-model="reservation.customerId"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">{{
              t("reservationShow.startDate")
            }}</label>
            <input
              type="text"
              disabled
              :value="reservation.dateStart"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">{{
              t("reservationShow.startTime")
            }}</label>
            <input
              type="text"
              disabled
              :value="reservation.timeStart"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <!-- Dates et heures de fin -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ t("reservationShow.endDate") }}</label>
            <input
              type="text"
              disabled
              :value="reservation.dateEnd"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ t("reservationShow.endTime") }}</label>
            <input
              type="text"
              disabled
              :value="reservation.timeEnd"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">{{
              t("reservationShow.reservationDate")
            }}</label>
            <input
              type="text"
              disabled
              :value="formatDateTime(reservation.dateReservation)"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">{{
              t("reservationShow.createdBy")
            }}</label>
            <input
              type="text"
              disabled
              v-model="reservation.userName"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <!-- Bouton de retour à la liste des réservations -->
        <button
          type="button"
          class="btn btn-secondary w-100"
          @click="router.push({ name: 'list-reservation' })"
        >
          {{ t("reservationShow.close") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { storeReservation } from "@/stores/storeReservation";
import { useDateTimeFormatter } from "./useDateForatter";
import router from "@/router";

const { formatDateTime } = useDateTimeFormatter();
const store = storeReservation();
const reservation = store.reservation;

const { t } = useI18n();
</script>

<style scoped>
.input-group {
  flex-direction: column;
}
</style>
