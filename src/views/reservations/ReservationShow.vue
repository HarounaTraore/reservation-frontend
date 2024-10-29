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
            Détails de la Réservation
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'list-reservation' })"
            aria-label="Close"
          ></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div class="d-flex justify-content-between flex-nowrap">
                  <div class="input-group w-auto me-2 flex-nowrap">
                    <label class="input-group-text">ID</label>
                    <input
                      type="text"
                      disabled
                      v-model="reservation.id"
                      class="form-control bg-opacity-50"
                      required
                    />
                  </div>

                  <div class="input-group flex-nowrap">
                    <input
                      type="text"
                      disabled
                      v-model="reservation.userId"
                      class="form-control bg-opacity-50"
                      required
                    />
                    <label class="input-group-text text-truncate"
                      >Utilisateur</label
                    >
                  </div>
                </div>
                <div class="d-flex d-nowrap justify-content-between">
                  <div class="input-group me-2 flex-nowrap">
                    <label class="input-group-text">Salle</label>
                    <input
                      type="text"
                      disabled
                      v-model="reservation.roomId"
                      class="form-control bg-opacity-50"
                      required
                    />
                  </div>

                  <div class="input-group flex-nowrap">
                    <input
                      type="text"
                      disabled
                      v-model="reservation.customerId"
                      class="form-control bg-opacity-50"
                      required
                    />
                    <label for="customerId" class="input-group-text"
                      >Client</label
                    >
                  </div>
                </div>
                <div class="d-flex d-nowrap justify-content-between">
                  <div class="input-group w-auto me-2 flex-nowrap">
                    <label class="input-group-text"
                      >Date Début</label
                    >
                    <input
                      type="text"
                      disabled
                      :value="formatDateTime(reservation.dateStart)"
                      class="form-control bg-opacity-50"
                      required
                    />
                  </div>
                  <div class="input-group w-50 flex-nowrap">
                    <input
                      type="text"
                      disabled
                      :value="formatDateTime(reservation.dateStart, 'HH:mm')"
                      class="form-control bg-opacity-50"
                      required
                    />
                    <label for="dateStart" class="input-group-text"
                      >Heure</label
                    >
                  </div>
                </div>
                <div class="d-flex flex-nowrap justify-content-between">
                  <div class="input-group w-75 me-2 flex-nowrap">
                    <label class="input-group-text">Date Fin</label>
                    <input
                      type="text"
                      disabled
                      :value="formatDateTime(reservation.dateEnd)"
                      class="form-control bg-opacity-50"
                      required
                    />
                  </div>
                  <div class="input-group w-auto flex-nowrap">
                    <input
                      type="text"
                      disabled
                      :value="formatDateTime(reservation.dateEnd, 'HH:mm')"
                      class="form-control bg-opacity-50"
                      required
                    />
                    <label for="dateEnd" class="input-group-text">Heure</label>
                  </div>
                </div>

                <div class="input-group w-auto me-2 flex-nowrap">
                  <label class="input-group-text">Date de Réservation</label>
                  <input
                    type="text"
                    disabled
                    :value="formatDateTime(reservation.dateReservation)"
                    class="form-control bg-opacity-50"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn w-100 btn-secondary"
              data-bs-dismiss="modal"
              @click="router.push({ name: 'list-reservation' })"
            >
              {{ $t("modal.close") }}
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
import { onMounted } from "vue";
import router from "@/router";
import { storeReservation } from "@/stores/storeReservation";
import { useDateTimeFormatter } from "./useDateForatter";
const { formatDateTime } = useDateTimeFormatter();
const store = storeReservation();
const reservation = store.reservation;

onMounted(() => {
  const modal = new Modal(document.getElementById("reservationModal"));
  modal.show();
});
</script>
      
  <style scoped>
.height {
  height: 80vh;
}
.input-group {
  margin-top: 25px;
}
</style>
  