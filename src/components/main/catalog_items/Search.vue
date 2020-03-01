<template>
  <form class="main-search">
    <div class="main-search__field">
      <!--input begin-->
      <input  

      @input="getQuery" v-model="query" 
      v-on:change="activeLabel($event)" 
  
      class="main-search__input" type="text" name="search" id="search">
      <!--input end-->
      <label class="main-search__label" for="search">{{labelText}}</label>
      <img class="main-search__img" src="/assets/img/icons/search.svg" alt="search">
    </div>
  </form>
</template>

<script>

export default {
  name: "catalogSearchComponent",
  data() {
    return{
      labelText: "Search by name",
      query: "",
      debounce: null,
    }
  },
  methods:{
    activeLabel(event){
      let input = event.target;
      let label = document.querySelector('.main-search__label');
      if (input.value){
        label.classList.add('main-search__label_active');
      }
      else{
        label.classList.remove('main-search__label_active');
      }
    },
    getQuery() {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
      this.$emit('getQuery',{
        query: this.query,
        card: false,
        search: true
      });
      }, 900)
    }
  }
}
</script>

<style lang="scss">

.main{
  &-search{
    margin-bottom: 80px;
    &__field{
      margin: 0 auto;
      width: 768px;
      position: relative;
    }
    &__input{
      padding: 5px;
      width: 100%;
      color: $main-text-color;
      background-color: $main-bg-color;
      border-bottom: 1px solid $text-color-grey;
      &:focus + label{
      transition: all 0.3s;
      font-size: 13px;
      top: -20px;
      }
    }
    &__label{
      transition: all 0.3s;
      position: absolute;
      top: 0;
      left: 0;
      color: $text-color-grey;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      &_active{
        transition: all 0.3s;
        font-size: 13px;
        top: -20px;
      }
    }
    &__img{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

@media(max-width: 800px) {
  .main{
    &-search{
      margin-bottom: 80px;
      &__field{
        margin: 0 auto;
        width: 80%;
        position: relative;
      }
    }  
  }
}

</style>
