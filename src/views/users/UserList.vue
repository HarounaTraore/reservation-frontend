<template>
  <div class="container-fluid">
    <h1 class="text-center fs-4 fw-bold mb-0">Liste des Utilisateurs</h1>
  </div>
  <div class="container-fluid mt-3 p-0 w-auto d-flex justify-content-end mb-2">
    <button
      class="btn btn-primary fw-bold"
      @click="store.resetDataUser(), router.push({ name: 'add-user' })"
    >
      <i class="fa fa-plus me-1"></i>
      {{ $t("userList.newUser") }}
    </button>
  </div>
  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">{{ $t("userList.id") }}</th>
        <th scope="col" class="text-center">{{ $t("userList.name") }}</th>
        <th scope="col" class="text-center responsive-hide">
          {{ $t("userList.address") }}
        </th>
        <th scope="col" class="text-center responsive-hide">
          {{ $t("userList.phone") }}
        </th>
        <th scope="col" class="text-center responsive-hide">Statut</th>
        <th scope="col" class="text-center">{{ $t("userList.actions") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.users.length === 0">
        <td colspan="4" class="text-danger text-center fw-bold">
          {{ $t("userList.noClient") }}
        </td>
      </tr>
      <tr v-else v-for="(user, index) in store.users" :key="index">
        <td class="text-center">{{ user?.id }}</td>
        <td>{{ user.name }}</td>
        <td class="responsive-hide">{{ user.address }}</td>
        <td class="responsive-hide">{{ user.phone }}</td>
        <td class="text-center">
          <select
          class="form-select bg-opacity-50"
          :class="user.status ===false ? 'text-danger': 'text-success'"
            v-model="user.status"
            @click="store.updateStatus(user.id, user.status)"
          >
            <option :value="true" class="text-success">Actif</option>
            <option :value="false" class="text-danger">Bloqué</option>
          </select>
        </td>
        <td class="text-center">
          <button
            class="btn-sm btn btn-outline-primary ms-2"
            @click="store.findUser(user.id), router.push({ name: 'show-user' })"
          >
            <i class="fas fa-eye"></i>
          </button>
          <button
            class="btn-sm btn btn-outline-secondary ms-2"
            @click="
              store.findUser(user.id),
                router.push({
                  name: 'edit-user',
                  params: { id: user.id },
                })
            "
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            @click="destroyUser(user.id)"
            class="btn-sm btn btn-outline-danger ms-2"
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <userModal />
  <MessageModal valid=" OK" />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
import router from "@/router";
import { globalyStore } from "@/stores/storeGlobaly";
import { storeUser } from "@/stores/storeUser";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = storeUser();
const storeGlobaly = globalyStore();
onMounted(async () => {
  await store.loadingData();
});

const destroyUser = async (id) => {
  try {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      await store.deleteUser(id);
      await storeGlobaly.MessageModalSuccess(
        t("userList.deleteSuccess"),
        "Suppression"
      );
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Erreur de suppression",
      "Suppression Utilisateur"
    );
    console.log(error.message);
  }
};
</script>

<style scoped>
@media (max-width: 650px) {
  .responsive-hide {
    transition: width 0.5s;
    display: none;
  }
}
</style>
