<template>
    <NavigationBar></NavigationBar>
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
