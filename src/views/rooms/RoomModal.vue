<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold w-100 text-center">
            {{ $t("modal.title") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="router.push({ name: 'list-room' })"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div class="input-group flex-nowrap">
                  <label for="name" class="input-group-text">{{
                    $t("modal.name")
                  }}</label>
                  <input
                    type="text"
                    :disabled="isDisabled"
                    id="name"
                    v-model="room.name"
                    class="form-control bg-opacity-50"
                    :placeholder="$t('modal.namePlaceholder')"
                    aria-label="name"
                  />
                </div>

                <div class="row">
                  <div
                    class="col-12"
                    :class="isDisabled ? 'd-flex justify-content-between' : ''"
                  >
                    <div
                      class="input-group"
                      :class="isDisabled ? 'col-6' : 'col-12'"
                    >
                      <label for="capacity" class="input-group-text">
                        {{ $t("modal.capacity") }}
                      </label>
                      <input
                        type="number"
                        :disabled="isDisabled"
                        v-model="room.capacity"
                        id="capacity"
                        class="form-control bg-opacity-50"
                        :placeholder="$t('modal.capacityPlaceholder')"
                        aria-label="Capacité de la salle"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="input-group">
                      <label for="statut" class="input-group-text">{{
                        $t("modal.status")
                      }}</label>
                      <select
                        class="form-select bg-opacity-50"
                        v-model="room.status"
                        id="statut"
                        :disabled="isDisabled"
                      >
                        <option value="" disabled selected>
                          {{ $t("modal.chooseStatus") }}
                        </option>
                        <option value="Réservée">
                          {{ $t("modal.reserved") }}
                        </option>
                        <option value="Non Réservée">
                          {{ $t("modal.notReserved") }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="input-group flex-nowrap">
                  <label for="equipment" class="input-group-text">{{
                    $t("modal.equipment")
                  }}</label>
                  <textarea
                    :disabled="isDisabled"
                    name="equipment"
                    v-model="room.equipment"
                    class="form-control bg-opacity-50"
                    id="equipment"
                    :placeholder="$t('modal.equipmentPlaceholder')"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          class="modal-footer"
          :class="!isDisabled ? 'p-0 container-fluid' : ''"
        >
          <button
            type="button"
            class="btn btn-secondary"
            :style="isDisabled ? 'width: 100%' : ''"
            data-bs-dismiss="modal"
            @click="actionClose, router.push({ name: 'list-room' })"
          >
            {{ $t("modal.close") }}
          </button>
          <button
            v-if="!isDisabled"
            type="button"
            @click="createNewRoom"
            class="btn btn-primary"
          >
            {{ $t("modal.save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <SuccessModal valid="Ok" />
</template>

<script setup>
import { storeRoom } from "@/stores/storeRoom";
import SuccessModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";
import { globalyStore } from "@/stores/storeGlobaly";
import router from "@/router";
const { t } = useI18n();

const storeGlobaly = globalyStore();

const store = storeRoom();
const room = store.room;

const createNewRoom = async () => {
  try {
    const newRoom = await store.addRoom();
    await storeGlobaly.MessageModalSuccess(
      "Salle Créée Avec Succès",
      "Création"
    );
    store.room.name = "";
    store.room.capacity = "";
    store.room.equipment = "";
    store.room.status = "";
    router.push({ name: 'list-room' })
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Erreur lors de la creation",
      "Création Salle"
    );
    console.log(error.message);
  }
};

defineProps({
  actionClose: Function,

  isDisabled: {
    type: Boolean,
    defaut: false,
  },
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