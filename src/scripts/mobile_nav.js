let block_mobile_btn = document.querySelector(".header_other");
let mobile_menu_content = document.querySelector(".header_mobile");

let mobile_btn = document.createElement("button");
mobile_btn.className = "header__btn_mobile";

let mobile_btn_icon_menu = document.createElement("i");
mobile_btn_icon_menu.className = "fas fa-bars";

let mobile_btn_icon_menu_close = document.createElement("i");
mobile_btn_icon_menu_close.className = "fas fa-times";

mobile_btn.appendChild(mobile_btn_icon_menu);

window.addEventListener("resize", () => {
  if (window.screen.availWidth <= 768) {
    if (!block_mobile_btn.querySelector(".header__btn_mobile")) {
      block_mobile_btn.appendChild(mobile_btn);
    }
  } else {
    if (block_mobile_btn.querySelector(".header__btn_mobile")) {
      block_mobile_btn.removeChild(mobile_btn);
    }
  }
});

mobile_btn.addEventListener("click", () => {
  if (mobile_btn.querySelector(".fas.fa-bars")) {
    mobile_btn.removeChild(mobile_btn_icon_menu);
    mobile_btn.appendChild(mobile_btn_icon_menu_close);
    mobile_menu_content.style.visibility = "visible";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    mobile_btn.removeChild(mobile_btn_icon_menu_close);
    mobile_btn.appendChild(mobile_btn_icon_menu);
    mobile_menu_content.style.visibility = "hidden";
    document.body.style.overflow = "visible";
  }
});
