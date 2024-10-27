<script setup>
import { onMounted, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import BtnSideBar from "./components/Button.vue";
import { storeAuth } from "./stores/storeAuth.js";

const store = storeAuth();
const { t } = useI18n();
const { locale } = useI18n();
const isSidebarCollapsed = ref(false);
const router = useRouter()

const changeLanguage = (event) => {
  locale.value = event.target.value;
};
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<template>
  <div class="container-fluid p-0 m-0 d-flex">
    <div
      v-if="store.userActif?.name"
      :class="[
        'sticky-top',
        'sid-bar',
        'p-2',
        'border-end',
        'bg-white',
        'd-flex',
        'flex-column',
        { collapsed: isSidebarCollapsed },
      ]"
    >
      <div class="d-flex align-items-center">
        <img
          src="../public/user-profil.svg"
          alt="User"
          class="rounded-circle mt-2 me-2"
          :width="!isSidebarCollapsed ? 30 : 40"
          :style="isSidebarCollapsed ? 'margin: auto' : 0"
        />
        <span class="fw-bold" v-if="!isSidebarCollapsed">{{
          store.userActif?.name
        }}</span>
      </div>

      <BtnSideBar
        btn-active="mt-3 p-auto"
        icon="'fa fa-solid fa-chart-line  p-0"
        color="#FD0D8F"
        title="Dash Bord"
        :hiden-title="!isSidebarCollapsed"
      />
      <BtnSideBar
        btn-active="mt-3 p-auto"
        color="#6f42c1"
        icon="'bi bi-building p-0"
        title="Gestion des Salles"
        :hiden-title="!isSidebarCollapsed"
        @click="router.push({name: 'room'})"
      />
      <BtnSideBar
        btn-active="mt-3 p-auto"
        icon="fa-solid fa-users-line   p-0"
        title="Gestion des Cients"
        :hiden-title="!isSidebarCollapsed"
      />
      <BtnSideBar
        btn-active="mt-3 p-auto"
        icon="'fa fa-solid fa-users  d-flex justify-content-between p-0"
        title="Réservations"
        :hiden-title="!isSidebarCollapsed"
      />
      <BtnSideBar
        btn-active="mt-3 p-auto"
        icon="'fa fa-solid fa-users d-flex justify-content-between p-0"
        title="Utilisateurs"
        :hiden-title="!isSidebarCollapsed"
      />
    </div>

    <div class="body w-100">
      <header
        class="sticky-top border-bottom bg-white border-1 container-fluid d-flex justify-content-between m-0 align-items-center"
      >
        <nav
          class="container-fluid w-100 align-items-center p-0 m-0 d-flex justify-content-between"
        >
          <div
            class="left m-0 p-0 d-flex justify-content-between align-items-center"
            @click="toggleSidebar"
          >
            <img
              src="@/assets/icons/logo.png"
              :width="!isSidebarCollapsed ? 30 : 40"
              class="p-0 me-2 m-0"
              :class="isSidebarCollapsed ? 'me-2' : 0"
              :alt="t('header.logo')"
            />
            <span v-if="!isSidebarCollapsed" class="p-lg-3 p-0 m-0 fw-bold"
              >Spark λ</span
            >
          </div>

          <div class="right d-flex  ">
            <select
              name="language"
              id="language"
              class="form-select  border border-0 m-lg-4"
              @change="changeLanguage"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </nav>
      </header>

      <div class="body overflow-y-auto container-fluid m-auto p-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sid-bar {
  transition: width 0.5s;
  height: 100vh;
  width: 250px;
}
.sid-bar.collapsed {
  width: 80px;
}
</style>
