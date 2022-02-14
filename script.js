const $sidebar = document.getElementById('sidebar')
const contents = document.querySelectorAll('h1, h2, h3')

// create dummy text
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

for (const heading of contents) {
    const $lorem = document.createElement('p')
    $lorem.textContent = lorem
    heading.insertAdjacentElement('afterend', $lorem)
}

// Create Table of Contents
$sidebar.innerHTML = '<span class="toc-title">Table of Contents</span>'
for (let i = 0; i < contents.length; i++) {
    let id = contents[i].textContent.toLowerCase()
    id = id.replaceAll(' ', '_')
    id = i + '-' + id

    $sidebar.innerHTML += `<a id='${id}-link' href='#${id}' class='${contents[i].tagName}'>${contents[i].textContent}</a>`
    
    contents[i].setAttribute('data-id', id + '-link')
    contents[i].setAttribute('id', id)
}
 

// scroll listener
let lastKnownScrollPosition = 0

function highlightHeading() {
    lastKnownScrollPosition = window.scrollY
    let foundHeading = false

    for (const heading of contents) {
        const $link = document.getElementById(heading.getAttribute('data-id'))
        if (!foundHeading && heading.offsetTop >= lastKnownScrollPosition) {
            $link.classList.add('highlighted')
            foundHeading = true
        } else {
            $link.classList.remove('highlighted')
        }
    }
}

highlightHeading() // call once to make sure it starts highlighted
document.addEventListener('scroll', highlightHeading)