<template>
    <DataTable :value="categories">
        <Column field="Name" header="Item"></Column>
        <Column field="Description" header="Description"></Column>
    </DataTable>
</template>

<script>
import axios from '@/apiClient';

export default {
    data() {
        return {
            categories: [],
        };
    },
    async created() {
        try {
            let response = await axios.get('/categories');
            console.log(response.data);
            this.categories = response.data;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style></style>
