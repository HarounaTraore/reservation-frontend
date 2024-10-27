
<template>
  <div
    class="modal fade"
    id="successModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center">
        <div class="modal-header border-0">
          <div class="modal-title w-100">
            <i
              v-if="storeGlobaly.dataModal.icon"
              :class="storeGlobaly.dataModal.icon"
              style="font-size: 50px"
            ></i>
          </div>
        </div>
        <div class="modal-body">
          <h5 class="modal-title mb-2">{{ storeGlobaly.dataModal.title }}</h5>
          <p>{{ storeGlobaly.dataModal.msg }}</p>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button
            type="button"
            class="btn w-50 btn-primary"
            data-bs-dismiss="modal"
            @click="resetData"
          >
            {{ valid }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { globalyStore } from "@/stores/storeGlobaly";
import { onMounted } from "vue";
const storeGlobaly = globalyStore();

const props = defineProps({
  valid: {
    type: String,
    default: "0k",
  },
});

const resetData = async () => {
  storeGlobaly.dataModal.icon = "";
  storeGlobaly.dataModal.msg = "";
  storeGlobaly.dataModal.title = "";
};
onMounted(() => {});
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
</style>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
