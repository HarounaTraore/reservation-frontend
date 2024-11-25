<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4 fw-bold">{{ $t("userEdit.title") }}</h4>
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
          <p v-if="phoneError" class="errorInput pt-3">{{ phoneError }}</p>
          <span class="errorInput" v-if="allErrors?.phone">
            {{ allErrors?.phone }}
          </span>
        </div>

        <!-- Mot de passe -->
        <!-- <div class="mb-3 position-relative">
          <label for="password" class="form-label">{{
            $t("userAdd.password")
          }}</label>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="user.password"
            id="password"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.passwordPlaceholder')"
            aria-label="Mot de passe"
            required
          />
          <span class="errorInput" v-if="allErrors?.password">
            {{ allErrors?.password }}
          </span>
          <span
            class="toggle-password"
            style="position: absolute; top: 38px; right: 15px; cursor: pointer"
            @click="togglePasswordVisibility"
          >
            <i
              :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </span>
        </div> -->

        <div class="mb-3">
          <label for="role" class="form-label">{{ $t("userAdd.role") }}</label>
          <select
            v-model="user.role"
            id="role"
            class="form-select bg-opacity-50"
            required
          >
            <option value="">{{ $t("userAdd.selectRole") }}</option>
            <option value="Admin">{{ $t("userAdd.admin") }}</option>
            <option value="Manager">{{ $t("userAdd.manager") }}</option>
          </select>
        </div>

        <!-- Boutons d'envoi et d'annulation -->
        <div class="d-flex justify-content-between">
          <button
            type="submit"
            class="btn btn-primary w-100 me-2"
            :disabled="phoneError"
          >
            Enregirstrer
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeUser } from "@/stores/storeUser";
import { globalyStore } from "@/stores/storeGlobaly";
import MessageModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const store = storeUser();
const user = store.user;
const phoneError = ref(false);
const errors = ref([]);
const allErrors = ref();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  phoneError.value = !regex.test(user.phone)
    ? "Le numéro de téléphone doit comporter 8 chiffres et commencer par 2, 3 ou 4."
    : false;
};
const id = useRoute().params.id;
const editUser = async () => {
  try {
    await store.updateUser(id);
    globalyStore().MessageModalSuccess(
      t("userEdit.successMessage"),
      "Modification"
    );
    router.push({ name: "user" });
  } catch (error) {
    errors.value = error.response.data.errors;
    allErrors.value = errors.value.reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
  }
};

const cancel = () => {
  router.push({ name: "user" });
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
  margin-top: -10px;
  padding-top: 0;
}
</style>
