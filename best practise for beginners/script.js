const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')
const progress = document.querySelector('#progress')
const form = document.querySelector('#form')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)
modal.addEventListener('change', toggleTech)
form.addEventListener('submit', createTech)

const APP_TITLE = document.title
const LS_KEY = "MY_TECHS"


const techologies = getState()

function openCard(event) {
    const data = event.target.dataset
    const tech = techologies.find(t => t.type === data.type)
    if (!tech) return
    openModal(toModal(tech), tech.title)
}

function toModal(tech) {
    const checked = tech.done ? 'checked' : ' '
    return `
        <h2><h2>${tech.title}</h2>
      <p>${tech.description}</p>
      <hr>
      <div>
        <input type="checkbox" id="done"${checked} data-type="${tech.type}">
        <label for="done">Выучил</label>
      </div></h2>
    `
}

function toggleTech(event) {
    const type = event.target.dataset.type
    const tech = techologies.find(t => t.type === type)
    tech.done = event.target.checked
    saveState()
    init()
    setTimeout(() => {
        modal.classList.remove('open')
    }, 150);


}

function openModal(html, title = APP_TITLE) {
    document.title = `${title} | ${APP_TITLE}`

    modal.innerHTML = html
    modal.classList.add('open')

}

function closeModal() {
    document.title = APP_TITLE
    modal.classList.remove('open')

}
function init() {
    renderCards()
    renderProgress()
}
function renderProgress() {
    const percent = computeProgressPercent()
    let background
    if (percent <= 30) {
        background = '#E75A5A'
    } else if (percent > 30 && percent < 70) {
        background = '#F99415'
    } else {
        background = '#73BA3C'
    }

    progress.style.background = background
    progress.style.width = percent + '%'
    progress.textContent = percent ? percent + '%' : ''
}

function computeProgressPercent() {
    if (techologies.length === 0) {
        return 0
    }
    let doneCount = 0
    for (let i = 0; i < techologies.length; i++) {
        if (techologies[i].done) doneCount++
    }
    return Math.round((100 * doneCount) / techologies.length)
}

function renderCards() {
    if (techologies.length === 0) {
        content.innerHTML = '<p class="empty">Нет пока технологий. Добавьте</p>'
    } else {
        let html = ' '
        for (let i = 0; i < techologies.length; i++) {
            const tech = techologies[i]
            html += toCard(tech)
        }
        content.innerHTML = html
    }

}

function toCard(tech) {
    let doneClass = ''
    if (tech.done) {
        doneClass = 'done'
    }
    return `
        <div class="card ${doneClass}" data-type="${tech.type}">
                <h3 data-type="${tech.type}">${tech.title}</h3>
            </div>
        `
}
function isInvalid(title, description) {
    return !title.value || !description.value
}

function createTech(event) {
    event.preventDefault()
    const title = event.target.title
    const description = event.target.description

    if (isInvalid(title, description)) {
        if (!title.value) title.classList.add('invalid')
        if (!description.value) description.classList.add('invalid')
        setTimeout(() => {
            title.classList.remove('invalid')
            description.classList.remove('invalid')
        }, 2000)

        return
    }

    const newTech = {
        title: title.value,
        description: description.value,
        done: false,
        type: title.value.toLowerCase()
    }
    techologies.push(newTech)
    title.value = ''
    description.value = ''
    saveState()
    init()
}

function saveState() {
    localStorage.setItem(LS_KEY, JSON.stringify(techologies))
}

function getState() {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : []
}

init()