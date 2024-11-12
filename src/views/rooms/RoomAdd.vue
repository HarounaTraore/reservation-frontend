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
          <h5 v-if="!isDisabled" class="modal-title fw-bold w-100 text-center">
            {{ $t("roomAdd.title") }}
          </h5>
          <h5 v-else class="modal-title fw-bold w-100 text-center">
            Affichage d'une Salle
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="router.push({ name: 'room' })"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div>
                  <div class="input-group flex-nowrap">
                    <label for="name" class="input-group-text">{{
                      $t("roomAdd.name")
                    }}</label>
                    <input
                      type="text"
                      :disabled="isDisabled"
                      id="name"
                      v-model="room.name"
                      class="form-control bg-opacity-50"
                      :placeholder="$t('roomAdd.namePlaceholder')"
                      aria-label="name"
                    />
                  </div>
                  <span class="errorInput" v-if="allErrors?.name">
                    {{ allErrors?.name }}
                  </span>
                </div>

                <div class="row">
                  <div
                    class="col-12"
                    :class="isDisabled ? 'd-flex justify-content-between' : ''"
                  >
                    <div class="">
                      <div
                        class="input-group"
                        :class="isDisabled ? 'col-6' : 'col-12'"
                      >
                        <label for="capacity" class="input-group-text">
                          {{ $t("roomAdd.capacity") }}
                        </label>
                        <input
                          type="number"
                          :disabled="isDisabled"
                          v-model="room.capacity"
                          id="capacity"
                          class="form-control bg-opacity-50"
                          :placeholder="$t('roomAdd.capacityPlaceholder')"
                          aria-label="Capacité de la salle"
                        />
                      </div>
                      <span class="errorInput" v-if="allErrors?.capacity">
                        {{ allErrors?.capacity }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="input-group flex-nowrap">
                    <label for="equipment" class="input-group-text">{{
                      $t("roomAdd.equipment")
                    }}</label>
                    <textarea
                      :disabled="isDisabled"
                      name="equipment"
                      v-model="room.equipment"
                      class="form-control bg-opacity-50"
                      id="equipment"
                      :placeholder="$t('roomAdd.equipmentPlaceholder')"
                    ></textarea>
                  </div>
                  <span class="errorInput" v-if="allErrors?.equipment">
                    {{ allErrors?.equipment }}
                  </span>
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
            @click="actionClose, router.push({ name: 'room' })"
          >
            {{ $t("roomAdd.close") }}
          </button>
          <button
            v-if="!isDisabled"
            type="button"
            @click="createNewRoom"
            class="btn btn-primary"
          >
            {{ $t("roomAdd.save") }}
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
import { ref } from "vue";
const { t } = useI18n();

const storeGlobaly = globalyStore();

const store = storeRoom();
const room = store.room;
const errors = ref([]);
const allErrors = ref();

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
    router.push({ name: "room" });
  } catch (error) {
    const err = error.response.data.errors;

    errors.value = [...err];
    allErrors.value = errors.value.reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
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
.errorInput {
  color: red;
  font-size: 11px;
  margin-left: 15px;
  margin-top: 0px;
  padding-top: 0;
}
</style>