setTimeout(() => {
  document.querySelector(".preloader").style.animation =
    "fadeInFromNone 3s ease-in-out forwards";
  document.body.style.overflow = "visible";
}, 2000);

setTimeout(() => {
  document.querySelector(".preloader").style.display = "none";
}, 5000); //6000
