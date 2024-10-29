<template>
  <div class="container mt-3 ms-2 w-auto d-flex justify-content-end mb-2">
    <button
      class="btn btn-primary me-3 fw-bold"
      @click="router.push({ name: 'add-reservation' })"
    >
      <i class="fa fa-plus me-1"></i>
      Nouvelle Réservation
    </button>
  </div>
  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center text-truncate">Date de Début</th>
        <th scope="col" class="text-center text-truncate">Date de Fin</th>
        <th scope="col" class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.reservations.length === 0">
        <td colspan="7" class="text-danger text-center fw-bold">
          Aucune réservation enregistrée
        </td>
      </tr>
      <tr
        v-else
        v-for="(reservation, index) in store.reservations"
        :key="index"
      >
        <td class="text-center">{{ reservation?.id }}</td>
        <td class="text-center">{{ formatDateTime(reservation.dateStart) }}</td>
        <td class="text-center">{{ formatDateTime(reservation.dateEnd) }}</td>
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
            class="btn-sm btn btn-outline-secondary ms-2"
            @click="
              store.findReservation(reservation.id),
                router.push({
                  name: 'edit-reservation',
                  params: { id: reservation.id },
                })
            "
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
  <MessageModal valid=" OK" />
</template>
  
  <script setup>
import MessageModal from "@/components/MessageModal.vue";
import router from "@/router";
import { storeReservation } from "@/stores/storeReservation"; 
import { globalyStore } from "@/stores/storeGlobaly";
import { onMounted } from "vue";
import { useDateTimeFormatter } from "./useDateForatter";
const { formatDateTime } = useDateTimeFormatter();
const store = storeReservation();
const storeGlobaly = globalyStore();

onMounted(async () => {
  await store.loadingData();
});

const destroyReservation = async (id) => {
  try {
    if (confirm("Etes-vous sûr de vouloir supprimer cette réservation ?")) {
      await store.deleteReservation(id);
      await storeGlobaly.MessageModalSuccess(
        "Réservation Supprimée Avec Succès",
        "Suppression"
      );
    }
  } catch (error) {
    await storeGlobaly.MessageModalDenied(
      "Erreur de suppression : cette réservation est liée à un client ou à une salle.",
      "Suppression Réservation"
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
  