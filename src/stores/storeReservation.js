import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import { useDateTimeFormatter } from "@/views/reservations/useDateForatter";

export const storeReservation = defineStore("reservation", () => {
  const savedUserActif = JSON.parse(localStorage.getItem("userActif"));
  const { formatDateTime } = useDateTimeFormatter();
  const reservation = ref({
    dateReservation: "",
    dateStart: "",
    dateEnd: "",
    userName: "",
    status: "",
    roomId: "",
    roomName:"",
    customerId: "",
    customerName:"",
    timeStart: "",
    timeEnd: "",
  });

  const dateStart = computed(() =>
    reservation.value.dateStart && reservation.value.timeStart
      ? new Date(
          `${reservation.value.dateStart}T${reservation.value.timeStart}`
        ).toISOString()
      : new Date().toISOString()
  );

  const dateEnd = computed(() =>
    reservation.value.dateEnd && reservation.value.timeEnd
      ? new Date(
          `${reservation.value.dateEnd}T${reservation.value.timeEnd}`
        ).toISOString()
      : new Date().toISOString()
  );
  const reservations = ref([]);
  const roomsNotReserved = ref([]);
  const loadingData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:3000/api/reservations", {
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      });
      const result = data.data.result;
      reservations.value = [...result];
    } catch (error) {
      throw error;
    }
  };

  const addReservation = async () => {
    try {
      const resp = await axios.post(
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
          status: reservation.value.status,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
      return resp.data.response;
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
          status: reservation.value.status,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };

  const findRoomsNotReserved = async () => {
    const data = await axios.get(
      "http://127.0.0.1:3000/api/rooms/not-reserved",
      {
        params: { dateStart: dateStart.value, dateEnd: dateEnd.value },
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      }
    );
    const result = data.data.result;
    roomsNotReserved.value = [...result];
    console.log("ROOM NOT RESERVED", roomsNotReserved.value);

    return result;
  };
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/reservation-status/${id}`,
        {
          status: status,
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
      reservation.value.status = result.data.result.status;

      reservation.value.dateStart = formatDateTime(
        result.data.result.dateStart
      );
      reservation.value.dateReservation = formatDateTime(
        result.data.result.dateReservation
      );
      reservation.value.timeStart = formatDateTime(
        result.data.result.dateStart,
        "HH:mm"
      );
      reservation.value.dateEnd = formatDateTime(result.data.result.dateEnd);
      reservation.value.timeEnd = formatDateTime(
        result.data.result.dateEnd,
        "HH:mm"
      );
      reservation.value.userName = result.data.result.user.name;
      reservation.value.roomName = result.data.result.room.name
      reservation.value.roomId = result.data.result.roomId;
      reservation.value.customerName = result.data.result.customer.name
      reservation.value.customerId = result.data.result.customerId;

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

  const resetData = async () => {
    reservation.value.dateStart = "";
    reservation.value.dateEnd = "";
    reservation.value.userName = "";
    reservation.value.status = "";
    reservation.value.roomId = "";
    reservation.value.customerId = "";
    reservation.value.timeStart = "";
    reservation.value.timeEnd = "";
  };

  return {
    reservation,
    reservations,
    loadingData,
    addReservation,
    updateReservation,
    updateStatus,
    findReservation,
    deleteReservation,
    resetData,
    findRoomsNotReserved,
    roomsNotReserved,
  };
});
