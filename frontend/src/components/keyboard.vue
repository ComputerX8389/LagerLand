<template>
    <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

export default {
    name: 'keyboard',
    data() {
        return {
            keyboard: null,
            keyboardClass: 'simple-keyboard',
        };
    },
    mounted() {
        this.keyboard = new Keyboard(this.keyboardClass, {
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
        });
    },
    methods: {
        onChange(input) {
            this.$emit('onChange', input);
            console.log('sendt', input);
        },
        onKeyPress(button) {
            this.$emit('onKeyPress', button);

            if (button === '{shift}' || button === '{lock}') {
                this.handleShift();
            }
        },
        handleShift() {
            let currentLayout = this.keyboard.options.layoutName;
            let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

            this.keyboard.setOptions({
                layoutName: shiftToggle,
            });
        },
        setText(input) {
            this.keyboard.setInput(input);
            console.log('TEXT CHANGED', input);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
