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

let mood = "create";
let tmp;

let searchMood = "search-title";

// console.log(submit)

/* 
==========|
=====| GET TOTAL 
==========|
*/

function getTotal() {
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
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerText,
    category: category.value.toLowerCase(),
  };
  // dataPro.push(newPro);

  /* 
==========|
=====| COUNT
==========|
*/
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    // =====| here you are not creating new object
    // you just updating the object using the array element [tmp]
    dataPro[tmp] = newPro;
    console.log(`tmp number ${tmp}`);
    count.style.display = "block";
    submit.innerText = "create";
  }

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

  /** =====| NOTE
   * clicking on submit will add the data to the table.and local storage
   * but also we need another way to display the data and make it visioual
    we will add the function to the global scope
   * ADDING THE showData() FUNCTION TO GLOBAL SCOPE AND SUBMIT FUNCTION WILL MAKE IT WORK
   */
  showData();
  getTotal();
};

/** =====| NOTE
 * we added the data function in global scope to make it work and also
  added it in submit function to display the data after clicking the submit button
 */
showData();
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
      <td><button onclick="update(${i})" class="update">update</button></td>
      <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
    </tr>
    `;
  }
  // =====| this will display the previous text to HTML format
  document.getElementById("table").innerHTML = table;

  /* 
==========|
=====| DELETE ALL
==========|
*/
  let deleteAll = document.querySelector(".add-delete-button button");
  deleteAll.innerText = `Delete All [ ${dataPro.length} ]`;
  console.log(deleteAll);
  if (dataPro.length > 0) {
    deleteAll.style.display = "inline";
    deleteAll.setAttribute("onclick", "deleteAllData()");
  } else {
    deleteAll.style.display = "none";
  }
}
function deleteAllData() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

/* 
==========|
=====| DELETE
==========|
*/

/** =====| NOTE
 * this function is clickable for delete button
 * on click delete button remove the whole line
 */
function deleteData(x) {
  console.log(x);
  /** =====| NOTE
   * here you can test and delete the table lines
    but after reloading the window it will back
    thus you should adding it to the local storage,
    no complicated steps, only just update the local storage
    using the next steps
   */
  dataPro.splice(x, 1);
  localStorage.product = JSON.stringify(dataPro);
  // localStorage.setItem('product',JSNO.stringify(dataPro))

  /** =====| NOTE
   * it normally will delete the table you targeted
    by the previous function and methods
    but you have to reload to see the change
    so, you should insert showData() function in the
    deleteData(x) function to see the change onclick
    instently
   *
   */
  showData();
}

/* 
==========|
=====| UPDATE
==========|
*/

function update(x) {
  console.log(x);
  title.value = dataPro[x].title;
  price.value = dataPro[x].price;
  taxes.value = dataPro[x].taxes;
  ads.value = dataPro[x].ads;
  discount.value = dataPro[x].discount;
  category.value = dataPro[x].category;
  count.style.display = "none";
  submit.innerText = "UPDATE";
  tmp = x;
  mood = "update";
  getTotal();

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

/** =====| INFO 
 * onclick event => create click event for update button
 ** will pass a parameter of the object we clicked ${i}
 * function => create function works on clicking on update button
 ** this function will fill the inputs values with the data of the
  table we had clicked on
 ** create new variable called mood = 'create';
 ** update mood = 'update' in update(x) function
 *** if mood = "create" => work normally just create new objects
 *** if mood = 'update' 
 **** execut the update(x) function
 **** create tmp empty variable on global scope and use it
      in update(x) function and save the (x) parameter in it tmp = x;
      for using the parameter globaly
 **** target the dataPro element we want to update using tmp variable
      dataPro[tmp] = newPro;
 ***** by updating the array element dataPro[tmp]"object" with the opject newPro
      you can now write new data and update the object or the array element
      that we called tmp without creating new one just updaing
  */

/* 
==========|
=====| UPDATE
==========|
*/
let search = document.querySelector(".search");
function getSearchMood(id) {
  if (id === "search-title") {
    console.log(id);
    searchMood = "search-title";
  } else {
    console.log(id);
    searchMood = "search-category";
  }
  search.placeholder = document.querySelector(`.${id}`).innerText;
  search.focus();

  // ===| if click on any button of the search clean the search.value and
  // execute the showData() function
  search.value = "";
  showData();
}
console.log(search);
// search.addEventListener("keyup", searchValue(this.value));
// search.onkeyup = searchValue(search.value);
function searchValue(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "search-title") {
      if (dataPro[i].title.startsWith(value)) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].category}</td>
          <td>${dataPro[i].total}</td>
          <td><button onclick="update(${i})" class="update">update</button></td>
          <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataPro[i].category.startsWith(value)) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].category}</td>
          <td>${dataPro[i].total}</td>
          <td><button onclick="update(${i})" class="update">update</button></td>
          <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("table").innerHTML = table;
}