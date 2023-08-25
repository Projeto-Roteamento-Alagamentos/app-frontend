<template>
  <div class="map-menu">
    <!-- <SearchBar v-model="searchQuery" /> -->
    
    <v-card
    class="mx-auto menu-card"
    color="grey-lighten-3"
    max-width="400"
    >
    <v-card-text>
      <v-text-field
      
      density="compact"
      variant="solo"
      label="Inserir destino"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      
      ></v-text-field>
      
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
      endDate: null
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
  top: 10px;
  left: 10px;
  z-index: 900;
  padding: 50px;
  margin-top: 20px;
  min-width: 200px;
}

.menu-card{
  width: 80vw;
  padding: 20px;
  max-width: 300px;
}
</style>
