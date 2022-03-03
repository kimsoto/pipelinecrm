<template>
  <div id="app">
      <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-grey">
          <SideMenu></SideMenu>
        </div>
        <div class="col py-3">
          <div class="row">
            <header>
              <h1>Pipeline CRM</h1>
              <h2>Clients</h2>
            </header>
          </div>
          <div class="container">
    <div id="acc">
        <div class="row panel">
            <div class="col-md-4 accordion-grid">
              <figure>
                <a href="#toggleOne" data-bs-toggle="collapse" aria-expanded="false">Pipeline 1</a>
              </figure>
            </div>
            <div class="col-md-4 accordion-grid">
              <figure>
                <a href="#toggleTwo" data-bs-toggle="collapse" aria-expanded="false">Pipeline 2</a>
              </figure>
            </div>
            <div class="col-md-4 accordion-grid">
              <figure>
                <a href="#toggleThree" data-bs-toggle="collapse" aria-expanded="false">Pipeline 3</a>
              </figure>
            </div>
            <div class="col-lg-12 overlay collapse in accordion-content" data-bs-parent="#acc" id="toggleOne">
              <h3>Pipeline information 1</h3>
              <div class="items">
                <h4>Products</h4>
                <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 1</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 2</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 3</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-12 overlay collapse in accordion-content" data-bs-parent="#acc" id="toggleTwo">
              <h3>Pipeline information 2</h3>
              <div class="items">
                <h4>Products</h4>
                <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 1</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 2</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 3</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-12 overlay collapse in accordion-content" data-bs-parent="#acc" id="toggleThree">
              <h3>Pipeline information 3</h3>
              <div class="items">
                <h4>Products</h4>
                <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 1</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 2</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 3</a></li>
                </ul>
              </div>
            </div>
        </div>
    </div>
</div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'

export default {
  name: 'Client',
  components: {
      SideMenu
  }
}
</script>
