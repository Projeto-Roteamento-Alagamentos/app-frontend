<template>
  <NavigationBar></NavigationBar>
  <v-main class="mt-4">
  <v-container class="main-content"> 
    <v-row>
      <v-col cols="8">
        <LeafletMap></LeafletMap>
      </v-col>
      <v-col cols="4">
        <MapMenu></MapMenu>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeafletMap from '../components/LeafletMap.vue';
import MapMenu from '../components/MapMenu.vue';
import NavigationBar from '@/components/commom/NavigationBar.vue';


export default defineComponent({
  name: 'HomePage',
  components: {
    LeafletMap, 
    MapMenu,
    NavigationBar
  }
});
</script>

<style scoped>
  .main-content{
    border: 1px solid black;
  }
</style>
