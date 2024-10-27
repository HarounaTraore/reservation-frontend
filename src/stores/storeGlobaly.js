import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { defineStore } from "pinia";
import { ref } from "vue";

export const globalyStore = defineStore("globalyStore", () => {
  const dataModal = ref({
    title: "",
    icon: "",
    msg: "",
  });
  async function MessageModalSuccess(msg, title) {
    dataModal.value.icon = "fa-regular fa-circle-check text-success";
    dataModal.value.msg = msg;
    dataModal.value.title = title;
    const modal = new Modal(document.getElementById("successModal"));
    modal.show();
  }
  async function MessageModalDenied(msg, title) {
    dataModal.value.icon = 'fa-solid fa-circle-exclamation text-danger'
    dataModal.value.msg = msg;
    dataModal.value.title = title;
    const modal = new Modal(document.getElementById("successModal"));
    modal.show();
  }

  return { MessageModalSuccess, MessageModalDenied, dataModal };
});
