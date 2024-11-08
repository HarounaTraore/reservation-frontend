<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 400px">
      <h4 class="text-center mb-4 fw-bold">Modification du mot de passe</h4>
      <form @submit.prevent="editUser">
        <div class="mb-3">
          <label for="oldpwd" class="form-label">Encien mot de passe</label>
          <input
            type="password"
            v-model="user.oldPassword"
            id="old-pwd"
            class="form-control bg-opacity-50"
            placeholder="Votre encien mot de passe"
            aria-label="encien mot de passe"
            required
          />
        </div>
        <div class="mb-3">
          <label for="new-pwd" class="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            v-model="user.newPassword"
            id="address"
            class="form-control bg-opacity-50"
            placeholder="Votre nouveau mot de passe"
            aria-label="Nouveau mot de passe"
            required
          />
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeUser } from "@/stores/storeUser";
import { globalyStore } from "@/stores/storeGlobaly";
import MessageModal from "@/components/MessageModal.vue";
import { useI18n } from "vue-i18n";

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
    }else {
      throw new Error("Erreur de de modification")
    }
  } catch (error) {
    globalyStore().MessageModalDenied(
      t("Erreur de modification, veuillez verifier les informations saisis"),
      "Modification Mot de passe"
    );
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
</style>
