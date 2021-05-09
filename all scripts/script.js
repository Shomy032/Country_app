//parent
const main = document.getElementById('main');

const url_all = 'https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag';

// initial fetch
getData(url_all) ;

//function for initial fetch (reusable later) ;
async function getData(url){

  //first clear main
main.innerHTML = '' ;

const resp = await fetch(url);
const data = await resp.json();

// sort response by random
 let newArr = data.sort(func);  
  function func(a, b) {  
    return 0.5 - Math.random();
  }  
  
  newArr.forEach(country => {
  const card = document.createElement('div');
  card.classList.add('card')

  // deconstruct all data we need
  let {name , capital , region , population , flag } = country ;
// add class off region soo we can search later
if (region !== ''){
  card.classList.add(`${region}`);
} else {
  card.classList.add('no_region');
}
 
// check if capital or region are "" or null
if (capital == "" || capital === null){
  capital = "no capital..."
}
if (region == "" || region === null){
  region = " no region..."
}

// number format algorytm ,bcs numbers are too big..
if (population > 10000){
  population = (population / 1000000) ;
  population = population.toFixed(2) + " " + 'M';
} 

  // truncate algorithms
  // 1.
  if (name.length > 18) {
     name = name.slice(0, 18) + '...' ;
  }
  // 2.
  if (capital.length > 13) {
    capital = capital.slice(0, 13) + '...' ;
 }
//
// add data to card
  card.innerHTML =
  `<img src="${flag}" alt="flag">
<div id="info">
<h4 id="country_name">${name}</h4>
<ul>
  <li>
    <span>Population :</span>
     <span id="population">${population}</span>
  </li>
  <li>
    <span>Region :</span>
     <span id="region">${region}</span>
  </li>
  <li>
    <span>Capital :</span>
     <span id="capital">${capital}</span>
  </li>
</ul> 
</div> `
// add it to document
main.appendChild(card);
});
}