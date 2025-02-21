import scrollAnimate from "./scripts/scroll_animate.js";
import fadeInAnimation from "./scripts/fade_in_animation.js";
import accordion from "./scripts/accordion.js";
import contactFormScripts from "./scripts/contact_form_scripts.js";
import fab from "./scripts/fab.js";
import stickyHeader from "./scripts/sticky_header.js";

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    const menuButtons = document.querySelectorAll(".toggle-header");
    const headerMenu = document.getElementById("main-header");

    menuButtons?.forEach((button) => {
      button.addEventListener("click", () => {
        headerMenu.classList.toggle("header--active");
        document.body.classList.toggle("scroll-lock");
      });
    });

    stickyHeader();
    scrollAnimate();
    fadeInAnimation();
    accordion();
    contactFormScripts();
    fab();

    window.dispatchEvent(new Event("scroll"));
  });
});
