<template>
  <div style="height:100%;">
    <l-map @click="onMapClick"   :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom"  :options="{zoomControl: false}" :center="[-23.1896, -45.8841]">
      <l-marker :icon="markerIcon" draggable :lat-lng="markerSourcePosition" @moveend="event => handleMoveEnd(event, 'sourceLocation')">
      </l-marker>
      <l-marker draggable :lat-lng="markerDestinyPosition" @moveend="event => handleMoveEnd(event, 'destinyLocation')"></l-marker>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-geo-json :geojson="geojson"></l-geo-json>
      <l-control-zoom position="bottomright"  ></l-control-zoom>
    </l-map>
  </div>
</template>

<script lang="ts">

  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LControlZoom, LMarker, LIcon, LGeoJson} from "@vue-leaflet/vue-leaflet";
  import { useCoordinateStore } from '@/store/coordinateStore';
  import { watch, ref, computed} from "vue";
  import { LatLngTuple, LeafletEvent, LeafletMouseEvent, icon} from 'leaflet';
  import blackLogo from '../assets/marker-icons/marker-icon-2x-black.png'
  import shadowLogo from '../assets/marker-icons/marker-shadow.png'


export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom,
    LMarker,
    LIcon, 
    LGeoJson
  },
  data() {
    return {
      zoom: 14,
    
    };
  },
  setup(){

    const store = useCoordinateStore();
 
    const markerSourcePosition = computed(() => store.sourceLocation); 
    const markerDestinyPosition = computed(() => store.destinyLocation); 
   
    const geojson = computed(() => {
      console.log(store.modelResult)
      return store.modelResult
    })

    const markerIcon = icon({
        iconUrl: blackLogo,
        shadowUrl: shadowLogo,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    })

    const handleMoveEnd = (event: LeafletEvent, state: 'sourceLocation' | 'destinyLocation') => {
        const newPosition = event.target.getLatLng();
        const coordinate = [newPosition.lat, newPosition.lng] as LatLngTuple
        store[state] = coordinate
    }

    const onMapClick = (event: LeafletMouseEvent) => {
      const newPosition = event.latlng;
      const { buttonStateToInsert } = store;

      if (buttonStateToInsert === 'sourceLocation' || buttonStateToInsert === 'destinyLocation') {
          store[buttonStateToInsert] = [newPosition.lat, newPosition.lng];
          store.buttonStateToInsert = '';
      }
    }
    
    return {
      handleMoveEnd,
      onMapClick,
      markerSourcePosition,
      markerDestinyPosition,
      markerIcon,
      geojson
    }
  }
};
</script>

<style></style>