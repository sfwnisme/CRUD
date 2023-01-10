/* TODO
[x] get total
[x] create product
[x] save to local storage
[x] clear all inputs data
[x] read
[x] delete
[] count
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
let tmp;

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
  if (count.value > 1) {
    for (let i = 0; i < count.value; i++) {
      dataArr.push(dataObj);
    }
  } else {
    dataArr.push(dataObj);
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
      <td><button class="update">update</button></td>
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

// ==========| READ
