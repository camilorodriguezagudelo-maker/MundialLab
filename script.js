let equipos = [];
let partidos = [];
let octavos = [];

function generarPartidos() {
  equipos = [
    document.getElementById("team1").value.trim(),
    document.getElementById("team2").value.trim(),
    document.getElementById("team3").value.trim(),
    document.getElementById("team4").value.trim()
  ];

  if (equipos.some(e => e === "")) {
    alert("Escribe los 4 equipos.");
    return;
  }

  if (new Set(equipos).size < 4) {
    alert("No puedes repetir equipos.");
    return;
  }

  partidos = [
    [equipos[0], equipos[1]],
    [equipos[0], equipos[2]],
    [equipos[0], equipos[3]],
    [equipos[1], equipos[2]],
    [equipos[1], equipos[3]],
    [equipos[2], equipos[3]]
  ];

  const contenedor = document.getElementById("matches");
  contenedor.className = "";
  contenedor.innerHTML = "";

  partidos.forEach((p, i) => {
    contenedor.innerHTML += `
      <div class="match">
        <span class="team-left">${p[0]}</span>
        <input type="number" min="0" id="golesA${i}" placeholder="0">
        <div class="dash">-</div>
        <input type="number" min="0" id="golesB${i}" placeholder="0">
        <span class="team-right">${p[1]}</span>
      </div>
    `;
  });
}

function calcularTabla() {
  let tabla = {};

  equipos.forEach(e => {
    tabla[e] = { equipo: e, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 };
  });

  for (let i = 0; i < partidos.length; i++) {
    const a = partidos[i][0];
    const b = partidos[i][1];
    const ga = parseInt(document.getElementById(`golesA${i}`).value);
    const gb = parseInt(document.getElementById(`golesB${i}`).value);

    if (isNaN(ga) || isNaN(gb)) {
      alert("Completa todos los marcadores.");
      return;
    }

    tabla[a].pj++;
    tabla[b].pj++;

    tabla[a].gf += ga;
    tabla[a].gc += gb;
    tabla[b].gf += gb;
    tabla[b].gc += ga;

    if (ga > gb) {
      tabla[a].pg++;
      tabla[b].pp++;
      tabla[a].pts += 3;
    } else if (gb > ga) {
      tabla[b].pg++;
      tabla[a].pp++;
      tabla[b].pts += 3;
    } else {
      tabla[a].pe++;
      tabla[b].pe++;
      tabla[a].pts++;
      tabla[b].pts++;
    }
  }

  let posiciones = Object.values(tabla);

  posiciones.forEach(e => e.dg = e.gf - e.gc);

  posiciones.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.equipo.localeCompare(b.equipo);
  });

  const tbody = document.getElementById("tablaPosiciones");
  tbody.innerHTML = "";

  posiciones.forEach(e => {
    tbody.innerHTML += `
      <tr>
        <td>${e.equipo}</td>
        <td>${e.pj}</td>
        <td>${e.pg}</td>
        <td>${e.pe}</td>
        <td>${e.pp}</td>
        <td>${e.gf}</td>
        <td>${e.gc}</td>
        <td>${e.dg > 0 ? "+" + e.dg : e.dg}</td>
        <td><strong>${e.pts}</strong></td>
      </tr>
    `;
  });

  const clasificados = document.getElementById("clasificados");
  clasificados.style.display = "block";
  clasificados.innerHTML = `
    🏆 Clasificados del Grupo A
    <span>🥇 ${posiciones[0].equipo}</span>
    <span>🥈 ${posiciones[1].equipo}</span>
  `;
}

function generarOctavos() {
  let equiposOctavos = [];

  for (let i = 1; i <= 16; i++) {
    equiposOctavos.push(document.getElementById(`o${i}`).value.trim());
  }

  if (equiposOctavos.some(e => e === "")) {
    alert("Debes escribir los 16 equipos.");
    return;
  }

  if (new Set(equiposOctavos).size < 16) {
    alert("No puedes repetir equipos en octavos.");
    return;
  }

  octavos = [
    [equiposOctavos[0], equiposOctavos[1]],
    [equiposOctavos[2], equiposOctavos[3]],
    [equiposOctavos[4], equiposOctavos[5]],
    [equiposOctavos[6], equiposOctavos[7]],
    [equiposOctavos[8], equiposOctavos[9]],
    [equiposOctavos[10], equiposOctavos[11]],
    [equiposOctavos[12], equiposOctavos[13]],
    [equiposOctavos[14], equiposOctavos[15]]
  ];

  const contenedor = document.getElementById("octavosPartidos");
  contenedor.className = "";
  contenedor.innerHTML = "";

  octavos.forEach((p, i) => {
    contenedor.innerHTML += `
      <div class="match">
        <span class="team-left">${p[0]}</span>
        <input type="number" min="0" id="octA${i}" placeholder="0">
        <div class="dash">-</div>
        <input type="number" min="0" id="octB${i}" placeholder="0">
        <span class="team-right">${p[1]}</span>
      </div>
    `;
  });

  document.getElementById("clasificadosCuartos").style.display = "none";
}

function calcularOctavos() {
  if (octavos.length !== 8) {
    alert("Primero genera los octavos.");
    return;
  }

  let ganadores = [];

  for (let i = 0; i < octavos.length; i++) {
    const ga = parseInt(document.getElementById(`octA${i}`).value);
    const gb = parseInt(document.getElementById(`octB${i}`).value);

    if (isNaN(ga) || isNaN(gb)) {
      alert("Completa todos los marcadores de octavos.");
      return;
    }

    if (ga === gb) {
      alert("En octavos no puede haber empate. Define un ganador.");
      return;
    }

    if (ga > gb) {
      ganadores.push(octavos[i][0]);
    } else {
      ganadores.push(octavos[i][1]);
    }
  }

  const div = document.getElementById("clasificadosCuartos");
  div.style.display = "block";

  div.innerHTML = `
    🔥 Clasificados a cuartos de final
    ${ganadores.map((g, i) => `<span>${i + 1}. ${g}</span>`).join("")}
  `;
}
