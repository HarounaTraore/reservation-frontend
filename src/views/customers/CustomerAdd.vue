<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    data-bs-backdrop="static"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold w-100 text-center">
            {{ $t("addCustomer.modal.title") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="router.push({ name: 'customer' })"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="newCustomer">
          <div class="modal-body">
            <div class="d-flex flex-column align-items-center">
              <div class="w-100">
                <div>
                  <div class="input-group flex-nowrap">
                    <label for="name" class="input-group-text">{{
                      $t("addCustomer.form.nameLabel")
                    }}</label>
                    <input
                      type="text"
                      id="name"
                      v-model="customer.name"
                      class="form-control bg-opacity-50"
                      :placeholder="$t('addCustomer.form.namePlaceholder')"
                      aria-label="name"
                      required
                    />
                  </div>
                  <span class="errorInput" v-if="allErrors?.name">
                    {{ allErrors?.name }}
                  </span>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="input-group">
                      <label for="address" class="input-group-text">
                        {{ $t("addCustomer.form.addressLabel") }}
                      </label>
                      <input
                        type="text"
                        v-model="customer.address"
                        id="address"
                        class="form-control bg-opacity-50"
                        :placeholder="$t('addCustomer.form.addressPlaceholder')"
                        aria-label="address"
                        required
                      />
                    </div>
                    <span class="errorInput" v-if="allErrors?.address">
                      {{ allErrors?.address }}
                    </span>
                  </div>
                </div>

                <div class="input-group flex-nowrap">
                  <label for="phone" class="input-group-text">{{
                    $t("addCustomer.form.phoneLabel")
                  }}</label>
                  <input
                    name="phone"
                    v-model="customer.phone"
                    @input="validatePhone"
                    class="form-control bg-opacity-50"
                    id="phone"
                    :placeholder="$t('addCustomer.form.phonePlaceholder')"
                    required
                  />
                </div>
                <span class="errorInput" v-if="allErrors?.phone">
                  {{ allErrors?.phone }}
                </span>
                <p v-if="phoneError" class="errorInput p-2">
                  {{ $t("addCustomer.form.phoneError") }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="router.push({ name: 'customer' })"
            >
              {{ $t("addCustomer.modal.close") }}
            </button>
            <button
              type="submit"
              :disabled="phoneError"
              class="btn btn-primary"
            >
              {{ $t("addCustomer.modal.save") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <SuccessModal valid="Ok" />

  <div>
    <vue-loading
      :active="isLoading"
      :can-cancel="true"
      @on-cancel="cancelLoading"
    />
  </div>
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
const storeGlobaly = globalyStore();
const route = useRoute();
const store = storeCustomer();
const customer = store.customer;
const errors = ref([]);
const allErrors = ref();
const isLoading = ref(false);
onMounted(() => {
  isLoading.value = true;
  const modal = new Modal(document.getElementById("exampleModal"));
  modal.show();
  isLoading.value = false;
});

const phoneError = ref("");

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  if (!regex.test(customer.phone)) {
    phoneError.value = t("addCustomer.form.phoneError");
  } else {
    phoneError.value = false;
  }
};

const newCustomer = async () => {
  try {
    isLoading.value = true;
    await store.addCustomer();
    isLoading.value = false;
    await storeGlobaly.MessageModalSuccess(
      t("addCustomer.messages.success"),
      t("addCustomer.messages.creationTitle")
    );
    store.customer.name = "";
    store.customer.address = "";
    store.customer.phone = "";

    router.push({ name: "customer" });
    const modalElement = document.getElementById("exampleModal");
    const modalInstance = Modal.getInstance(modalElement);
    modalInstance.hide();
  } catch (error) {
    const err = error.response.data.errors;
    errors.value = [...err];
    allErrors.value = errors.value.reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
    // await storeGlobaly.MessageModalDenied(
    //   allErrors,
    //   t("addCustomer.messages.errorTitle")
    // );
    // router.push({ name: "customer" });
    isLoading.value = false;

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
.errorInput {
  color: red;
  font-size: 11px;
  margin-left: 15px;
  margin-top: 0px;
  padding-top: 0;
}
</style>
