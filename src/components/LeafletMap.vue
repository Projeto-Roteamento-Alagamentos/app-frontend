<template>
  <div style="height:100%;">
    <l-map  :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom"  :options="{zoomControl: false}" :center="[-23.1896, -45.8841]">
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
import { LMap, LTileLayer, LControlZoom } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom
  },
  data() {
    return {
      zoom: 14,
    };
  },
};
</script>

<style></style>