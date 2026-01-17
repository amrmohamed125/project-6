let firstName = localStorage.getItem("firstName");
let isLoggedIn = !!firstName;

document.querySelector("#logout")?.addEventListener("click", function () {
  localStorage.removeItem("firstName");
  localStorage.removeItem("cart");
  localStorage.removeItem("favorites");

  window.location.href = "login/login.html";
});


let searchInput = document.querySelector('input[placeholder="Search..."]');
let searchType = document.querySelector("select");
let products = document.querySelectorAll(".card");
let cartCount = document.querySelector(".number");
let cartDropdown = document.getElementById("cart-dropdown");
let cartIcon = document.querySelector(".cart");

// 🛒 تحميل السلة والمفضلة
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ✅ حفظ البيانات
function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ✅ تحديث عداد السلة
function updateCartCount() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// ✅ تحديث الدروب داون
function renderCartDropdown() {
  cartDropdown.innerHTML = "";

  if (cart.length === 0) {
    cartDropdown.innerHTML = `<p class="text-center m-2">Your cart is empty</p>`;
    return;
  }

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "p-2", "border", "rounded", "mb-2");
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>$${item.price}</small>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-outline-secondary decrease">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary increase">+</button>
      </div>
    `;

    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveData();
      updateCartCount();
      renderCartDropdown();
    });

    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      saveData();
      updateCartCount();
      renderCartDropdown();
    });

    cartDropdown.appendChild(div);
  });

  const viewAll = document.createElement("a");
  viewAll.href = "cart-products/cart_products.html";
  viewAll.className = "btn btn-dark w-100 mt-2";
  viewAll.textContent = "View All Products";
  cartDropdown.appendChild(viewAll);
}

// ✅ إظهار / إخفاء السلة
cartIcon.addEventListener("click", () => {
  cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
});

// ✅ إضافة للسلة
document.querySelectorAll(".btn.btn-primary").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!isLoggedIn) {
      window.location.href = "login/login.html";
      return;
    }

    let card = this.closest(".card");
    let name = card.querySelector(".card-title").textContent.trim();
    let price = parseFloat(card.querySelector("p").textContent.replace(/[^0-9.]/g, ""));
    let img = card.querySelector("img").src;

    let existing = cart.find((item) => item.name === name);

    if (existing) {
      // إزالة المنتج
      cart = cart.filter((item) => item.name !== name);
      this.textContent = "Add to Cart";
      this.classList.remove("btn-danger");
      this.classList.add("btn-primary");
    } else {
      // إضافة المنتج
      cart.push({ name, price, img, quantity: 1 });
      this.textContent = "Remove";
      this.classList.remove("btn-primary");
      this.classList.add("btn-danger");
    }

    saveData();
    updateCartCount();
    renderCartDropdown();
  });
});

// ❤️ المفضلة
document.querySelectorAll(".fa-heart").forEach((heart) => {
  heart.addEventListener("click", function () {
    if (!isLoggedIn) {
      window.location.href = "login/login.html";
      return;
    }

    let card = this.closest(".card");
    let title = card.querySelector(".card-title").textContent.trim();
    let price = parseFloat(card.querySelector("p").textContent.replace(/[^0-9.]/g, ""));
    let img = card.querySelector("img").src;

    let existing = favorites.find((item) => item.title === title);

    if (existing) {
      favorites = favorites.filter((item) => item.title !== title);
      this.style.color = "black";
    } else {
      favorites.push({ title, price, img });
      this.style.color = "red";
    }

    saveData();
  });
});

// ✅ البحث
searchInput?.addEventListener("input", function () {
  let value = this.value.toLowerCase().trim();
  let type = searchType.value;

// ✅ تظبيط ترتيب المنتجات 
  let productCols = document.querySelectorAll(".col-md-6.col-lg-4");

  productCols.forEach((col) => {
    let card = col.querySelector(".card");
    let name = card.querySelector(".card-title").textContent.toLowerCase();
    let category = card.querySelector("p:nth-of-type(2)")?.textContent.toLowerCase() || "";

    let match = false;
    if (type === "Search by Product Name") {
      match = name.includes(value);
    } else if (type === "2") {
      match = category.includes(value);
    }

    // لو المنتج مطابق يظهر، غير كده يخفي العمود بالكامل
    if (match || value === "") {
      col.style.display = "block";
    } else {
      col.style.display = "none";
    }
  });
});

// ✅ عرض اسم المستخدم
if (isLoggedIn) {
  document.querySelector("#userinfo")?.remove();
  document.querySelector("#log").style.display = "block";
  document.querySelector("#user").textContent = "Hello, " + firstName;
} else {
  document.querySelector("#log").style.display = "none";
}

// ✅ تحديث عند التحميل
updateCartCount();

renderCartDropdown();








