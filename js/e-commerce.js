const close = document.querySelector('.close');
const nav = document.querySelector('.nav-links');
const gallery = document.querySelectorAll('.images');
const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');
const heroImg = document.querySelector('.product-image');
const btnAddToCard = document.querySelector('.add');
const cartCount = document.querySelector('.cart-count');
const msgEmpty = document.querySelector('.msg-empty');
const checkout = document.querySelector('.checkout');
const productInShoppingCart = document.querySelector('.products-in-cart');
const cart = document.querySelector('.cart')
const cartContent = document.querySelector('.cart-content')
const menu = document.querySelector('.menu');

menu.addEventListener('click', menuOpen)

cart.addEventListener('click', openCart);

close.addEventListener('click', menuClose)

btnNext.addEventListener('click', handleBtnClickNext);

btnPrevious.addEventListener('click', handleBtnClickPrevious);

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  // Close the Modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

let productCounterValue = 1;
let productsInCart = 0;
let price = 250.0
let discount = 0.5;

btnAddToCard.addEventListener('click', addToCart);

function menuOpen() {
    nav.style.display = 'block'
}

function menuClose() {
    nav.style.display = 'none'
}

function openCart() {
    cartContent.classList.toggle('hidden')
}

function onThumbClick(event) {
    //clear active state for all thumbnails
    gallery.forEach(img => {
        img.classList.remove('img');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('img');
    //update hero image
    heroImg.src = event.target.src.replace('-thumbnail', '');
}

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('img-product-', ''));
    return imageIndex;
}

function setHeroImage(imageIndex) {
    heroImg.src = `./img/img-product-${imageIndex}.jpg`;
    //images are not sync
    gallery.forEach(img => {
        img.classList.remove('img');
    });
}

function addToCart() {
    if (count > 0) {
        productsInCart += count;

        const productHTMLElement = `
        <div class="item">
            <img class="product-img" src="./img/img-product-1-thumbnail.jpg" alt="product 1 thumb">
            <div class="details">
                <div class="product-name">Autumn Limited Edition...</div>
                <div class="price-group">
                    <div class="price">$${(price*discount).toFixed(2)}</div> x
                    <div class="countbtn">${productsInCart}</div>
                    <div class="total-amount">$${(price*discount*productsInCart).toFixed(2)}</div>
                </div>
            </div>
            <img id="btnDelete" src="./img/icon-delete.svg" alt="icon delete">
        </div>
        `;
    
        productInShoppingCart.innerHTML = productHTMLElement;
    
        updateCart();
    
        const btnDelete = document.querySelector('#btnDelete');
        btnDelete.addEventListener('click', onBtnDeleteClick);
    }
}

function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}

function updateCartIcon() {
    cartCount.textContent = productsInCart;
    if (productsInCart == 0) {
        if (!cartCount.classList.contains('hidden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

function updateMsgEmpty() {
    if (productsInCart == 0) {
        if (msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if (!msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.add('hidden');
        }
    }

}

function updateCheckoutButton() {
    if (productsInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
    } else {
        checkout.classList.remove('hidden');
    }
}

function onBtnDeleteClick() {
    productsInCart = "";
    updateCart();

    const el = document.querySelector('.countbtn');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productsInCart;
    totalAmount.innerHTML = `$${(price*discount*productsInCart).toFixed(2)}`;

    if (productsInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}

let count = 0;

const btns = document.querySelectorAll('.btn');
const num = document.getElementById('num');

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const btnClass = e.currentTarget.classList;
        if(btnClass.contains('minus')) {
            if(count > 0){
                count--
            } else {
                count = 0
            }
        } else if(btnClass.contains('plus')){
            count++;
        } else {
            count = 0;
        }
        num.textContent = count
    })
})