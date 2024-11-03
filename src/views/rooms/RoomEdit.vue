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
            {{ $t("roomEdit.title") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'room' })"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div class="input-group flex-nowrap">
                  <label for="name" class="input-group-text">{{
                    $t("roomEdit.name")
                  }}</label>
                  <input
                    type="text"
                    :disabled="isDisabled"
                    id="name"
                    v-model="room.name"
                    class="form-control bg-opacity-50"
                    :placeholder="$t('roomEdit.namePlaceholder')"
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
                        {{ $t("roomEdit.capacity") }}
                      </label>
                      <input
                        type="number"
                        :disabled="isDisabled"
                        v-model="room.capacity"
                        id="capacity"
                        class="form-control bg-opacity-50"
                        :placeholder="$t('roomEdit.capacityPlaceholder')"
                        aria-label="Capacité de la salle"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                  </div>
                </div>

                <div class="input-group flex-nowrap">
                  <label for="equipment" class="input-group-text">{{
                    $t("roomEdit.equipment")
                  }}</label>
                  <textarea
                    :disabled="isDisabled"
                    name="equipment"
                    v-model="room.equipment"
                    class="form-control bg-opacity-50"
                    id="equipment"
                    :placeholder="$t('roomEdit.equipmentPlaceholder')"
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
            data-bs-dismiss="modal"
            @click="router.push({ name: 'room' })"
          >
            {{ $t("roomEdit.close") }}
          </button>
          <button
            v-if="!isDisabled"
            type="button"
            @click="updateRoom"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            {{ $t("roomEdit.save") }}
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
import { useRoute } from "vue-router";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { onMounted } from "vue";
import router from "@/router";
const { t } = useI18n();
const storeGlobaly = globalyStore();
const route = useRoute();
const store = storeRoom();
const room = store.room;

onMounted(() => {
  const modal = new Modal(document.getElementById("exampleModal"));
  modal.show();
});

const id = Number(route.params.id);

const updateRoom = async () => {
  try {
    await store.updateRoom(id);
    await storeGlobaly.MessageModalSuccess(
      "Salle Modifier Avec Succès",
      "Création"
    );
    store.room.name = "";
    store.room.capacity = "";
    store.room.equipment = "";
    router.push({ name: 'room' })
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Erreur lors de la modification",
      "Modification Salle"
    );
    console.log(error.message);
  }
};

defineProps({
  actionClose: Function,
  actionBtn: Function,
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