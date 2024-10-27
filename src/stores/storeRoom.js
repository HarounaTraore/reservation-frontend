import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export const storeRoom = defineStore("room", () => {
  const savedUserActif = JSON.parse(localStorage.getItem("userActif"));

  const room = ref({
    name: "",
    capacity: "",
    status: "",
    equipment: "",
  });
  const rooms = ref([]);
  const tableIterable = ref("");
  const roomsReserved = computed(() => {
    return rooms.value.filter((room) => room.status === "Réservée");
  });
  const roomNoReserved = computed(() => {
    return rooms.value.filter((room) => room.status === "Non Réservée");
  });

  const loadingData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:3000/api/rooms", {
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      });
      const result = data.data.result;
      rooms.value = [...result];
    } catch (error) {
      throw error;
    }
  };
  const addRoom = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:3000/api/room",
        {
          name: room.value.name,
          capacity: room.value.capacity,
          equipment: room.value.equipment,
          status: room.value.status,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };

  const updateRoom = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/room/${id}`,
        {
          name: room.value.name,
          capacity: room.value.capacity,
          equipment: room.value.equipment,
          status: room.value.status,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };

  const findRoom = async (id) => {
    try {
      const result = await axios.get(`http://127.0.0.1:3000/api/room/${id}`, {
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      });
      room.value.id = result.data.result.id;
      room.value.name = result.data.result.name;
      room.value.capacity = result.data.result.capacity;
      room.value.equipment = result.data.result.equipment;
      room.value.status = result.data.result.status;
      room.value.userId = result.data.result.userId;

      await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const deleteRoom = async (id) => {
    try {
      const result = await axios.delete(
        `http://127.0.0.1:3000/api/room/${id}`,
        {
          headers: { Authorization: `Bearer ${savedUserActif.token}` },
        }
      );
      await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const reserDataRoom = ()=>{
    room.value.id = ""
    room.value.name = ""
    room.value.capacity = ""
    room.value.equipment = ""
    room.value.status = ""
    room.value.userId = ""
  }
  return {
    rooms,
    room,
    roomsReserved,
    roomNoReserved,
    loadingData,
    addRoom,
    findRoom,
    tableIterable,
    reserDataRoom,
    updateRoom,
    deleteRoom,
  };
});
