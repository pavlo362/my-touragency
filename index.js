const menuToggle = document.getElementById("menu-toggle");

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.checked = false;
    });
});

const filterButtons = document.querySelectorAll(".chip");
const destinationCards = document.querySelectorAll("#destinations .card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        destinationCards.forEach((card) => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});