export const NAV_LINKS = [
  { id: "problema", label: "El problema" },
  { id: "com-funciona", label: "Com funciona" },
  { id: "pla", label: "El pla" },
  { id: "integracions", label: "Integracions" },
  { id: "preus", label: "Preus" },
  { id: "faq", label: "FAQ" },
];

export const TICKERS = [
  "Marató",
  "Ironman",
  "Trail 100K",
  "Triatló Sprint",
  "Ciclisme",
  "Natació",
  "Futbol",
  "Halterofília",
  "Duatló",
  "Escalada",
];

export const STATS = [
  ["+16", "Esports suportats"],
  ["100%", "Adaptatiu setmana a setmana"],
  ["6+", "Wearables integrats"],
  ["24/7", "Pla sempre actualitzat"],
];

export const WEEK = [
  { d: "DLL", t: "run", l: "Rodatge suau", i: "8km Z2 · Ritme còmode", p: 36 },
  { d: "DIM", t: "str", l: "Força", i: "Core + cames · 45min", p: 48 },
  { d: "DMC", t: "run", l: "Sèries", i: "6×1km P3 · Descans 90s", p: 84 },
  { d: "DIJ", t: "rest", l: "Descans actiu", i: "Mobilitat / recuperació", p: 10 },
  { d: "DIV", t: "run", l: "Tempo", i: "12km Z3 progressiu", p: 68 },
  { d: "DIS", t: "bike", l: "Cross-train", i: "60min bici Z2", p: 52 },
  { d: "DUM", t: "run", l: "Tirada llarga", i: "22km Z2 · Ritme marató", p: 92 },
];

export const P_CLASS = {
  run: "p-run",
  rest: "p-rest",
  bike: "p-bike",
  str: "p-str",
  swim: "p-swim",
};

export const P_LABEL = {
  run: "Córrer",
  rest: "Descans",
  bike: "Bici",
  str: "Força",
  swim: "Natació",
};

export const WEARABLES = [
  {
    logo: "⌚",
    name: "Garmin",
    desc: "VO2max, HRV, Training Load i Body Battery per a màxima precisió.",
    tags: ["HRV", "Training Load", "Zones"],
  },
  {
    logo: "🍎",
    name: "Apple Watch",
    desc: "Integració via Apple Health. Freqüència cardíaca, son i activitat.",
    tags: ["Apple Health", "FC", "Son"],
  },
  {
    logo: "🟠",
    name: "Strava",
    desc: "Importa automàticament totes les activitats. Historial complet.",
    tags: ["Activitats", "Segments", "Social"],
  },
  {
    logo: "🔴",
    name: "Polar",
    desc: "Orthostatic test i Sleep Plus Stages per a recuperació precisa.",
    tags: ["HRV", "Son", "Recuperació"],
  },
  {
    logo: "🔵",
    name: "Suunto",
    desc: "Altitud, dades de trail i peaks per a esports de muntanya.",
    tags: ["Trail", "Altitud", "GPS"],
  },
  {
    logo: "💚",
    name: "Fitbit",
    desc: "Son, estrès i activitat via Google Health Connect.",
    tags: ["Son", "Estrès", "Health Connect"],
    coming: true,
  },
];

export const FAQS = [
  {
    q: "Necessito un wearable per usar l'app?",
    a: "No és obligatori. Pots introduir dades manualment, però amb un wearable connectat l'adaptació és molt més precisa: HRV, son i càrrega real.",
  },
  {
    q: "Com s'adapta el pla si em salto una sessió?",
    a: "L'app detecta la sessió no completada i redistribueix la càrrega de la setmana seguint els teus objectius, sense sobrecarregar-te.",
  },
  {
    q: "Per a quins nivells és adequat?",
    a: "Des de principiants absoluts fins a atletes avançats. L'IA ajusta volum, intensitat i progressió segons el teu historial real.",
  },
  {
    q: "Quants esports pot gestionar alhora?",
    a: "Pots tenir plans actius per a múltiples esports simultàniament — ideal per triatletes o qui combina disciplines.",
  },
  {
    q: "Les dades del meu wearable són segures?",
    a: "Sí. No venem dades a tercers. Només processem el necessari per generar el teu pla i pots exportar o eliminar les teves dades en qualsevol moment.",
  },
  {
    q: "Quan estarà disponible?",
    a: "Estem en beta privada. Les persones de la llista d'espera rebran accés per ordre d'inscripció.",
  },
  {
    q: "Quina diferència hi ha amb un entrenador personal?",
    a: "Un entrenador humà costa 100–300€/mes. 4mæ ofereix adaptació diària 24/7 per una fracció del preu, complementant (no substituint) l'entrenador si en tens.",
  },
];

export const SPORTS = [
  { i: "🏃", n: "Marató" },
  { i: "🏊", n: "Natació" },
  { i: "🚴", n: "Ciclisme" },
  { i: "🏅", n: "Triatló" },
  { i: "⛰️", n: "Trail Running" },
  { i: "🔱", n: "Ironman" },
  { i: "🧗", n: "Escalada" },
  { i: "🚣", n: "Rem" },
  { i: "🥋", n: "Arts marcials" },
  { i: "⛷️", n: "Esquí alpí" },
  { i: "🏋️", n: "Halterofília" },
  { i: "⚽", n: "Futbol" },
  { i: "🚵", n: "MTB" },
  { i: "🎾", n: "Pàdel" },
  { i: "🏃‍♀️", n: "Duatló" },
  { i: "🤸", n: "CrossFit" },
];

export const PROBLEMS = [
  {
    n: "01",
    t: "Plans estàtics",
    d: "Descarregues un PDF de 16 setmanes que no sap si t'has fet mal, si has dormit 4h o si aquesta setmana tens més feina.",
  },
  {
    n: "02",
    t: "Zero adaptació",
    d: "La vida canvia. El teu entrenament no. Saltes sessions, et lesions o millores més ràpid del previst — i el pla no ho sap.",
  },
  {
    n: "03",
    t: "Entrenadors inassequibles",
    d: "Un entrenador personal de qualitat costa 150–300€/mes. La majoria d'esportistes no poden permetre-s'ho.",
  },
];

export const STEPS = [
  { i: "🎯", t: "Defineix l'objectiu", d: "Cursa, data, nivell actual, hores disponibles per setmana." },
  { i: "⌚", t: "Connecta el wearable", d: "Garmin, Apple Watch, Polar, Strava. Les teves dades reals." },
  { i: "🧠", t: "La IA dissenya el pla", d: "Periodització científica, zones de càrrega, progressió intel·ligent." },
  { i: "🔄", t: "S'adapta automàticament", d: "HRV baix? Sessió saltada? Millores més ràpid? El pla s'ajusta sol." },
];

export const PLAN_FEATURES = [
  { i: "❤️", t: "Zones de freqüència cardíaca", d: "Cada sessió té una intensitat precisa segons les teves zones reals." },
  { i: "😴", t: "Índex de recuperació", d: "Si el HRV baixa o has dormit poc, la càrrega s'ajusta." },
  { i: "📈", t: "Progressió científica", d: "La càrrega augmenta seguint principis de periodització provats." },
  { i: "⚠️", t: "Alertes de sobreentrenament", d: "4mæ detecta patrons d'alarma i t'ho diu abans de lesionar-te." },
];

export const COMPARISON_ROWS = [
  ["Pla 100% personalitzat", "✓", "✓", "✗", "✓"],
  ["Adaptació automàtica setmanal", "✓", "✗", "✗", "Parcial"],
  ["Múltiples esports", "✓", "✓", "✗", "✓"],
  ["Integració wearables", "✓", "✓", "Parcial", "✗"],
  ["Detecció sobreentrenament", "✓", "Parcial", "✗", "✓"],
  ["Accés 24/7 a les dades", "✓", "✓", "✗", "✗"],
  ["Preu mensual", "Gratis*", "19€", "Gratis", "100–300€"],
];

export const TESTIMONIALS = [
  {
    q: "Vaig trencar el meu rècord personal als 5km després de 3 mesos. Per primer cop un pla que realment s'adaptava quan em trobava malament.",
    name: "Laura M.",
    r: "Runner · Barcelona",
    ic: "🏃‍♀️",
  },
  {
    q: "Com a triatleta necessitava gestionar tres disciplines alhora sense sobreentrenar-me. 4mæ ho fa sol.",
    name: "Marc T.",
    r: "Triatleta · Girona",
    ic: "🏅",
  },
  {
    q: "Quan vaig veure que reduïa la sessió perquè havia dormit malament, vaig quedar convençut. Això no ho fa cap PDF.",
    name: "Anna R.",
    r: "Trail · Pirineus",
    ic: "⛰️",
  },
];

export const PRICING_FREE = [
  { t: "Pla bàsic per a 1 esport", on: true },
  { t: "Seguiment manual d'activitats", on: true },
  { t: "Fins a 3 sessions/setmana", on: true },
  { t: "Integració wearables", on: false },
  { t: "Adaptació automàtica", on: false },
  { t: "Múltiples esports", on: false },
  { t: "Alertes sobreentrenament", on: false },
];

export const PRICING_PRO = [
  "Plans per a esports il·limitats",
  "Integració tots els wearables",
  "Adaptació automàtica diària",
  "Múltiples objectius simultanis",
  "Alertes sobreentrenament",
  "Exportació a calendar",
];

export const PRICING_BETA = [
  "Tot el que inclou Pro",
  "Accés prioritari a noves funcions",
  "Feedback directe amb l'equip",
  "Preu bloquejat de per vida",
];

export const LEGAL = {
  privacy: {
    title: "Política de privacitat",
    updated: "Maig 2026",
    sections: [
      {
        h: "Quines dades recollim",
        p: "Només recollim l'adreça de correu quan t'inscrius a la llista d'espera, i opcionalment dades d'entrenament si connectes un wearable un cop l'app estigui activa.",
      },
      {
        h: "Com les utilitzem",
        p: "L'email serveix per avisar-te de l'accés a la beta. Les dades d'entrenament es processen exclusivament per generar i adaptar el teu pla personalitzat.",
      },
      {
        h: "Emmagatzematge i seguretat",
        p: "Les dades es guarden en servidors de la UE amb xifratge en trànsit (TLS) i en repòs. No venem ni compartim dades amb anunciants.",
      },
      {
        h: "Els teus drets",
        p: "Pots sol·licitar accés, rectificació o eliminació de les teves dades escrivint a hola@4mae.app. Respondrem en un màxim de 30 dies.",
      },
    ],
  },
  terms: {
    title: "Termes d'ús",
    updated: "Maig 2026",
    sections: [
      {
        h: "Ús del servei",
        p: "4mæ és una eina d'assistència a l'entrenament. No substitueix l'assessorament mèdic ni l'atenció d'un professional de la salut.",
      },
      {
        h: "Beta",
        p: "Durant la fase beta, el servei pot canviar sense avís previ. Les funcions i preus definitius es comunicaran abans del llançament públic.",
      },
      {
        h: "Responsabilitat",
        p: "L'usuari és responsable d'escoltar el seu cos i consultar un metge abans d'iniciar qualsevol programa d'entrenament intens.",
      },
      {
        h: "Contacte",
        p: "Per qualsevol dubte legal, contacta amb hola@4mae.app.",
      },
    ],
  },
};
