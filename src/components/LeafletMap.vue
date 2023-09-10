<template>
  <div style="height:100%;">
    <l-map @click="onMapClick"   :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom"  :options="{zoomControl: false}" :center="[-23.1896, -45.8841]">
      <l-marker draggable :lat-lng="markerSourcePosition" @moveend="event => handleMoveEnd(event, 'sourceLocation')"></l-marker>
      <l-marker draggable :lat-lng="markerDestinyPosition" @moveend="event => handleMoveEnd(event, 'destinyLocation')"></l-marker>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      
      <l-control-zoom position="bottomright"  ></l-control-zoom>
    </l-map>
  </div>
</template>

<script lang="ts">

  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LControlZoom, LMarker} from "@vue-leaflet/vue-leaflet";
  import { useCoordinateStore } from '@/store/coordinateStore';
  import { watch, ref, computed} from "vue";
  import { LatLngTuple, LeafletEvent, LeafletMouseEvent} from 'leaflet';


export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom,
    LMarker
  },
  data() {
    return {
      zoom: 14,
    };
  },
  setup(){

    const store = useCoordinateStore();


    const handleMoveEnd = (event: LeafletEvent, state: 'sourceLocation' | 'destinyLocation') => {
        const newPosition = event.target.getLatLng();
        const coordinate = [newPosition.lat, newPosition.lng] as LatLngTuple
        store[state] = coordinate
    }

    const markerSourcePosition = computed(() => store.sourceLocation); 
    const markerDestinyPosition = computed(() => store.destinyLocation); 

    const onMapClick = (event: LeafletMouseEvent) => {
      let state: 'sourceLocation' | 'destinyLocation'
      const newPosition = event.latlng
      state = 'sourceLocation'
      if(store.buttonStateToInsert == '') return

      if(store.buttonStateToInsert == 'sourceLocation'){
        state = 'sourceLocation'
        store[state] = [newPosition.lat, newPosition.lng]
      }
        
      if(store.buttonStateToInsert == 'destinyLocation'){
        state = 'destinyLocation'
        store[state] = [newPosition.lat, newPosition.lng]
      }

      store.buttonStateToInsert = ''
    }

    return {
      handleMoveEnd,
      onMapClick,
      markerSourcePosition,
      markerDestinyPosition
    }
  }
};
</script>

<style></style>