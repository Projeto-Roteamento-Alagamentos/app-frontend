<template>
    <v-row>
        <v-col>
            <v-text-field
            v-model="latitudeCoordinate"
            :rules="coordinateLatitudeRules"
            label="Digite a latitude"
            type="number"
            required
            @input="updateStore"
            ></v-text-field>
        </v-col>
        <v-col>
            <v-text-field
            v-model="longitudeCoordinate"
            :rules="coordinateLongitudeRules"
            label="Digite a longitude"
            required
            @input="updateStore"
            ></v-text-field>
        </v-col>
    </v-row> 
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useCoordinateStore } from '@/store/coordinateStore';
    import { watch } from 'vue';
    import { LatLngTuple, LeafletEvent, marker, LatLngExpression } from 'leaflet';

    type LocationType = 'sourceLocation' | 'destinyLocation';

    export default defineComponent({
        name: 'CoordinateInput',
        props: {
                location: {
                type: String as () => LocationType,
                required: true
            }
        },
        setup(props) {

            const latitudeCoordinate = ref('');
            const longitudeCoordinate = ref('');
            const store = useCoordinateStore();


            watch(() => store[props.location], (newValue, oldValue) => {
                    latitudeCoordinate.value = String(newValue[0])
                    longitudeCoordinate.value = String(newValue[1])
                }
            );

            const isValidNumber = (value: string) => !isNaN(parseFloat(value)) || 'Por favor, insira um número válido.';
            const isValidLatitude = (value: string) => {
                const num = parseFloat(value);
                return (num >= -90 && num <= 90) || 'A latitude deve estar entre -90 e 90.';
            };
            const isValidLongitude = (value: string) => {
                const num = parseFloat(value);
                return (num >= -180 && num <= 180) || 'A longitude deve estar entre -180 e 180.';
            };

            const coordinateLongitudeRules = [
                isValidNumber,
                isValidLongitude
            ];

            const coordinateLatitudeRules = [ 
                isValidNumber,
                isValidLatitude,
            ]

            const updateStore = () => {
                const coordinates = [parseFloat(latitudeCoordinate.value), parseFloat(longitudeCoordinate.value)] as LatLngTuple
                store.setCoordinate(props.location, coordinates);
               
            };


            return {
                latitudeCoordinate,
                longitudeCoordinate,
                coordinateLongitudeRules,
                coordinateLatitudeRules,
                updateStore
            };
    }
})

</script>

<style>

</style>