// JS
import './js'

// SCSS
import './assets/scss/main.scss'

//Babel-polyfill
import 'babel-polyfill';

// Vue.js
import Vue from 'vue';
import App from './App.vue';
import store from './js/store/store.js';

new Vue({
  store,
  el: '#app',
  render (h) {
    return h(App)
  }
});
