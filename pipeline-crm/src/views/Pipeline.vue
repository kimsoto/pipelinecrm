<template>
  <div id="app">
      <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-grey">
          <SideMenu></SideMenu>
        </div>
        <div class="col py-3">
          <h1>Pipeline CRM</h1>
          <h2>Pipelines</h2>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import SideMenu from '../../../../pipeline-crm/src/components/SideMenu.vue'

export default {
  name: 'Team',
  components: {
      SideMenu
  }
}
</script>
