const url = "http://localhost:3000/supplie";

async function getData(url) {
  const data = await fetch(url)
    .then(response => response.json)
    .catch(err => console.log(err));
  return data.json();
}

const content = getData(url);

