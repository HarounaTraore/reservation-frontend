<template>
  <RoomModal
    is-disabled="true"
    action-close="router.push({ name: 'room' })"
  />
</template>

<script setup>
import { onMounted } from "vue";
import RoomModal from "./RoomAdd.vue";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useRouter } from "vue-router";
onMounted(() => {
  const modal = new Modal(document.getElementById("exampleModal"));
  modal.show();
});
const router = useRouter();
</script>

<style scoped>
</style>