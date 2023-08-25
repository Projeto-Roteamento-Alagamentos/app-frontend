<template>
  <div class="map-menu">
    <!-- <SearchBar v-model="searchQuery" /> -->
  </div>
</template>
  
<script lang="ts">
import SearchBar from '../components/commom/SearchBar.vue';
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      searchQuery: '',
      startDate: null,
      endDate: null
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  height: 100%;
}
</style>
