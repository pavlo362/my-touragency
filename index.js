const menuToggle = document.getElementById("menu-toggle");

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.checked = false;
  });
});