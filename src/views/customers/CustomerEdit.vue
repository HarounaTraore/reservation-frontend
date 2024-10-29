<template>
  <!-- Modal -->
  <div
    v-if="showModal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold w-100 text-center">Modification</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'customer' })"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="editCustomer">
          <div class="modal-body">
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div class="input-group flex-nowrap">
                  <label for="name" class="input-group-text">Nom</label>
                  <input
                    type="text"
                    id="name"
                    v-model="customer.name"
                    class="form-control bg-opacity-50"
                    placeholder="Entrer le nom du client"
                    aria-label="name"
                    required
                  />
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="input-group">
                      <label for="address" class="input-group-text">
                        Address
                      </label>
                      <input
                        type="text"
                        v-model="customer.address"
                        id="address"
                        class="form-control bg-opacity-50"
                        placeholder="Entrer l'adresse du client"
                        aria-label="Entrer l'adresse du client"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="input-group flex-nowrap">
                  <label for="phone" class="input-group-text">Phone</label>
                  <input
                    name="phone"
                    v-model="customer.phone"
                    @input="validatePhone"
                    class="form-control bg-opacity-50"
                    id="phone"
                    placeholder="Entrer le numero telephon du client"
                    required
                  />
                </div>
                <p v-if="phoneError" class="text-danger fs-6">
                  {{ phoneError }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="router.push({ name: 'customer' })"
            >
              {{ $t("modal.close") }}
            </button>
            <button
              type="submit"
              :disabled="phoneError"
              class="btn btn-primary"
              data-bs-dismiss="modal"
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
import { globalyStore } from "@/stores/storeGlobaly";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { onMounted, ref } from "vue";
import router from "@/router";
import { storeCustomer } from "@/stores/storeCustomer";
const { t } = useI18n();

const showModal = ref(true);
const storeGlobaly = globalyStore();
const route = useRoute();
const store = storeCustomer();
const customer = store.customer;

onMounted(() => {
  const modal = new Modal(document.getElementById("exampleModal"));
  modal.show();
});

const phoneError = ref(false);

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  if (!regex.test(customer.phone)) {
    phoneError.value =
      "Le numéro de téléphone doit comporter 8 chiffres et commencer par 2, 3 ou 4.";
  } else {
    phoneError.value = false;
  }
};

const id = Number(route.params.id);

const editCustomer = async () => {
  try {
    await store.updateCustomer(id);
    await storeGlobaly.MessageModalSuccess(
      "Client Modifié Avec Succès",
      "Modification"
    );
    store.customer.name = "";
    store.customer.address = "";
    store.customer.phone = "";
    router.push({ name: "customer" });
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Ce numéro de telephone est déja associer à un client",
      "Modification Client"
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