import './style.css'

export default {

    props: {
        data: []
    },

    template() {//console.log(this.props.data)
        return `
            <select multiple>
                ${this.each(this.props.data, item => {
                    console.log(item);
                    `<option value="${item.id}">${item.email}</option>`    
                })}
            </select>
        `
    },

    onUpdate() {

    },

    onAppReady() {

    }
};