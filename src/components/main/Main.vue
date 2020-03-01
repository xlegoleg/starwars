<template>
  <section class="main">
    <transition name="fadeIn">
      <preloaderComponent v-show="preloader"></preloaderComponent>
    </transition>
    <transition name="fadeIn">
      <catalogComponent
      @catalogClickHandler="mainClickHandler"
       v-show="!preloader"></catalogComponent>
    </transition>
  </section>
</template>


<script>

export default {
  name: "mainComponent",
  data() {
    return{
      preload: true,
      popup:"",
      popupPeopleName:"",
      popupPeopleColor: ""
    }
  },
  components: {
    preloaderComponent: () => import('./Preloader.vue'),
    catalogComponent: () => import ('./Catalog.vue'),
  },
  computed: {
    preloader() {
      this.preload = this.$store.state.preloader;
      return this.preload
    }
  },
  methods: {
    mainClickHandler(data) {
      this.popup = data.popup;
      this.popupPeopleName = data.name;
      this.popupPeopleColor = data.color;
      this.$emit('mainClickHandler',{
        name: this.popupPeopleName,
        popup: this.popup,
        color: this.popupPeopleColor
      });
    }
  }
}
</script>

<style lang="scss">

.main{
  min-height: 67vh;
  padding: 130px 0 160px 0;
  background-color: $main-bg-color;
}

.fadeIn{
  &-enter{
      opacity: 0;
      transform: translateY(20px);
    &-active{
      transition: all 1.2s;
    }
  }
  &-leave{
    &-to{
      opacity: 0;
      transform: translateY(20px);
    }
    &-active{
      transition: all 0.8s;
    }
  }
}


</style>