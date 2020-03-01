<template>

<div>
  <transition name="fade">
   <div v-if="card" class="catalog-wrapper">
     <transition-group name="fadeIn">
      <div v-for="people in peoples" v-bind:key = "people.name" @click="onClickHandler"  class="catalog-card">
      <div v-bind:style = "{backgroundColor: getRandomColor()}" class="catalog-card__img">
        {{people.name[0].toUpperCase()}}
      </div>
      <div class="catalog-card__name">
        {{people.name}}
      </div>
      <div class="catalog-card__species">
        {{people.species}}
      </div>
    </div>
     </transition-group>
   </div>
  </transition>

  <transition name="fade">
   <div v-if="search" class="catalog-wrapper">
     <transition-group name="fadeIn">
      <div v-for="searchPeople in searchPeoples" v-bind:key = "searchPeople.name" @click="onClickHandler" class="catalog-card">
      <div v-bind:style = "{backgroundColor: getRandomColor()}" class="catalog-card__img">
        {{searchPeople.name[0].toUpperCase()}}
      </div>
      <div class="catalog-card__name">
        {{searchPeople.name}}
      </div>
      <div class="catalog-card__species">
        {{searchPeople.species}}
      </div>
    </div>
     </transition-group>
   </div>
  </transition>
</div> 
</template>

<script>
import axios from 'axios';

export default {
  name: "catalogCardComponent",
  props: ['card','search','searchPeoples'],
  data() {
    return{
      plist: [],
      loading : false,
      name:"",
      popup:true,
      color:""
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_PEOPLES').then((res) => {
      this.plist = this.$store.getters.GET_PEOPLES;
    });
    
    window.addEventListener('scroll' , this.onWindowScroll);
  },
  methods: {
    getRandomColor() {
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    },
    // Infinite scroll loader
    loadMore() {
        this.loading = true
        this.$store.dispatch('GET_MORE_PEOPLES').then((res) => {
        let arr = this.$store.getters.GET_PEOPLES;
        this.plist.push(arr);
        this.plist.pop();
        this.loading = false;
      });
    },

    // Handlers
    onWindowScroll(){
      let heigth = document.documentElement.offsetHeight;
      let scrollHeigth = document.documentElement.scrollTop;
      if (heigth - scrollHeigth < 700 && !this.loading) {
        this.loadMore();
      }
    },
    onClickHandler(e) {
      if (e.target.classList.contains('catalog-card')) {
        this.getNameByElement(e.target);
      }
      else {
        this.getNameByElement(e.target.parentElement);
      }
      this.$emit('onClickHandler', {
        name: this.name,
        popup: this.popup,
        color: this.color
      });
      let app = document.querySelector('.application');
      app.classList.add('blur');
    },
    getNameByElement(element){
      this.name = element.children[1].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
      this.color = element.children[0].style.backgroundColor;
    },
  },
  
  computed: {
    peoples() {
      return this.plist;
    },
  }
}
</script>

<style lang="scss" scoped>

.catalog{
  &-card{
    transition: all 0.3s;
    width: 100%;
    border-radius: 8px;
    background-color: $card-bg-color;
    text-align: center;
    padding: 90px 0;
    color: $main-text-color;
    &:hover{
      transition: all 0.3s;
      cursor: pointer;
      box-shadow: 0px 10px 40px rgba(37, 136, 167, 0.38);
    }
    &__img{
      position: relative;
      margin: 0 auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      font-size: 48px;
      padding-top: 11px;
    }
    &__name{
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      margin: 9px 0;
    }
    &__species{
      font-weight: normal;
      font-size: 13px;
      line-height: 15px;
      color: $text-color-grey;
    }
  }
}

@media (max-width: 768px) {
  .catalog{
    &-card{
      padding: 33px 0;
      &__img{
        padding-right: 7px;
      }
    }
  }
}

//Transitions

.fade{
  &-enter{
    opacity: 0;
    &-active{
      transition: opacity .5s;
    }
  }
  &-leave{
    &-to{
      opacity: 0;
    }
    &-active{
      transition: opacity .5s;
    }
  }
}

.fadeIn{
  &-enter{
      opacity: 0;
      transform: translateY(20px);
    &-active{
      transition: all 1s;
    }
  }
  &-leave{
    &-to{
      opacity: 0;
      transform: translateY(20px);
    }
    &-active{
      transition: all 1s;
    }
  }
}


</style>
