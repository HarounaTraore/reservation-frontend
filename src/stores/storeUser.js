import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export const storeUser = defineStore("user", () => {
  const savedUserActif = computed(() =>
    JSON.parse(localStorage.getItem("userActif"))
  );
  

  const user = ref({
    id: null,
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    status: "",
    role: "",
  });
  const users = ref([]);

  const loadingData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:3000/api/users", {
        headers: { Authorization: `Bearer ${savedUserActif.value.token}` },
      });
      const result = data.data.result;
      users.value = [...result];
    } catch (error) {
      throw error;
    }
  };

  const addUser = async () => {

    try {
      const result = await axios.post(
        "http://127.0.0.1:3000/api/user",
        {
          name: user.value.name,
          email: user.value.email,
          address: user.value.address,
          phone: user.value.phone,
          password: user.value.password,
          role: user.value.role,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.value.token}` } }
      );
      
      await loadingData();
      return;
    } catch (error) {
      throw error;
    }
  };
  const findUser = async (id) => {
    try {
      const result = await axios.get(`http://127.0.0.1:3000/api/user/${id}`, {
        headers: { Authorization: `Bearer ${savedUserActif.value.token}` },
      });
      user.value.name = result.data.result.name;
      user.value.email = result.data.result.email;
      user.value.address = result.data.result.address;
      user.value.phone = result.data.result.phone;
      user.value.status = result.data.result.status;
      user.value.role = result.data.result.role;
      console.log(user.value);

      await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const updateUser = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/user/${id}`,
        {
          name: user.value.name,
          email: user.value.email,
          address: user.value.address,
          phone: user.value.phone,
          password: user.value.password,
          status: !!user.value.status,
          role: user.value.role,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.value.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };
  const updateCurrentUser = async (name, email, address, phone) => {
    console.log(savedUserActif.value.token);

    try {
      const result = await axios.put(
        "http://127.0.0.1:3000/api/user-current",
        {
          name,
          email,
          address,
          phone,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.value.token}` } }
      );
      // await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const updatePwdCurrentUser = async (oldPassword, newPassword) => {
    try {
      const result = await axios.put(
        "http://127.0.0.1:3000/api/user-password",
        {
          oldPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.value.token}` } }
      );
      // await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(
        `http://127.0.0.1:3000/api/user/${id}`,
        {
          headers: { Authorization: `Bearer ${savedUserActif.value.token}` },
        }
      );
      await loadingData();

      return result;
    } catch (error) {
      throw error;
    }
  };

  const resetDataUser = () => {
    user.value.name = "";
    user.value.email = "";
    user.value.address = "";
    user.value.phone = "";
    user.value.password = "";
    user.value.role = "";
  };

  return {
    user,
    users,
    loadingData,
    addUser,
    deleteUser,
    findUser,
    resetDataUser,
    updateUser,
    updateCurrentUser,
    updatePwdCurrentUser,
    savedUserActif,
  };
});
