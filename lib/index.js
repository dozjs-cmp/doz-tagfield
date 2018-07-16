import style from './style.css'
import boundList from './bound-list'

export default {

    components: {
        'bound-list': boundList
    },

    props() {
        return {
            data: [],
            selected: [],
            name: 'tagfield',
            active: -1,
            tagColor: '#000',
            tagBackground: 'beige',
            crossChar: '&cross;',
            insertOnBlur: true,
            search: ''
        }
    },

    template() {

        const tagActiveStyle = this.toStyle({
            color: this.props.tagBackground,
            background: this.props.tagColor
        });

        const tagStyle = this.toStyle({
            color: this.props.tagColor,
            background: this.props.tagBackground
        });

        return `
            <div class="${style.wrapper}" onclick="this.$focusInput()" onkeydown="this.$onKeyDown()" >
                <ul class="${style.list}">
                    ${this.each(this.props.selected, (item, i) => `
                        <li class="${style.listItem}" ${i === this.props.active ? `${tagActiveStyle}` : `${tagStyle}`}>
                            <div onclick="this.$selectItem(${i})" >
                                ${item} <button ${i === this.props.active ? `${tagActiveStyle}` : `${tagStyle}`} onclick="this.$removeItem(${i})">${this.props.crossChar}</button>
                            </div>
                        </li>
                    `)}
                    <li class="${style.input}">
                        <input 
                            type="text" 
                            oninput="this.$onInput()"
                            onkeydown="this.$onInputKeyDown()"
                            onkeypress="this.$onInputKeyPress()" 
                            onblur="this.$onInputBlur()"
                            d-ref="input"
                            size="1"
                        >
                    </li>
                </ul>
                <select class="${style.selected}" multiple="multiple" name="${this.props.name}">
                    ${this.each(this.props.selected, item => `
                        <option selected="selected">${item}</option>
                    `)}
                </select>
            </div>
            <bound-list d:alias="boundList"
                search="${this.props.search}"
            ></bound-list>
        `
    },

    onMountAsync() {
        this.children.boundList.props.data = this.props.data;
    },

    onUpdate() {
        this.$focusInput();
    },

    $focusInner: false,

    $focusInput() {
        this.$focusInner = true;
        this.ref.input.focus();
    },

    $setInputSize(e) {
        e.target.setAttribute('size', e.target.value.length);
    },

    $onInput(e) {
        this.$setInputSize(e);
        this.props.search = e.target.value;
    },

    $onInputKeyPress(e) {
        if (e.keyCode === 13) {
            let value = e.target.value.trim();
            if(this.$addItem(value))
                e.target.value = '';
            e.target.focus();
        }

        this.props.active = -1;
    },

    $onInputKeyDown(e) {
        if(e.keyCode === 8 && e.target.value.length === 0) {
            this.props.selected.pop();
        }
    },

    $onKeyDown(e) {

        e.stopPropagation();

        const current = this.props.active;
        const code = e.keyCode;
        if (code === 46) {
            this.$removeItem(current);
        }
    },

    $onInputBlur() {
        this.$focusInner = false;
        setTimeout(()=> {
            if (!this.$focusInner) {
                if(this.props.insertOnBlur)
                    this.$addItem(this.ref.input.value);
                this.props.active = -1;
            }
        },100);
    },

    $addItem(value) {
        if (!value.trim() || this.props.selected.includes(value)) return false;
        this.props.selected.push(value);
        return true;
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