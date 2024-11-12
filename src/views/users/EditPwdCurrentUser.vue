<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4 fw-bold">Modification du mot de passe</h4>
      <form @submit.prevent="editUser">
        <div class="mb-3 position-relative">
          <label for="oldpwd" class="form-label">Encien mot de passe</label>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="user.oldPassword"
            id="old-pwd"
            class="form-control bg-opacity-50"
            placeholder="Votre encien mot de passe"
            aria-label="encien mot de passe"
            required
          />
          <span class="errorInput" v-if="errors">
            {{ errors }}
          </span>
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
        <div class="mb-3 position-relative">
          <label for="new-pwd" class="form-label">Nouveau mot de passe</label>
          <input
            :type="isNewPasswordVisible ? 'text' : 'password'"
            v-model="user.newPassword"
            id="address"
            class="form-control bg-opacity-50"
            placeholder="Votre nouveau mot de passe"
            aria-label="Nouveau mot de passe"
            required
          />
          <span class="errorInput" v-if="allErrors">
            {{ allErrors }}
          </span>
          <span
            class="toggle-password"
            style="position: absolute; top: 38px; right: 15px; cursor: pointer"
            @click="toggleNewPasswordVisibility"
          >
            <i
              :class="isNewPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </span>
        </div>

        <div class="d-flex justify-content-between">
          <button
            type="submit"
            class="btn btn-primary w-100 me-2"
            :disabled="phoneError"
          >
            Enregistrer
          </button>
          <button type="button" class="btn btn-secondary w-100" @click="cancel">
            {{ $t("userAdd.cancel") }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <MessageModal />
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeUser } from "@/stores/storeUser";
import { globalyStore } from "@/stores/storeGlobaly";
import MessageModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";

const errors = ref();
const allErrors = ref();

const isPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const toggleNewPasswordVisibility = () => {
  isNewPasswordVisible.value = !isNewPasswordVisible.value;
};
const { t } = useI18n();
const router = useRouter();
const store = storeUser();
const user = ref({
  oldPassword: "",
  newPassword: "",
});

const editUser = async () => {
  try {
    const result = await store.updatePwdCurrentUser(
      user.value.oldPassword,
      user.value.newPassword
    );
    if (result) {
      globalyStore().MessageModalSuccess(
        t("Votre mot de passe a été modifié avec succès"),
        "Modification"
      );
      router.push({ name: "dash" });
    }
  } catch (error) {
    const err = error.response.data;
    if (err.error) {
      errors.value = computed(() => err.error);
    } else {
      errors.value = "";
    }

    if (err.errors) {
      allErrors.value = computed(() => err.errors[0].msg);
    } else {
      allErrors.value = "";
    }
  }
};

const cancel = () => {
  router.push({ name: "dash" });
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
.errorInput {
  color: red;
  font-size: 11px;
  margin-left: 15px;
  margin-top: -10px;
  padding-top: 0;
}
</style>
