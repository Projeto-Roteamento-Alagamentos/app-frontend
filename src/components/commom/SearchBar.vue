<template>
<div>
    <label :for="id">{{ label }}</label>
    <input 
    type="text" 
    :id="id"
    v-model="selectedDate" 
    />
</div>
</template>

<script>
export default {
props: {
    id: {
    type: String,
    required: true
    },
    label: {
    type: String,
    default: ''
    },
    value: {
    type: String,
    default: ''
    }
},
data() {
    return {
        selectedDate: null
    };
},
watch: {
    selectedDate(newVal) {
    this.$emit('input', newVal);
    }
}, 
mounted(){
   
},

};
</script>

<style>
input{
    border: 1px solid black;
}
</style>
