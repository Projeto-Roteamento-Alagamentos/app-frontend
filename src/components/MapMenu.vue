<template>
  <div class="map-menu">
    <v-card class="inputs"> 
      <v-card-text>
        
        <v-row>
          <v-col>
            <LatLngInput :location="'sourceLocation'"></LatLngInput>
            <LatLngInput :location="'destinyLocation'"></LatLngInput>
          </v-col>
        </v-row>
        <v-row>
          <v-col><VueDatePicker v-model="date" :teleport="true" :format="format" /></v-col>
        </v-row>
        <v-row>
          <v-col> <VueDatePicker v-model="time" :teleport="true" time-picker mode-height="120" /></v-col>
        </v-row>
        
        <v-row>
          <v-col>
            <v-btn>Enviar</v-btn>
          </v-col>
        </v-row>
       
       

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
      const date = ref(new Date());
      const time = ref(new Date());
      
      const format = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      }

      return {
        date,
        format,
        time
      }
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
    max-width: 450px;
    background-color: rgb(35, 110, 175);
    padding: 10px;
    border-radius: 10px;
    overflow: visible;

  }

  .vue-datepicker-class {
    position: absolute;
  }

  .v-date-picker-table { height: 100%; height: 300px; position: relative; }

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
