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

// table
let table = document.getElementById("products");

// onload
onload = () => {
  table_insert(JSON.parse(localStorage.data));
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

  data.push(newProd);
  localStorage.data = JSON.stringify(data);

  title.value = price.value = taxes.value = ads.value = discount.value = count.value = category.value = total.innerHTML =
    "";

  // location.reload();
  table_insert([newProd]);
};

// update table
function table_insert(products) {
  if (products == null) return false;

  let tblBody = document.getElementById("tbl_body");
  for (let i = 0; i < products.length; i++) {
    // let row = document.createElement("tr");

    // let id = document.createElement("td");
    // let title = document.createElement("td");
    // let price = document.createElement("td");
    // let taxes = document.createElement("td");
    // let ads = document.createElement("td");
    // let discount = document.createElement("td");
    // let total = document.createElement("td");
    // let category = document.createElement("td");
    // let upd = document.createElement("td");
    // let del = document.createElement("td");

    // id.innerHTML = i + 1;
    // title.innerHTML = products[i].title;
    // price.innerHTML = products[i].price;
    // taxes.innerHTML = products[i].taxes;
    // ads.innerHTML = products[i].ads;
    // discount.innerHTML = products[i].discount;
    // total.innerHTML = products[i].total;
    // category.innerHTML = products[i].category;

    // upd.innerHTML = '<button id="upd">Update</button>';
    // del.innerHTML = '<button id="del">Delete</button>';

    // console.log(title, price, taxes, ads, discount, total, category);

    // row.appendChild(id);
    // row.appendChild(title);
    // row.appendChild(price);
    // row.appendChild(taxes);
    // row.appendChild(ads);
    // row.appendChild(discount);
    // row.appendChild(total);
    // row.appendChild(category);
    // row.appendChild(upd);
    // row.appendChild(del);

    let cnt = +products[i].count;
    // while(cnt--) tblBody.appendChild(row.cloneNode(true));

    console.log(cnt);
    console.log(typeof cnt);

    while (cnt--) {
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
        <td><button id="upd">Update</button></td>
        <td><button id="del">Delete</button></td>
      </tr>
    `;
    }
  }
}

function table_delete(item){
  
}
