import './style.css'

export default {

    props: {
        data: [],
        selected: [],
        item: ''
    },

    template() {
        return `
            <div class="doz-tagfield">
                <ul class="doz-tagfield-list">
                    ${this.each(this.props.selected, (item, i) => `
                        <li forceupdate onclick="this.$focusInput()" class="doz-tagfield-list-item">${item} 
                            <button onclick="this.$removeItem(${i})">&cross;</button>
                        </li>
                    `)}
                    <li><input type="text" onkeypress="this.$enterPress()" tabindex="1" d-bind="item" d-ref="item"/></li>
                </ul>
                <select style="display: none" multiple="multiple">
                    ${this.each(this.props.data, item => 
                        `<option selected="selected" value="${item.value}">${item.value}</option>`    
                    )}
                </select>
            </div>
        `
    },

    onUpdate() {
        this.$focusInput();
    },

    $focusInput() {
        this.ref.item.focus();
    },

    $enterPress(e) {
        if (e.keyCode === 13) {
            this.$addItem(this.props.item);
            this.props.item = '';
            e.target.value = '';
            e.target.focus();
        }
    },

    $addItem(item) {

        if (!item.trim() || this.props.selected.includes(item)) return;

        this.props.selected.push(item);
    },

    $removeItem(value) {
        console.log(this.props.selected[value])
    }
};