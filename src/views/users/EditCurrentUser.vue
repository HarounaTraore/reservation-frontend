<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4 fw-bold">Modification des Informations</h4>
      <form @submit.prevent="editUser">
        <!-- Nom -->
        <div class="mb-3">
          <label for="name" class="form-label">{{ $t("userAdd.name") }}</label>
          <input
            type="text"
            v-model="user.name"
            id="name"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.namePlaceholder')"
            aria-label="Nom de l'utilisateur"
            required
          />
          <span class="errorInput" v-if="allErrors?.name">
            {{ allErrors?.name }}
          </span>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">{{
            $t("userAdd.email")
          }}</label>
          <input
            type="email"
            v-model="user.email"
            id="email"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.emailPlaceholder')"
            aria-label="Email de l'utilisateur"
            required
          />
          <span class="errorInput" v-if="allErrors?.email">
            {{ allErrors?.email }}
          </span>
        </div>

        <!-- Adresse -->
        <div class="mb-3">
          <label for="address" class="form-label">{{
            $t("userAdd.address")
          }}</label>
          <input
            type="text"
            v-model="user.address"
            id="address"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.addressPlaceholder')"
            aria-label="Adresse de l'utilisateur"
            required
          />
          <span class="errorInput" v-if="allErrors?.address">
            {{ allErrors?.address }}
          </span>
        </div>

        <!-- Téléphone -->
        <div class="mb-3">
          <label for="phone" class="form-label">{{
            $t("userAdd.phone")
          }}</label>
          <input
            type="text"
            v-model="user.phone"
            id="phone"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.phonePlaceholder')"
            @input="validatePhone"
            aria-label="Téléphone de l'utilisateur"
            required
          />
          <p v-if="phoneError" class="errorInput">{{ phoneError }}</p>
          <span class="errorInput" v-if="allErrors?.phone">
            {{ allErrors?.phone }}
          </span>
        </div>

        <!-- Boutons d'envoi et d'annulation -->
        <div class="d-flex justify-content-between">
          <button
            type="submit"
            class="btn btn-primary w-100 me-2"
            :disabled="phoneError"
          >
            Enregistrer
          </button>
          <button type="button" class="btn btn-secondary w-100" @click="cancel">
            {{ $t("userAdd.cancel") }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <MessageModal />
</template>

<script setup>
import { computed, ref, watch } from "vue";

import { storeUser } from "@/stores/storeUser";
import { globalyStore } from "@/stores/storeGlobaly";
import MessageModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const store = storeUser();

const currentUser = computed(() =>
  JSON.parse(localStorage.getItem("userActif"))
);
const currentUserData = currentUser.value;

const user = ref({
  email: currentUserData.email,
  name: currentUserData.name,
  address: currentUserData.address,
  phone: currentUserData.phone,
});

const errors = ref([]);
const allErrors = ref();

const phoneError = ref(false);

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  phoneError.value = !regex.test(user.value.phone)
    ? "Le numéro de téléphone doit comporter 8 chiffres et commencer par 2, 3 ou 4."
    : false;
};
const editUser = async () => {
  try {
    await store.updateCurrentUser(
      user.value.name,
      user.value.email,
      user.value.address,
      user.value.phone
    );

    globalyStore().MessageModalSuccess(
      t("userEdit.successMessage"),
      "Modification"
    );
    router.push({ name: "login" });
    localStorage.removeItem("userActif");
    
  } catch (error) {
    errors.value = error.response.data.errors;
    if (errors.value) {
      allErrors.value = errors.value.reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
    }
  }
};

const cancel = () => {
  router.push({ name: "dash" });
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
.errorInput {
  color: red;
  font-size: 11px;
  margin-left: 15px;
  margin-top: 0px;
  padding-top: 0;
}
</style>
