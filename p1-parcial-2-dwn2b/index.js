const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const filtros = document.getElementById("inputGroupSelect03")
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}
let filtro = ""

document.addEventListener("change", e => { filtro = e.target.value
    cards.innerHTML= ""})

// let filtro2 = nombreFiltro()







document.addEventListener('DOMContentLoaded', e => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        mostrarCarrito()
    }
});
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

const fetchData = async () => {
    const res = await fetch('catalogo.json');
    const data = await res.json()
    document.addEventListener("change", e => { filtro = e.target.value
        cards.innerHTML= ""
        mostrarElementos(data)
    })
    mostrarElementos(data)
}

function mostrarElementos(data) {
    let filtrados = data.filter(item => {
        return item.filtros.includes(filtro)})
        filtrados.forEach(item => {
            templateCard.querySelector('h5').textContent = item.titulo
            templateCard.querySelector('p').textContent = item.precio
            templateCard.querySelector('button').dataset.id = item.id
            templateCard.querySelector('img').setAttribute("src", item.imagenUrl)
            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        })
        cards.appendChild(fragment)
    }


function addCarrito(e) {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
}

function setCarrito(item) {
    const producto = {
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = { ...producto }
    mostrarCarrito()
}

function mostrarCarrito() {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    cargaFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function cargaFooter() {
    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acumulador, { cantidad }) => acumulador + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acumulador, { cantidad, precio }) => acumulador + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        mostrarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        mostrarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = { ...producto }
        }
        mostrarCarrito()
    }
}
