<template>
  <div id="app">
    <div class="application">
      <headComponent></headComponent>
      <mainComponent
      @mainClickHandler="popupHandler"
      ></mainComponent>
      <footerComponent></footerComponent>
    </div>
    <transition name="fade">
      <popupComponent v-show="popup"
      @closePopup="closeHandler"
      :name="name"
      :color="color"
      :popupPeople="popupPeopleObject"
      >
      </popupComponent>
    </transition>
  </div>
</template>


<script>

export default {
  name: "app",
  data() {
    return {
      name: "",
      popup: "",
      color: "",
      popupPeopleObject:{}
    }
  },
  components: {
    headComponent: () => import('./components/Head.vue'),
    mainComponent: () => import('./components/main/Main.vue'),
    footerComponent: () => import('./components/Footer.vue'),
    popupComponent: () => import('./components/Popup.vue')
  },
  methods: {
    popupHandler(data) {
      this.name = data.name;
      this.color = data.color
      this.$store.dispatch('POPUP_PEOPLE',this.name).then((res) => {
        this.popupPeopleObject = this.$store.getters.GET_POPUP_PEOPLE;
        this.popup = data.popup;
      })
    },
    closeHandler(data) {
      this.popup = data.popup;
    }
  }
}

</script>

<style lang="scss">
@import './assets/scss/main.scss'; 
</style>