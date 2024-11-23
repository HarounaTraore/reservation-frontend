<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4">{{ t("reservationAdd.title") }}</h4>
      <form @submit.prevent="addReservation">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="client" class="form-label">{{
              t("reservationAdd.client")
            }}</label>
            <select
              v-model="store.reservation.customerId"
              id="client"
              class="form-select bg-opacity-50"
              required
            >
              <option
                v-for="(customer, index) in storeCustomer().customers"
                :key="index"
                :value="customer.id"
              >
                {{ customer.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="capacity" class="form-label"
              >Capacité (optionnelle)</label
            >
            <select
              v-model="store.capacity"
              id="capacity"
              class="form-select bg-opacity-50"
            >
              <option value="" disabled>Choisir la capacité de la salle</option>
              <option value="">Capacité Non Préciser</option>
              <option :value="20">Inferieur à 50 Personnes</option>
              <option :value="90">Inferieur à 100 Personnes</option>
              <option :value="200">Inferieur à 300 Personnes</option>
              <option :value="500">Inferieur à 500 Personnes</option>
              <option :value="501">Plus que 500 Personnes</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="startDate" class="form-label">{{
              t("reservationAdd.startDate")
            }}</label>
            <input
              type="date"
              v-model="store.reservation.dateStart"
              id="startDate"
              class="form-control bg-opacity-50"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="startTime" class="form-label">{{
              t("reservationAdd.startTime")
            }}</label>
            <input
              type="time"
              v-model="store.reservation.timeStart"
              id="startTime"
              class="form-control bg-opacity-50"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="endDate" class="form-label">{{
              t("reservationAdd.endDate")
            }}</label>
            <input
              type="date"
              v-model="store.reservation.dateEnd"
              id="endDate"
              class="form-control bg-opacity-50"
              required
            />
            <span v-if="errorDate" class="errorInput">{{ errorDate }}</span>
          </div>
          <div class="col-md-6">
            <label for="endTime" class="form-label">{{
              t("reservationAdd.endTime")
            }}</label>
            <input
              type="time"
              v-model="store.reservation.timeEnd"
              id="endTime"
              class="form-control bg-opacity-50"
              required
            />
            <span v-if="errorTiming" class="errorInput">
              {{ errorTiming }}
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="status" class="form-label">{{
              t("reservationAdd.status")
            }}</label>
            <select
              v-model="store.reservation.status"
              id="status"
              class="form-select bg-opacity-50"
              required
            >
              <option value="" disabled>Selectionner Statut</option>
              <option value="CONFIRMED">
                {{ t("reservationAdd.confirmed") }}
              </option>
              <option selected value="PENDING">
                {{ t("reservationAdd.pending") }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="room" class="form-label">{{
              t("reservationAdd.room")
            }}</label>
            <select
              v-model="store.reservation.roomId"
              id="room"
              class="form-select bg-opacity-50"
              required
            >
              <option value="" disabled>Selectionner une salle</option>
              <option
                v-for="room in store.roomsNotReserved"
                :key="room.id"
                :value="room.id"
              >
                {{ room.name }} <span>({{ room.capacity }})</span>
              </option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          :disabled="errorDate || errorTiming"
          class="btn btn-primary w-100"
        >
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
import { onMounted, ref, watch } from "vue";
import { storeRoom } from "@/stores/storeRoom";
import { storeCustomer } from "@/stores/storeCustomer";
import router from "@/router";

const { t } = useI18n();
const storeGlobaly = globalyStore();
const store = storeReservation();
onMounted(async () => {
  await storeCustomer().loadingData();
  await storeRoom().loadingData();
  await store.findRoomsNotReserved();
  if (storeCustomer().customers.length > 0) {
    store.reservation.customerId =
      storeCustomer().customers[storeCustomer().customers.length - 1].id;
  }
});

const errorDate = ref(null);
const errorTiming = ref(null);

watch(
  () => [
    store.reservation.dateStart,
    store.reservation.dateEnd,
    store.reservation.timeStart,
    store.reservation.timeEnd,
  ],
  ([dateStart, dateEnd, timeStart, timeEnd]) => {
    if (dateStart > dateEnd) {
      errorDate.value =
        "La date de fin doit être postérieure à la date de début";
      errorTiming.value = null;
    } else if (dateStart === dateEnd && timeStart > timeEnd) {
      errorDate.value = null;
      errorTiming.value =
        "L'heure de fin doit être postérieure à l'heure de début";
    } else {
      errorDate.value = null;
      errorTiming.value = null;
    }
  }
);

watch(
  () => [
    store.reservation.dateStart,
    store.reservation.dateEnd,
    store.reservation.timeStart,
    store.reservation.timeEnd,
    store.capacity,
  ],
  async ([dateStart, dateEnd, timeStart, timeEnd, capacity]) => {
    if ((dateStart && dateEnd && timeStart && timeEnd) || (capacity || capacity === "")) {
      await store.findRoomsNotReserved();
    }
  }
);

const addReservation = async () => {
  try {
    await store.addReservation();
    await storeGlobaly.MessageModalSuccess(
      t("reservationAdd.successMessage"),
      t("reservationAdd.successTitle")
    );
    router.push({ name: "list-reservation" });
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
.errorInput {
  color: red;
  font-size: 11px;
  margin-left: 0px;
  margin-top: 0px;
  padding-top: 0;
}
</style>
