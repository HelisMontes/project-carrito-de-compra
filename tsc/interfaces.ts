interface Variables {
    carrito:any,
    listaCarrito:any,
    btnVaciarCarrito:any,
    listaCursos:any
};

interface Data{
    id: number,
    img:string,
    titulo:string,
    autor:string,
    calificacion:string,
    precio:number,
    preciofinal:number
};

interface CarritoDeCompra{
    id: number,
    img:string,
    titulo:string,
    precio:number,
    cantidad:number;
};

interface InsertHTML{
    (data:Data)
}

interface UpdateDataCart{
    (data:CarritoDeCompra)
}

interface InsertDataCart{
    (data:CarritoDeCompra)
}
export{Variables, Data, CarritoDeCompra, InsertHTML, UpdateDataCart, InsertDataCart};