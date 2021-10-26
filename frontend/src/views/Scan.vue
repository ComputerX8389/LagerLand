<template>
    <div class="p-grid p-flex-row-reverse">
        <div class="p-md-5 p-lg-4">
            <p>Scan item</p>
            <div class="qrCodeStreamViewer">
                <QrStream @decode="onDecode" class="qrCodeStreamViewer" />
            </div>
        </div>
        <div class="p-md-7 p-lg-8">
            <Card class="cardStyle" v-for="scan in scans" :key="scan.ScanID">
                <template #title> {{ scan.ScanTime.toLocaleString('da-DK') }} </template>
                <template #content>
                    <p>User: {{ scan.FullName }}</p>
                    <p>Item: {{ scan.ItemName }}</p>
                </template>
                <template #footer>
                    <itemDialog :itemID="scan.ItemID" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
import { QrStream } from 'vue3-qr-reader';
import axios from '@/apiClient';
import itemDialog from '@/components/itemDialog.vue';

export default {
    components: {
        QrStream,
        itemDialog,
    },
    data() {
        return {
            scanned: false,
            scans: [],
        };
    },
    methods: {
        async onDecode(decodedString) {
            try {
                if (decodedString) {
                    let json = JSON.parse(decodedString);
                    console.log(json);
                    let itemID = json.itemID;

                    let response = await axios.post('/scans', {
                        ItemID: itemID,
                    });
                    console.log('Scanned', response.data);
                    let scannedItem = response.data.Item;
                    this.$toast.add({
                        severity: 'success',
                        summary: scannedItem.Name + ' scanned',
                        detail: scannedItem.Name + ' have been checked ' + (scannedItem.CheckStatus == 0 ? 'In' : 'Out'),
                        life: 3000,
                    });
                    this.updateScans();
                }
            } catch (error) {
                console.log(error);
                this.$toast.add({ severity: 'error', summary: 'Unknown error', detail: 'Scanning error', life: 3000 });
            }
        },

        async updateScans() {
            try {
                let response = await axios.get('/scans');
                response.data.forEach((element) => {
                    element.ScanTime = new Date(element.ScanTime);
                });
                this.scans = response.data;
                console.log('scans', response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.updateScans();
    },
};
</script>

<style>
.cardStyle {
    max-width: 300px;
    display: inline-block;
    margin: 10px;
}
.qrCodeStreamViewer {
    max-height: 300px;
    position: relative !important;
}
</style>
