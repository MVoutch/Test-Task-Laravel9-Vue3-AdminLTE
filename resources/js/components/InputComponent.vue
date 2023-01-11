<template>
  <li :class="liClass">
    <p class="font-weight-bold mb-1">Name</p>
    <input type="text" class="w-100 px-2 py-1" v-model="name">
    <p class="text-black-50 text-right">0 / 256</p>
  </li>
</template>

<script>
export default {
  name: "InputComponent"
}
</script>

<style scoped>

</style>