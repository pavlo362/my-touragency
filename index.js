document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuToggle = document.getElementById("menu-toggle");
    const themeToggle = document.getElementById("themeToggle");
    const searchBtn = document.getElementById("searchBtn");
    const favoritesBtn = document.getElementById("favoritesBtn");
    const favCount = document.getElementById("favCount");
    const navActions = document.querySelector(".nav-actions");
    const cards = [...document.querySelectorAll(".card")];
    const searchInput = document.querySelector(".search-card input[type='text']");
    const contactForm = document.querySelector(".contact-form");

    function readStorage(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key)) ?? fallback;
        } catch {
            return fallback;
        }
    }

    let cart = readStorage("skyboundCart", []);
    let favorites = readStorage("skyboundFavorites", []);
    let currentLanguage = localStorage.getItem("skyboundLanguage") || "en";
    let showingFavorites = false;
    let currentFilter = "all";
    let currentSearch = "";

    if (!Array.isArray(cart)) cart = [];
    if (!Array.isArray(favorites)) favorites = [];

    const translations = {
        "Your next adventure": "Твоя наступна пригода",
        "Fly higher.": "Лети вище.",
        "Explore further.": "Відкривай більше.",
        "Plan your getaway with Skybound Travel: handpicked destinations, easy booking and trips made just for you.": "Плануй свою подорож разом із Skybound Travel: цікаві напрямки, просте бронювання та подорожі саме для тебе.",
        "Location": "Місце",
        "Search destinations": "Пошук напрямків",
        "Check in": "Заїзд",
        "Check out": "Виїзд",
        "Guests": "Гості",
        "Add guests": "Кількість гостей",
        "Search": "Шукати",
        "Popular": "Популярне",
        "Our most loved trips": "Наші найпопулярніші подорожі",
        "Ready-made packages with flights, hotels and experiences included.": "Готові пропозиції з перельотами, готелями та враженнями.",
        "Best seller": "Хіт продажів",
        "Top rated": "Найкращий рейтинг",
        "New": "Новинка",
        "Limited": "Обмежена пропозиція",
        "Relaxation": "Відпочинок",
        "Italian Adventure": "Пригода в Італії",
        "Bali Retreat": "Відпочинок на Балі",
        "New York Explorer": "Подорож до Нью-Йорка",
        "Iceland Aurora": "Північне сяйво Ісландії",
        "Japan Discovery": "Відкриття Японії",
        "Maldives Escape": "Відпочинок на Мальдівах",
        "days": "днів",
        "Up to 12 people": "До 12 людей",
        "Up to 10 people": "До 10 людей",
        "Up to 15 people": "До 15 людей",
        "Up to 8 people": "До 8 людей",
        "Flights": "Перельоти",
        "Hotels": "Готелі",
        "Guided tours": "Екскурсії",
        "Villa stay": "Проживання на віллі",
        "Spa & yoga": "Спа та йога",
        "City hotel": "Готель у місті",
        "City pass": "Міський абонемент",
        "Lodge stay": "Проживання в лоджі",
        "Aurora tour": "Тур за північним сяйвом",
        "Hotel stay": "Проживання в готелі",
        "Guided city tours": "Міські екскурсії",
        "Beach resort": "Пляжний курорт",
        "Snorkeling trip": "Снорклінг",
        "Book Now": "Забронювати",
        "Destinations": "Напрямки",
        "Explore the world": "Відкривай світ",
        "Discover beautiful places for your next adventure.": "Відкривай красиві місця для своєї наступної пригоди.",
        "All": "Усі",
        "Europe": "Європа",
        "Asia": "Азія",
        "Beach": "Пляжі",
        "Mountains": "Гори",
        "Explore": "Дізнатись більше",
        "France": "Франція",
        "Italy": "Італія",
        "Czech Republic": "Чехія",
        "Spain": "Іспанія",
        "Japan": "Японія",
        "South Korea": "Південна Корея",
        "Thailand": "Таїланд",
        "Indian Ocean": "Індійський океан",
        "Indonesia": "Індонезія",
        "Greece": "Греція",
        "Switzerland": "Швейцарія",
        "Nepal": "Непал",
        "Ukraine": "Україна",
        "Discover the Eiffel Tower and beautiful streets of Paris.": "Відкрий для себе Ейфелеву вежу та красиві вулиці Парижа.",
        "Explore ancient architecture and Italian culture.": "Познайомся зі старовинною архітектурою та культурою Італії.",
        "Enjoy medieval streets and amazing city views.": "Насолоджуйся середньовічними вулицями та краєвидами міста.",
        "Experience sunny beaches and amazing architecture.": "Відчуй атмосферу сонячних пляжів та красивої архітектури.",
        "Discover neon streets and traditional Japanese culture.": "Відкрий для себе яскраві вулиці та японські традиції.",
        "Visit beautiful temples and peaceful gardens.": "Відвідай красиві храми та спокійні сади.",
        "Explore modern streets and Korean traditions.": "Відкрий для себе сучасні вулиці та корейські традиції.",
        "Discover colorful markets and amazing temples.": "Відвідай яскраві ринки та красиві храми.",
        "Relax on white beaches and enjoy crystal-clear water.": "Відпочивай на білих пляжах і насолоджуйся чистою водою.",
        "Enjoy tropical nature and beautiful beaches.": "Насолоджуйся тропічною природою та красивими пляжами.",
        "Explore tropical islands and warm blue seas.": "Відкрий для себе тропічні острови та тепле море.",
        "Enjoy blue seas and beautiful Mediterranean sunsets.": "Насолоджуйся блакитним морем та середземноморськими заходами сонця.",
        "Discover snowy peaks and breathtaking mountain views.": "Відкрий для себе засніжені вершини та неймовірні краєвиди.",
        "Explore incredible mountain landscapes and lakes.": "Відкрий для себе гірські пейзажі та озера.",
        "Experience the beauty of the world's highest mountains.": "Відчуй красу найвищих гір світу.",
        "Enjoy green forests and beautiful mountain scenery.": "Насолоджуйся зеленими лісами та гірськими краєвидами.",
        "About Us": "Про нас",
        "We turn trips into stories": "Ми перетворюємо подорожі на історії",
        "Skybound Travel is a team of travelers who love planning journeys. We handle flights, hotels and details, so you can enjoy the adventure.": "Skybound Travel — це команда мандрівників, які люблять планувати подорожі. Ми подбаємо про перельоти, готелі та деталі, щоб ти міг насолоджуватися пригодою.",
        "Handpicked destinations": "Обрані напрямки",
        "Every place is checked by our team before it gets on the list.": "Кожне місце перевіряє наша команда перед тим, як додати його до списку.",
        "Fair prices": "Чесні ціни",
        "Clear costs with no hidden fees and flexible booking options.": "Зрозумілі ціни без прихованих платежів та зручні умови бронювання.",
        "Support on the way": "Підтримка в дорозі",
        "We are in touch before, during and after your trip.": "Ми на зв'язку до, під час та після твоєї подорожі.",
        "Happy travelers": "Щасливі мандрівники",
        "Average rating": "Середній рейтинг",
        "Support": "Підтримка",
        "Contact": "Контакти",
        "Let's plan your trip": "Давай сплануємо подорож",
        "Tell us where you want to go and we will get back to you soon.": "Розкажи, куди хочеш поїхати, і ми скоро зв'яжемося з тобою.",
        "Address": "Адреса",
        "Phone": "Телефон",
        "Email": "Електронна пошта",
        "Working hours": "Години роботи",
        "Name": "Ім'я",
        "Your name": "Твоє ім'я",
        "Destination": "Напрямок",
        "Where do you want to go?": "Куди ти хочеш поїхати?",
        "Message": "Повідомлення",
        "Tell us about your trip": "Розкажи про свою подорож",
        "Send message": "Надіслати повідомлення",
        "Quick links": "Швидкі посилання",
        "Home": "Головна",
        "Handpicked places around the world, ready for your next trip.": "Найкращі місця світу для твоєї наступної подорожі.",
        "Handpicked destinations and trips made just for you.": "Цікаві напрямки та подорожі саме для тебе.",
        "Start Exploring": "Почати подорож",
        "from": "від"
    };

    const originalText = new WeakMap();
    const originalPlaceholders = new WeakMap();
    const originalAriaLabels = new WeakMap();

    function translatePage(language) {
        currentLanguage = language === "ua" ? "ua" : "en";
        localStorage.setItem("skyboundLanguage", currentLanguage);
        document.documentElement.lang = currentLanguage;

        document.querySelectorAll(".lang-btn").forEach(button => {
            button.classList.toggle("active", button.dataset.lang === currentLanguage);
        });

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.parentElement?.closest("script, style, .cart-modal, .site-message")) continue;
            textNodes.push(node);
        }

        textNodes.forEach(node => {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
            const original = originalText.get(node);
            const trimmed = original.trim();

            if (currentLanguage === "en") {
                node.nodeValue = original;
                return;
            }

            const translated = translations[trimmed];

            if (translated) {
                const leading = original.match(/^\s*/)?.[0] || "";
                const trailing = original.match(/\s*$/)?.[0] || "";
                node.nodeValue = leading + translated + trailing;
            }
        });

        document.querySelectorAll("input, textarea").forEach(input => {
            if (!originalPlaceholders.has(input)) {
                originalPlaceholders.set(input, input.getAttribute("placeholder") || "");
            }

            const original = originalPlaceholders.get(input);
            input.placeholder = currentLanguage === "ua"
                ? (translations[original] || original)
                : original;
        });

        document.querySelectorAll("[aria-label]").forEach(element => {
            if (!originalAriaLabels.has(element)) {
                originalAriaLabels.set(element, element.getAttribute("aria-label"));
            }

            const original = originalAriaLabels.get(element);

            if (currentLanguage === "ua") {
                element.setAttribute("aria-label", translations[original] || original);
            } else {
                element.setAttribute("aria-label", original);
            }
        });

        updateCart();
    }

    document.querySelectorAll(".lang-btn").forEach(button => {
        button.addEventListener("click", () => translatePage(button.dataset.lang));
    });

    const savedTheme = localStorage.getItem("skyboundTheme") || "light";
    document.documentElement.dataset.theme = savedTheme;

    themeToggle?.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("skyboundTheme", nextTheme);
    });

    const injectedStyles = document.createElement("style");

    injectedStyles.textContent = `
    .cart-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      justify-content: flex-end;
      visibility: hidden;
      pointer-events: none;
    }

    .cart-modal.active {
      visibility: visible;
      pointer-events: auto;
    }

    .cart-overlay {
      position: absolute;
      inset: 0;
      background: rgba(5, 15, 25, .55);
      opacity: 0;
      transition: opacity .25s ease;
    }

    .cart-modal.active .cart-overlay {
      opacity: 1;
    }

    .cart-panel {
      position: relative;
      z-index: 1;
      width: min(460px, 100%);
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 26px;
      color: var(--text, #101820);
      background: var(--card, #fff);
      box-shadow: -12px 0 40px rgba(0,0,0,.16);
      transform: translateX(100%);
      transition: transform .28s ease;
      overflow: auto;
    }

    .cart-modal.active .cart-panel {
      transform: translateX(0);
    }

    .cart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border, #ddd);
    }

    .cart-header h2 {
      margin: 0;
      font-size: 24px;
    }

    .cart-close {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 50%;
      background: var(--bg-soft, #eefbfd);
      color: var(--text, #101820);
      font-size: 28px;
      cursor: pointer;
    }

    .cart-items {
      flex: 1;
      padding: 12px 0;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 76px 1fr 38px;
      align-items: center;
      gap: 12px;
      padding: 13px 0;
      border-bottom: 1px solid var(--border, #ddd);
    }

    .cart-item img {
      width: 76px;
      height: 76px;
      border-radius: 12px;
      object-fit: cover;
      background: var(--bg-soft, #eefbfd);
    }

    .cart-item h3 {
      margin: 0 0 6px;
      font-size: 15px;
    }

    .cart-item p {
      margin: 0;
      color: var(--text-muted, #667);
      font-size: 14px;
    }

    .remove-item {
      border: 0;
      background: transparent;
      color: #e05252;
      font-size: 17px;
      cursor: pointer;
      padding: 8px;
    }

    .empty-cart {
      min-height: 220px;
      display: grid;
      place-content: center;
      justify-items: center;
      gap: 12px;
      color: var(--text-muted, #667);
      text-align: center;
    }

    .empty-cart i {
      font-size: 38px;
      opacity: .55;
    }

    .empty-cart p {
      margin: 0;
    }

    .cart-footer {
      border-top: 1px solid var(--border, #ddd);
      padding-top: 18px;
    }

    .cart-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-size: 18px;
    }

    .checkout-btn {
      width: 100%;
      cursor: pointer;
    }

    #cartBtn {
      position: relative;
    }

    #cartCount {
      position: absolute;
      top: -5px;
      right: -5px;
      min-width: 18px;
      height: 18px;
      display: grid;
      place-items: center;
      padding: 0 4px;
      border-radius: 20px;
      background: var(--accent, #28a9c7);
      color: #fff;
      font-size: 10px;
      line-height: 1;
    }

    .site-message {
      position: fixed;
      z-index: 10000;
      left: 50%;
      bottom: 24px;
      max-width: calc(100% - 32px);
      padding: 13px 20px;
      border-radius: 12px;
      color: #fff;
      background: #142d3a;
      box-shadow: 0 8px 28px rgba(0,0,0,.2);
      opacity: 0;
      visibility: hidden;
      transform: translate(-50%, 15px);
      transition: .25s ease;
      text-align: center;
      pointer-events: none;
    }

    .site-message.show {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
    }

    .fav-btn.active {
      color: #e34c65;
    }

    body {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='2' y='25' font-size='23'%3E%E2%9C%88%EF%B8%8F%3C/text%3E%%3C/svg%3E") 4 4, auto;
    }

    button, a, input, textarea, select {
      cursor: pointer;
    }

    input, textarea {
      cursor: text;
    }

    @media (max-width: 520px) {
      .cart-panel {
        padding: 20px;
      }
    }
  `;

    document.head.appendChild(injectedStyles);

    let cartButton = document.getElementById("cartBtn");

    if (!cartButton && navActions) {
        cartButton = document.createElement("button");
        cartButton.type = "button";
        cartButton.className = "icon-btn";
        cartButton.id = "cartBtn";
        cartButton.setAttribute("aria-label", "Cart");
        cartButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><span class="badge" id="cartCount">0</span>';

        if (themeToggle && themeToggle.parentElement === navActions) {
            navActions.insertBefore(cartButton, themeToggle);
        } else {
            navActions.appendChild(cartButton);
        }
    }

    const cartModal = document.createElement("div");
    cartModal.className = "cart-modal";
    cartModal.id = "cartModal";

    cartModal.innerHTML = `
    <div class="cart-overlay"></div>
    <aside class="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
      <div class="cart-header">
        <h2 id="cartTitle">My cart</h2>
        <button type="button" class="cart-close" aria-label="Close">&times;</button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total">
          <span class="cart-total-label">Total:</span>
          <strong id="cartTotal">$0</strong>
        </div>
        <button type="button" class="btn-primary checkout-btn">Checkout</button>
      </div>
    </aside>
  `;

    body.appendChild(cartModal);

    const messageBox = document.createElement("div");
    messageBox.className = "site-message";
    body.appendChild(messageBox);

    function showMessage(message) {
        messageBox.textContent = message;
        messageBox.classList.add("show");
        clearTimeout(showMessage.timer);

        showMessage.timer = setTimeout(() => {
            messageBox.classList.remove("show");
        }, 2800);
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function getCardInfo(card, index) {
        const name = card.querySelector("h3")?.textContent.trim() || "Trip";
        const priceText = card.querySelector(".price strong")?.textContent.trim() || "$0";
        const price = Number(priceText.replace(/[^0-9.]/g, "")) || 0;
        const imageElement = card.querySelector(".card-img");
        const imageValue = imageElement
            ? getComputedStyle(imageElement).getPropertyValue("--img")
            : "";
        const imageMatch = imageValue.match(/url\(["']?(.*?)["']?\)/);
        const image = imageMatch ? imageMatch[1] : "";

        if (!card.dataset.cartId) {
            card.dataset.cartId = `trip-${index}`;
        }

        return {
            id: card.dataset.cartId,
            name,
            price,
            image
        };
    }

    function saveCart() {
        localStorage.setItem("skyboundCart", JSON.stringify(cart));
        updateCart();
    }

    function addToCart(card) {
        const index = cards.indexOf(card);
        const trip = getCardInfo(card, index);
        const existing = cart.find(item => item.id === trip.id);

        if (existing) {
            existing.quantity = (Number(existing.quantity) || 1) + 1;
        } else {
            cart.push({ ...trip, quantity: 1 });
        }

        saveCart();

        showMessage(currentLanguage === "ua"
            ? `${trip.name} додано до кошика!`
            : `${trip.name} added to cart!`);
    }

    function updateCart() {
        const count = cart.reduce((sum, item) => {
            return sum + (Number(item.quantity) || 1);
        }, 0);

        const countElement = document.getElementById("cartCount");

        if (countElement) {
            countElement.textContent = count;
        }

        const itemsContainer = cartModal.querySelector(".cart-items");
        const totalElement = cartModal.querySelector("#cartTotal");

        if (!itemsContainer || !totalElement) return;

        cartModal.querySelector("#cartTitle").textContent =
            currentLanguage === "ua" ? "Мій кошик" : "My cart";

        cartModal.querySelector(".cart-total-label").textContent =
            currentLanguage === "ua" ? "Разом:" : "Total:";

        cartModal.querySelector(".checkout-btn").textContent =
            currentLanguage === "ua" ? "Оформити замовлення" : "Checkout";

        if (cart.length === 0) {
            itemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <p>${currentLanguage === "ua" ? "Твій кошик поки порожній" : "Your cart is empty"}</p>
        </div>
      `;

            totalElement.textContent = "$0";
            return;
        }

        itemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        ${item.image
                ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}">`
                : '<div class="cart-item-placeholder"></div>'}
        <div class="cart-item-info">
          <h3>${escapeHTML(item.name)}</h3>
          <p>$${(Number(item.price) || 0).toLocaleString("en-US")} × ${Number(item.quantity) || 1}</p>
        </div>
        <button type="button" class="remove-item" data-index="${index}" aria-label="${currentLanguage === "ua" ? "Видалити" : "Remove"}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");

        const total = cart.reduce((sum, item) => {
            return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
        }, 0);

        totalElement.textContent = `$${total.toLocaleString("en-US")}`;

        itemsContainer.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                cart.splice(Number(button.dataset.index), 1);
                saveCart();
            });
        });
    }

    function openCart() {
        cartModal.classList.add("active");
        body.style.overflow = "hidden";
        updateCart();
    }

    function closeCart() {
        cartModal.classList.remove("active");
        body.style.overflow = "";
    }

    cartButton?.addEventListener("click", openCart);
    cartModal.querySelector(".cart-close").addEventListener("click", closeCart);
    cartModal.querySelector(".cart-overlay").addEventListener("click", closeCart);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeCart();
    });

    cartModal.querySelector(".checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            showMessage(currentLanguage === "ua"
                ? "Спочатку додай подорож у кошик!"
                : "Add a trip to your cart first!");
            return;
        }

        cart = [];
        saveCart();
        closeCart();

        showMessage(currentLanguage === "ua"
            ? "Дякуємо за замовлення! Це демонстраційне оформлення."
            : "Thank you! This is a demo checkout.");
    });

    document.querySelectorAll("#popular .card-bottom a, #destinations .card-bottom a").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const card = button.closest(".card");

            if (card) {
                addToCart(card);
            }
        });
    });

    function updateFavorites() {
        if (favCount) {
            favCount.textContent = favorites.length;
        }

        cards.forEach((card, index) => {
            if (!card.dataset.cartId) {
                card.dataset.cartId = `trip-${index}`;
            }

            const button = card.querySelector(".fav-btn");

            if (!button) return;

            const active = favorites.includes(card.dataset.cartId);
            button.classList.toggle("active", active);

            const icon = button.querySelector("i");

            if (icon) {
                icon.className = active
                    ? "fa-solid fa-heart"
                    : "fa-regular fa-heart";
            }
        });
    }

    document.querySelectorAll(".fav-btn").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");

            if (!card) return;

            const index = cards.indexOf(card);

            if (!card.dataset.cartId) {
                card.dataset.cartId = `trip-${index}`;
            }

            const id = card.dataset.cartId;

            if (favorites.includes(id)) {
                favorites = favorites.filter(item => item !== id);

                showMessage(currentLanguage === "ua"
                    ? "Видалено з обраного"
                    : "Removed from favorites");
            } else {
                favorites.push(id);

                showMessage(currentLanguage === "ua"
                    ? "Додано до обраного"
                    : "Added to favorites");
            }

            localStorage.setItem("skyboundFavorites", JSON.stringify(favorites));
            updateFavorites();
            applyCardVisibility();
        });
    });

    function applyCardVisibility() {
        cards.forEach(card => {
            const isFavorite = favorites.includes(card.dataset.cartId);
            const text = card.textContent.toLowerCase();
            const matchesSearch = !currentSearch || text.includes(currentSearch);
            const categories = (card.dataset.category || "").split(/\s+/);

            const matchesFilter = !card.closest("#destinations") ||
                currentFilter === "all" ||
                categories.includes(currentFilter);

            const matchesFavorites = !showingFavorites || isFavorite;

            card.style.display =
                matchesSearch && matchesFilter && matchesFavorites ? "" : "none";
        });
    }

    favoritesBtn?.addEventListener("click", () => {
        showingFavorites = !showingFavorites;
        currentSearch = "";

        if (searchInput) {
            searchInput.value = "";
        }

        applyCardVisibility();

        showMessage(currentLanguage === "ua"
            ? (showingFavorites ? "Показано обрані подорожі" : "Показано всі подорожі")
            : (showingFavorites ? "Showing favorite trips" : "Showing all trips"));
    });

    document.querySelectorAll(".chip").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".chip").forEach(chip => {
                chip.classList.remove("active");
            });

            button.classList.add("active");
            currentFilter = button.dataset.filter || "all";
            showingFavorites = false;
            currentSearch = "";

            if (searchInput) {
                searchInput.value = "";
            }

            applyCardVisibility();
        });
    });

    function searchTrips() {
        const value = searchInput?.value.trim().toLowerCase() || "";

        if (!value) {
            showMessage(currentLanguage === "ua"
                ? "Введи назву напрямку"
                : "Enter a destination");
            return;
        }

        showingFavorites = false;
        currentSearch = value;
        currentFilter = "all";

        document.querySelectorAll(".chip").forEach(chip => {
            chip.classList.toggle("active", chip.dataset.filter === "all");
        });

        applyCardVisibility();

        document.querySelector("#destinations")?.scrollIntoView({
            behavior: "smooth"
        });
    }

    document.querySelector(".search-btn")?.addEventListener("click", searchTrips);

    searchInput?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            searchTrips();
        }
    });

    searchBtn?.addEventListener("click", () => {
        document.querySelector(".search-card")?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        searchInput?.focus();
    });

    document.querySelectorAll(".nav-menu a, .nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (menuToggle) {
                menuToggle.checked = false;
            }

            document.querySelectorAll(".nav-links a").forEach(item => {
                item.classList.remove("active");
            });

            const matchingLink = document.querySelector(
                `.nav-links a[href="${link.getAttribute("href")}"]`
            );

            if (matchingLink) {
                matchingLink.classList.add("active");
            }
        });
    });

    document.querySelector(".form-btn")?.addEventListener("click", () => {
        if (!contactForm) return;

        const textInputs = contactForm.querySelectorAll('input[type="text"]');
        const name = textInputs[0];
        const email = contactForm.querySelector('input[type="email"]');
        const destination = textInputs[1];

        if (!name?.value.trim() || !email?.value.trim() || !destination?.value.trim()) {
            showMessage(currentLanguage === "ua"
                ? "Заповни ім'я, email та напрямок"
                : "Please fill in your name, email and destination");
            return;
        }

        if (!email.checkValidity()) {
            showMessage(currentLanguage === "ua"
                ? "Введи правильний email"
                : "Enter a valid email");

            email.focus();
            return;
        }

        showMessage(currentLanguage === "ua"
            ? "Дякуємо! Твоє повідомлення готове."
            : "Thank you! Your message is ready.");

        contactForm.reset();
    });

    updateFavorites();
    updateCart();
    translatePage(currentLanguage);
});