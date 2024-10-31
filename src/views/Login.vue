<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
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
    <SuccessModal />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import SuccessModal from "@/components/MessageModal.vue";
import { storeAuth } from "@/stores/storeAuth";
import router from "@/router";
import { globalyStore } from "@/stores/storeGlobaly";

const { t } = useI18n();
const storeLogin = storeAuth();
const storeGlobaly = globalyStore();
const login = async () => {
  try {
    await storeLogin.login();
    await storeGlobaly.MessageModalSuccess("Connexion réussie", "Connexion");

    router.push("reservation/");
  } catch (error) {
    await storeGlobaly.MessageModalDenied("Erreur de connexion", "Connexion");
  }
};
</script>

<style scoped>
.cont-parent {
  height: 90vh;
}
</style>
