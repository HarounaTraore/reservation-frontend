import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import RoomManagement from "@/views/rooms/RoomManagement.vue";
import AddRoom from "@/views/rooms/RoomModal.vue";
import NotFound from "@/views/NotFound.vue";
import RoomList from "@/views/rooms/RoomList.vue";
import RoomShow from "@/views/rooms/RoomShow.vue";
import RoomEdit from "@/views/rooms/RoomEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/dashbord",
      name: "home",
      component: Home,
    },
    {
      path: "/room",
      name: "room",
      component: RoomManagement,
    },
    {
      path: "/room/add",
      name: "add-room",
      component: AddRoom,
    },
    {
      path: "/room/list",
      name: "list-room",
      component: RoomList,
    },
    {
      path: "/room/show",
      name: "show-room",
      component: RoomShow,
    },
    {
      path: "/room/edit/:id",
      name: "edit-room",
      component: RoomEdit,
    },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

export default router;
