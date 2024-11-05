<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4 fw-bold">{{ $t("userShow.title") }}</h4>
      <form @submit.prevent="editUser">
        <!-- Nom -->
        <div class="mb-3 row">
          <div class="col-md-6">
            <label for="name" class="form-label">{{
              $t("userShow.name")
            }}</label>
            <input
              type="text"
              v-model="user.name"
              id="name"
              disabled
              class="form-control bg-opacity-50"
              :placeholder="$t('userShow.namePlaceholder')"
              aria-label="Nom de l'utilisateur"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="address" class="form-label">{{
              $t("userShow.address")
            }}</label>
            <input
              type="text"
              v-model="user.address"
              id="address"
              disabled
              class="form-control bg-opacity-50"
              :placeholder="$t('userShow.addressPlaceholder')"
              aria-label="Adresse de l'utilisateur"
              required
            />
          </div>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">{{
            $t("userShow.email")
          }}</label>
          <input
            type="email"
            v-model="user.email"
            id="email"
            disabled
            class="form-control bg-opacity-50"
            :placeholder="$t('userShow.emailPlaceholder')"
            aria-label="Email de l'utilisateur"
            required
          />
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="phone" class="form-label">{{
              $t("userShow.phone")
            }}</label>
            <input
              type="text"
              v-model="user.phone"
              id="phone"
              disabled
              class="form-control bg-opacity-50"
              :placeholder="$t('userShow.phonePlaceholder')"
              aria-label="Téléphone de l'utilisateur"
              required
            />
            <p v-if="phoneError" class="text-danger">{{ phoneError }}</p>
          </div>

          <div class="col-md-6">
            <label for="role" class="form-label">{{
              $t("userShow.role")
            }}</label>
            <select
              v-model="user.role"
              id="role"
              disabled
              class="form-select bg-opacity-50"
              required
            >
              <option value="">{{ $t("userShow.selectRole") }}</option>
              <option value="Admin">{{ $t("userShow.admin") }}</option>
              <option value="Manager">{{ $t("userShow.manager") }}</option>
            </select>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-secondary w-100" @click="cancel">
            {{ $t("userShow.close") }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <MessageModal />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeUser } from "@/stores/storeUser";
import MessageModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const store = storeUser();
const user = store.user;
const phoneError = ref(false);

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  phoneError.value = !regex.test(user.phone) ? t("userShow.phoneError") : false;
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
