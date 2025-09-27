// Config iniziale
const pesoTarget = 69;
let pesi = JSON.parse(localStorage.getItem("pesi")) || [];
let listaSpesaBase = [
  "Petto di pollo 700 g",
  "Tacchino 500 g",
  "Salmone 2 filetti",
  "Orata 2 pz",
  "Tonno in scatola 4 pz",
  "Uova 12",
  "Yogurt greco 1 kg",
  "Riso integrale 500 g",
  "Pasta integrale 500 g",
  "Farro 500 g",
  "Zucchine 4",
  "Mele 5",
  "Broccoli 2 cespi",
  "Carote 1 kg"
];

let allenamenti = {
  0: ["Riposo attivo (camminata 30 min)"],
  1: ["20 min corsa", "3x plank laterale", "3x 15 squat"],
  2: ["Circuito corpo libero: push-up, plank, affondi"],
  3: ["Cardio HIIT 20 min", "Addominali 3x20"],
  4: ["Forza: gambe e core"],
  5: ["Cardio leggero 40 min", "Stretching"],
  6: ["Allenamento libero (sport, bici, nuoto)"]
};

// Aggiorna dashboard
function aggiornaDashboard() {
  const pesoAttuale = pesi[pesi.length - 1] || "--";
  document.getElementById("peso-attuale").textContent = pesoAttuale;
  document.getElementById("peso-target").textContent = pesoTarget;

  if (pesoAttuale !== "--") {
    let perdita = (82 - pesoAttuale).toFixed(1);
    let daPerdere = (82 - pesoTarget).toFixed(1);
    let percent = Math.min(100, (perdita / daPerdere) * 100);

    document.getElementById("progress-fill").style.width = percent + "%";
    document.getElementById("progress-text").textContent =
      `Hai perso ${perdita} kg su ${daPerdere}`;
  }
}

// Mostra lista spesa
function mostraSpesa() {
  const lista = document.getElementById("lista-spesa");
  lista.innerHTML = "";
  listaSpesaBase.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${item}`;
    lista.appendChild(li);
  });
}

// Reset lista spesa
function resetSpesa() {
  mostraSpesa();
}

// Mostra allenamento del giorno
function mostraAllenamento() {
  const giorno = new Date().getDay();
  const lista = document.getElementById("lista-allenamento");
  lista.innerHTML = "";
  allenamenti[giorno].forEach(ex => {
    let li = document.createElement("li");
    li.textContent = ex;
    lista.appendChild(li);
  });
}

// Segna allenamento fatto
function segnaAllenamento() {
  alert("Allenamento segnato come fatto 💪");
}

// Aggiungi peso
function aggiungiPeso() {
  const input = document.getElementById("input-peso");
  const val = parseFloat(input.value);
  if (!isNaN(val)) {
    pesi.push(val);
    localStorage.setItem("pesi", JSON.stringify(pesi));
    mostraPesi();
    aggiornaDashboard();
    input.value = "";
  }
}

// Mostra storico pesi
function mostraPesi() {
  const lista = document.getElementById("storico-pesi");
  lista.innerHTML = "";
  pesi.slice().reverse().forEach(p => {
    let li = document.createElement("li");
    li.textContent = p + " kg";
    lista.appendChild(li);
  });
  document.getElementById("ultima-pesata").textContent =
    pesi.length ? pesi[pesi.length - 1] + " kg" : "--";
}

// Init
mostraSpesa();
mostraAllenamento();
mostraPesi();
aggiornaDashboard();
