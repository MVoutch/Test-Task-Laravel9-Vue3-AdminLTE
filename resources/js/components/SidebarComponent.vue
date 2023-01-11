<template>

  <aside class="main-sidebar sidebar-dark-primary">
    <a class="brand-link logo-switch navbar-gray">
      <span class="mx-2 font-weight-bold h4">Test task</span>
    </a>
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column">
          <li class="nav-item">
            <a href="/employees" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p class="ml-4">Employees</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/positions" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p class="ml-4">Positions</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent"
}
</script>

<style scoped>

</style>