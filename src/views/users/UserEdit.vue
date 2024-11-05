<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4 fw-bold">{{ $t("userAdd.title") }}</h4>
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
          <p v-if="phoneError" class="text-danger">{{ phoneError }}</p>
        </div>

        <!-- Mot de passe -->
        <div class="mb-3">
          <label for="password" class="form-label">{{
            $t("userAdd.password")
          }}</label>
          <input
            type="password"
            v-model="user.password"
            id="password"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.passwordPlaceholder')"
            aria-label="Mot de passe"
            required
          />
        </div>

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
            {{ $t("userAdd.submit") }}
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

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  phoneError.value = !regex.test(user.value.phone)
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
    globalyStore().MessageModalDenied(
      t("userEdit.errorMessage"),
      "Modification utilisateur"
    );
    console.error(error.message);
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
</style>
