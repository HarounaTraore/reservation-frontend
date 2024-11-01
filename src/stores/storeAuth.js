import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const storeAuth = defineStore("login", () => {
  const user = ref({
    email: "",
    password: "",
  });
  const savedUserActif = JSON.parse(localStorage.getItem("userActif"));

  const userActif = ref({
    token: savedUserActif?.token,
    id: savedUserActif?.id,
    name: savedUserActif?.name,
    status: savedUserActif?.status,
  });

  const login = async () => {
    try {
      const result = await axios.post("http://127.0.0.1:3000/api/login/", {
        email: user.value.email,
        password: user.value.password,
      });
      const token = result.data.token;
      localStorage.setItem(
        "userActif",
        JSON.stringify({
          token: token.token,
          ...token.user,
        })
      );

      return result;
    } catch (error) {
      throw error;
    }
  };
  const forgotPwd = async () => {
    try {
      const result = await axios.post(
        "http://127.0.0.1:3000/api/forgot-password",
        {email: user.value.email}
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
  return { login, user, userActif, forgotPwd };
});
