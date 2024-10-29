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
const router = useRouter();

const changeLanguage = (event) => {
  locale.value = event.target.value;
};

</script>

<template>
  <div class="container-fluid p-0 m-0 d-flex">
    <div class="body w-100">
      <header
        
  class="header border-bottom bg-white border-1 container-fluid d-flex justify-content-between m-0 align-items-center"
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

          <div class="right d-flex">
            <select
              name="language"
              id="language"
              class="form-select border border-0 m-lg-4"
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
.header {
  height: 60px; 
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
