let various2;
let various;
let variousNAme = window.location.pathname;
let name = `name`;
let allImg;
document.addEventListener('DOMContentLoaded', () => {
    variousSet()

    getPersons(1, true)

})

function variousSet() {

    if (variousNAme == `/index.html` || variousNAme == `/`) {
        various2 = `characters`
        various = `people`
    }
    if (variousNAme == `/films.html`) {
        various = various2 = `films`;

    }
    if (variousNAme == `/starships.html`) {
        various = various2 = `starships`
    }
    if (variousNAme == `/vehicles.html`) {
        various = various2 = `vehicles`
    }
    if (variousNAme == `/species.html`) {
        various = various2 = `species`
    }
    if (variousNAme == `/planets.html`) {
        various = various2 = `planets`
    }
}

async function getPersons(page, create = false) {
    let url = `https://swapi.dev/api/${various}/?page=${page}`
    let data = await fetch(url)
    let xml = await data.json()

    showAllPerson(xml)
    if (create) {
        // if (xml.readyState == 4) {
        createPagination(xml.count, xml.results.length)
        document.querySelector('.number_page').classList.add('visible')
        activePagination()
        // }
    }


}


function showAllPerson(data) {
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.results.forEach(element => {
        let name = element.name;
        if (window.location.pathname == `/films.html`) {
            name = element.title
        }

        src = `https://starwars-visualguide.com/assets/img/${various2}/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg`
        console.log(src);
        let str = `<div class="card mb-3">
        <h3 class="card-header">${name}</h3>
        <img src="${src}" class="d-block user-select-none">
        </svg>
      </div>`

        content.insertAdjacentHTML('beforeend', str)
    });

    showPerson(data)
    allImg = document.querySelectorAll(`img.d-block.user-select-none`)
    for (let i = 0; i < allImg.length; i++) {
        checkImages(allImg[i])

    }
}
function showPerson(data) {
    let blocks = document.querySelectorAll('.content div.card')


    for (let i = 0; i < blocks.length; i++) {

        blocks[i].addEventListener('click', () => {
            showDetails(data.results[i], blocks[i].children[1].src)
            document.querySelector('.details').classList.add('show')
        });
    }
    document.querySelector('.border-info').addEventListener('click', () => {
        document.querySelector('.details').classList.remove('show')
    })
}
function showDetails(data, url) {
    let img = document.querySelector('.details .card-header img')
    let li = document.querySelectorAll('.details .info')
    let titles = document.querySelector('.details .card-title')

    if (variousNAme == `/index.html` || variousNAme == `/index.html`) {
        const { name, birth_year, eye_color, hair_color, height, mass } = data
        titles.textContent = name
        li[0].textContent = birth_year
        li[1].textContent = eye_color
        li[2].textContent = hair_color
        li[3].textContent = height
        li[4].textContent = mass

    }
    if (variousNAme == `/films.html`) {
        const { title, episode_id, director, producer, release_date } = data
        titles.textContent = title
        li[0].textContent = episode_id
        li[1].textContent = director
        li[2].textContent = producer
        li[3].textContent = release_date
    }
    if (variousNAme == `/starships.html`) {
        const { model, manufacturer, passengers, cost_in_credits, starship_class } = data
        titles.textContent = model
        li[1].textContent = manufacturer
        li[2].textContent = passengers
        li[3].textContent = starship_class
        li[4].textContent = cost_in_credits
    }
    if (variousNAme == `/vehicles.html`) {
        const { name, model, manufacturer, passengers, consumables, vehicle_class } = data
        titles.textContent = name
        li[0].textContent = model
        li[1].textContent = manufacturer
        li[2].textContent = passengers
        li[3].textContent = vehicle_class
        li[4].textContent = consumables
    }
    if (variousNAme == `/species.html`) {
        const { name, classification, designation, average_height, language, average_lifespan } = data
        titles.textContent = name
        li[0].textContent = classification
        li[1].textContent = designation
        li[2].textContent = average_height
        li[3].textContent = language
        li[4].textContent = average_lifespan
    }
    if (variousNAme == `/planets.html`) {
        const { name, rotation_period, orbital_period, diameter, climate, gravity } = data
        titles.textContent = name
        li[0].textContent = rotation_period
        li[1].textContent = orbital_period
        li[2].textContent = diameter
        li[3].textContent = climate
        li[4].textContent = gravity

    }

    img.src = url
    checkImages(img)
}

async function checkImages(img) {
    let responce = await fetch(img.src)
    if (!responce.ok) {
        return img.src = `https://starwars-visualguide.com/assets/img/placeholder.jpg`
    }
}
function activePagination() {
    let page = document.querySelectorAll('.page-item');
    for (let index = 0; index < page.length; index++) {
        page[index].addEventListener('click', function () {

            if (this == page[page.length - 1]) {
                for (let i = 0; i < page.length; i++) {
                    page[i].classList.remove('active');
                }
                page[page.length - 2].classList.add('active')
                getPersons(page[page.length - 2].firstElementChild.textContent)
            }
            else if (this == page[0]) {
                for (let i = 0; i < page.length; i++) {
                    page[i].classList.remove('active');
                }
                page[1].classList.add('active')
                getPersons(page[1].firstElementChild.textContent)
            }
            else {
                for (let i = 1; i < page.length; i++) {
                    page[i].classList.remove('active');
                }
                this.classList.add('active')
                getPersons(this.firstElementChild.textContent)
            }
        })
    }
}

function createPagination(all, current) {
    let line = ''
    let number = parseInt(all / current) + (all / current > parseInt(all / current) ? 1 : 0)
    for (let i = 0; i < number; i++) {
        if (i == 0) {
            line += `<li class="page-item active"><a class="page-link" href="#">${i + 1}</a></li>`
            continue
        }
        line += `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`
    }
    document.querySelector('.pagination li:first-child').insertAdjacentHTML('afterend', line)
}

// allImg = document.querySelectorAll(`img .d-block .user-select-none`)


