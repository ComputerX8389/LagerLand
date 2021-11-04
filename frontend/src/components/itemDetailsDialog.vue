<template>
    <Button icon="pi pi-info" label="Details" @click="open" />

    <Dialog :header="itemInfo.Name" v-model:visible="display">
        <div class="minWidth">
            <p>Description: {{ itemInfo.Description }}</p>
            <p>Category: {{ itemInfo.CategoryName }}</p>
            <p>CheckStatus: {{ itemInfo.CheckStatus }}</p>
        </div>
    </Dialog>
</template>

<script>
import axios from '@/apiClient';

export default {
    name: 'itemDetailsDialog',
    props: {
        itemID: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            display: false,
            itemInfo: {},
        };
    },
    methods: {
        async open() {
            this.display = true;
            let response = await axios.get(`/items/${this.itemID}`);
            this.itemInfo = response.data;
            console.log('Item', response.data);
        },
    },
};
</script>

<style scoped>
.minWidth {
    min-width: 500px;
}
</style>
