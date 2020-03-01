<template>
  <footer class="footer">
    <span class="footer-text">{{footerMessage}}</span>
  </footer>
</template>

<script>
export default {
  name: "footerComponent",
  data() {
    return{
      footerMessage: "STAR WARS CHARACTER Encyclopedia, 2020",
    }
  }
}
</script>

<style lang="scss">

.footer{
  background-color: $footer-bg-color;
  padding: 53px 0 46px 0;
  text-align: center;
  &-text{
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
    color: $main-text-color;
  }
}

@media (max-width: 768px) {
  .footer{
    &-text{
      font-size: 14px;
    }
  }
}

</style>