<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="reservationModal"
    tabindex="-1"
    aria-labelledby="reservationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold w-100 text-center">
            {{ $t("reservationAdd.title") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'list-reservation' })"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="addReservation">
          <div class="modal-body">
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div class="input-group flex-nowrap mb-3">
                  <label class="input-group-text">{{ $t("reservationAdd.client") }}</label>
                  <select
                    id="customerId"
                    v-model="reservation.customerId"
                    class="form-select bg-opacity-50"
                    required
                  >
                    <option value="" disabled selected>
                      {{ $t("reservationAdd.selectClient") }}
                    </option>
                    <option
                      v-for="customer in storeCustomer().customers"
                      :key="customer.id"
                      :value="customer.id"
                    >
                      {{ customer.name }}
                    </option>
                  </select>
                </div>

                <div class="input-group flex-nowrap mb-3">
                  <label class="input-group-text">{{ $t("reservationAdd.room") }}</label>
                  <select
                    v-model="reservation.roomId"
                    class="form-select bg-opacity-50"
                    required
                  >
                    <option value="" disabled>{{ $t("reservationAdd.selectRoom") }}</option>
                    <option
                      v-for="room in storeRoom().rooms"
                      :key="room.id"
                      :disabled="room.status =='Réservée'"
                      :value="room.id"
                    >
                      {{ room.name }}
                    </option>
                  </select>
                </div>

                <div class="d-flex justify-content-between mb-3">
                  <div class="input-group me-2 flex-nowrap">
                    <label class="input-group-text">{{ $t("reservationAdd.startDate") }}</label>
                    <input
                      type="date"
                      id="dateStart"
                      v-model="reservation.dateStart"
                      class="form-control bg-opacity-50"
                      required
                    />
                  </div>
                  <div class="input-group flex-nowrap">
                    <input
                      type="time"
                      v-model="reservation.timeStart"
                      class="form-control bg-opacity-50"
                      required
                    />
                    <label class="input-group-text">{{ $t("reservationAdd.startTime") }}</label>
                  </div>
                </div>

                <div class="d-flex justify-content-between mb-3">
                  <div class="input-group me-2 flex-nowrap">
                    <label class="input-group-text">{{ $t("reservationAdd.endDate") }}</label>
                    <input
                      type="date"
                      id="dateEnd"
                      v-model="reservation.dateEnd"
                      class="form-control bg-opacity-50"
                      required
                    />
                  </div>
                  <div class="input-group flex-nowrap">
                    <input
                      type="time"
                      v-model="reservation.timeEnd"
                      class="form-control bg-opacity-50"
                      required
                    />
                    <label class="input-group-text">{{ $t("reservationAdd.endTime") }}</label>
                  </div>
                </div>

                <div v-if="dateError" class="text-danger fs-6">
                  {{ dateError }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="router.push({ name: 'list-reservation' })"
            >
              {{ $t("modal.close") }}
            </button>
            <button
              type="submit"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              {{ $t("modal.save") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <SuccessModal valid="Ok" />
</template>

<script setup>
import SuccessModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { computed, onMounted, ref } from "vue";
import router from "@/router";
import { storeReservation } from "@/stores/storeReservation";
import { storeCustomer } from "@/stores/storeCustomer";
import { storeRoom } from "@/stores/storeRoom";
import { globalyStore } from "@/stores/storeGlobaly";

const { t } = useI18n();
const dateError = ref("");
const store = storeReservation();
const reservation = store.reservation;

onMounted(async () => {
  await storeCustomer().loadingData();
  await storeRoom().loadingData();
  const modal = new Modal(document.getElementById("reservationModal"));
  modal.show();
});

const roomsNotReserved = computed(() =>
  storeRoom().rooms.filter((item) => item.status !== "Non Réservée")
);

const validateDates = () => {
  const start = new Date(`${reservation.dateStart}T${reservation.timeStart}`);
  const end = new Date(`${reservation.dateEnd}T${reservation.timeEnd}`);
  dateError.value =
    start >= end ? t("reservationAdd.dateError") : "";
};

const storeGlobaly = globalyStore();
const addReservation = async () => {
  validateDates();
  if (dateError.value) return;
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
    console.log(error.message);
  }
};
</script>

<style scoped>
.height {
  height: 80vh;
}
.input-group {
  margin-top: 25px;
}
</style>
