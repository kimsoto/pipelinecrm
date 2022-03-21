<template>
  <div id="app">
      
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.bg-grey {
    background-color: #cccccc;
}
.nav-link {
    color: #6e706e!important;
}
.nav-link:hover {
    color: #4d4e4d!important;
}
body {
  background-color: #eeeeee;
}
header {
  background-color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.py-3 {
  padding-top: 0!important;
}
.accordion-grid figure {
  background-color: white;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.accordion-grid a {
  color: #000;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
}

.accordion-content {
  padding: 25px;
  background-color: white;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}
.accordion-content .row div div {
  border: 1px solid #cccccc;
  padding: 15px;
  margin-top: 10px;
}
.accordion-content h3 {
  font-size: 22px;
}
.accordion-content h4 {
  font-size: 18px;
}
ul li {
  border-radius: 0!important;
}

.list-group-item p {
  margin: 0!important;
}

.create-form {
  background-color: #fff;
}

/*
*Tablet and above
*/
@media only screen and (min-width: 768px) {
  .accordion-grid a { 
    font-size: 18px;
  }
  .accordion-content .row div div {
    margin: 0;
    height: 100%;
  }
}

/*
*Screen and above
*/
@media only screen and (min-width: 1200px) {
  .accordion-grid a {
    font-size: 24px;
  }
}
</style>
