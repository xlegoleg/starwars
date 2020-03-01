import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    response:{},
    peoples:[],
    searchPeoples:[],
    searchResponse:{},
    preloader: true,
    popupPeople:{}
  },
  getters: {
    GET_PEOPLES: (state) => {
      return state.peoples;
    },
    GET_SEARCH_PEOPLES: (state) => {
      return state.searchPeoples;
    },
    GET_POPUP_PEOPLE: (state) => {
      return state.popupPeople;
    },
  },
  actions: {
    FETCH_PEOPLES: async ({commit}) => {
      let resp = await axios.get('https://swapi.co/api/people/');
      let peoplesArr = resp.data.results;
      let newPeoples = await Promise.all(peoplesArr.map(async (people) => {
        let newSpecies = await axios.get(people.species[0]);
        people.species = newSpecies.data.name;
        return people;
      }));
      commit('SET_RESPONSE',resp.data);
      commit('SET_PEOPLES', newPeoples);
      commit('CHANGE_PRELOADER');
    },

    GET_MORE_PEOPLES: async ({commit,state}) => {
      let next = state.response.next;

      if (next) {
        let resp = await axios.get(next);
        let peoplesArr = resp.data.results;
        let newPeoples = await Promise.all(peoplesArr.map(async (people) => {
          let newSpecies = await axios.get(people.species[0]);
          people.species = newSpecies.data.name;
          return people;
        }));
        commit('SET_RESPONSE',resp.data);
        commit('ADD_PEOPLES',newPeoples);
      }
      else {
        return;
      }
    },

    SEARCH_PEOPLES: async({commit,state},payload) => {
      state.searchPeoples = [];
      let query = payload.toLowerCase();
      let resp = await axios.get(`https://swapi.co/api/people/?search=${query}`);
      let peoplesArr = resp.data.results;
      let newPeoples = await Promise.all(peoplesArr.map(async (people) => {
        let newSpecies = await axios.get(people.species[0]);
        people.species = newSpecies.data.name;
        return people;
      }));
      commit('SET_SEARCH_RESPONSE',resp.data);
      commit('SET_SEARCH_PEOPLES',newPeoples);
    },

    POPUP_PEOPLE: async({commit,dispatch,state},payload) => {
      state.popupPeople = {};
      let query = payload.toLowerCase();
      let resp = await axios.get(`https://swapi.co/api/people/?search=${query}`);
      let responsePeople = resp.data.results[0];

      let species = await axios.get(responsePeople.species);
      responsePeople.species = species.data.name;

      let homeworld = await axios.get(responsePeople.homeworld);
      responsePeople.homeworld = homeworld.data.name;

      let films = await Promise.all(responsePeople.films.map(async (film) => {
        let resp = await axios.get(film);
        let filmInfo = resp.data.title;
        return filmInfo;
      }));
      responsePeople.films = films;

      commit('SET_POPUP_PEOPLE',responsePeople);
      console.log(state.popupPeople);
    },

    SERIALIZE_PEOPLE: async({commit,state},payload) => {
      let property = await axios.get(payload);

    },

    GET_MORE_SEARCH_PEOPLES: async ({commit,state}) => {
      let next = state.searchResponse.next;

      if (next) {
        let resp = await axios.get(next);
        let peoplesArr = resp.data.results;
        let newPeoples = await Promise.all(peoplesArr.map(async (people) => {
          let newSpecies = await axios.get(people.species[0]);
          people.species = newSpecies.data.name;
          return people;
        }));
        commit('SET_SEARCH_RESPONSE',resp.data);
        commit('ADD_SEARCH_PEOPLES',newPeoples);
      }
      else {
        return;
      }
    },

  },
  mutations: {
    SET_RESPONSE: (state,payload) => {
      state.response = payload;
    },
    SET_PEOPLES: (state,payload) => {
      state.peoples = payload;
    },
    SET_SEARCH_RESPONSE: (state,payload) => {
      state.searchResponse = payload;
    },
    SET_SEARCH_PEOPLES: (state,payload) => {
      state.searchPeoples = payload;
    },
    SET_POPUP_PEOPLE: (state,payload) => {
      state.popupPeople = payload;
    },
    ADD_PEOPLES: (state,payload) => {
      Array.prototype.push.apply(state.peoples,payload);
    },
    ADD_SEARCH_PEOPLES: (state,payload) => {
      Array.prototype.push.apply(state.searchPeoples,payload);
    },
    CHANGE_PRELOADER: (state) => {
      state.preloader = false;
    }
  }
})