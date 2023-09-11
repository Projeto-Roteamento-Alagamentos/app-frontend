import { defineStore } from 'pinia';
import { LatLngTuple, LeafletEvent, marker, LatLngExpression} from 'leaflet';
import { GeoJsonObject } from 'geojson';

export const useCoordinateStore = defineStore({
  id: 'coordinate',
  
  state: () => ({
    sourceLocation: [0, 0] as LatLngTuple,
    destinyLocation: [0, 0] as LatLngTuple,
    shouldInsertToMap: false,
    buttonStateToInsert: '', 
    modelResult: {
      type: "FeatureCollection",
      features: []
    } as  GeoJsonObject
  }),

  actions: {
    setCoordinate(location: 'sourceLocation' | 'destinyLocation', coordinate: LatLngTuple) {
      this[location] = coordinate;
    },
    toggleInsertState() {
      this.shouldInsertToMap = !this.shouldInsertToMap;
    },
    changeInsertState(location:'sourceLocation' | 'destinyLocation' ){
      if(this.buttonStateToInsert == location){
        this.buttonStateToInsert = ''
      }
      else this.buttonStateToInsert = location
    }
  }
});