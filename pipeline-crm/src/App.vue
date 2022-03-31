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

  display: flex;
  justify-content: space-between;
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
  font-size: 12px;
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
a{
  text-decoration: none;
  color: #4d4e4d!important;
}

figure a {
  position: relative;
}
figure a[aria-expanded="true"]::after {
  content: "\f0d8";
  font: normal normal normal 35px/1 FontAwesome;
  position: absolute;
  display: block;
  bottom: -129px;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  color: #fff;
}

/* figure a.showArrow[aria-expanded="false"]::after {
  content: "\f0d8";
  font: normal normal normal 40px/1 FontAwesome;
  position: absolute;
  display: block;
  bottom: -145px;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  color: #fff;
} */

.list-group-item p {
  margin: 0!important;
}

.create-form {
  background-color: #fff;
}

.mx-input-wrapper {
    border: none !important;
    padding: 0px !important;
    margin-top: 0px !important;
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
  figure a[aria-expanded="true"]::after {
    bottom: -130px;  
    font: normal normal normal 40px/1 FontAwesome;
  }
}

/*
*Screen and above
*/
@media only screen and (min-width: 1200px) {
  .accordion-grid a {
    font-size: 24px;
  }
  figure a[aria-expanded="true"]::after {
    bottom: -125px; 
  }
}
</style>
