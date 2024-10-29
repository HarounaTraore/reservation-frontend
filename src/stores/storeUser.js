import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export const storeUser = defineStore("user", () => {
  const savedUserActif = JSON.parse(localStorage.getItem("userActif"));

  const user = ref({
    id: null,
    name: "",
    address: "",
    phone: "",
    userId: "",
  });
  const users = ref([]);

  const loadingData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:3000/api/users", {
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      });
      const result = data.data.result;
      users.value = [...result];
    } catch (error) {
      throw error;
    }
  };
  // const adduser = async () => {
  //   console.log("ADED user");

  //   try {
  //     const result = await axios.post(
  //       "http://127.0.0.1:3000/api/user",
  //       {
  //         name: user.value.name,
  //         address: user.value.address,
  //         phone: user.value.phone,
  //       },
  //       { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
  //     );
  //     console.log(result);
  //     await loadingData();
  //     return;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  // const finduser = async (id) => {
  //   try {
  //     const result = await axios.get(
  //       `http://127.0.0.1:3000/api/user/${id}`,
  //       {
  //         headers: { Authorization: `Bearer ${savedUserActif.token}` },
  //       }
  //     );
  //     user.value.id = result.data.result.id;
  //     user.value.address = result.data.result.address;
  //     user.value.phone = result.data.result.phone;
  //     user.value.userId = result.data.result.userId;
  //     user.value.name = result.data.result.name;

  //     await loadingData();
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  // const updateuser = async (id) => {
  //   try {
  //     await axios.put(
  //       `http://127.0.0.1:3000/api/user/${id}`,
  //       {
  //         name: user.value.name,
  //         address: user.value.address,
  //         phone: user.value.phone,
  //       },
  //       { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
  //     );
  //     await loadingData();
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const deleteuser = async (id) => {
  //   try {
  //     const result = await axios.delete(
  //       `http://127.0.0.1:3000/api/user/${id}`,
  //       {
  //         headers: { Authorization: `Bearer ${savedUserActif.token}` },
  //       }
  //     );
  //     await loadingData();
  //     console.log(result);
      
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };


  return {
    user,
    users,
    loadingData,
   
  };
});
