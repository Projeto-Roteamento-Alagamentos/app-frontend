<template>
  <div style="height:100%;">
    <l-map  :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom"  :options="{zoomControl: false}" :center="[-23.1896, -45.8841]">
      <l-marker draggable :lat-lng="markerSource" @moveend="event => handleMoveEnd(event, 'sourceLocation')"></l-marker>
      <l-marker draggable :lat-lng="markerDestiny" @moveend="event => handleMoveEnd(event, 'destinyLocation')"></l-marker>
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
  import { watch, ref } from "vue";
  import { LatLngTuple, LeafletEvent, marker, LatLngExpression } from 'leaflet';


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
      markerSource: [],  
      markerDestiny: [], 
    };
  },
  setup(){
    const markerSource = ref<LatLngTuple>([51.505, -0.09]);
    const markerDestiny = ref<LatLngTuple>([51.505, -0.09]);
    const store = useCoordinateStore();

    watch(() => store.shouldInsertToMap, () => {
      markerSource.value = store.sourceLocation
      markerDestiny.value = store.destinyLocation
      }
    );

    const handleMoveEnd = (event: LeafletEvent, state: 'sourceLocation' | 'destinyLocation') => {
        const newPosition = event.target.getLatLng();
        if(state == 'sourceLocation') markerSource.value = [newPosition.lat, newPosition.lng];
        else markerDestiny.value = [newPosition.lat, newPosition.lng];
        const coordinate = [newPosition.lat, newPosition.lng] as LatLngTuple
        store[state] = coordinate
    }


    return {
      markerSource, 
      markerDestiny,
      handleMoveEnd
    }
  }
};
</script>

<style></style>