import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export const storeCustomer = defineStore("customer", () => {
  const savedUserActif = JSON.parse(localStorage.getItem("userActif"));

  const customer = ref({
    id: null,
    name: "",
    address: "",
    phone: "",
    userId: "",
  });
  const customers = ref([]);

  const loadingData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:3000/api/customers", {
        headers: { Authorization: `Bearer ${savedUserActif.token}` },
      });
      const result = data.data.result;
      customers.value = [...result];
    } catch (error) {
      throw error;
    }
  };
  const addCustomer = async () => {
    console.log("ADED CUSTOMER");

    try {
      const result = await axios.post(
        "http://127.0.0.1:3000/api/customer",
        {
          name: customer.value.name,
          address: customer.value.address,
          phone: customer.value.phone,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      console.log(result);
      await loadingData();
      return;
    } catch (error) {
      throw error;
    }
  };
  const findCustomer = async (id) => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:3000/api/customer/${id}`,
        {
          headers: { Authorization: `Bearer ${savedUserActif.token}` },
        }
      );
      customer.value.id = result.data.result.id;
      customer.value.address = result.data.result.address;
      customer.value.phone = result.data.result.phone;
      customer.value.userId = result.data.result.userId;
      customer.value.name = result.data.result.name;

      await loadingData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const updateCustomer = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:3000/api/customer/${id}`,
        {
          name: customer.value.name,
          address: customer.value.address,
          phone: customer.value.phone,
        },
        { headers: { Authorization: `Bearer ${savedUserActif.token}` } }
      );
      await loadingData();
    } catch (error) {
      throw error;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const result = await axios.delete(
        `http://127.0.0.1:3000/api/customer/${id}`,
        {
          headers: { Authorization: `Bearer ${savedUserActif.token}` },
        }
      );
      await loadingData();
      console.log(result);
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const reserDataCustomer = () => {
    customer.value.id = "";
    customer.value.name = "";
    customer.value.capacity = "";
    customer.value.equipment = "";
    customer.value.status = "";
    customer.value.userId = "";
  };
  return {
    customer,
    customers,
    loadingData,
    addCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer,
  };
});
