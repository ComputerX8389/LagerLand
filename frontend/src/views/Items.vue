<template>
    <DataTable :value="items">
        <Column field="Name" header="Item"></Column>
        <Column field="Description" header="Description"></Column>
        <Column field="CategoryName" header="Category"></Column>
        <Column field="CheckStatus" header="CheckStatus"></Column>
    </DataTable>
</template>

<script>
import axios from '@/apiClient';

export default {
    data() {
        return {
            items: [],
        };
    },
    async created() {
        try {
            let response = await axios.get('/items');
            console.log('Items', response.data);
            this.items = response.data;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style></style>
