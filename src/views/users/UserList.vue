<template>
  <div class="container mt-3 ms-2 w-auto d-flex justify-content-end mb-2">
    <button
      class="btn btn-primary me-3 fw-bold"
      @click="store.resetDataUser(), router.push({ name: 'add-user' })"
    >
      <i class="fa fa-plus me-1"></i>
      Nouveau Utilisateur
    </button>
  </div>
  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center">name</th>
        <th scope="col" class="text-center responsive-hide">address</th>
        <th scope="col" class="text-center responsive-hide">phone</th>
        <th scope="col" class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.users.length === 0">
        <td colspan="4" class="text-danger text-center fw-bold">
          No Client registered
        </td>
      </tr>
      <tr v-else v-for="(user, index) in store.users" :key="index">
        <td class="text-center">{{ user?.id }}</td>
        <td>{{ user.name }}</td>
        <td class="responsive-hide">{{ user.address }}</td>
        <td class="responsive-hide">
          {{ user.phone }}
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

const store = storeUser();
const storeGlobaly = globalyStore();
onMounted(async () => {
  await store.loadingData();
});

const destroyUser = async (id) => {
  try {
    if (confirm("Etes-vous sur de vouloir supprimer ce clients ?"))
      await store.deleteUser(id);
    await storeGlobaly.MessageModalSuccess(
      "Client Supprimé Avec Succès",
      "Suppression"
    );
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Erreur de suppression ce client est lié à des reservations",
      "Suppression Client"
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