import DozTagfield from './src/doz-tagfield'

// expose component to global scope
if (typeof window !== 'undefined' && window.Doz) {
    Doz.component('doz-tagfield', DozTagfield)
}

export { DozTagfield }

export default DozTagfield