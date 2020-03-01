<template>
  <div class="popup">
    <div class="popup-card">
      <div class="popup-card__avatar">
        <div v-bind:style = "{backgroundColor: setColor()}" class="popup-card__img">
          {{name[0].toUpperCase()}}
        </div>
        <div class="popup-card__name">
          {{popupPeople.name}}
        </div>
      </div>
      <img @click="closePopup" class="popup-card__cross" src="/assets/img/icons/cross.svg" alt="cross">
      <div class="popup-card__line"></div>
      <div class="popup-card__wrapper">
        <div class="popup-card__column">
          <div class="popup-card__item">
            <img src="/assets/img/icons/birth.svg" alt="birth">
            <div class="popup-card__item-text">
              <div class="popup-card__item-title">Birth year</div>
              <div class="popup-card__item-descr">{{popupPeople.birth_year}}</div>
            </div>
          </div>
          <div class="popup-card__item">
            <img src="/assets/img/icons/species.svg" alt="birth">
            <div class="popup-card__item-text">
              <div class="popup-card__item-title">Species</div>
              <div class="popup-card__item-descr">{{popupPeople.species}}</div>
            </div>
          </div>
          <div class="popup-card__item">
            <img src="/assets/img/icons/gender.svg" alt="birth">
            <div class="popup-card__item-text">
              <div class="popup-card__item-title">Gender</div>
              <div class="popup-card__item-descr">{{popupPeople.gender}}</div>
            </div>
          </div>
        </div>
        <div class="popup-card__column">
          <div class="popup-card__item">
            <img src="/assets/img/icons/homeworld.svg" alt="birth">
            <div class="popup-card__item-text">
              <div class="popup-card__item-title">Homeworld</div>
              <div class="popup-card__item-descr">{{popupPeople.homeworld}}</div>
            </div>
          </div>
          <div class="popup-card__item">
            <img src="/assets/img/icons/films.svg" alt="birth">
            <div class="popup-card__item-text">
              <div class="popup-card__item-title">Films</div>
              <div class="popup-card__item-descr">
                <div v-for="film in peopleFilms" v-bind:key="film.id" class="popup-card__item-film">
                  {{film}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popupComponent',
  props: ["name","color","popupPeople"],
  data() {
    return {
      popup: "",
      films: ""
    }
  },
  methods: {
    setColor() {
      return this.color;
    },
    closePopup() {
      let app = document.querySelector('.application');
      app.classList.remove('blur');
      this.popup = false
      this.$emit('closePopup', {
        popup: this.popup
      })
    },
  },
  computed: {
    peopleFilms() {
      this.films = this.popupPeople.films;
      return this.films;
    }
  }
}
</script>

<style lang="scss">

#app{
  position: relative;

}

.blur{
  filter: blur(3px);
  outline: solid 10px;
}

.popup{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-card{
    position: absolute;
    z-index: 99;
    border-radius: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    background-color: $card-bg-color;
    padding: 70px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
    &__avatar{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: $main-text-color;
    }
    &__cross{
      position: absolute;
      top: 22px;
      right: 22px;
      &:hover{
        cursor: pointer;
      }
    }
    &__img{
      padding-left: 24px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      font-size: 48px;
      padding-top: 11px;
    }
    &__name{
      font-size: 24px;
      margin-left: 16px;
    }
    &__line{
      margin-top: 80px;
      margin-bottom: 70px;
      width: 100%;
      height: 2px;
      background-color: $text-color-grey;
    }
    &__wrapper{
      display: grid;
      grid-template-columns: (1fr 1.5fr);
    }
    &__item{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 18px;
      &-text{
        display: grid;
        grid-template-columns: (1fr 2fr);
        margin-left: 11px;
        width: 100%;
      }
      &-title{
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;  
        color: $text-color-grey;      
      }
      &-descr{
        padding-left: 20px;
        text-align: start;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        color: $main-text-color;
      }
      &-film{
        text-align: start;
        margin-bottom: 5px;
      }
    }
  }
}

@media (max-width: 768px) {
  .popup{
    &-card{
      padding: 38px 24px;
      width:100%;
      height: 100vh;
      &__wrapper{
        grid-template-columns: repeat(1,1fr);
      }
      &__line{
        margin: 45px 0px;
      }
      &__item{
        &-title{
          font-size: 14px;
        }
        &-descr{
          font-size: 14px;
        }
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

</style>