<template>
          <div class="added w-100 d-flex justify-content-end mb-3">
          <button
            class="btn btn-primary fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="store.reserDataRoom"
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
        <th scope="col" class="text-center responsive-hide">capacity</th>
        <th scope="col" class="text-center responsive-hide">status</th>
        <th scope="col" class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.rooms.length === 0">
        <td colspan="4" class="text-danger text-center fw-bold">
          No Client registered
        </td>
      </tr>
      <tr v-else v-for="(room, index) in store.rooms" :key="index">
        <td class="text-center">{{ room?.id }}</td>
        <td class="text-center">{{ room.name }}</td>
        <td class="text-center responsive-hide">{{ room.capacity }}</td>
        <td
          class="text-center fw-bold responsive-hide"
          :class="room.status === 'Réservée' ? 'text-danger' : 'text-success'"
        >
          {{ room.status }}
        </td>
        <td class="text-center">
          <button
            class="btn-sm btn btn-outline-primary ms-2"
            @click="store.findRoom(room.id), router.push({ name: 'show-room' })"
          >
            <i class="fas fa-eye"></i>
          </button>
          <button
            class="btn-sm btn btn-outline-secondary ms-2"
            @click="
              store.findRoom(room.id),
                router.push({ name: 'edit-room', params: { id: room.id } })
            "
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="btn-sm btn btn-outline-danger ms-2"
            @click="deleteRoom(room.id)"
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <RoomModal />
  <MessageModal valid=" OK" />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
import { globalyStore } from "@/stores/storeGlobaly";
import { storeRoom } from "@/stores/storeRoom";
import { onMounted } from "vue";
import RoomModal from "./RoomModal.vue";
import { useRouter } from "vue-router";
const store = storeRoom();
const router = useRouter();
onMounted(async () => {
  await store.loadingData();
});

const storeGlobaly = globalyStore();
const deleteRoom = async (id) => {
  if (confirm("Etes vous sur de vouloir supprimer ?")) {
    try {
      await store.deleteRoom(id);
      await storeGlobaly.MessageModalSuccess(
        "Salle supprimer avec succès",
        "Supression"
      );
    } catch (error) {
      await storeGlobaly.MessageModalDenied(
        "Cette salle est ratacher à des reservation",
        "Erreur de supression"
      );
      console.log(error);
    }
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