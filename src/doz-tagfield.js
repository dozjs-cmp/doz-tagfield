import './style.css'

export default {

    props: {
        data: []
    },

    template() {//console.log(this.props.data)
        return `
            <select multiple="multiple">
                ${this.each(this.props.data, item => 
                    `<option value="${item.id}">${item.value}</option>`    
                )}
            </select>
        `
    },

    onUpdate() {

    },

    onAppReady() {

    }
};