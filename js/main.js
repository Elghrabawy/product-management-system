// text box
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search_box");

// buttoms
let add = document.getElementById("add");
let searchByTitle = document.getElementById("s_byTitle");
let searchByID = document.getElementById("s_byID");
let deleteAll = document.getElementById("delete_all");

// table
let table = document.getElementById("products");
let tblBody = document.getElementById("tbl_body");

// tmp
let update_i;
let disable_cnt = true;

if (localStorage.data != null) {
  table_update(JSON.parse(localStorage.data));
}

// onload
onload = () => {
  console.log("onload");
};

// count total price
function cntTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.backgroundColor = "green";
    total.innerHTML = result;
  } else {
    total.innerHTML = "0";
    total.style.backgroundColor = "rgb(255, 97, 91)";
  }
}

// enable add button if all inputs valid
onkeyup = onmousemove = () => {
  if (title.value == "" || price.value == "" || category.value == "") {
    console.log("not");
    add.setAttribute("disabled", true);
  } else {
    add.removeAttribute("disabled");
  }
};

// add new product
add.onclick = () => {
  let newProd = {
    title: title.value,
    price: price.value,
    taxes: taxes.value == "" ? "0" : taxes.value,
    ads: ads.value == "" ? "0" : ads.value,
    discount: discount.value == "" ? "0" : discount.value,
    total: total.innerHTML,
    count: count.value == "" ? "1" : count.value,
    category: category.value,
  };

  let data = [];

  if (localStorage.data != null) {
    data = JSON.parse(localStorage.data);
  }
  // in add mode
  if (add.value == "add") {
    let cnt = +newProd.count;
    while (cnt--) {
      data.push(newProd);
    }
  }
  // in update mode
  else if (add.value == "update") {
    data[update_i] = newProd;
    to_add_mode();
  }

  localStorage.data = JSON.stringify(data);

  title.value = price.value = taxes.value = ads.value = discount.value = count.value = category.value = total.innerHTML =
    "";

  table_update(data);
};

// update table
function table_update(products) {
  tblBody.innerHTML = "";
  table_insert(products);

  // show delete all buttom
  if (products.length > 0) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }

  cntTotal();
}

// insert products in table
function table_insert(products) {
  if (products == null) return false;

  for (let i = 0; i < products.length; i++) {
    let cnt = +products[i].count;
    console.log(cnt);
    console.log(typeof cnt);

    tblBody.innerHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick = "show_product(${i})" id="upd">Update</button></td>
      <td><button onclick = "table_delete(${i})" id="del">Delete</button></td>
    </tr>
    `;
  }
}

// delete item from table
function table_delete(item) {
  let data = JSON.parse(localStorage.data);
  data.splice(item, 1);

  localStorage.data = JSON.stringify(data);

  table_update(data);
}

// delete all
deleteAll.onclick = () => {
  localStorage.removeItem("data");
  table_update([]);
};

// show item data in fildes
function show_product(item) {
  let data = JSON.parse(localStorage.data);

  title.value = data[item].title;
  price.value = data[item].price;
  taxes.value = data[item].taxes;
  ads.value = data[item].ads;
  count.value = "";
  discount.value = data[item].discount;
  category.value = data[item].category;
  cntTotal();
  
  to_update_mode(item);
}

// in update mode
function to_update_mode(item) {
  add.innerHTML = "Update";
  add.value = "update";
  update_i = item;
  scroll({
    top: 0,
    behavior: "smooth"
  })
  if(!disable_cnt) count.setAttribute("disabled", "true");
  
}

// in add mode
function to_add_mode() {
  add.innerHTML = "Add";
  add.value = "add";
  if(!disable_cnt) count.removeAttribute("disabled");
}