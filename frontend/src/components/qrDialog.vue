<template>
    <Button type="button" @click="display = true" icon="pi pi-print"></Button>
    <Dialog :header="'QR code for ' + itemName" v-model:visible="display">
        <qrcodeVue :value="value" :size="size" level="H" />
    </Dialog>
</template>

<script>
import qrcodeVue from 'qrcode.vue';

export default {
    name: 'qrDialog',
    props: ['itemID', 'itemName'],
    components: {
        qrcodeVue,
    },
    data() {
        return {
            display: false,
            value: JSON.stringify({ itemID: this.itemID }),
            size: 200,
        };
    },
};
</script>

<style scoped></style>
