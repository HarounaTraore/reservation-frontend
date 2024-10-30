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
            Modifier la Réservation
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'reservations' })"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="editReservation">
          <div class="modal-body">
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <!-- Sélection du client -->
                <div class="input-group flex-nowrap mb-3">
                  <label class="input-group-text">Client</label>
                  <select
                    id="customerId"
                    v-model="reservation.customerId"
                    class="form-select bg-opacity-50"
                    required
                  >
                    <option value="" disabled selected>Sélectionner le Client</option>
                    <option v-for="customer in storeCustomer().customers" :key="customer.id" :value="customer.id">
                      {{ customer.name }}
                    </option>
                  </select>
                </div>

                <!-- Sélection de la salle -->
                <div class="input-group flex-nowrap mb-3">
                  <label class="input-group-text">Salle</label>
                  <select
                    v-model="reservation.roomId"
                    class="form-select bg-opacity-50"
                    required
                  >
                    <option value="" disabled selected>Sélectionner la salle</option>
                    <option v-for="room in storeRoom().rooms" :key="room.id" :value="room.id">
                      {{ room.name }}
                    </option>
                  </select>
                </div>

                <!-- Date et heure de début -->
                <div class="d-flex justify-content-between mb-3">
                  <div class="input-group me-2 flex-nowrap">
                    <label class="input-group-text">Date Début</label>
                    <input
                      type="date"
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
                    <label class="input-group-text">Heure Début</label>
                  </div>
                </div>

                <!-- Date et heure de fin -->
                <div class="d-flex justify-content-between mb-3">
                  <div class="input-group me-2 flex-nowrap">
                    <label class="input-group-text">Date Fin</label>
                    <input
                      type="date"
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
                    <label class="input-group-text">Heure Fin</label>
                  </div>
                </div>

                <!-- Message d'erreur de validation des dates -->
                <div v-if="dateError" class="text-danger fs-6">
                  {{ dateError }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary "
              data-bs-dismiss="modal"
              @click="router.push({ name: 'list-reservation' })"
            >
              {{ $t("modal.close") }}
            </button>
            <button type="submit" class="btn btn-primary">
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
import { onMounted, ref } from "vue";
import router from "@/router";
import { storeReservation } from "@/stores/storeReservation";
import { storeCustomer } from "@/stores/storeCustomer";
import { storeRoom } from "@/stores/storeRoom";
import { useRoute, useRouter } from "vue-router";
import { globalyStore } from "@/stores/storeGlobaly";

const { t } = useI18n();
const dateError = ref("");
const store = storeReservation();
const reservation = store.reservation;
const route = useRoute();

onMounted(async () => {
  await storeCustomer().loadingData();
  await storeRoom().loadingData();
  const modal = new Modal(document.getElementById("reservationModal"));
  modal.show();
});

// Validation des dates
const validateDates = () => {
  const start = new Date(`${reservation.dateStart}T${reservation.timeStart}`);
  const end = new Date(`${reservation.dateEnd}T${reservation.timeEnd}`);
  dateError.value = start >= end ? "La date de fin doit être après la date de début." : "";
};
const storeGlobaly = globalyStore()
const id = Number(useRoute().params.id);
const editReservation = async () => {
  validateDates();
  if (dateError.value) return;
  try {
    await store.updateReservation(id);
    await storeGlobaly.MessageModalSuccess(
      "Modification effectuée Avec Succès",
      "Modification De Réservation"
    )
    router.push({ name: "list-reservation" });
    
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      " Erreur de Réservation",
      "Modification De Réservation"
    )
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
