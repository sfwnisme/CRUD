/* TODO
[x] get total
[x] create product
[x] save to local storage
[x] clear all inputs data
[x] read
[x] delete
[x] count
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

let deleteAllBtn = document.querySelector(".delete-all");
let mood = "create";
let tmp;

let search = document.querySelector(".button-search");
let searchTitle = document.querySelector(".search-title");
let searchCategory = document.querySelector(".search-category");

console.log(searchCategory);

// ==========| EMPTY INPUTS
function emptyInpus() {
  inputs.forEach((e) => (e.value = ""));
  // total.innerText = 0;
}

// ==========| GET TOTAL
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = result;
    let activeColor = getComputedStyle(
      document.querySelector(":root")
    ).getPropertyValue("--five-color");
    total.parentElement.style.backgroundColor = activeColor;
  } else {
    total.innerText = "";
    let x = getComputedStyle(document.querySelector(":root")).getPropertyValue(
      "--four-color"
    );
    total.parentElement.style.backgroundColor = x;
  }
}
getTotal();
// function getTotal2()

// ==========| CONFIRM LOCALSTORAGE
let dataArr;
if (localStorage.getItem("products") != null) {
  dataArr = JSON.parse(localStorage.getItem("products"));
} else {
  dataArr = [];
}

// ==========| MAIN CLICK

submit.addEventListener("click", () => {
  dataObj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerText,
    count: count.value,
    category: category.value,
  };

  // ===| NOTE
  // you can here use count.value OR dataObj.count
  // it just requests the value of the count input

  if (mood === "create") {
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        dataArr.push(dataObj);
      }
    } else {
      dataArr.push(dataObj);
    }
  } else {
    dataArr[tmp] = dataObj;
    count.style.display = "inline";
    submit.innerText = "create";
  }
  localStorage.setItem("products", JSON.stringify(dataArr));

  dataShow();
  // ==========| branch functions
  emptyInpus();
  getTotal();
});

// ==========| READ

let table = document.querySelector("#table");
function dataShow() {
  let dataTable = "";
  for (let i = 0; i < dataArr.length; i++) {
    dataTable += `
    <tr>
      <td id="id">${i}</td>
      <td>${dataArr[i].title}</td>
      <td>${dataArr[i].price}</td>
      <td>${dataArr[i].taxes}</td>
      <td>${dataArr[i].ads}</td>
      <td>${dataArr[i].category}</td>
      <td>${dataArr[i].total}</td>
      <td><button class="update" onclick="update(${i})">update</button></td>
      <td><button class="delete">delete</button></td>
    </tr>
    `;
  }
  table.innerHTML = dataTable;

  //===| BRANCH FUNCTIONS
  dataDelete();
  if (dataArr.length > 0) {
    deleteAllBtn.style.display = "inline";
  } else {
    deleteAllBtn.style.display = "none";
  }
}
// ===| if we didn't excuted it in gloabl scope it will not be able to showen

// ===|  DELETE ALL

deleteAllBtn.addEventListener("click", dataDeleteAll);
function dataDeleteAll() {
  dataArr.splice(0);
  localStorage.clear();
  dataShow();
}

// ===| you can also use this function for delete all|===
// deleteAllBtn.addEventListener("click", dataDeleteAll);
// function dataDeleteAll() {
//   dataArr = [];
//   localStorage.products = JSON.stringify(dataArr);
//   dataShow();
// }

// ===| you can also use this function for delete all|===
// deleteAllBtn.addEventListener("click", dataDeleteAll);
// function dataDeleteAll() {
//   dataArr.length = 0;
//   localStorage.products = JSON.stringify(dataArr);
//   dataShow();
// }

dataShow();

function dataDelete() {
  let del = document.querySelectorAll(".delete");
  del.forEach((de) => {
    de.addEventListener("click", (d) => {
      let tableIndex = Number(
        d.target.parentElement.parentElement.querySelector("#id").innerText
      );
      dataArr.splice(tableIndex, 1);
      dataShow();
      localStorage.products = JSON.stringify(dataArr);
    });
  });
}

// ==========| UPDATE

function update(x) {
  title.value = dataArr[x].title;
  price.value = dataArr[x].price;
  taxes.value = dataArr[x].taxes;
  ads.value = dataArr[x].ads;
  discount.value = dataArr[x].discount;
  total.innerText = dataArr[x].total;
  category.value = dataArr[x].category;
  // console.log(dataArr[x].title)
  console.log(x);
  mood = "update";
  tmp = x;

  count.style.display = "none";
  submit.innerText = mood;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// ==========| SEARCH

let searchMood = "search-title";

function searchFunction(id) {
  if (id === "search-title") {
    searchMood = "Search by title";
    search.placeholder = "id";
  } else {
    searchMood = "Search by category";
    search.placeholder = "id";
  }
  search.placeholder = "";
  dataShow();
}
// searchFunction();
