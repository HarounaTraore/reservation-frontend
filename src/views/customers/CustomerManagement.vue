<template>
  <div class="container-fluid">
    <h1 class="text-center fs-4 fw-bold mb-0">Liste des Clients</h1>
  </div>
  <div
    class="container-fluid mt-3 p-0 w-auto d-flex justify-content-between mb-2"
  >
    <div class="w-25">
      <input
        type="text"
        class="form-control w bg-opacity-50 w-75"
        v-model="nameCustomer"
        placeholder="Recherche un client"
      />
    </div>
    <button
      class="btn btn-primary fw-bold"
      @click="router.push({ name: 'add-customer' }, store.reserDataCustomer())"
    >
      <i class="fa fa-plus me-1"></i>
      {{ t("customerList.newCustomer") }}
    </button>
  </div>
  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="">{{ $t("customerList.name") }}</th>
        <th scope="col" class="responsive-hide">
          {{ t("customerList.address") }}
        </th>
        <th scope="col" class="text-center responsive-hide">
          {{ t("customerList.phone") }}
        </th>
        <th scope="col" class="text-center">
          {{ t("customerList.actions") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.customers.length === 0">
        <td colspan="4" class="text-danger text-center fw-bold">
          {{ $t("customerList.noClient") }}
        </td>
      </tr>
      <tr v-else v-for="(customer, index) in sortedCustomers" :key="index">
        <td class="text-center">{{ customer?.id }}</td>
        <td>{{ customer.name }}</td>
        <td class="responsive-hide">{{ customer.address }}</td>
        <td class="responsive-hide text-center">{{ customer.phone }}</td>
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
import { storeCustomer } from "@/stores/storeCustomer";
import { globalyStore } from "@/stores/storeGlobaly";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const store = storeCustomer();
const storeGlobaly = globalyStore();
const nameCustomer = ref("");
onMounted(async () => {
  store.loadingData(nameCustomer.value);
});
watch(nameCustomer, async (newValue) => {
  await store.loadingData(newValue);
});
const router = useRouter();

const destroyCustomer = async (id) => {
  try {
    if (confirm(t("customerList.deleteConfirm"))) {
      await store.deleteCustomer(id);
      await storeGlobaly.MessageModalSuccess(
        t("customerList.deleteSuccess"),
        t("customerList.delete")
      );
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      t("customerList.deleteError"),
      t("customerList.delete")
    );
  }
};
const sortedCustomers = computed(() => {
  return [...store.customers].sort((a, b) => b.id - a.id);
});
</script>

<style scoped>
@media (max-width: 650px) {
  .responsive-hide {
    transition: width 0.5s;
    display: none;
  }
}
</style>
