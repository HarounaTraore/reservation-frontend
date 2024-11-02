<template>
  <div class="container">
    <h2 class="text-center mt-4 fw-bold">{{ $t("userAdd.title") }}</h2>
    <form @submit.prevent="addUser" class="mt-3">
      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="name" class="input-group-text">{{ $t("userAdd.name") }}</label>
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

      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="email" class="input-group-text">{{ $t("userAdd.email") }}</label>
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

      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="address" class="input-group-text">{{ $t("userAdd.address") }}</label>
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

      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="phone" class="input-group-text">{{ $t("userAdd.phone") }}</label>
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

      <div class="input-group col-12 mb-3">
        <label for="password" class="input-group-text">{{ $t("userAdd.password") }}</label>
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

      <div class="input-group col-12 mb-3">
        <label for="role" class="input-group-text">{{ $t("userAdd.role") }}</label>
        <select
          v-model="user.role"
          id="role"
          class="form-select"
          required
        >
          <option value="">{{ $t("userAdd.selectRole") }}</option>
          <option value="Admin">{{ $t("userAdd.admin") }}</option>
          <option value="Manager">{{ $t("userAdd.manager") }}</option>
        </select>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary" :disabled="phoneError">
          {{ $t("userAdd.submit") }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancel">
          {{ $t("userAdd.cancel") }}
        </button>
      </div>
    </form>
  </div>
  <MessageModal />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeUser } from "@/stores/storeUser";
import { globalyStore } from "@/stores/storeGlobaly";
import MessageModal from "@/components/MessageModal.vue";

const router = useRouter();
const store = storeUser();
const user = store.user
const phoneError = ref(false);
const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  phoneError.value = !regex.test(user.value.phone)
    ? "Le numéro de téléphone doit comporter 8 chiffres et commencer par 2, 3 ou 4."
    : false;
};

const addUser = async () => {
  try {
    await store.addUser();
    globalyStore().MessageModalSuccess($t("userAdd.successMessage"), "Création");
    router.push({ name: "user" });
  } catch (error) {
    globalyStore().MessageModalDenied($t("userAdd.errorMessage"), "Création utilisateur");
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
