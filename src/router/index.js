import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import RoomManagement from "@/views/rooms/RoomManagement.vue";
import AddRoom from "@/views/rooms/RoomModal.vue";
import NotFound from "@/views/NotFound.vue";
import RoomList from "@/views/rooms/RoomList.vue";
import RoomShow from "@/views/rooms/RoomShow.vue";
import RoomEdit from "@/views/rooms/RoomEdit.vue";
import CustomerManagement from "@/views/customers/CustomerManagement.vue";
import CustomerAdd from "@/views/customers/CustomerAdd.vue";
import CustomerShow from "@/views/customers/CustomerShow.vue";
import CustomerEdit from "@/views/customers/CustomerEdit.vue";
import UserList from "@/views/users/UserList.vue";
import DashBorrd from "@/views/DashBorrd.vue";
import ReservationList from "@/views/reservations/ReservationList.vue";
import ReservationShow from "@/views/reservations/ReservationShow.vue";
import ReservationEdit from "@/views/reservations/ReservationEdit.vue";
import ReservationAdd from "@/views/reservations/ReservationAdd.vue";
import ReservationManagenemt from "@/views/reservations/ReservationManagenemt.vue";
import UserAdd from "@/views/users/UserAdd.vue";
import UserEdit from "@/views/users/UserEdit.vue";
import UserShow from "@/views/users/UserShow.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/dash",
      name: "dash",
      component: DashBorrd,
    },
    {
      path: "/dashbord",
      name: "home",
      component: Home,
      children: [
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
        {
          path: "/customer",
          name: "customer",
          component: CustomerManagement,
        },
        {
          path: "/customer/add",
          name: "add-customer",
          component: CustomerAdd,
        },
        {
          path: "/customer/show",
          name: "show-customer",
          component: CustomerShow,
        },
        {
          path: "/customer/edit/:id",
          name: "edit-customer",
          component: CustomerEdit,
        },
        {
          path: "/user",
          name: "user",
          component: UserList,
        },
        {
          path: "/user/add",
          name: "add-user",
          component: UserAdd,
        },
        {
          path: "/user/edit/:id",
          name: "edit-user",
          component: UserEdit,
        },
        {
          path: "/user/sow",
          name: "show-user",
          component: UserShow,
        },
        {
          path: "/reservation/list",
          name: "list-reservation",
          component: ReservationList,
        },
        {
          path: "/reservation/show",
          name: "show-reservation",
          component: ReservationShow,
        },
        {
          path: "/reservation/edit/:id",
          name: "edit-reservation",
          component: ReservationEdit,
        },
        {
          path: "/reservation/add",
          name: "add-reservation",
          component: ReservationAdd,
        },
        {
          path: "/reservation",
          name: "reservation",
          component: ReservationManagenemt,
        },
      ],
    },

    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

export default router;
