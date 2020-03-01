<template>
  <header class="head">
    <div class="head-logo">
      <img class="head-img" src="/assets/img/star.png" alt="">
      <h1 class="head-title">{{titleText}}</h1>
      <img class="head-img" src="/assets/img/wars.png" alt="">
    </div>
  </header>
</template>

<script>
export default {
  name: "headСomponent",
  data() {
    return{
      titleText: "character encyclopedia",
    }
  }
}
</script>

<style lang="scss">

.head{
  padding: 120px 0;
  background: url('/assets/img/header-bg.png') center center/cover no-repeat;
  text-align: center;
  position: relative;
  z-index: -1;
  &:after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: -1;
  }
  &-title{
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    color: $main-text-color;
  }
}

@media (max-width: 768px) {
  .head{
    padding: 58px;
    &-title{
      font-size: 16px;
    }
  }
}

</style>