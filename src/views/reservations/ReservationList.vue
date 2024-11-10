<template>
  <div class="container mt-3 ms-2 w-auto d-flex justify-content-end mb-2">
    <button
      class="btn btn-primary me-3 fw-bold"
      @click="store.resetData(), router.push({ name: 'add-reservation' })"
    >
      <i class="fa fa-plus me-1"></i>
      {{ t("reservationList.newReservation") }}
    </button>
  </div>
  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center text-truncate">
          {{ t("reservationList.startDate") }}
        </th>
        <th scope="col" class="text-center text-truncate">
          {{ t("reservationList.endDate") }}
        </th>
        <th scope="col" class="responsive-hide text-truncate">
          {{ t("reservationList.room") }}
        </th>
        <th scope="col" class="responsive-hide text-truncate">
          {{ t("reservationList.client") }}
        </th>
        <th scope="col" class="responsive-hide text-truncate">Statut</th>
        <th scope="col" class="text-center">
          {{ t("reservationList.actions") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.reservations.length === 0">
        <td colspan="7" class="text-danger text-center fw-bold">
          {{ $t("reservationList.noReservation") }}
        </td>
      </tr>
      <tr v-else v-for="(reservation, index) in sortedReservation" :key="index">
        <td class="text-center">{{ reservation?.id }}</td>
        <td class="text-center">{{ formatDateTime(reservation.dateStart) }}</td>
        <td class="text-center">{{ formatDateTime(reservation.dateEnd) }}</td>
        <td class="responsive-hide">{{ reservation.room.name }}</td>
        <td class="responsive-hide">{{ reservation.customer.name }}</td>
        <td class="responsive-hide">
          <select
            v-model="reservation.status"
            :disabled="
              reservation.status === 'CONFIRMED' ||
              new Date(reservation.dateEnd) < new Date()
            "
            @click="store.updateStatus(reservation.id, reservation.status)"
            :style="
              reservation.status == 'CONFIRMED'
                ? 'color: #008000'
                : reservation.status == 'CANCELED'
                ? 'color: #ff0000'
                : ''
            "
            id="status"
            class="form-select bg-opacity-50"
            required
          >
            <option value="CONFIRMED">
              {{ t("reservationAdd.confirmed") }}
            </option>
            <option value="PENDING">{{ t("reservationAdd.pending") }}</option>
            <option value="CANCELED">{{ t("reservationAdd.canceled") }}</option>
          </select>
        </td>
        <td class="text-center">
          <button
            class="btn-sm btn btn-outline-primary ms-2"
            @click="
              store.findReservation(reservation.id),
                router.push({ name: 'show-reservation' })
            "
          >
            <i class="fas fa-eye"></i>
          </button>
          <button
          :disabled="
              reservation.status === 'CONFIRMED' ||
              new Date(reservation.dateEnd) < new Date()
            "
            class="btn-sm btn btn-outline-secondary ms-2"
            @click="editReservation(reservation.id)"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            @click="destroyReservation(reservation.id)"

            class="btn-sm btn btn-outline-danger ms-2"
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <customerModal />
  <MessageModal valid="OK" />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
import { storeReservation } from "@/stores/storeReservation";
import { globalyStore } from "@/stores/storeGlobaly";
import { computed, onMounted } from "vue";
import { useDateTimeFormatter } from "./useDateForatter";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { formatDateTime } = useDateTimeFormatter();
const store = storeReservation();
const storeGlobaly = globalyStore();
const router = useRouter();

const editReservation = async (id) => {
  await store.findReservation(id);
  router.push({ name: "edit-reservation", params: { id } });
};

onMounted(async () => {
  await store.loadingData();
});
const sortedReservation = computed(() => {
  return [...store.reservations].sort((a, b) => b.id - a.id);
});
const destroyReservation = async (id) => {
  try {
    if (confirm(t("reservationList.confirmDelete"))) {
      await store.deleteReservation(id);
      await storeGlobaly.MessageModalSuccess(
        t("reservationList.deleteSuccess"),
        t("reservationList.deleteTitle")
      );
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      t("reservationList.deleteError"),
      t("reservationList.deleteTitle")
    );
    console.log(error);
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
