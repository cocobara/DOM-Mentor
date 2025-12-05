let fruits = [
    { id: 1, title: 'Яблоки', price: 20, img: 'https://images.everydayhealth.com/images/diet-nutrition/apples-101-about-1440x810.jpg?sfvrsn=f86f2644_5' },
    { id: 2, title: 'Апельсины', price: 30, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-gyKbyPl_Y7QtPNAWFvDgYjNE8Qc3fU2WtOrHVzsw-SWWF6ZvFCfInbxvDvLLkWTPfdMBaZNVHm3A1E2n5X72ySVT4oIvw3FRn_T8Ce9nA&s=10' },
    { id: 3, title: 'Манго', price: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyP3jQtkbSytspvcy-8EH0XEqlmlnWndPHug&s' }
]
const toHTML = fruit =>
    `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="${fruit.img}" style="height: 300px; width:300px" class="card-img-top" alt="${fruit.title}">
                    <div class="card-body">
                        <h5 class="card-title">${fruit.title}</h5>
                        <a href="#" class="btn btn-primary" data-btn="price" data-id=${fruit.id}>Посмотреть цену</a>
                        <a href="#" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>Удалить</a>
                    </div>
                </div>
            </div>
`


function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render();
const modal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                modal.close()
            }
        },

    ]
});








document.addEventListener('click', e => {
    e.preventDefault()
    const btnType = e.target.dataset.btn
    const id = +e.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    if (btnType === 'price') {

        modal.setContent(`
            <p>цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
            `)
        modal.open()
        console.log(id, fruit)
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'ARE u sure??',
            content: `<p>Вы удаляете <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        })

    }
})
