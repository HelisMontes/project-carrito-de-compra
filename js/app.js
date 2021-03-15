System.register(["../js/data.js"], function (exports_1, context_1) {
    "use strict";
    var data_js_1, variables, cursosCarrito, insertHTML, cargarData, cargarEventos, seleccionarCrusos, eliminarCursos, cursoSeleccionado, updateDataCart, insertDataCart, insterHTML_Cart, syncStorage, vaciarCarrito;
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
            cursosCarrito = [];
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
                    if (index % 3 == 0) {
                        variables.listaCursos.appendChild(document.createElement("DIV")).setAttribute("class", "row");
                        insertHTML(res);
                    } else {
                        insertHTML(res);
                    }
                });
            };
            cargarEventos = () => {
                // Dispara cuando se presiona "Agregar Carrito"
                variables.listaCursos.addEventListener('click', seleccionarCrusos);
                // Eliminar un curso del carrito
                variables.carrito.addEventListener('click', eliminarCursos);
                //Cargar los cursos de localStorage
                window.addEventListener("load", (event) => {
                    cursosCarrito = JSON.parse(localStorage.getItem('carrito')) || []; // Si no hay registro en localStorage asigno un registro vació
                    insterHTML_Cart();
                });
                // Vaciar el carrito
                variables.btnVaciarCarrito.addEventListener('click', () => {
                    cursosCarrito = [];
                    vaciarCarrito();
                });
            };
            seleccionarCrusos = (e) => {
                e.preventDefault();
                // Selecciona el objeto que acciona el evento click
                if (e.target.classList.contains('agregar-carrito')) {
                    const curso = e.target.parentElement.parentElement;
                    cursoSeleccionado(curso);
                }
            };
            eliminarCursos = (e) => {
                e.preventDefault();
                if (e.target.classList.contains('borrar-curso')) {
                    const idCurso = e.target.getAttribute('data-id');
                    // Eliminar del arreglo del carrito
                    cursosCarrito = cursosCarrito.filter(curso => curso.id !== idCurso);
                    insterHTML_Cart();
                }
            };
            cursoSeleccionado = (curso) => {
                const objCurso = {
                    id: curso.querySelector('a').getAttribute('data-id'),
                    img: curso.querySelector('img').src,
                    titulo: curso.querySelector('h4').textContent,
                    precio: curso.querySelector('.precio span').textContent.substr(1),
                    cantidad: 1
                }; //Datos del curso actual
                const existe = cursosCarrito.some(curso => curso.id === objCurso.id); //Valido si existe el curso
                existe ? updateDataCart(objCurso) : insertDataCart(objCurso);
            };
            updateDataCart = (objCurso) => {
                const sumarCantidad = cursosCarrito.map(curso => {
                    if (curso.id === objCurso.id) {
                        curso.cantidad++;
                        curso.precio = Number(curso.precio) + Number(objCurso.precio);
                        return curso; //Retorna el Objeto actualizado
                    }
                    else {
                        return curso; //Retorna los Objetos que no son actualizado
                    }
                });
                cursosCarrito = [...sumarCantidad];
                insterHTML_Cart();
            };
            insertDataCart = (objCurso) => {
                cursosCarrito = [...cursosCarrito, objCurso];
                insterHTML_Cart();
            };
            insterHTML_Cart = () => {
                vaciarCarrito();
                cursosCarrito.map(cursos => {
                    const { img, titulo, precio, cantidad, id } = cursos;
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td>  
                <img src="${img}" width=100>
            </td>
            <td>${titulo}</td>
            <td>$${precio}</td>
            <td>${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>  
        `;
                    variables.listaCarrito.appendChild(row);
                });
                syncStorage();
            };
            syncStorage = () => {
                localStorage.setItem('carrito', JSON.stringify(cursosCarrito));
            };
            vaciarCarrito = () => {
                // contenedorCarrito.innerHTML = ''; // forma lenta
                // forma rapida (recomendada)
                while (variables.listaCarrito.firstChild) {
                    variables.listaCarrito.removeChild(variables.listaCarrito.firstChild);
                }
            };
            cargarData();
            cargarEventos();
        }
    };
});
