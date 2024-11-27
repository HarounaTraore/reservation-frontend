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
        <div class="mb-3 pwd-container">
          <label for="password" class="form-label">{{
            t("login.passwordLabel")
          }}</label>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            v-model="storeLogin.user.password"
            class="form-control"
            :placeholder="t('login.passwordPlaceholder')"
            required
          />
          <span
            class="toggle-password"
            style="position: absolute; top: 38px; right: 15px; cursor: pointer"
            @click="togglePasswordVisibility"
          >
            <i
              :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </span>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <router-link
            :to="{ name: 'forgot-pwd' }"
            class="text-decoration-none"
            >{{ t("login.forgotPassword") }}</router-link
          >
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
  
  <div>
    <vue-loading
      :active="isLoading"
      :can-cancel="true"
      @on-cancel="cancelLoading"
      :height="175"
    />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import SuccessModal from "@/components/MessageModal.vue";
import { storeAuth } from "@/stores/storeAuth";
import router from "@/router";
import { globalyStore } from "@/stores/storeGlobaly";
import { computed, ref } from "vue";

const savedUserActif = computed(() =>
  JSON.parse(localStorage.getItem("userActif"))
);
const savedUserActifData = savedUserActif.value;

const { t } = useI18n();
const storeLogin = storeAuth();
const storeGlobaly = globalyStore();
const isLoading = ref(false);
const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const login = async () => {
  try {
    isLoading.value = true;
    const { data } = await storeLogin.login();
    isLoading.value = false;

    if (data.token.user.status === true) {
      await storeGlobaly.MessageModalSuccess("Connexion réussie", "Connexion");
      router.push({ name: "dash" });
    } else {
      await storeGlobaly.MessageModalDenied(
        "Votre Compte à été bloqué",
        "Connexion"
      );
      localStorage.removeItem("userActif");
    }
  } catch (error) {
    const msgErr = error.response.data;
    await storeGlobaly.MessageModalDenied(msgErr.error, "Connexion");
    isLoading.value = false;

  }
};
</script>

<style scoped>
.cont-parent {
  height: 90vh;
}
.pwd-container {
  position: relative;
}
</style>
