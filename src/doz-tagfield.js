import './style.css'

export default {

    props: {
        data: [],
        selected: [],
        name: 'tagfield',
        active: -1,
        tagColor: '#000',
        tagBackground: 'beige'
    },

    template() {

        const tagActiveStyle = `style="color: ${this.props.tagBackground}; background: ${this.props.tagColor}"`;
        const tagStyle = `style="background: ${this.props.tagBackground}; color: ${this.props.tagColor}"`;

        return `
            <div class="doz-tagfield" onclick="this.$focusInput()" onkeydown="this.$keyDown()">
                <ul class="doz-tagfield-list">
                    ${this.each(this.props.selected, (item, i) => `
                        <li class="doz-tagfield-list-item" ${i === this.props.active ? `${tagActiveStyle}` : `${tagStyle}`}>
                            <div onclick="this.$selectItem(${i})" >
                                ${item} <button ${i === this.props.active ? `${tagActiveStyle}` : `${tagStyle}`} onclick="this.$removeItem(${i})">&cross;</button>
                            </div>
                        </li>
                    `)}
                    <li class="doz-tagfield-input">
                        <input 
                            type="text" 
                            oninput="this.$setInputSize()"
                            onkeydown="this.$inputKeyDown()"
                            onkeypress="this.$inputKeyPress()" 
                            d-ref="input"
                            size="1"
                        >
                    </li>
                </ul>
                <select class="doz-tagfield-selected" multiple="multiple" name="${this.props.name}">
                    ${this.each(this.props.selected, item => `
                        <option selected="selected">${item}</option>
                    `)}
                </select>
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
        e.target.setAttribute('size', e.target.value.length);
    },

    $inputKeyPress(e) {
        if (e.keyCode === 13) {
            let value = e.target.value.trim();
            e.target.value = '';
            this.$addItem(value);
            e.target.focus();
        }

        this.props.active = -1;
    },

    $inputKeyDown(e) {
        if(e.keyCode === 8 && e.target.value.length === 0) {
            this.props.selected.pop();
        }
    },

    $keyDown(e) {

        e.stopPropagation();

        const current = this.props.active;
        const code = e.keyCode;
        if(code === 37) {
            if (current > 0) {
                this.props.active -= 1;
            } else {
                this.props.active = this.props.selected.length -1;
            }
        } else if (code === 39) {
            if (current < this.props.selected.length -1){
                this.props.active += 1;
            } else {
                this.props.active = 0;
            }
        } else if (code === 46) {
            this.$removeItem(current);
        }
    },

    $addItem(value) {
        if (!value.trim() || this.props.selected.includes(value)) return;
        this.props.selected.push(value);
    },

    $removeItem(value, e) {
        if (e)
            e.stopPropagation();
        this.props.selected.splice(value, 1);
        this.props.active = -1;
    },

    $selectItem(value) {
        this.props.active = value;
    }
};