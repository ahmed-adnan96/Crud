let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescribeInput = document.getElementById("productDescrip");
let productsShow = document.getElementById("showProducts");
let addProductButton = document.getElementById("addPro");
let updateProductButton = document.getElementById("updatePro");
let product;
let products = [];
let currntIndx;
if (localStorage.getItem("totalProduct") !== null) {
  products = JSON.parse(localStorage.getItem("totalProduct"));
  showProd(products);
}
function addProduct() {
  product = {
    nameProduct: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    discribe: productDescribeInput.value,
  };
  console.log(product);
  if (validate() == true) {
    products.push(product);
    localStorage.setItem("totalProduct", JSON.stringify(products));
    showProd(products);
    clearInput();
  } else {
    alert("name is not valid");
    clearInput();
  }
}

function showProd(arrProduct) {
  let shPro = ``;
  let i;
  for (i = 0; i < arrProduct.length; i++) {
    shPro += `              <tr>
    <td>${i + 1}</td>
    <td>${arrProduct[i].nameProduct}</td>
    <td>${arrProduct[i].price}</td>
    <td>${arrProduct[i].category}</td>
    <td>${arrProduct[i].discribe}</td>
    <td>
      <button onclick="updatProduct(${i}) " class="btn btn-outline-warning">
        <i class="fa-solid fa-edit"></i>
      </button>
    </td>
    <td>
      <button class="btn btn-outline-danger" onclick="deletProduct(${i}) ">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
  }
  productsShow.innerHTML = shPro;
}

function clearInput() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescribeInput.value = "";
}

function deletProduct(indx) {
  products.splice(indx, 1);
  localStorage.setItem("totalProduct", JSON.stringify(products));
  showProd(products);
}
function searchProduct(term) {
  let matchedProduct = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].nameProduct.toLowerCase().includes(term.toLowerCase())) {
      matchedProduct.push(products[i]);
    }
  }
  showProd(matchedProduct);
}
function updatProduct(indx) {
  addProductButton.classList.add("d-none");
  updateProductButton.classList.remove("d-none");
  productNameInput.value = products[indx].nameProduct;
  productPriceInput.value = products[indx].price;
  productCategoryInput.value = products[indx].category;
  productDescribeInput.value = products[indx].discribe;
  currntIndx = indx;
}
function getUpdate() {
  if (validate() == true) {
    product = {
      nameProduct: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      discribe: productDescribeInput.value,
    };
    products[currntIndx] = product;
    showProd(products);
    addProductButton.classList.remove("d-none");
    updateProductButton.classList.add("d-none");
    clearInput();
  } else {
    alert("name is not valid");
  }
}
function validate() {
  let regex = /^[A-Z][a-z]{3,8}/;
  return regex.test(productNameInput.value);
}
