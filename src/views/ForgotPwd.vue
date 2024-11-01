<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4">Réinitialisation</h4>
      <form @submit.prevent="forget">
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
        <!-- <div class="mb-3">
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
        </div> -->

        <button type="submit" class="btn btn-primary w-100">Envoyer</button>
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
const forget = async () => {
  try {
    const result = await storeLogin.forgotPwd();
    console.log("FORGOT", result);
    
    if (result) {
      await storeGlobaly.MessageModalSuccess(
        "Code de Réinitiation de mot de passe a été en voyer veuillez verifier votre email.",
        "Envoie d'Email"
      );

      router.push({ name: "login" });
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Cet Email n'est pas associé à un compte.",
      "Réinitialisation"
    );
  }
};
</script>

<style scoped>
.cont-parent {
  height: 90vh;
}
</style>
