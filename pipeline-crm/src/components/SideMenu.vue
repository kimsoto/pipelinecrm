<template>
  <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                      <li class="nav-item">
                          <router-link to="/" class="nav-link align-middle px-0">
                            <i class="fs-4 fa-solid fa-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                          </router-link>
                      </li>
                      <li class="nav-item">
                          <router-link to="/Team" class="nav-link align-middle px-0">
                            <i class="fs-4 fa-solid fa-users"></i> <span class="ms-1 d-none d-sm-inline">Teams</span>
                          </router-link>
                      </li>
                      <li class="nav-item">
                          <router-link to="/Client" class="nav-link align-middle px-0">
                              <i class="fs-4 fa-solid fa-handshake"></i> <span class="ms-1 d-none d-sm-inline">Clients</span>
                          </router-link>
                      </li>
                      <li class="nav-item">
                          <router-link to="/Pipeline" class="nav-link align-middle px-0">
                              <i class="fs-4 fa-solid fa-chart-column"></i> <span class="ms-1 d-none d-sm-inline">Pipelines</span>
                          </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link to="/Item" class="nav-link align-middle px-0">
                            <i class="fs-4 fa-solid fa-book"></i> <span class="ms-1 d-none d-sm-inline">Items</span>
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <a @click="logout" href="#" class="nav-link align-middle px-0">
                            <i class="fs-4 fa-solid fa-right-from-bracket"></i> <span class="ms-1 d-none d-sm-inline">Logout</span>
                        </a>
                      </li>
                  </ul>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'SideMenu',
  methods: {
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav, .nav-item {
    width: 100%;
}
.bg-grey {
    background-color: #cccccc;
}
.nav-item:hover {
    border-bottom: 1px solid#eeeeee;
}
.nav-link {
    color: #6e706e!important;
}
.nav-link:hover {
    color: #4d4e4d!important;
}
</style>
