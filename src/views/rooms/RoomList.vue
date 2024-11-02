<template>
  <div class="added w-100 d-flex justify-content-end mb-3">
    <button
      class="btn btn-primary fw-bold"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="store.reserDataRoom"
    >
      <i class="fa fa-plus me-1"></i>
      {{ $t("roomList.addRoom") }}
    </button>
  </div>

  <table class="table table-striped table-bordered m-auto">
    <thead>
      <tr>
        <th scope="col" class="text-center">{{ $t("roomList.table.id") }}</th>
        <th scope="col" class="text-center">{{ $t("roomList.table.name") }}</th>
        <th scope="col" class="text-center responsive-hide">{{ $t("roomList.table.capacity") }}</th>
        <th scope="col" class="text-center responsive-hide">{{ $t("roomList.table.status") }}</th>
        <th scope="col" class="text-center">{{ $t("roomList.table.actions") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="store.rooms.length === 0">
        <td colspan="5" class="text-danger text-center fw-bold">
          {{ $t("roomList.noRooms") }}
        </td>
      </tr>
      <tr v-else v-for="(room, index) in store.rooms" :key="index">
        <td class="text-center">{{ room?.id }}</td>
        <td class="text-center">{{ room.name }}</td>
        <td class="text-center responsive-hide">{{ room.capacity }}</td>
        <td
          class="text-center fw-bold responsive-hide"
          :class="room.status === $t('roomList.statusReserved') ? 'text-danger' : 'text-success'"
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
  <MessageModal valid="OK" />
</template>

<script setup>
import MessageModal from "@/components/MessageModal.vue";
import { globalyStore } from "@/stores/storeGlobaly";
import { storeRoom } from "@/stores/storeRoom";
import { onMounted } from "vue";
import RoomModal from "./RoomAdd.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const store = storeRoom();
const router = useRouter();

onMounted(async () => {
  await store.loadingData();
});

const storeGlobaly = globalyStore();
const deleteRoom = async (id) => {
  if (confirm(t("roomList.deleteConfirm"))) {
    try {
      await store.deleteRoom(id);
      await storeGlobaly.MessageModalSuccess(
        t("roomList.deleteSuccess"),
        t("roomList.deleteErrorTitle")
      );
    } catch (error) {
      await storeGlobaly.MessageModalDenied(
        t("roomList.deleteError"),
        t("roomList.deleteErrorTitle")
      );
    }
  }
};
</script>

<style scoped>
@media (max-width: 650px) {
  .responsive-hide {
    display: none;
  }
}
</style>
