//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //Muestra los autos a cargar

  llenarSelect(); //Llena las opciones de años
});

//Event listener para los select de búsqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = parseInt(e.target.value);
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

//Funciones
function mostrarAutos(autos) {
  limpiarHTML();

  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

    //Insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}

//Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del select
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

function filtrarAuto() {
  const result = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (result.length !== 0) {
    mostrarAutos(result);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados que coincidan";
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  //En caso se haya elegido una marca para filtrar la búsqueda de autos
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  //Si no se ha elegido una marca para filtrar, entonces devuelvo TODOS los autos
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
}
