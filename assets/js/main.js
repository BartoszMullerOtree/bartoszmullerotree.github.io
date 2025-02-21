import scrollAnimate from "./scripts/scroll_animate.js";
import fadeInAnimation from "./scripts/fade_in_animation.js";
import accordion from "./scripts/accordion.js";
import contactFormScripts from "./scripts/contact_form_scripts.js";
import fab from "./scripts/fab.js";
import stickyHeader from "./scripts/sticky_header.js";
import pageMainEvents from "./scripts/page_main_events.js";

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    
    pageMainEvents();
    stickyHeader();
    scrollAnimate();
    fadeInAnimation();
    accordion();
    contactFormScripts();
    fab();

    window.dispatchEvent(new Event("scroll"));
  });
});
