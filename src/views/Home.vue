<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import BtnSideBar from "../components/Button.vue";
import { storeAuth } from "../stores/storeAuth.js";
import router from "@/router";
import { useRoute } from "vue-router";
import { storeUser } from "../stores/storeUser";
const route = useRoute();

const store = storeAuth();
const { t } = useI18n();
const isNavbarCollapsed = ref(false);

const logOut = async () => {
  const conf = confirm("Êtes vous sûr de vouloir vous deconnecter ?");
  if (conf) {
    localStorage.removeItem("userActif");
    router.push({ name: "login" });
  }
};

const toggleNavbar = () => {
  isNavbarCollapsed.value = !isNavbarCollapsed.value;
};

const savedUserActif = computed(() =>
  JSON.parse(localStorage.getItem("userActif"))
);
const savedUserActifData = savedUserActif.value;
const id = Number(savedUserActifData.id);

const activeButton = ref("");
function setActiveButton(button) {
  activeButton.value = button;
}
</script>

<template>
  <div class="container-fluid p-0" v-if="savedUserActif">
    <nav
      class="navbar d-flex align-items-center justify-content-between bg-white px-4 py-2 shadow-sm border-bottom"
    >
      <button @click="toggleNavbar" class="btn btn-toggle-navbar me-3">
        <i :class="isNavbarCollapsed ? 'fa fa-times' : 'fa fa-bars'"></i>
      </button>

      <div class="nav-buttons d-none d-md-flex align-items-center">
        <BtnSideBar
          btn-active="mx-3"
          icon="fa-solid fa-gauge-high"
          :title="t('home.navbar.dashboard')"
          :hover-title="t('home.navbar.dashboard')"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'dashboard' }"
          @click="
            () => {
              setActiveButton('dashboard');
              router.push({ name: 'dashboard' });
            }
          "
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-building"
          :title="t('home.navbar.rooms')"
          :hover-title="t('home.navbar.rooms')"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'room' }"
          @click="
            () => {
              setActiveButton('room');
              router.push({ name: 'room' });
            }
          "
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-users"
          :title="t('home.navbar.clients')"
          :hover-title="t('home.navbar.clients')"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'customer' }"
          @click="
            () => {
              setActiveButton('customer');
              router.push({ name: 'customer' });
            }
          "
        />
        <BtnSideBar
          btn-active="mx-3"
          icon="fas fa-calendar-check"
          :hover-title="t('home.navbar.reservations')"
          :title="t('home.navbar.reservations')"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'reservation' }"
          @click="
            () => {
              setActiveButton('reservation');
              router.push({ name: 'list-reservation' });
            }
          "
        />
        <BtnSideBar
          v-if="savedUserActifData.role === 'Admin'"
          btn-active="mx-3"
          :hover-title="t('home.navbar.users')"
          icon="fas fa-user-cog"
          :title="t('home.navbar.users')"
          :hiden-title="isNavbarCollapsed"
          :class="{ active: activeButton === 'user' }"
          @click="
            () => {
              setActiveButton('user');
              router.push({ name: 'user' });
            }
          "
        />
      </div>

      <div class="d-flex p-0 m-0 align-items-center">
        <div class="btn-group profil">
          <img
            class="rounded-circle me-2 dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            src="../../public/user-profil.svg"
            alt="User Profile"
            width="30"
          />
          <ul class="dropdown-menu">
            <li>
              <button
                class="dropdown-item"
                @click="router.push({ name: 'edit-current-user' })"
              >
                <i class="fas fa-edit"></i>
                Profil
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="logOut">
                <i class="fa-solid fa-right-from-bracket"></i>
                Deconnexion
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                @click="router.push({ name: 'edit-current-user-pwd' })"
              >
                <i class="fa-solid fa-lock"></i>
                Mot de passe
              </button>
            </li>
          </ul>
        </div>
        <span class="fw-bold user-name d-none d-md-inline">{{
          savedUserActifData.name
        }}</span>
        <button class="btn" @click="logOut">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile navigation -->
    <div
      v-if="isNavbarCollapsed"
      class="nav-buttons-mobile bg-white p-3 d-md-none"
    >
      <BtnSideBar
        btn-active="my-2"
        icon="fas fa-home"
        :title="t('home.navbar.dashboard')"
        :class="{ active: activeButton === 'dashboard' }"
        @click="
          () => {
            setActiveButton('dashboard');
            router.push({ name: 'dashboard' });
          }
        "
      />
    </div>

    <div class="body-content">
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
.profil:hover {
  cursor: pointer;
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
