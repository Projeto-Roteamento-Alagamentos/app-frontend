<template>
  <div class="map-menu">

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
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 900;
    padding: 50px;
    margin-top: 20px;
    background-color: black;
  }

</style>
