<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import BtnSideBar from "../components/Button.vue";
import { storeAuth } from "../stores/storeAuth.js";
import router from "@/router";
import { RouterView } from "vue-router";

const store = storeAuth();
const { t } = useI18n();
const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const activeButton = ref("");
function setActiveButton(button) {
  activeButton.value = button;
}
</script>

<template>
  <div class="container-fluid p-0 m-0 d-flex">
    <div
      v-if="store.userActif?.name"
      :class="[
        'sid-bar',
        'p-2',
        'border-end',
        'bg-white',
        'd-flex',
        'flex-column',
        { collapsed: isSidebarCollapsed }
      ]"
    >
      <button @click="toggleSidebar" class="btn btn-toggle-sidebar">
        <i :class="isSidebarCollapsed ? 'fa fa-arrow-right' : 'fa fa-arrow-left'"></i>
      </button>

      <div class="d-flex lin align-items-center mt-4">
        <img
          src="../../public/user-profil.svg"
          alt="User"
          class="rounded-circle mt-2 me-2"
          :width="!isSidebarCollapsed ? 30 : 40"
          :style="isSidebarCollapsed ? 'margin: auto' : 0"
        />
        <span class="fw-bold" v-if="!isSidebarCollapsed">{{ store.userActif?.name }}</span>
      </div>

      <!-- Boutons de la sidebar -->
      <BtnSideBar
        btn-active="mt-3 text-truncate p-auto"
        icon="'fa fa-solid fa-chart-line p-0"
        title="Dash Bord"
        :hiden-title="!isSidebarCollapsed"
        :class="{ active: activeButton === 'dash' }"
        @click="() => { setActiveButton('dash'); router.push({ name: 'dashboard' }) }"
      />
      <BtnSideBar
        btn-active="mt-3 text-truncate p-auto"
        icon="'bi bi-building p-0"
        title="Gestion des Salles"
        :hiden-title="!isSidebarCollapsed"
        :class="{ active: activeButton === 'room' }"
        @click="() => { setActiveButton('room'); router.push({ name: 'room' }) }"
      />
      <BtnSideBar
        btn-active="mt-3 text-truncate p-auto"
        icon="fa-solid fa-users-line p-0"
        title="Gestion des Clients"
        :hiden-title="!isSidebarCollapsed"
        :class="{ active: activeButton === 'customer' }"
        @click="() => { setActiveButton('customer'); router.push({ name: 'customer' }) }"
      />
      <BtnSideBar
        btn-active="mt-3 p-auto"
        icon="'fa fa-solid fa-users d-flex justify-content-between p-0"
        title="Réservations"
        :hiden-title="!isSidebarCollapsed"
        :class="{ active: activeButton === 'reservation' }"
        @click="() => { setActiveButton('reservation'); router.push({ name: 'list-reservation' }) }"
      />
      <BtnSideBar
        btn-active="mt-3 p-auto"
        icon="'fa fa-solid fa-users d-flex justify-content-between p-0"
        title="Utilisateurs"
        :hiden-title="!isSidebarCollapsed"
        :class="{ active: activeButton === 'user' }"
        @click="() => { setActiveButton('user'); router.push({ name: 'user' }) }"
      />
    </div>

    <!-- Contenu principal -->
    <div class="body w-100">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.sid-bar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  transition: width 0.5s;
  z-index: 100;
  overflow: hidden;
}

.sid-bar.collapsed {
  width: 80px;
}

.btn-toggle-sidebar {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
}

.body {
  margin-left: 250px;
  padding-top: 15px;
  transition: margin-left 0.5s;
}

.sid-bar.collapsed + .body {
  margin-left: 80px;
}
</style>
