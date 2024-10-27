<script setup>

</script>

<template>
 <div class="d-flex justify-content-center align-items-center height">
  <form class="container form-control py-4 w-100">
    <div class="d-flex flex-column align-items-center">
      <div class="mb-3 w-100">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">name</span>
          <input
            type="text"
            id="username"
            class="form-control bg-opacity-50"
            placeholder="Nom d'utilisateur"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>
    </div>
  </form>
</div>

</template>

<style scoped>
.height{
    height: 70vh;
}
</style>
