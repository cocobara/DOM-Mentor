let tabNavItem = document.querySelectorAll(".tab-nav-item")
let tabNavItemBor = document.querySelectorAll(".tab-nav-item-bor")

tabNavItem.forEach(function (elem) {
    elem.addEventListener('click', activeTab)
})

tabNavItemBor.forEach(function (elem) {
    elem.addEventListener('click', activeTabBor)
})
function activeTab() {
    tabNavItem.forEach(function (elem) {
        elem.classList.remove('active')
    })
    this.classList.add('active')
}
function activeTabBor() {
    tabNavItemBor.forEach(function (elem) {
        elem.classList.remove('active')
    })
    this.classList.add('active')
}