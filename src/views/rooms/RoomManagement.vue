<template>
  <div class="container-fluid">
    <div class="row h-100 flex-column flex-md-row">
      <div class="p-4 pt-1">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="mb-0 fw-bold">{{ routeActif }}</h5>
        </div>

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
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 mb-3">
            <RouterLink
              class="text-decoration-none text-black"
              :to="{ name: 'list-room' }"
            >
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-building"></i>
                  <h6 class="mt-2">Toutes les Salles</h6>
                  <p class="display-6">{{ rooms.length }}</p>
                </div>
              </div>
            </RouterLink>
          </div>

          <div class="col-12 col-sm-6 col-md-4 mb-3">
            <RouterLink class="text-decoration-none text-black">
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-people"></i>
                  <h6 class="mt-2">Salles Réservées</h6>
                  <p class="display-6">{{ store.roomsReserved.length }}</p>
                </div>
              </div>
            </RouterLink>
          </div>

          <div class="col-12 col-sm-6 col-md-4 mb-3">
            <RouterLink class="text-decoration-none text-black">
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-check-circle"></i>
                  <h6 class="mt-2">Salles Non Réservées</h6>
                  <p class="display-6">{{ store.roomNoReserved.length }}</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
        <AddRoom />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { storeRoom } from "@/stores/storeRoom";
import { computed, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import AddRoom from "./RoomModal.vue";

const route = useRoute();
const router = useRouter();
const store = storeRoom();

const routeActif = route.path;
const rooms = computed(() => {
  return store.rooms;
});

onMounted(() => {
  store.loadingData();
});
</script>
  
  <style scoped>
   .card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
.nav-link.active {
  background-color: #e9ecef;
  font-weight: bold;
}

.card {
  border: none;
  overflow-y: inherit;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.card-body {
  padding: 1.5rem;
}

.bi-building {
  font-size: 2rem;
  color: #6f42c1;
}

.bi-people {
  font-size: 2rem;
  color: #f7b924;
}

.bi-check-circle {
  font-size: 2rem;
  color: #28a745;
}

@media (max-width: 767px) {
  .col-sm-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .col-md-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
  