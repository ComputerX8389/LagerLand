<template>
    <div>
        <QrStream @decode="onDecode" />
    </div>
</template>

<script>
import { QrStream } from 'vue3-qr-reader';
export default {
    components: {
        QrStream,
    },
    methods: {
        onDecode(decodedString) {
            console.log(decodedString);
        },
    },
};
</script>

<style></style>
