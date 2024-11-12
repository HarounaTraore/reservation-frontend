<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4">{{ t("forgotPwd.title") }}</h4>
      <form v-if="!reset" @submit.prevent="forget">
        <div class="mb-3">
          <label for="email" class="form-label">{{
            t("forgotPwd.emailLabel")
          }}</label>
          <input
            type="email"
            v-model="storeLogin.user.email"
            id="email"
            class="form-control"
            :placeholder="t('forgotPwd.emailPlaceholder')"
            required
          />
          <span class="errorInput" v-if="errors?.error">
            {{ errors?.error }}
          </span>
        </div>

        <button type="submit" class="btn btn-primary w-100">
          {{ t("forgotPwd.sendButton") }}
        </button>
      </form>

      <form v-else @submit.prevent="resetPwd">
        <div class="mb-3">
          <label for="email" class="form-label">{{
            t("forgotPwd.emailLabel")
          }}</label>
          <input
            type="email"
            v-model="storeLogin.user.email"
            id="email"
            class="form-control"
            :placeholder="t('forgotPwd.emailPlaceholder')"
            required
          />
        </div>

        <div class="mb-3">
          <label for="otp" class="form-label">{{
            t("forgotPwd.otpLabel")
          }}</label>
          <input
            type="text"
            id="otp"
            v-model="storeLogin.user.codeOtp"
            class="form-control"
            :placeholder="t('forgotPwd.otpPlaceholder')"
            required
          />

        </div>
        <div class="mb-3 pwd-container password-container">
          <label for="newPassword" class="form-label">{{
            t("forgotPwd.newPasswordLabel")
          }}</label>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            id="newPassword"
            v-model="storeLogin.user.newPassword"
            class="form-control pwd-container"
            :placeholder="t('forgotPwd.newPasswordPlaceholder')"
            required
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <i
              :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </span>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ t("forgotPwd.sendButton") }}
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
import { ref } from "vue";
const { t } = useI18n();
const storeLogin = storeAuth();
const storeGlobaly = globalyStore();

const errors = ref([]);
const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const reset = ref(false);
const forget = async () => {
  try {
    const result = await storeLogin.forgotPwd();

    if (result) {
      await storeGlobaly.MessageModalSuccess(
        t("forgotPwd.forgotSuccessMessage"),
        t("forgotPwd.emailSendTitle")
      );
      reset.value = true;
    }
  } catch (error) {
    errors.value = error.response.data;
  }
};
const resetPwd = async () => {
  try {
    const result = await storeLogin.resetPwd();
    if (result) {
      await storeGlobaly.MessageModalSuccess(
        t("forgotPwd.passwordResetSuccess"),
        t("forgotPwd.resetTitle")
      );
      router.push({ name: "login" });
    }
  } catch (error) {
    errors.value = error.response.data.error;
    await storeGlobaly.MessageModalDenied(
      t(errors.value),
      t("forgotPwd.resetTitle")
    );
  }
};
</script>

<style scoped>
.cont-parent {
  height: 90vh;
}
.errorInput {
  color: red;
  font-size: 11px;
  margin-left: 15px;
  margin-top: 0px;
  padding-top: 0;
}
.pwd-container {
  position: relative;
}


.toggle-password {
  position: absolute;
  top: 38px;
  right: 15px;
  cursor: pointer;
}
</style>
