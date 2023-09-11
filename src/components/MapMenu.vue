<template>
  <div class="map-menu">
    <v-card class="inputs"> 
      <v-card-text>
        
        <v-row no-gutters >
          <v-col>
            <v-row no-gutters class="title">
              <v-col>
                <h2>Definir ponto de partida</h2>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <LatLngInput :location="'sourceLocation'"></LatLngInput>
              </v-col>
            </v-row>

            <v-row no-gutters class="title">
              <v-col>
                <h2>Definir ponto de destino</h2>
              </v-col>
            </v-row>
            <v-row no-gutters >
              <v-col>
                <LatLngInput :location="'destinyLocation'"></LatLngInput>
              </v-col>
            </v-row>
            
            
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-row no-gutters class="title">
              <v-col>
                <h2>Data de partida</h2>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col> 
              <VueDatePicker v-model="date" :teleport="true" :format="format" />

              </v-col>
              
            </v-row>
          </v-col>
        </v-row>

        <v-row >
          <v-col>
            <v-row no-gutters class="title">
              <v-col>
                <h2>Horário de partida</h2>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col> 
                <VueDatePicker v-model="time" :teleport="true" time-picker mode-height="120" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn variant="outlined" @click="sendRequest()">Enviar</v-btn>
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
  import axios from 'axios'

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
      createGeoJSONWithTwoPoints() {
        const store = useCoordinateStore();
        let point1 = store.sourceLocation
        let point2 = store.destinyLocation

        if (!point1 || !point2 || point1.length !== 2 || point2.length !== 2) {
            throw new Error('Os pontos fornecidos são inválidos.');
        }

        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": point1
                    },
                    "properties": {
                      "role": "origin",
                      "date": "",
                      "time": ""
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": point2
                    },
                    "properties": {}
                }
            ]
        };
      },
      sendRequest(){
        
        const geojson = this.createGeoJSONWithTwoPoints()
        const url = 'https://back-end-projeto-alagamentos-upfpc35ezq-uc.a.run.app/api/v1/modelo_previsao/geojson';
        const store = useCoordinateStore();

        axios.post(url, geojson)
          .then(response => {
            console.log('Dados recebidos:', response.data);
            store.modelResult = response.data
        })
        .catch(error => {
          console.error('Erro:', error);
        });

   
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
    /* width: 100%; */
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

  .title{
    padding-bottom: 15px;
    /* border: 1px solid black ; */
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
