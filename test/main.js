/* TODO
[x] get total
[x] create product
[x] save to local storage
[x] clear all inputs data
[x] read
[] delete
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
  dataArr.push(dataObj);
  localStorage.setItem("products", JSON.stringify(dataArr));

  dataShow();
  // ==========| branch functions
  emptyInpus();
  getTotal();
});

// ==========| READ

function dataShow() {
  let table = document.querySelector("#table");
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
}
// ===| if we didn't excuted it in gloabl scope it will not be able to showen
dataShow();

function dataDelete(x) {
  let del = document.querySelectorAll(".delete");
  console.log(del);
  del.forEach((de) => {
    de.addEventListener("click", (d) => {
      console.log(
        Number(
          d.target.parentElement.parentElement.querySelector("#id").innerText
        )
      );
      +console.log(tmp);
      dataArr.splice(x, 1);
      dataShow();
    });
  });
}
// dataDelete();
