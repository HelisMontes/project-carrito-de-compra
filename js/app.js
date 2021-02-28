System.register(["./data.js"], function (exports_1, context_1) {
    "use strict";
    var data_js_1, variables, insertHTML, cargarData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (data_js_1_1) {
                data_js_1 = data_js_1_1;
            }
        ],
        execute: function () {
            variables = {
                carrito: document.querySelector('#carrito'),
                listaCarrito: document.querySelector('#lista-carrito tbody'),
                btnVaciarCarrito: document.querySelector('#vaciar-carrito'),
                listaCursos: document.querySelector('#lista-cursos')
            };
            insertHTML = (data) => {
                const { id, img, titulo, autor, calificacion, precio, preciofinal } = data;
                const lastrow = variables.listaCursos.lastChild;
                lastrow.appendChild(document.createElement("DIV")).setAttribute("class", "four columns");
                const columns = variables.listaCursos.lastChild.lastChild;
                columns.innerHTML = `
        <div class="card">
            <img src="${img}" class="imagen-curso u-full-width">
            <div class="info-card">
                <h4>${titulo}</h4>
                <p>${autor}</p>
                <img src="${calificacion}">
                <p class="precio">$${precio}<span class="u-pull-right ">$${preciofinal}</span></p>
                <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${id}">Agregar Al Carrito</a>
            </div>
        </div> <!--.card-->
        `;
            };
            cargarData = () => {
                data_js_1.data.map((res, index) => {
                    if (index == 0) {
                        variables.listaCursos.appendChild(document.createElement("DIV")).setAttribute("class", "row");
                        insertHTML(res);
                    }
                    if (index % 3 == 0) {
                        if (index > 1) {
                            variables.listaCursos.appendChild(document.createElement("DIV")).setAttribute("class", "row");
                            insertHTML(res);
                        }
                    }
                    else {
                        insertHTML(res);
                    }
                });
            };
            cargarData();
        }
    };
});
