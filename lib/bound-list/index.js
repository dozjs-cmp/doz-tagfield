import style from './style.css'

export default {

    props() {
        return {
            data: [],
            search: ''
        }
    },

    template() {

        return `
            <ul class="${style.list}">
                ${this.each(this.props.data, item =>
                    this.props.search && 
                    item.value.indexOf(this.props.search) !== -1 
                        ? `<li>${item.value}</li>` 
                        : ''
                )}
            </ul>
        `
    }

}