import './style.css'

export default {

    props: {
        data: [],
        selected: [],
        item: ''
    },

    template() {
        return `
            <div class="doz-tagfield" onclick="this.$focusInput()">
                <ul class="doz-tagfield-list">
                    ${this.each(this.props.selected, (item, i) => `
                        <li class="doz-tagfield-list-item">
                            ${item} <button onclick="this.$removeItem(${i})">&cross;</button>
                        </li>
                    `)}
                    <li class="doz-tagfield-input">
                        <input 
                            type="text" 
                            oninput="this.$setInputSize()"
                            onkeypress="this.$enterPress()" 
                            d-ref="input">
                        <div d-ref="inputSize" class="doz-tagfield-input-size"></div>
                    </li>
                </ul>
            </div>
        `
    },

    onUpdate() {
        this.$focusInput();
    },

    $focusInput() {
        this.ref.input.focus();
    },

    $setInputSize(e) {
        const inputSize = this.ref.inputSize;
        const input = this.ref.input;
        inputSize.innerText = e.target.value;
        input.style.width = (inputSize.clientWidth + 10) + 'px';
    },

    $enterPress(e) {
        if (e.keyCode === 13) {
            let value = e.target.value.trim();
            e.target.value = '';
            this.$addItem(value);
            e.target.focus();
        }
    },

    $addItem(value) {
        if (!value.trim() || this.props.selected.includes(value)) return;
        this.props.selected.push(value);
    },

    $removeItem(value) {
        this.props.selected.splice(value, 1);
    }
};