<template>
  <div
    class="container cont-parent d-flex justify-content-center m-auto align-items-center"
  >
    <div class="card p-4 shadow w-100" style="max-width: 600px">
      <h4 class="text-center mb-4 fw-bold">Modification des Informations</h4>
      <form @submit.prevent="editUser">
        <!-- Nom -->
        <div class="mb-3">
          <label for="name" class="form-label">{{ $t("userAdd.name") }}</label>
          <input
            type="text"
            v-model="user.name"
            id="name"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.namePlaceholder')"
            aria-label="Nom de l'utilisateur"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">{{
            $t("userAdd.email")
          }}</label>
          <input
            type="email"
            v-model="user.email"
            id="email"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.emailPlaceholder')"
            aria-label="Email de l'utilisateur"
            required
          />
        </div>

        <!-- Adresse -->
        <div class="mb-3">
          <label for="address" class="form-label">{{
            $t("userAdd.address")
          }}</label>
          <input
            type="text"
            v-model="user.address"
            id="address"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.addressPlaceholder')"
            aria-label="Adresse de l'utilisateur"
            required
          />
        </div>

        <!-- Téléphone -->
        <div class="mb-3">
          <label for="phone" class="form-label">{{
            $t("userAdd.phone")
          }}</label>
          <input
            type="text"
            v-model="user.phone"
            id="phone"
            class="form-control bg-opacity-50"
            :placeholder="$t('userAdd.phonePlaceholder')"
            @input="validatePhone"
            aria-label="Téléphone de l'utilisateur"
            required
          />
          <p v-if="phoneError" class="text-danger">{{ phoneError }}</p>
        </div>

        <!-- Boutons d'envoi et d'annulation -->
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
  name: store.user.name,
  email: store.user.email,
  address: store.user.address,
  phone: store.user.phone,
});

const phoneError = ref(false);

const validatePhone = () => {
  const regex = /^[234]\d{7}$/;
  phoneError.value = !regex.test(user.value.phone)
    ? "Le numéro de téléphone doit comporter 8 chiffres et commencer par 2, 3 ou 4."
    : false;
};
const editUser = async () => {
  try {
    await store.updateCurrentUser(
      user.value.name,
      user.value.email,
      user.value.address,
      user.value.phone
    );
    globalyStore().MessageModalSuccess(
      t("userEdit.successMessage"),
      "Modification"
    );
    router.push({ name: "dash" });
  } catch (error) {
    globalyStore().MessageModalDenied(
      t("userEdit.errorMessage"),
      "Modification utilisateur"
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
