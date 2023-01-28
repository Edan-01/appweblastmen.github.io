let productList = document.getElementById("product-list");
let pagination = document.querySelector('.pagination');
let currentPage = 1;
let itemsPerPage = 12;

fetch("http://lastpro-001-site1.btempurl.com/api/Producto")
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
        createPagination(data);
    })
    .catch(error => console.log(error));

//Function to display products
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
                            <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                            <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <a href="shop-single.html" class="h3 text-decoration-none">${product.nombreProducto} | ${product.unidad_Medida}</a>
                    <p class="text-center mb-0">S/ ${product.precioVenta}</p
                </div>
            </div>
        `;
        productList.appendChild(productRow);
    });
}

//Function to create pagination buttons
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
