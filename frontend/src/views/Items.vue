<template>
    <DataTable :value="items">
        <Column field="Name" header="Item"></Column>
        <Column field="Description" header="Description"></Column>
        <Column field="CategoryName" header="Category"></Column>
    </DataTable>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: [],
        };
    },
    async created() {
        try {
            let response = await axios.get(process.env.VUE_APP_API_URL + '/items');
            console.log(response.data);
            this.items = response.data;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style></style>
