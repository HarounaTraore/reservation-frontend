<script setup>
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const { locale } = useI18n();

const changeLanguage = (event) => {
  locale.value = event.target.value;
};
</script>
<template>
  <div class="container-fluid">
    <header>
      <nav>
        <select name="language" id="language" class="form-select" @change="changeLanguage">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
        </select>
      </nav>
    </header>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
