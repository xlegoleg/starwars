<template>
  <div class="catalog">
    <searchComponent
    @getQuery="onGetQuery"
    >
    </searchComponent>
    <cardComponent
    @onClickHandler="catalogClickHandler"
    :card="card"
    :search="search"
    :searchPeoples="searchPeoples"
    >
    </cardComponent>
  </div>
</template>

<script>
import debounce from 'debounce';

export default {
  name: "catalogComponent",
  data() {
    return{
      query:"",
      card: true,
      search: false,
      searchPeoples:[],
      popup: true,
      popupPeopleName:"",
      popupPeopleColor:""
    }
  },
  components: {
    searchComponent: () => import('./catalog_items/Search.vue'),
    cardComponent: () => import('./catalog_items/Card.vue'),
  },
  methods: {
    onGetQuery(data) {
      this.query = data.query;
      this.card = data.card;
      this.search = data.search;

      this.loadSearch();

      if (!this.query) {
        this.card = true;
      }
    },
    catalogClickHandler(data){
      this.popup = data.popup;
      this.popupPeopleName = data.name;
      this.popupPeopleColor = data.color
      this.$emit('catalogClickHandler',{
        name: this.popupPeopleName,
        popup: this.popup,
        color: this.popupPeopleColor
      })
    },
    loadSearch(){
      this.$store.dispatch('SEARCH_PEOPLES',this.query).then((res) => {
      this.searchPeoples = this.$store.getters.GET_SEARCH_PEOPLES;
    });
    },
  }
}
</script>

<style lang="scss">

.catalog-wrapper{
  span{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  grid-row-gap: 32px;
  grid-column-gap: 32px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0px 100px;
  }
}

@media (max-width: 768px) {
  .catalog-wrapper{
    span{
      padding: 0% 7%;
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

</style>