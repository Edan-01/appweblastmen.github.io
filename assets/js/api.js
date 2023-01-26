let productList = document.getElementById("product-list");

// Hace una petición GET a la API
fetch("http://lastpro-001-site1.btempurl.com/api/Producto")
    .then(response => response.json())
    .then(data => {
        // Recorre la lista de productos recibida
        data.forEach(product => {
            // Agrega una tarjeta para cada producto
            productList.innerHTML += `
                <div class="col-md-4">
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
                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                <li>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                </li>
                            </ul>
                            <p class="text-center mb-0">S/ ${product.precioVenta}</p
                        </div>
                    </div>
                </div>
            `;
        });
    })
.catch(error => console.log(error));

