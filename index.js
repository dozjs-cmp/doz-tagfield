import Doz from 'doz'
import cmp from './lib'

// expose component to global scope
if (typeof window !== 'undefined') {
    Doz.component('doz-tagfield', cmp)
}

export default cmp