const modalLogin = document.getElementById("loginModal");
const modalRegistro = document.getElementById("registroModal");

const btnLogin = document.querySelector(".login-btn");
const closeLogin = document.querySelector(".close");
const closeRegistro = document.querySelector(".close-reg");
const crearCuenta = document.getElementById("crearCuenta");

if (btnLogin && modalLogin) {
  btnLogin.onclick = () => modalLogin.style.display = "block";
}

if (closeLogin && modalLogin) {
  closeLogin.onclick = () => modalLogin.style.display = "none";
}

if (crearCuenta && modalLogin && modalRegistro) {
  crearCuenta.onclick = (e) => {
    e.preventDefault();
    modalLogin.style.display = "none";
    modalRegistro.style.display = "block";
  };
}

if (closeRegistro && modalRegistro) {
  closeRegistro.onclick = () => modalRegistro.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modalLogin) modalLogin.style.display = "none";
  if (event.target == modalRegistro) modalRegistro.style.display = "none";
};

// aqui es el carritooo
document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total");
  const contadorCarrito = document.getElementById("contador-carrito");

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function mostrarCarrito() {
    if (listaCarrito && totalCarrito) {
      listaCarrito.innerHTML = "";

      carrito.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${producto.nombre}</td>
          <td>$${producto.precio}</td>
          <td>
            <input type="number" class="cantidad" value="${producto.cantidad}" min="1">
          </td>
          <td><button class="eliminar">Eliminar</button></td>
        `;
        listaCarrito.appendChild(fila);

        fila.querySelector(".eliminar").addEventListener("click", () => {
          carrito = carrito.filter(p => p.nombre !== producto.nombre);
          guardarCarrito();
          mostrarCarrito();
        });

        fila.querySelector(".cantidad").addEventListener("change", e => {
          producto.cantidad = parseInt(e.target.value);
          guardarCarrito();
          mostrarCarrito();
        });
      });

      calcularTotal();
    }
    actualizarContador();
  }

  function calcularTotal() {
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    if (totalCarrito) totalCarrito.textContent = total;
  }

 function actualizarContador() {
  if (contadorCarrito) {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contadorCarrito.textContent = totalItems;

    contadorCarrito.classList.add("animar");
    setTimeout(() => {
      contadorCarrito.classList.remove("animar");
    }, 300);
  }
}

  function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
  }

  mostrarCarrito();
// aqui empiezan los botoneees del carritooo
  const botonesCarrito = document.querySelectorAll(".btn-carrito");
  botonesCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
      const producto = boton.parentElement;
      const nombre = producto.querySelector("h3").textContent;
      const precio = parseInt(producto.querySelector(".precio").textContent.replace("$", ""));
      agregarAlCarrito(nombre, precio);
    });
  });
});
document.querySelector(".btn-finalizar").addEventListener("click", () => {
    alert("¡Gracias por tu compra! Tu pedido ha sido registrado.");
});
