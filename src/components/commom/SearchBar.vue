<template>
        <v-text-field
            label="Append inner"
            append-inner-icon="mdi-map-marker"
            variant="outlined"
          ></v-text-field>

</template>

<script>
export default {
// props: {
//     // id: {
//     // type: String,
//     // required: true
//     // },
//     // label: {
//     // type: String,
//     // default: ''
//     // },
//     // value: {
//     // type: String,
//     // default: ''
//     // }
// },
data() {
    return {
        selectedDate: null
    };
},
watch: {
    // selectedDate(newVal) {
    // this.$emit('input', newVal);
    // }
}, 
mounted(){
   
},

};
</script>

<style>

</style>
