<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4">{{ t("login.title") }}</h4>
      <form @submit.prevent="">
        <div class="mb-3">
          <label for="email" class="form-label">{{
            t("login.emailLabel")
          }}</label>
          <input
            type="email"
            id="email"
            class="form-control"
            :placeholder="t('login.emailPlaceholder') "
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">{{ t('login.passwordLabel') }}</label>
          <input
            type="password"
            id="password"
            class="form-control"
            :placeholder=" t('login.passwordPlaceholder') "
            required
          />
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <a href="#" class="text-decoration-none">{{ t('login.forgotPassword') }}</a>
        </div>
        <button type="submit" class="btn btn-primary w-100">{{ t('login.signInBtn') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n()
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}
</style>
