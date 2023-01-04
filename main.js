/* TODO
[x] get total
[x] create product
[x] save to local storage
[] clear all inputs data
[] read
[] count
[] delete
[] update
[] search
[] clean data
 */

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let inputs = document.querySelectorAll("input");

// console.log(submit)

/* 
==========|
=====| GET TOTAL 
==========|
*/

function getTotal() {
  console.log("done");
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = result;
    total.parentElement.style.backgroundColor = "lightgreen";
  } else {
    total.innerText = "";
    total.parentElement.style.backgroundColor = "rgb(58, 184, 146)";
  }
}

/* 
==========|
=====| CREATE PRODUCT
==========|
*/

/** =======| NOTE
 * why we created array while we have object?
  because if we add new data in the object will delete the 
  previous object data and create new one
  therefor, we used empty array to store the created object data
  and every object we create it will store in the array ifinity
  EX: [object, object, object]
 */

// create array is the easiest way to store any data
let dataPro;

/* 
==========|
=====| SAVE TO LOCAL STORAGE
==========|
*/

/** =======| NOTE 
 * Normally if we reload the window it will remove the previous
  data and store new but like we did not have any localStorage
  so we can call it by .getItem method
  but there's the same issue after reloading it will remove the 
  previous data, because the array variable 'let dataPro;' is
  on the top of js file'code lines' and js depends on synchronous
  method'reads the code line by line from top to bottom'
  so we will create a condition 'if the .getItem not empty
  update the array, else just let the variable normal array', we need also to return the array's data
  from string to normall array using 'JSON.parse(Array)', because the localStorage saved
  it as a string by 'JSON.stringify(Array)'
*/
if (localStorage.getItem("product") != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}

submit.onclick = function () {
  // creating object to order the data by its title or name of the product
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerText,
    category: category.value,
  };
  dataPro.push(newPro);
  console.log(dataPro);
  /** =======| NOTE
   * we wanna to store the array data in the localStorage
    so, I'll add it to the localStorage, But localStroage
    accepts only string, Well we can change the array to
    string using JSON.stringfy(Array) it will result the arry
    with its form and store it in the localStorage
   */
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};

/* 
==========|
=====| CLEAR INPUTS VALUE
==========|
*/

function clearData() {
  inputs.forEach((inp) => (inp.value = ""));
  total.innerText = "";
}

/* 
==========|
=====| READ
==========|
*/

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].category}</td>
      <td>${dataPro[i].total}</td>
      <td><button class="update">update</button></td>
      <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("table").innerHTML = table;
}

showData();

/* 
==========|
=====| DELETE
==========|
*/

function deleteData(i) {
  console.log(i);
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro)
  showData();
}