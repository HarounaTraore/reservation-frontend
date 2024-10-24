<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4">{{ t("login.title") }}</h4>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">{{
            t("login.emailLabel")
          }}</label>
          <input
            type="email"
            v-model="storeLogin.user.email"
            id="email"
            class="form-control"
            :placeholder="t('login.emailPlaceholder')"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">{{
            t("login.passwordLabel")
          }}</label>
          <input
            type="password"
            id="password"
            v-model="storeLogin.user.password"
            class="form-control"
            :placeholder="t('login.passwordPlaceholder')"
            required
          />
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <a href="#" class="text-decoration-none">{{
            t("login.forgotPassword")
          }}</a>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ t("login.signInBtn") }}
        </button>
      </form>
    </div>
  </div>
  <div class="div">
    <SuccessModal
      :title="dataModal.title"
      :msg="dataModal.msg"
      valid="Ok"
      :icon="dataModal.icon"
    />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import SuccessModal from "@/components/MessageModal.vue";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { storeAuth } from "@/stores/store";
import { ref } from "vue";

import successfull from "@/assets/icons/successfull.svg";
import denied from "@/assets/icons/warning.svg";
import router from "@/router";

const { t } = useI18n();
const storeLogin = storeAuth();

const dataModal = ref({
  title: t("login.title"),
  icon: null,
  msg: null,
});

const login = async () => {
  try {
    await storeLogin.login();
    dataModal.value.icon = successfull;
    dataModal.value.msg = "Connexion réussie";
    const modal = new Modal(document.getElementById("successModal"));
    modal.show();
    router.push("/home");
  } catch (error) {
    dataModal.value.icon = denied;
    dataModal.value.msg = "Erreur de connexion";
    const modal = new Modal(document.getElementById("successModal"));
    modal.show();
  }
};
// const openModal = () => {
//   const modal = new Modal(document.getElementById("successModal"));
//   modal.show();
// };
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}
</style>
