<template>
  <div class="container">
    <h2 class="text-center mt-4 fw-bold">{{ $t("userEdit.title") }}</h2>
    <form @submit.prevent="addUser" class="mt-3">
      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="name" class="input-group-text">{{ $t("userEdit.name") }}</label>
        <input
          type="text"
          v-model="user.name"
          id="name"
          class="form-control bg-opacity-50"
          :placeholder="$t('userEdit.namePlaceholder')"
          aria-label="{{ $t('userEdit.name') }}"
          required
        />
      </div>

      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="email" class="input-group-text">{{ $t("userEdit.email") }}</label>
        <input
          type="email"
          v-model="user.email"
          id="email"
          class="form-control bg-opacity-50"
          :placeholder="$t('userEdit.emailPlaceholder')"
          aria-label="{{ $t('userEdit.email') }}"
          required
        />
      </div>

      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="address" class="input-group-text">{{ $t("userEdit.address") }}</label>
        <input
          type="text"
          v-model="user.address"
          id="address"
          class="form-control bg-opacity-50"
          :placeholder="$t('userEdit.addressPlaceholder')"
          aria-label="{{ $t('userEdit.address') }}"
          required
        />
      </div>

      <div class="input-group mb-3" :class="isDisabled ? 'col-6' : 'col-12'">
        <label for="phone" class="input-group-text">{{ $t("userEdit.phone") }}</label>
        <input
          type="text"
          v-model="user.phone"
          id="phone"
          class="form-control bg-opacity-50"
          :placeholder="$t('userEdit.phonePlaceholder')"
          @input="validatePhone"
          aria-label="{{ $t('userEdit.phone') }}"
          required
        />
        <p v-if="phoneError" class="text-danger">{{ phoneError }}</p>
      </div>

      <div class="input-group col-12 mb-3">
        <label for="password" class="input-group-text">{{ $t("userEdit.password") }}</label>
        <input
          type="password"
          v-model="user.password"
          id="password"
          class="form-control bg-opacity-50"
          :placeholder="$t('userEdit.passwordPlaceholder')"
          aria-label="{{ $t('userEdit.password') }}"
          required
        />
      </div>

      <div class="input-group col-12 mb-3">
        <label for="role" class="input-group-text">{{ $t("userEdit.role") }}</label>
        <select v-model="user.role" id="role" class="form-select" required>
          <option value="">{{ $t("userEdit.selectRole") }}</option>
          <option value="Admin">{{ $t("userEdit.admin") }}</option>
          <option value="Manager">{{ $t("userEdit.manager") }}</option>
        </select>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary" :disabled="phoneError">
          {{ $t("userEdit.save") }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancel">
          {{ $t("userEdit.cancel") }}
        </button>
      </div>
    </form>
  </div>
  <MessageModal />
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeUser } from "@/stores/storeUser";
import { globalyStore } from "@/stores/storeGlobaly";
import MessageModal from "@/components/MessageModal.vue";

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
const id = Number(useRoute().params.id);
const addUser = async () => {
  try {
    await store.updateUser(id);

    globalyStore().MessageModalSuccess(
      $t("userEdit.successMessage"),
      $t("userEdit.editTitle")
    );
    router.push({ name: "user" });
  } catch (error) {
    globalyStore().MessageModalDenied(
      $t("userEdit.errorMessage"),
      $t("userEdit.editTitle")
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
