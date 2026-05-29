function irA(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function simularPartido() {
  const equipoA = document.getElementById("equipoA").value.trim();
  const equipoB = document.getElementById("equipoB").value.trim();
  const golesA = parseInt(document.getElementById("golesA").value);
  const golesB = parseInt(document.getElementById("golesB").value);
  const resultado = document.getElementById("resultadoPartido");

  if (equipoA === "" || equipoB === "" || isNaN(golesA) || isNaN(golesB)) {
    alert("Completa los equipos y los goles.");
    return;
  }

  resultado.style.display = "block";

  if (golesA > golesB) {
    resultado.innerHTML = `🏆 ${equipoA} gana ${golesA}-${golesB}. Sube su probabilidad de clasificación.`;
  } else if (golesB > golesA) {
    resultado.innerHTML = `🏆 ${equipoB} gana ${golesB}-${golesA}. Sube su probabilidad de clasificación.`;
  } else {
    resultado.innerHTML = `🤝 Empate ${golesA}-${golesB}. Ambos equipos suman, pero pierden margen.`;
  }
}

function calcularProbabilidad() {
  const pais = document.getElementById("pais").value.trim();
  const nivel = parseInt(document.getElementById("nivel").value);
  const resultado = document.getElementById("resultadoProbabilidad");

  if (pais === "" || isNaN(nivel)) {
    alert("Escribe una selección y un nivel.");
    return;
  }

  if (nivel < 1 || nivel > 100) {
    alert("El nivel debe estar entre 1 y 100.");
    return;
  }

  let probabilidadCampeon = Math.round((nivel / 100) * 18);
  let probabilidadOctavos = Math.min(95, Math.round(nivel * 0.9));
  let probabilidadSemis = Math.round((nivel / 100) * 35);

  resultado.style.display = "block";

  resultado.innerHTML = `
    ${pais} tiene aproximadamente:<br><br>
    🟢 ${probabilidadOctavos}% de pasar a octavos<br>
    🟡 ${probabilidadSemis}% de llegar a semifinales<br>
    🏆 ${probabilidadCampeon}% de ser campeón
  `;
}
