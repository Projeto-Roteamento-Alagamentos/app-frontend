<template>
  <div class="map-menu">
    <v-card class="inputs"> 
      <v-card-text>
        
        <LatLngInput :location="'sourceLocation'"></LatLngInput>
        <LatLngInput :location="'destinyLocation'"></LatLngInput>
        <VueDatePicker></VueDatePicker>
    
      </v-card-text>

    </v-card>
  </div>
</template>

<script lang="ts">
  
  import SearchBar from '../components/commom/SearchBar.vue';
  import LatLngInput from './commom/LatLngInput.vue';
  import { useCoordinateStore } from '@/store/coordinateStore';
  import { watch, ref } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  export default {
    components: {
      SearchBar,
      LatLngInput,
      VueDatePicker
    },
    setup(){
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
    overflow: visible;
  }

  .inputs{
    max-width: 400px;
    background-color: rgb(35, 110, 175);
    padding: 10px;
    border-radius: 10px;
    overflow: visible;

  }

  .vue-datepicker-class {
    z-index: 100000000000; /* Ajuste o valor conforme necessário */
    overflow: visible;
  }

  .v-date-picker-table { height: 100%; max-height: 300px;overflow: visible; }

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
