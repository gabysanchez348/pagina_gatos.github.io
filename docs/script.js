const gatos = [
  { nombre: "Luna", edad: "1 año", categoria: "Adulto", genero: "Hembra", imagen: "gatos/luna.jpg", descripcion: "Muy cariñosa y tranquila.", vacunas: "Todas al día", alergias: "Ninguna" },
  { nombre: "Simba", edad: "3 meses", categoria: "Cachorro", genero: "Macho", imagen: "gatos/simba.jpg", descripcion: "Juguetón y curioso.", vacunas: "Le falta segunda dosis de rabia", alergias: "Polen" },
  { nombre: "Nina", edad: "5 años", categoria: "Senior", genero: "Hembra", imagen: "gatos/nina.jpg", descripcion: "Tranquila y amigable.", vacunas: "Todas al día", alergias: "Ninguna" },
  { nombre: "Oliver", edad: "9 meses", categoria: "Adolescente", genero: "Macho", imagen: "gatos/oliver.jpg", descripcion: "Activo y juguetón.", vacunas: "Le falta refuerzo de moquillo", alergias: "Polvo" },
  { nombre: "Cleo", edad: "6 años", categoria: "Senior", genero: "Hembra", imagen: "gatos/cleo.png", descripcion: "Calmada y cariñosa.", vacunas: "Todas al día", alergias: "Ninguna" },
  { nombre: "Toby", edad: "2 años", categoria: "Adulto", genero: "Macho", imagen: "gatos/toby.jpg", descripcion: "Sociable y amigable.", vacunas: "Le falta rabia", alergias: "Ninguna" },
  { nombre: "Michi", edad: "4 meses", categoria: "Cachorro", genero: "Hembra", imagen: "gatos/michi.jpg", descripcion: "Curiosa y juguetona.", vacunas: "Le falta una dosis", alergias: "Ninguna" },
  { nombre: "Tommy", edad: "2 años", categoria: "Adulto", genero: "Macho", imagen: "gatos/tommy.jpeg", descripcion: "Cariñoso y protector.", vacunas: "Todas al día", alergias: "Ninguna" },
  { nombre: "Milo", edad: "7 meses", categoria: "Adolescente", genero: "Macho", imagen: "gatos/milo.jpeg", descripcion: "Activo y curioso.", vacunas: "Le falta refuerzo", alergias: "Ninguna" },
  { nombre: "Keiry", edad: "2 meses", categoria: "Cachorro", genero: "Hembra", imagen: "gatos/keiry.jpg", descripcion: "Dormilona, cariñosa y timida", vacunas: "Todas", alergias: "Polen" },
];

function cargarCatalogo(filtro = null) {
  const catalog = document.getElementById("catalog");
  if (!catalog) return;
  catalog.innerHTML = "";

  let gatosFiltrados = gatos;
  if (filtro) {
    filtro = filtro.toLowerCase();
    gatosFiltrados = gatos.filter(
      g => g.categoria.toLowerCase().includes(filtro) || g.genero.toLowerCase().includes(filtro)
    );
  }

  gatosFiltrados.forEach(gato => {
    const item = document.createElement("div");
    item.className = "catalog-item";
    item.innerHTML = `
      <img src="${gato.imagen}" alt="${gato.nombre}" onclick="verDetalles('${gato.nombre}')">
      <div><strong>${gato.nombre}</strong><br>${gato.edad} - ${gato.genero}</div>`;
    catalog.appendChild(item);
  });
}

function openAdopt(nombre, imagen) {
  const gato = gatos.find(g => g.nombre === nombre);
  if (gato) localStorage.setItem("gatoSeleccionado", JSON.stringify(gato));
  window.location.href = "formulario.html";
}

function mostrarGatoSeleccionado() {
  const catInfo = document.getElementById("cat-info");
  const data = localStorage.getItem("gatoSeleccionado");
  if (catInfo && data) {
    const gato = JSON.parse(data);
    document.getElementById("cat-name").textContent = gato.nombre;
    document.getElementById("cat-img").src = gato.imagen;
    catInfo.style.display = "flex";
  }
}

function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById("formMsg");
  const datos = Object.fromEntries(new FormData(form).entries());
  const gato = JSON.parse(localStorage.getItem("gatoSeleccionado"));
  msg.textContent = `¡Gracias ${datos.nombre}! Tu solicitud para adoptar a ${gato.nombre} ha sido enviada.`;
  form.reset();

  lanzarConfetti();
}

function verDetalles(nombre) {
  const gato = gatos.find(g => g.nombre === nombre);
  if (gato) localStorage.setItem("gatoDetalle", JSON.stringify(gato));
  window.location.href = "detalles.html";
}

function cargarDetalle() {
  const data = localStorage.getItem("gatoDetalle");
  if (!data) return;
  const gato = JSON.parse(data);

  document.getElementById("detalle-nombre").textContent = gato.nombre;
  document.getElementById("detalle-img").src = gato.imagen;
  document.getElementById("detalle-edad").textContent = `Edad: ${gato.edad}`;
  document.getElementById("detalle-genero").textContent = `Género: ${gato.genero}`;
  document.getElementById("detalle-categoria").textContent = `Categoría: ${gato.categoria}`;
  document.getElementById("detalle-desc").textContent = `Descripción: ${gato.descripcion || "Sin descripción disponible"}`;
  document.getElementById("detalle-vacunas").textContent = `Vacunas: ${gato.vacunas || "Información no disponible"}`;
  document.getElementById("detalle-alergias").textContent = `Alergias: ${gato.alergias || "No tiene"}`;

  const btn = document.getElementById("btn-adoptar");
  if (btn) {
    btn.onclick = () => openAdopt(gato.nombre, gato.imagen);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("catalog")) {
    cargarCatalogo();
    document.querySelectorAll(".pill").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        cargarCatalogo(btn.textContent);
      });
    });
  }
  if (document.getElementById("cat-info")) mostrarGatoSeleccionado();
  if (document.getElementById("detalle-gato")) cargarDetalle();
});

function lanzarConfetti() {
  const confettiContainer = document.getElementById("confetti");
  if (!confettiContainer) return;
  const coloresOtoño = ["#D9822B", "#F5A623", "#D94F00", "#A0522D", "#FFB347", "#C68642"];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = coloresOtoño[Math.floor(Math.random() * coloresOtoño.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
    confetti.style.width = confetti.style.height = 5 + Math.random() * 5 + "px";
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}
