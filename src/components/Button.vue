<script setup>

defineProps({
  icon: String,
  title:{
    type: String,
    required: true
  },
  btnActive: String,
  action: String,
  hidenTitle: String,
  color: String,
  textColor: String

})
</script>


  <template>
  <button
    class="btn btn-light w-100 text-center p-0 m-0 d-flex align-items-center"
    :class="btnActive" :onclick="action"
    :style="`color: ${color} ;` "
  >
  <i class=" fs-5" :style="`color: ${color} ; margin: ${!hidenTitle ? 'auto' : 0};` "  :class=" icon "></i>
    <span class=" ms-1" :style="`color: ${textColor} ;` " v-if="hidenTitle">{{ title }}</span>
  </button>

  <!-- <button class="btn btn-light w-100 text-start d-flex align-items-center mt-2">
      <i class="bi bi-building me-2"></i>
      <span class="text-dark">Gestion des réservations</span>
    </button> -->
</template>

<style scoped>
.active-button {
  background-color: #f1f7ff;
  border: 1px solid #d1e7ff;
}

.active-button .text-primary {
  color: #2b6cb0;
}

.btn {
  border-radius: 5px;
}
</style>


