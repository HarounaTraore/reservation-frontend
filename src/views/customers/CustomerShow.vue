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
            Affichage
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'customer' })"
            aria-label="Close"
          ></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">


                <div class="d-flex justify-content-between">
                    <div class="input-group  flex-nowrap">
                  <label for="id" class="input-group-text">ID</label>
                  <input
                    type="text"
                    id="id"
                    disabled
                    v-model="customer.id"
                    class="form-control bg-opacity-50"
                    placeholder="Entrer le nom du client"
                    aria-label="name"
                    required
                  />
                </div>
                <div v-if="customer.userId" class="input-group ms-4 flex-nowrap">
                  <label for="user" class="input-group-text">User</label>
                  <input
                    type="text"
                    id="user"
                    disabled
                    v-model="customer.userId"
                    class="form-control bg-opacity-50"
                    placeholder="Entrer le nom du client"
                    aria-label="name"
                    required
                  />
                </div>
                </div>


                <div class="input-group flex-nowrap">
                  <label for="name" class="input-group-text">Nom</label>
                  <input
                    type="text"
                    id="name"
                    disabled
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
                        disabled
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
                    disabled
                    v-model="customer.phone"
                    class="form-control bg-opacity-50"
                    id="phone"
                    placeholder="Entrer le numero telephon du client"
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
              @click="router.push({ name: 'customer' })"
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
import { storeCustomer } from "@/stores/storeCustomer";

const store = storeCustomer();
const customer = store.customer;

onMounted(() => {
  const modal = new Modal(document.getElementById("exampleModal"));
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