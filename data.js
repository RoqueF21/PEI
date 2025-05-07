// Dados
const products = [
  { 
    id: 1, 
    name: "Teclado Mecânico HyperX", 
    price: 250, 
    rating: 4.5,
    category: "perifericos",
    brand: "hyperx",
    stock: 15,
    description: "Teclado mecânico com switches Red, iluminação RGB e design ergonômico.",
    reviews: [
      { user: "João", rating: 5, comment: "Excelente teclado! Muito confortável para digitar." },
      { user: "Maria", rating: 4, comment: "Ótimo custo-benefício." }
    ]
  },
  { 
    id: 2, 
    name: "Mouse Gamer Logitech", 
    price: 150, 
    rating: 4.7,
    category: "perifericos",
    brand: "logitech",
    stock: 20,
    description: "Mouse gamer com sensor óptico de alta precisão, 6 botões programáveis e RGB.",
    reviews: [
      { user: "Pedro", rating: 5, comment: "Precisão incrível! Melhor mouse que já tive." },
      { user: "Ana", rating: 4.5, comment: "Muito confortável para longas sessões de jogo." }
    ]
  },
  { 
    id: 3, 
    name: "Monitor Samsung 24\"", 
    price: 800, 
    rating: 4.3,
    category: "monitores",
    brand: "samsung",
    stock: 8,
    description: "Monitor LED Full HD de 24 polegadas, 144Hz, tempo de resposta de 1ms.",
    reviews: [
      { user: "Carlos", rating: 4, comment: "Excelente para jogos, cores vibrantes." },
      { user: "Fernanda", rating: 4.5, comment: "Design elegante e ótima qualidade de imagem." }
    ]
  },
  { 
    id: 4, 
    name: "PC Gamer Dell", 
    price: 4500, 
    rating: 4.8,
    category: "computadores",
    brand: "dell",
    stock: 5,
    description: "Computador gamer com processador i7, 16GB RAM, SSD 512GB e placa de vídeo RTX 3060.",
    reviews: [
      { user: "Lucas", rating: 5, comment: "Roda todos os jogos no ultra sem problemas!" },
      { user: "Juliana", rating: 4.5, comment: "Muito silencioso e potente." }
    ]
  },
  { 
    id: 5, 
    name: "Headset HyperX Cloud", 
    price: 350, 
    rating: 4.6,
    category: "perifericos",
    brand: "hyperx",
    stock: 12,
    description: "Headset com áudio surround 7.1, microfone destacável e almofadas com espuma memory foam.",
    reviews: [
      { user: "Rafael", rating: 5, comment: "Som incrível e muito confortável!" },
      { user: "Camila", rating: 4, comment: "Ótima qualidade de áudio, recomendo." }
    ]
  }
];

let cart = [];
let orders = [];
let filteredProducts = [...products];

// Função para exibir uma página específica
function showPage(id) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  
  if (id === "catalog") renderCatalog();
  if (id === "cart") renderCart();
  if (id === "orders") renderOrders();
  if (id === "admin") renderAdmin();
}

// Funções de filtragem de produtos
function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter").value;
  const brandFilter = document.getElementById("brandFilter").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  
  filteredProducts = products.filter(product => {
    // Filtro por categoria
    if (categoryFilter && product.category !== categoryFilter) return false;
    
    // Filtro por marca
    if (brandFilter && product.brand !== brandFilter) return false;
    
    // Filtro por preço mínimo
    if (minPrice && product.price < minPrice) return false;
    
    // Filtro por preço máximo
    if (maxPrice && product.price > maxPrice) return false;
    
    return true;
  });
  
  renderCatalog();
}

function clearFilters() {
  document.getElementById("categoryFilter").value = "";
  document.getElementById("brandFilter").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  
  filteredProducts = [...products];
  renderCatalog();
}

function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  
  if (searchTerm === "") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    );
  }
  
  renderCatalog();
}

// Renderiza o catálogo de produtos
function renderCatalog() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  
  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>Nenhum produto encontrado com os filtros selecionados.</p>";
    return;
  }
  
  filteredProducts.forEach(product => {
    // Criar elemento do produto
    const productElement = document.createElement("div");
    productElement.className = "product";
    
    // Definir conteúdo HTML
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p class="price">R$ ${product.price.toFixed(2)}</p>
      <div class="rating">
        ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}
        <span>(${product.rating})</span>
      </div>
      <p class="category-tag">${product.category}</p>
      <p class="category-tag">${product.brand}</p>
      ${product.stock > 0 
        ? `<p class="stock">Em estoque: ${product.stock} unidades</p>` 
        : `<p class="out-of-stock">Fora de estoque</p>`}
      <div class="buttons">
        <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
          Adicionar ao Carrinho
        </button>
        <button onclick="viewProductDetails(${product.id})">Ver Detalhes</button>
      </div>
    `;
    
    productList.appendChild(productElement);
  });
}

// Exibe detalhes de um produto específico
function viewProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  const detailContent = document.getElementById("productDetailContent");
  
  detailContent.innerHTML = `
    <div class="product-detail">
      <h2>${product.name}</h2>
      <div class="rating">
        ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}
        <span>(${product.rating})</span>
      </div>
      <p class="price">R$ ${product.price.toFixed(2)}</p>
      <p class="category-tag">${product.category}</p>
      <p class="category-tag">${product.brand}</p>
      ${product.stock > 0 
        ? `<p class="stock">Em estoque: ${product.stock} unidades</p>` 
        : `<p class="out-of-stock">Fora de estoque</p>`}
      <div class="description">
        <h3>Descrição</h3>
        <p>${product.description}</p>
      </div>
      <button class="add-to-cart-large" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
        Adicionar ao Carrinho
      </button>
      
      <div class="reviews">
        <h3>Avaliações</h3>
        ${product.reviews.map(review => `
          <div class="review">
            <div class="review-header">
              <span class="review-user">${review.user}</span>
              <span class="review-rating">${"★".repeat(Math.floor(review.rating))}${"☆".repeat(5 - Math.floor(review.rating))}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
          </div>
        `).join('')}
        
        <div class="add-review">
          <h4>Deixe sua avaliação</h4>
          <div class="rating-input">
            <span>Sua avaliação: </span>
            <select id="userRating">
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>
          </div>
          <textarea id="userComment" placeholder="Seu comentário..."></textarea>
          <button onclick="addReview(${product.id})">Enviar Avaliação</button>
        </div>
      </div>
    </div>
  `;
  
  showPage("product-details");
}

// Adiciona uma nova avaliação a um produto
function addReview(productId) {
  const rating = parseInt(document.getElementById("userRating").value);
  const comment = document.getElementById("userComment").value.trim();
  
  if (!comment) {
    alert("Por favor, escreva um comentário para sua avaliação.");
    return;
  }
  
  const product = products.find(p => p.id === productId);
  product.reviews.push({
    user: "Você",
    rating: rating,
    comment: comment
  });
  
  // Recalcular a média das avaliações
  const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.rating = (totalRating / product.reviews.length).toFixed(1);
  
  alert("Avaliação enviada com sucesso!");
  viewProductDetails(productId);
}

// Funções do carrinho de compras
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product.stock <= 0) {
    alert("Produto fora de estoque!");
    return;
  }
  
  // Verifica se o produto já está no carrinho
  const cartItemIndex = cart.findIndex(item => item.productId === productId);
  
  if (cartItemIndex !== -1) {
    // Incrementa a quantidade se já estiver no carrinho
    cart[cartItemIndex].quantity++;
  } else {
    // Adiciona novo item ao carrinho
    cart.push({
      productId: productId,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  
  // Atualiza o contador do carrinho no botão
  updateCartCount();
  
  alert("Produto adicionado ao carrinho!");
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = cartCount;
}

function updateCartItemQuantity(index, delta) {
  cart[index].quantity += delta;
  
  // Remove o item se a quantidade for zero ou menos
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  
  renderCart();
  updateCartCount();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");
  
  cartItems.innerHTML = "";
  
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
    cartSummary.innerHTML = "";
    return;
  }
  
  // Renderiza itens do carrinho
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    
    itemElement.innerHTML = `
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>R$ ${item.price.toFixed(2)}</p>
      </div>
      <div class="item-quantity">
        <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
      </div>
      <div class="item-total">
        <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
        <button class="remove-item" onclick="removeCartItem(${index})">Remover</button>
      </div>
    `;
    
    cartItems.appendChild(itemElement);
  });
  
  // Calcula subtotal, frete e total //
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const frete = calcularFrete(subtotal);
  const total = subtotal + frete;
  
  // Renderiza resumo do carrinho //
  cartSummary.innerHTML = `
    <div class="cart-summary-content">
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>R$ ${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Frete:</span>
        <span>R$ ${frete.toFixed(2)}</span>
        ${frete === 0 ? '<span class="free-shipping">Frete Grátis</span>' : ''}
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span>R$ ${total.toFixed(2)}</span>
      </div>
      <button class="checkout-button" onclick="showPage('checkout')">Finalizar Compra</button>
    </div>
  `;
}

function calcularFrete(subtotal) {
  return subtotal >= 300 ? 0 : 40;
}

// Funções do processo de checkout
function proceedToPayment() {
  // Aqui você poderia validar o formulário de endereço antes de prosseguir
  
  document.getElementById("shippingForm").classList.add("hidden");
  document.getElementById("paymentForm").classList.remove("hidden");
  
  document.getElementById("stepShipping").classList.remove("active");
  document.getElementById("stepPayment").classList.add("active");
}

function goToShipping() {
  document.getElementById("paymentForm").classList.add("hidden");
  document.getElementById("shippingForm").classList.remove("hidden");
  
  document.getElementById("stepPayment").classList.remove("active");
  document.getElementById("stepShipping").classList.add("active");
}

function placeOrder() {
  // Validar formulário de pagamento
  
  // Gerar novo pedido
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const frete = calcularFrete(subtotal);
  const total = subtotal + frete;
  
  const order = {
    id: orders.length + 1,
    date: new Date().toLocaleDateString(),
    items: [...cart],
    shipping: {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zipcode: document.getElementById("zipcode").value,
      phone: document.getElementById("phone").value
    },
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
    subtotal: subtotal,
    shipping: frete,
    total: total,
    status: "Processando"
  };
  
  orders.push(order);
  
  // Limpar carrinho
  cart = [];
  updateCartCount();
  
  // Mostrar confirmação
  const orderDetails = document.getElementById("orderDetails");
  orderDetails.innerHTML = `
    <p><strong>Número do Pedido:</strong> #${order.id}</p>
    <p><strong>Data:</strong> ${order.date}</p>
    <p><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <p>Você receberá um e-mail com os detalhes do seu pedido.</p>
  `;
  
  document.getElementById("paymentForm").classList.add("hidden");
  document.getElementById("orderConfirmation").classList.remove("hidden");
  
  document.getElementById("stepPayment").classList.remove("active");
  document.getElementById("stepConfirmation").classList.add("active");
}

// Renderiza pedidos do usuário
function renderOrders() {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = "";
  
  if (orders.length === 0) {
    ordersList.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
    return;
  }
  
  orders.forEach(order => {
    const orderElement = document.createElement("div");
    orderElement.className = "order-card";
    
    const itemsList = order.items.map(item => 
      `<li>${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</li>`
    ).join("");
    
    orderElement.innerHTML = `
      <div class="order-header">
        <h3>Pedido #${order.id}</h3>
        <span class="order-date">${order.date}</span>
        <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
      </div>
      <div class="order-details">
        <ul class="order-items">
          ${itemsList}
        </ul>
        <div class="order-summary">
          <p><strong>Subtotal:</strong> R$ ${order.subtotal.toFixed(2)}</p>
          <p><strong>Frete:</strong> R$ ${order.shipping.toFixed(2)}</p>
          <p><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
        </div>
      </div>
    `;
    
    ordersList.appendChild(orderElement);
  });
}

// Funções do painel administrativo
function showAdminTab(tabName) {
  document.querySelectorAll(".admin-tab").forEach(tab => tab.classList.add("hidden"));
  document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.remove("hidden");
  
  // Atualiza botões de abas
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

function renderAdmin() {
  // Renderiza dashboard
  renderAdminDashboard();
  
  // Renderiza lista de produtos
  renderAdminProducts();
  
  // Renderiza lista de pedidos
  renderAdminOrders();
}

function renderAdminDashboard() {
  // Calcula estatísticas
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrdersCount = orders.filter(order => order.status === "Processando").length;
  
  // Exibe estatísticas
  document.getElementById("totalOrders").textContent = totalOrdersCount;
  document.getElementById("totalRevenue").textContent = `R$ ${totalRevenue.toFixed(2)}`;
  document.getElementById("pendingOrders").textContent = pendingOrdersCount;
  
  // Renderiza produtos mais vendidos
  const topProducts = document.getElementById("topProducts");
  topProducts.innerHTML = "<p>Nenhum dado disponível ainda.</p>";
}

function renderAdminProducts() {
  const productsTable = document.getElementById("productsTable");
  productsTable.innerHTML = "";
  
  products.forEach(product => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>R$ ${product.price.toFixed(2)}</td>
      <td>${product.category}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct(${product.id})" class="edit-btn">Editar</button>
        <button onclick="deleteProduct(${product.id})" class="delete-btn">Excluir</button>
      </td>
    `;
    
    productsTable.appendChild(row);
  });
}

function renderAdminOrders() {
  const ordersTable = document.getElementById("ordersTable");
  ordersTable.innerHTML = "";
  
  orders.forEach(order => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.date}</td>
      <td>${order.shipping.name}</td>
      <td>R$ ${order.total.toFixed(2)}</td>
      <td>
        <select onchange="updateOrderStatus(${order.id}, this.value)">
          <option value="Processando" ${order.status === "Processando" ? "selected" : ""}>Processando</option>
          <option value="Enviado" ${order.status === "Enviado" ? "selected" : ""}>Enviado</option>
          <option value="Entregue" ${order.status === "Entregue" ? "selected" : ""}>Entregue</option>
          <option value="Cancelado" ${order.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
        </select>
      </td>
      <td>
        <button onclick="viewOrderDetails(${order.id})" class="view-btn">Detalhes</button>
      </td>
    `;
    
    ordersTable.appendChild(row);
  });
}

function showProductForm() {
  document.getElementById("productForm").classList.remove("hidden");
  document.getElementById("formTitle").textContent = "Novo Produto";
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productCategory").value = "perifericos";
  document.getElementById("productBrand").value = "";
  document.getElementById("productStock").value = "";
  document.getElementById("productDescription").value = "";
}

function cancelProductForm() {
  document.getElementById("productForm").classList.add("hidden");
}

function editProduct(productId) {
  const product = products.find(p => p.id === productId);
  
  document.getElementById("productForm").classList.remove("hidden");
  document.getElementById("formTitle").textContent = "Editar Produto";
  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productBrand").value = product.brand;
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productDescription").value = product.description;
}

function saveProduct() {
  const productId = document.getElementById("productId").value;
  
  const newProduct = {
    id: productId ? parseInt(productId) : products.length + 1,
    name: document.getElementById("productName").value,
    price: parseFloat(document.getElementById("productPrice").value),
    category: document.getElementById("productCategory").value,
    brand: document.getElementById("productBrand").value,
    stock: parseInt(document.getElementById("productStock").value),
    description: document.getElementById("productDescription").value,
    rating: productId ? products.find(p => p.id === parseInt(productId)).rating : 0,
    reviews: productId ? products.find(p => p.id === parseInt(productId)).reviews : []
  };
  
  if (productId) {
    // Atualiza produto existente
    const index = products.findIndex(p => p.id === parseInt(productId));
    products[index] = newProduct;
  } else {
    // Adiciona novo produto
    products.push(newProduct);
  }
  
  document.getElementById("productForm").classList.add("hidden");
  renderAdminProducts();
}

function deleteProduct(productId) {
  if (confirm("Tem certeza de que deseja excluir este produto?")) {
    const index = products.findIndex(p => p.id === productId);
    products.splice(index, 1);
    renderAdminProducts();
  }
}

function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  order.status = status;
}

function viewOrderDetails(orderId) {
  alert(`Detalhes do pedido #${orderId} (implementação futura)`);
}

// Inicializa a aplicação
document.addEventListener("DOMContentLoaded", function() {
  showPage("catalog");
  updateCartCount();
});
