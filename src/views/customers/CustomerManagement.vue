<template>
  <div class="container mt-3 ms-2 w-auto d-flex justify-content-end mb-2">
    <button
      class="btn btn-primary me-3 fw-bold"
      @click="router.push({ name: 'add-customer' })"
    >
      <i class="fa fa-plus me-1"></i>
      Nouvelle Salle
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
      <tr v-if="store.customers.length === 0">
        <td colspan="4" class="text-danger text-center fw-bold">
          No Client registered
        </td>
      </tr>
      <tr v-else v-for="(customer, index) in store.customers" :key="index">
        <td class="text-center">{{ customer?.id }}</td>
        <td>{{ customer.name }}</td>
        <td class="responsive-hide">{{ customer.address }}</td>
        <td class="responsive-hide">
          {{ customer.phone }}
        </td>
        <td class="text-center">
          <button
            class="btn-sm btn btn-outline-primary ms-2"
            @click="
              store.findCustomer(customer.id),
                router.push({ name: 'show-customer' })
            "
          >
            <i class="fas fa-eye"></i>
          </button>
          <button
            class="btn-sm btn btn-outline-secondary ms-2"
            @click="
              store.findCustomer(customer.id),
                router.push({
                  name: 'edit-customer',
                  params: { id: customer.id },
                })
            "
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            @click="destroyCustomer(customer.id)"
            class="btn-sm btn btn-outline-danger ms-2"
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <customerModal />
  <MessageModal valid=" OK" />
</template>
  
  <script setup>
import MessageModal from "@/components/MessageModal.vue";
import router from "@/router";
import { storeCustomer } from "@/stores/storeCustomer";
import { globalyStore } from "@/stores/storeGlobaly";
import { onMounted } from "vue";
const store = storeCustomer();
const storeGlobaly = globalyStore();
onMounted(async () => {
  await store.loadingData();
});


const destroyCustomer = async (id) => {
  try {
    if (confirm("Etes-vous sur de vouloir supprimer ce clients ?"))
      await store.deleteCustomer(id);
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