<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer
            v-model="drawer"
            temporary
            >
            <hr>
            <v-container class="mt-8">
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                    <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
                </v-list>
            </v-container >
            
        </v-navigation-drawer>
        
        <v-main style="height: 100vh">
            
            <v-btn
            class="ma-2 circular-btn"
            color="white"
            style="position: absolute; z-index: 1000000;"
            @click.stop="drawer = !drawer"
            >
            <div :class="{ 'menu-icon': true, 'open': drawer }">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </v-btn>
        
        <LeafletMap></LeafletMap>
        <MapMenu></MapMenu>
        
    </v-main>
</v-layout>
</v-card>
</template>



<script>
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import LeafletMap from '../LeafletMap.vue';
import MapMenu from '../MapMenu.vue';


export default defineComponent({
    name: "NavigationBar",
    components: {
        LeafletMap,
        MapMenu
    },
    data () {
        return {
            drawer: null,
        }
    },
})

</script>



<style scoped>
.sidenav{
    position: absolute;
    z-index: 10000;
    top: 10px;
    left: 10px;
}

.menu-icon {
    width: 24px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}

.menu-icon > div {
    width: 100%;
    height: 3px;
    background-color: rgb(68, 60, 60); /* ou outra cor de sua preferência */
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-icon.open > div:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.menu-icon.open > div:nth-child(2) {
    opacity: 0;
}

.menu-icon.open > div:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}
</style>
