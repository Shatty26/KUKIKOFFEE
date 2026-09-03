window.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.querySelector(".input-control");
  const selectCategoria = document.querySelector(".select-control");
  const tarjetas = document.querySelectorAll(".tarjeta-producto");

  function filtrarExacto() {
    const texto = inputBusqueda.value.toLowerCase().trim();
    const categoria = selectCategoria.value.toLowerCase();

    tarjetas.forEach((tarjeta) => {
      const titulo = tarjeta.querySelector("h3") ? tarjeta.querySelector("h3").textContent.toLowerCase().trim() : "";
      const catProducto = tarjeta.getAttribute("data-categoria") ? tarjeta.getAttribute("data-categoria").toLowerCase() : "";

      // Si no has escrito nada, muestra según la categoría seleccionada
      let coincideTexto = false;
      if (texto === "") {
        coincideTexto = true;
      } else {
        // Evalúa si el título empieza exactamente con lo escrito o si coincide la palabra completa
        coincideTexto = titulo === texto || titulo.startsWith(texto);
      }

      const coincideCategoria = (categoria === "todos") || (catProducto === categoria);

      // Solo muestra la tarjeta si cumple ambas reglas
      if (coincideTexto && coincideCategoria) {
        tarjeta.style.setProperty("display", "flex", "important");
      } else {
        tarjeta.style.setProperty("display", "none", "important");
      }
    });
  }

  // Previene que dar Enter recargue la página y fuerza la filtración exacta
  if (inputBusqueda) {
    inputBusqueda.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        filtrarExacto();
      }
    });
    inputBusqueda.addEventListener("input", filtrarExacto);
  }

  if (selectCategoria) {
    selectCategoria.addEventListener("change", filtrarExacto);
  }
});