<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4">Réinitialisation</h4>
      <form v-if="!reset" @submit.prevent="forget">
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

        <button type="submit" class="btn btn-primary w-100">Envoyer</button>
      </form>

      <form v-else @submit.prevent="resetPwd">
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
          <label for="otp" class="form-label">Code</label>
          <input
            type="text"
            id="otp"
            v-model="storeLogin.user.codeOtp"
            class="form-control"
            placeholder="Code de Réinitialisation "
            required
          />
        </div>
        <div class="mb-3">
          <label for="newPassword" class="form-label"
            >Nouveau mot de passe</label
          >
          <input
            type="password"
            id="newPassword"
            v-model="storeLogin.user.newPassword"
            class="form-control"
            placeholder="Nouveau Mot de Passe"
            required
          />
        </div>
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
import { ref } from "vue";
const { t } = useI18n();
const storeLogin = storeAuth();
const storeGlobaly = globalyStore();
const reset = ref(false);
const forget = async () => {
  try {
    const result = await storeLogin.forgotPwd();
    console.log("FORGOT", result);

    if (result) {
      await storeGlobaly.MessageModalSuccess(
        "Code de Réinitiation de mot de passe a été en voyer veuillez verifier votre email.",
        "Envoie d'Email"
      );
      reset.value = true;
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Cet Email n'est pas associé à un compte.",
      "Réinitialisation"
    );
  }
};
const resetPwd = async () => {
  try {
    const result = await storeLogin.resetPwd();
    if (result) {
    }
    await storeGlobaly.MessageModalSuccess(
      "Votre mot de passe est réinitialisé.",
      "Réinitialisation"
    );
    router.push({ name: "login" });
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Erreur de Réinitialisation veuillez réssayer.",
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
