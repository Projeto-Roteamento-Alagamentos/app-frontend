<template>
  <div style="height:100%;">
    <div v-if="isLoading" class="loading-overlay">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <l-map @click="onMapClick"   :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom"  :options="{zoomControl: false}" :center="[-23.550520, -46.633308]">
      <l-marker v-if="markerSourcePosition" :icon="markerIcon" draggable :lat-lng="markerSourcePosition" @moveend="event => handleMoveEnd(event, 'sourceLocation')">
      </l-marker>
      <l-marker  v-if="markerDestinyPosition" draggable :lat-lng="markerDestinyPosition" @moveend="event => handleMoveEnd(event, 'destinyLocation')"></l-marker>
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
  import { useModalStore } from "@/store/modalStore";
  import { GeoJsonObject } from 'geojson';


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
    const modal = useModalStore();

    const markerSourcePosition = computed(() => store.sourceLocation); 
    const markerDestinyPosition = computed(() => store.destinyLocation); 
    const isLoading = computed(() => modal.loadingMap)
    const geojson = computed(() => { return store.modelResult })

    watch(() => store.sourceLocation, () => {
      store.modelResult = {
          type: "FeatureCollection",
          features: []
        } as GeoJsonObject
    });

    watch(() => store.destinyLocation, () => {
      store.modelResult = {
          type: "FeatureCollection",
          features: []
        } as GeoJsonObject
    });


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
      geojson, 
      isLoading
    }
  }
};
</script>

<style>

.loading-overlay {
  position: absolute; /* posiciona o loading em relação à div .relative-container */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7); /* background branco com um pouco de transparência */
  display: flex;
  justify-content: center;
  align-items: center; /* centra o conteúdo do loading na vertical e horizontal */
  z-index: 450; /* coloca o loading acima do conteúdo */
}

</style>