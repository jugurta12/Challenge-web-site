



// Liste des produits
const products = [
    { id: 'add1', name: 'Bracelet Martir', price: 279 },
    { id: 'add2', name: 'Boucles d\'oreilles en argent', price: 30 }
];

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Récupère le panier depuis le localStorage ou crée un nouveau panier
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ajoute le produit au panier
        cart.push(product);

        // Sauvegarde le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Afficher le popup
        showPopup(`${product.name} ajouté au panier !`);
    }
}


// Mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Efface les anciens articles
    cartItems.innerHTML = '';

    // Récupère le panier depuis le localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Affiche chaque article du panier
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}€`;

        // Ajouter bouton pour enlever l'article
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Enlever';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);

        cartItems.appendChild(li);
    });

    // Calcul du total
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = `Total : ${totalPrice}€`;
}

// Fonction pour enlever un produit du panier
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Retirer l'article du panier
    cart.splice(index, 1);

    // Sauvegarder à nouveau le panier
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartDisplay();
}

// Fonction pour vider le panier
function clearCart() {
    // Vider le localStorage
    localStorage.removeItem('cart');

    // Mettre à jour l'affichage du panier
    updateCartDisplay();
}
// Événements sur les pages
if (document.getElementById('add1')) {
    document.getElementById('add1').addEventListener('click', () => addToCart('add1'));
    document.getElementById('close-popup').addEventListener('click', closePopup);
}

if (document.getElementById('clear-cart')) {
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    // Mettre à jour l'affichage du panier lors du chargement de la page
    updateCartDisplay();
}

document.getElementById('clear-cart').addEventListener('click', function() {
    alert("Le panier a bien été vidé !");
});

document.getElementById('payement').addEventListener('click', function() {
    alert("Le payement est en cours, veuillez vérifier auprès de votre banque.");
});