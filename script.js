// ===============================
// WESTERN CLOTHING V2
// ===============================

const products = [
  {
    id: 1,
    name: "Classic White Tee",
    category: "tshirt",
    price: 2499,
    image: "images/products/tshirt1.webp",
    description: "Premium heavyweight cotton oversized t-shirt.",
    badge: "NEW"
  },
  {
    id: 2,
    name: "Black Hoodie",
    category: "hoodie",
    price: 3999,
    image: "images/products/hoodie.webp",
    description: "Soft fleece hoodie with relaxed fit.",
    badge: "BEST"
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    category: "pants",
    price: 3599,
    image: "images/products/jeans.webp",
    description: "Stretch denim for everyday comfort.",
    badge: "SALE"
  },
  {
    id: 4,
    name: "Denim Jacket",
    category: "jacket",
    price: 4999,
    image: "images/products/jacket.webp",
    description: "Classic blue denim jacket.",
    badge: "NEW"
  }
];

let cart = [];
let wishlist = [];

// ===============================
// RENDER PRODUCTS
// ===============================

const grid = document.getElementById("product-grid");

function renderProducts(items) {

  if (!grid) return;

  grid.innerHTML = "";

  items.forEach(product => {

    grid.innerHTML += `
      <div class="product-card fade-up">

        <span class="badge">${product.badge}</span>

        <div class="product-image">

          <img src="${product.image}" alt="${product.name}">

          <div class="product-icons">

            <button onclick="toggleWishlist(${product.id})">
              <i class="far fa-heart"></i>
            </button>

            <button onclick="quickView(${product.id})">
              <i class="fas fa-eye"></i>
            </button>

          </div>

        </div>

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <div class="rating">
            ★★★★★
          </div>

          <div class="price">
            NPR ${product.price.toLocaleString()}
          </div>

          <button
            class="add-cart"
            onclick="addToCart(${product.id})">

            Add to Cart

          </button>

        </div>

      </div>
    `;

  });

  revealAnimation();
}

renderProducts(products);

// ===============================
// SEARCH
// ===============================

const searchInput = document.getElementById("search");

if (searchInput) {

  searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase();

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value)
    );

    renderProducts(filtered);

  });

}

// ===============================
// CATEGORY FILTER
// ===============================

const categorySelect = document.getElementById("category");

if (categorySelect) {

  categorySelect.addEventListener("change", e => {

    const category = e.target.value;

    if (category === "all") {
      renderProducts(products);
      return;
    }

    renderProducts(
      products.filter(product =>
        product.category === category
      )
    );

  });

}

// ===============================
// SHOPPING CART
// ===============================

function addToCart(id){

const product = products.find(p=>p.id===id);

cart.push(product);

updateCart();

}

function updateCart(){

const cartItems=document.getElementById("cartItems");

const total=document.getElementById("cartTotal");

const count=document.getElementById("cart-count");

if(cart.length===0){

cartItems.innerHTML=`<p class="empty">Your cart is empty.</p>`;

total.textContent="NPR 0";

count.textContent="0";

return;

}

count.textContent=cart.length;

let html="";

let totalPrice=0;

cart.forEach((item,index)=>{

totalPrice+=item.price;

html+=`

<div class="cart-item">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>NPR ${item.price.toLocaleString()}</p>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

`;

});

cartItems.innerHTML=html;

total.textContent=`NPR ${totalPrice.toLocaleString()}`;

}

function removeItem(index){

cart.splice(index,1);

updateCart();

}

// ===============================
// CART DRAWER
// ===============================

const cartDrawer=document.getElementById("cartDrawer");

document.querySelector(".cart-icon").onclick=()=>{

cartDrawer.classList.add("active");

}

document.getElementById("closeCart").onclick=()=>{

cartDrawer.classList.remove("active");

}

// ===============================
// WISHLIST
// ===============================

function toggleWishlist(id){

if(wishlist.includes(id)){

wishlist=wishlist.filter(item=>item!==id);

alert("Removed from Wishlist");

}else{

wishlist.push(id);

alert("Added to Wishlist ❤️");

}

}

// ===============================
// QUICK VIEW
// ===============================

function quickView(id){

const product=products.find(p=>p.id===id);

document.getElementById("modalImage").src=product.image;

document.getElementById("modalTitle").textContent=product.name;

document.getElementById("modalPrice").textContent=
`NPR ${product.price.toLocaleString()}`;

document.getElementById("modalDescription").textContent=
product.description;

document.getElementById("quickView").classList.add("active");

document.getElementById("modalWhatsapp").onclick=()=>{

orderWhatsapp(product);

};

document.getElementById("modalCart").onclick=()=>{

addToCart(product.id);

};

}

document.querySelector(".close-modal").onclick=()=>{

document.getElementById("quickView")
.classList.remove("active");

}

// ===============================
// WHATSAPP ORDER
// ===============================

function orderWhatsapp(product){

const text=

`Hello Western Clothing!

I would like to order:

${product.name}

Price: NPR ${product.price}

`;

window.open(

`https://wa.me/9779766390857?text=${encodeURIComponent(text)}`,

"_blank"

);

}

// ===============================
// CONTACT FORM
// ===============================

const form=document.getElementById("contact-form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name=form.querySelector("input").value;

const phone=form.querySelectorAll("input")[1].value;

const message=form.querySelector("textarea").value;

const text=

`Hello Western Clothing!

Name: ${name}

Phone: ${phone}

${message}

`;

window.open(

`https://wa.me/9779766390857?text=${encodeURIComponent(text)}`,

"_blank"

);

form.reset();

});

}

// ===============================
// BACK TO TOP
// ===============================

const topBtn=document.getElementById("backTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

// ===============================
// SCROLL ANIMATION
// ===============================

function revealAnimation(){

const elements=document.querySelectorAll(".fade-up");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

elements.forEach(el=>observer.observe(el));

}

revealAnimation();

// ===============================
// FOOTER YEAR
// ===============================

document.getElementById("year").textContent=
new Date().getFullYear();