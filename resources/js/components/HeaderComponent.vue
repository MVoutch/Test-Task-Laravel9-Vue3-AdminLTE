<template>
  <nav class="main-header navbar navbar-expand navbar-dark bg-gray">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="javascript:void(0)" @click="logout" class="nav-link color-light">
          <i class="fas fa-sign-out-alt color-light"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: "HeaderComponent",
  setup() {
      const router = useRouter()

      const logout = async () => {
          await axios.get('logout');
          await router.push('/login');
      }

      return {
          logout
      }
  }
}
</script>

<style scoped>

</style>
