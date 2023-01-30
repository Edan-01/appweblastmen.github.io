let productList = document.getElementById("product-list");
let pagination = document.querySelector('.pagination');
const select = document.getElementById("filter-select");
let currentPage = 1;
let itemsPerPage = 12;
let id_Categoria = null;
let data;

fetch("https://hostingweb0-001-site4.atempurl.com/api/Producto")
    .then(response => response.json())
    .then(d => {
        data = d;
        displayProducts(data);
        createPagination(data);
    })
    .catch(error => console.log(error));

//Funcion para mostrar productos
function displayProducts(data, id_Categoria) {
    let products = id_Categoria ? data.filter(product => product.idCategoria === id_Categoria) : data;
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    products = products.slice(startIndex, endIndex);

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
                        <li><a id="product-button" data-product-id="${product.idProducto}" class="btn btn-success text-white mt-2" href="shop-single.html?productId=${product.idProducto}"><i class="far fa-eye"></i></a></li>
                    </div>
                </div>
                <div style="padding-left: 1.25rem; padding-right: 1.25rem; height: 80px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center;">
                    <a class="h3 text-decoration-none">${product.nombreProducto.substring(0,23)} | ${product.unidad_Medida}</a>
                </div>  
                <div style="background-color: #59AB6E;"><p class="text-center mb-0">S/ ${product.precioVenta} Soles</p></div>
            </div>
        `;
        productList.appendChild(productRow);
    });
}



// Aquí realizas una llamada a una API o cargas los productos
fetch("https://hostingweb0-001-site4.atempurl.com/api/Producto")
  .then(response => response.json())
  .then(data => {
      // Aquí manejas la respuesta de la API, probablemente quieras reemplazar los productos en el HTML
      displayProducts(data, id_Categoria);
  });


//Funcion para crear botones de paginación
function createPagination(data, id_Categoria) {
    let products = (id_Categoria === null || id_Categoria === undefined) ? data : data.filter(product => product.idCategoria === id_Categoria);
    let totalPages = Math.ceil(products.length / itemsPerPage);
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.innerHTML = i;
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", function() {
        currentPage = i;
        displayProducts(data, id_Categoria);
        createPagination(data, id_Categoria);
    });
    pagination.appendChild(button);
    }
}


// Función para filtrar los productos de manera general
function filtergeneral(filterValue) {
    // Ordenar los productos según el valor seleccionado en el select
    switch (filterValue) {
        case "default":
            fetch("https://hostingweb0-001-site4.atempurl.com/api/Producto")
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
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
}

// Agregar evento change a la funcion select filtergeneral
select.addEventListener("change", function() {
    const selectedValue = this.value;
    let id_Categoria = select.value;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
    filtergeneral(selectedValue);
  });


//Designar el filtro de los productos por categoria
document.getElementById("all-button").addEventListener("click", function() {
    id_Categoria = null;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
  });
document.getElementById("alimentos-button").addEventListener("click", function() {
    id_Categoria = 6;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
});
  
document.getElementById("bebidas-button").addEventListener("click", function() {
    id_Categoria = 7;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
});
  
document.getElementById("bienestarN-button").addEventListener("click", function() {
    id_Categoria = 5;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
});
  
document.getElementById("cuidadoP-button").addEventListener("click", function() {
    id_Categoria = 2;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
});
  
document.getElementById("dietasE-button").addEventListener("click", function() {
    id_Categoria = 4;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
});
  
document.getElementById("medicinaN-button").addEventListener("click", function() {
    id_Categoria = 3;
    currentPage = 1;
    displayProducts(data, id_Categoria);
    createPagination(data, id_Categoria);
});
  