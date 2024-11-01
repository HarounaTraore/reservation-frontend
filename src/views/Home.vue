<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import BtnSideBar from "../components/Button.vue";
import { storeAuth } from "../stores/storeAuth.js";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const routeActif = computed(() => route.path);
const store = storeAuth();
const { t } = useI18n();
const isNavbarCollapsed = ref(false);

const toggleNavbar = () => {
  isNavbarCollapsed.value = !isNavbarCollapsed.value;
};

const activeButton = ref("");
function setActiveButton(button) {
  activeButton.value = button;
}
</script>

<template>
  <div class="container-fluid p-0">
    <!-- Navbar -->
    <nav class="navbar d-flex align-items-center justify-content-between bg-white px-4 py-2 shadow-sm border-bottom">
      <!-- Left Section: Toggle Button for Sidebar -->

      <button @click="toggleNavbar" class="btn btn-toggle-navbar me-3">
        <i :class="isNavbarCollapsed ? 'fa fa-bars' : 'fa fa-times'"></i>
      </button>

      <!-- Navigation Buttons on Desktop -->
      <div class="nav-buttons d-none d-md-flex align-items-center">
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-home"
          title="Dashboard"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'dashboard' }"
          @click="() => { setActiveButton('dashboard'); router.push({ name: 'dashboard' }) }"
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-building"
          title="Salles"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'room' }"
          @click="() => { setActiveButton('room'); router.push({ name: 'room' }) }"
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-users"
          title="Clients"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'customer' }"
          @click="() => { setActiveButton('customer'); router.push({ name: 'customer' }) }"
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-calendar-check"
          title="Réservations"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'reservation' }"
          @click="() => { setActiveButton('reservation'); router.push({ name: 'list-reservation' }) }"
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-user-cog"
          title="Utilisateurs"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'user' }"
          @click="() => { setActiveButton('user'); router.push({ name: 'user' }) }"
        />
      </div>

      <!-- Right Section: Profile Image and Username -->
      <div class="d-flex align-items-center">
        <img
          src="../../public/user-profil.svg"
          alt="User Profile"
          class="rounded-circle me-2"
          width="40"
        />
        <span class="fw-bold user-name d-none d-md-inline">{{ store.userActif?.name }}</span>
        
      </div>
    </nav>

    <!-- Collapsed Navigation Buttons on Mobile -->
    <div v-if="isNavbarCollapsed" class="nav-buttons-mobile bg-white p-3 d-md-none">
      <BtnSideBar
        btn-active="my-2"
        icon="fas fa-home"
        title="Dashboard"
        :class="{ active: activeButton === 'dashboard' }"
        @click="() => { setActiveButton('dashboard'); router.push({ name: 'dashboard' }) }"
      />
      <BtnSideBar
        btn-active="my-2"
        icon="fas fa-building"
        title="Salles"
        :class="{ active: activeButton === 'room' }"
        @click="() => { setActiveButton('room'); router.push({ name: 'room' }) }"
      />
      <BtnSideBar
        btn-active="my-2"
        icon="fas fa-users"
        title="Clients"
        :class="{ active: activeButton === 'customer' }"
        @click="() => { setActiveButton('customer'); router.push({ name: 'customer' }) }"
      />
      <BtnSideBar
        btn-active="my-2"
        icon="fas fa-calendar-check"
        title="Réservations"
        :class="{ active: activeButton === 'reservation' }"
        @click="() => { setActiveButton('reservation'); router.push({ name: 'list-reservation' }) }"
      />
      <BtnSideBar
        btn-active="my-2"
        icon="fas fa-user-cog"
        title="Utilisateurs"
        :class="{ active: activeButton === 'user' }"
        @click="() => { setActiveButton('user'); router.push({ name: 'user' }) }"
      />
    </div>

    <!-- Main Content -->
    <div class="body-content">
      <div class="container">
        <h5 class="mb-0 fw-bold">{{ routeActif }}</h5>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
}

.btn-toggle-navbar {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.user-name {
  font-size: 1rem;
}

.nav-buttons {
  gap: 1rem;
}

.nav-buttons-mobile {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.body-content {
  margin-top: 70px;
  padding: 20px;
  transition: margin-top 0.3s;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: row;
    justify-content: space-between;
    height: auto;
  }

  .nav-buttons {
    display: none;
  }

  .user-name {
    display: none;
  }

  .body-content {
    padding: 10px;
  }
}
</style>
