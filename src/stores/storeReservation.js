import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useDateTimeFormatter } from "@/views/reservations/useDateForatter";

export const storeReservation = defineStore("reservation", () => {
  const savedUserActif = JSON.parse(localStorage.getItem("userActif"));
  const { formatDateTime } = useDateTimeFormatter();
  const reservation = ref({
    dateReservation: "",
    dateStart: "",
    dateEnd: "",
    userName: "",

    roomId: null,
    customerId: null,
    timeStart: "",
    timeEnd: "",
  });

  const reservations = ref([]);

  const loadingData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:3000/api/reservations", {
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      });
      const result = data.data.result;
      reservations.value = [
        ...result];
    } catch (error) {
      throw error;
    }
  };

  const addReservation = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:3000/api/reservation",
        {
          dateReservation: new Date(Date.now()).toISOString(),
          dateStart: new Date(
            `${reservation.value.dateStart}T${reservation.value.timeStart}`
          ),
          dateEnd: new Date(
            `${reservation.value.dateEnd}T${reservation.value.timeEnd}`
          ),
          userId: reservation.value.userId,
          roomId: reservation.value.roomId,
          customerId: reservation.value.customerId,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };

  const updateReservation = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/reservation/${id}`,
        {
          dateReservation: new Date(Date.now()).toISOString(),
          dateStart: new Date(
            `${reservation.value.dateStart}T${reservation.value.timeStart}`
          ),
          dateEnd: new Date(
            `${reservation.value.dateEnd}T${reservation.value.timeEnd}`
          ),
          userId: reservation.value.userId,
          roomId: reservation.value.roomId,
          customerId: reservation.value.customerId,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };

  const findReservation = async (id) => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:3000/api/reservation/${id}`,
        {
          headers: { Authorization: `Bearer ${savedUserActif.token}` },
        }
      );

      reservation.value.id = result.data.result.id;
      reservation.value.dateStart = formatDateTime(result.data.result.dateStart);
      reservation.value.dateReservation = formatDateTime(result.data.result.dateReservation);
      reservation.value.timeStart = formatDateTime(result.data.result.dateStart, "HH:mm");
      reservation.value.dateEnd = formatDateTime(result.data.result.dateEnd);
      reservation.value.timeEnd = formatDateTime(result.data.result.dateEnd, "HH:mm");
      reservation.value.userName = result.data.result.user.name;
      reservation.value.roomId = result.data.result.room.name;
      reservation.value.customerId = result.data.result.customer.name;
      console.log("CUSTOMER ID",reservation.customerId);
      
      console.log("RESERVATION:", reservation.value);

      await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const deleteReservation = async (id) => {
    try {
      const result = await axios.delete(
        `http://127.0.0.1:3000/api/reservation/${id}`,
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

  return {
    reservation,
    reservations,
    loadingData,
    addReservation,
    updateReservation,
    findReservation,
    deleteReservation,
  };
});
