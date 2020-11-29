const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  //Active link
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");
}

navLink.forEach((n) => n.addEventListener("click"), linkAction);

const secondSlider = document.querySelectorAll(".slider2");

function linkAction2() {
  //Active link
  secondSlider.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");
}

secondSlider.forEach((n) => n.addEventListener("click"), linkAction2);
