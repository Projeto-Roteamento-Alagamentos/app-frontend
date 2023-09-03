<template>
  <div class="map-menu">
    
    <v-card class="inputs"> 
      <v-card-text>

        <SearchBar label="Digite o endereço"></SearchBar>
        <SearchBar label="Digite o endereço"></SearchBar>
    
      </v-card-text>

    </v-card>
  </div>
</template>

<script lang="ts">
import SearchBar from '../components/commom/SearchBar.vue';
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      searchQuery: '',
      startDate: null,
      endDate: null,
    };
  },
  methods: {
    handleSubmit() {
    }
  }
};
</script>

<style>

  .map-menu {
    position: absolute;
    top: 30px;
    z-index: 900;
    /* left: 10px; */
    margin-top: 20px;
    /*  background-color: black; */
    padding: 0px 50px 0px 50px;
    width: 100%;
  }

  .inputs{
    max-width: 400px;
    background-color: rgb(35, 110, 175);
    padding: 10px;
    border-radius: 10px;

  }

  @media (max-width: 700px) {

    .inputs{
        max-width: 100%;
        background-color: rgb(35, 110, 175);
        padding: 10px;
        border-radius: 10px;
    }

    .map-menu{
      left: 0px;
    }
    
  }

</style>
