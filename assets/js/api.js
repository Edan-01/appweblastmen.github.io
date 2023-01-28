let productList = document.getElementById("product-list");
let pagination = document.querySelector('.pagination');
let currentPage = 1;
let itemsPerPage = 12;
let data;

fetch("http://lastpro-001-site1.btempurl.com/api/Producto")
    .then(response => response.json())
    .then(d => {
        data = d;
        displayProducts(data);
        createPagination(data);
    })
    .catch(error => console.log(error));

//Funcion para mostrar productos
function displayProducts(data) {
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let products = data.slice(startIndex, endIndex);

    productList.innerHTML = "";

    products.forEach(product => {
        let productRow = document.createElement("div");
        productRow.classList.add("col-md-3");
        productRow.innerHTML = `
            <div class="card mb-4 product-wap rounded-0">
                <div class="card rounded-0">
                    <img class="card-img rounded-0 img-fluid" src="https://verdenaturalmarket.pe/1378-catalog_medium/mermelada-mango-organico-yacon-c-agave-240-gr.jpg">
                    <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul class="list-unstyled">                            
                            <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <a href="shop-single.html" class="h3 text-decoration-none">${product.nombreProducto.toUpperCase()} | ${product.unidad_Medida.toUpperCase()}</a>
                    <p class="text-center mb-0">S/ ${product.precioVenta}</p
                </div>
            </div>
        `;
        productList.appendChild(productRow);
    });
}

//Funcion para crear botones de paginación
function createPagination(data) {
    let totalPages = Math.ceil(data.length / itemsPerPage);
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.innerHTML = i;
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", function() {
            currentPage = i;
            displayProducts(data);
            createPagination(data);
        });
        pagination.appendChild(button);
    }
}

// Función para filtrar los productos
function filterProducts(filterValue) {
    // Ordenar los productos según el valor seleccionado en el select
    switch (filterValue) {
        case "default":
            fetch("http://lastpro-001-site1.btempurl.com/api/Producto")
            .then(response => response.json())
            .then(d => {
            data = d;
            displayProducts(data);
            createPagination(data);
            })
            .catch(error => console.log(error));
            break;
        case "name-asc":
            data.sort((a, b) => (a.nombreProducto > b.nombreProducto) ? 1 : -1);
            break;
        case "price-desc":
            data.sort((a, b) => (a.precioVenta > b.precioVenta) ? -1 : 1);
            break;
        case "price-asc":
            data.sort((a, b) => (a.precioVenta > b.precioVenta) ? 1 : -1);
            break;
    }
    // Mostrar los productos ordenados
    displayProducts(data);
    createPagination(data);
}

// Agregar evento change al select
const select = document.getElementById("filter-select");
select.addEventListener("change", function() {
    const selectedValue = this.value;
    filterProducts(selectedValue);
});






