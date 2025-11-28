import { Select } from './select/select'
import './select/styles.scss'
const select = new Select('#select', {
    placeholder: 'Menu label',
    data: [
        { id: '1', value: 'Label 1' },
        { id: '2', value: 'Label 2' },
        { id: '3', value: 'Label 3' },
        { id: '4', value: 'Label 4' },
        { id: '5', value: 'Label 5' },
    ]
})
window.s = select