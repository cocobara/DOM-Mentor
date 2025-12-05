const getTemplate = (data = [], placeholder,selectedId) => {
    const text = placeholder ?? 'Выбери пункт'
    const items = data.map(item => {
        if(item.id===selectedId){
            text=item.value
        }
        return `
        <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
        `
    })
    return `<div class="select__input" data-type="input">
                <span data-type="value">${text}</span>
                <img class="img-down" src="plus.svg" data-type="arrow">
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                    ${items.join('')}
                </ul>
            </div>`
}

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.$el.classList.add('select')
        this.selectedId = null
        this.#render()
        this.#setup()
    }

    #render() {
        const { placeholder, data } = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder,this.selectedId)

    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')

    }
    clickHandler(e) {
        const { type } = e.target.dataset
        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            const id = e.target.dataset.id
            this.select(id)
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }
    get current() {
        return this.options.data.find(item => item.id === this.selectedId
        )
    }

    select(id) {
        this.selectedId = id
        this.$value.textContent=this.current.value
        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el=>{
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.close()
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove('img-down')
        this.$arrow.classList.add('img-up')


    }
    close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.add('down-img')
        this.$arrow.classList.remove('img-up')

    }

    destroy() {
        this.$el.classList.removeEventListener('click', this.clickHandler)

    }
}
