const supplies = [
  {
    "id": 1,
    "name": "harina",
    "stock": 49895.2,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 2,
    "name": "azúcar blanca",
    "stock": 24947.6,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 3,
    "name": "sal fina",
    "stock": 9979.03,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 4,
    "name": "levadura seca instantánea",
    "stock": 4989.52,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 5,
    "name": "mantequilla sin sal",
    "stock": 10,
    "unit": "unit",
    "state": 1
  },
  {
    "id": 6,
    "name": "huevos",
    "stock": 360,
    "unit": "unit",
    "state": 1
  },
  {
    "id": 7,
    "name": "leche entera",
    "stock": 20000,
    "unit": "ml",
    "state": 1
  },
  {
    "id": 8,
    "name": "chocolate semi-amargo",
    "stock": 4989.52,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 9,
    "name": "aceite vegetal",
    "stock": 5000,
    "unit": "ml",
    "state": 1
  },
  {
    "id": 10,
    "name": "hojaldres",
    "stock": 9071.85,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 11,
    "name": "salchicha ranchera",
    "stock": 30,
    "unit": "unit",
    "state": 1
  },
  {
    "id": 12,
    "name": "arequipe",
    "stock": 4535.92,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 13,
    "name": "bocadillo",
    "stock": 5443.11,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 14,
    "name": "queso mozarrela",
    "stock": 29937.1,
    "unit": "gr",
    "state": 1
  },
  {
    "id": 15,
    "name": "cuajada",
    "stock": 7711.07,
    "unit": "gr",
    "state": 1
  }
]

const url = "http://localhost:2145/supplie";

async function getData(url) {
  const data = await fetch(url)
    .then(response => response.json)
    .catch(err => console.log(err));
  return data.json();
}

const content = getData(url);

const info = {
  "title": "",
  "colNames": [
    "id", "name", "stock", "unit", "state"
  ],
  "content": content
}