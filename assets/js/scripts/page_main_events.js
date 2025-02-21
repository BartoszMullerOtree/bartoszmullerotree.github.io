export default function pageMainEvents() {
  const menuButtons = document.querySelectorAll(".toggle-header");
  const headerMenu = document.getElementById("main-header");

  const enableScroll = () => {
    headerMenu.classList.remove("header--active");
    document.body.classList.remove("scroll-lock");
  };
  const disableScroll = () => {
    headerMenu.classList.add("header--active");
    document.body.classList.add("scroll-lock");
  };

  menuButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      headerMenu.classList.toggle("header--active");
      document.body.classList.toggle("scroll-lock");
    });
  });

  const links = document.querySelectorAll("a");
  if (links && links.length > 0) {
    links.forEach((link) => {
      if (link.hash.startsWith("#")) {
        link.addEventListener("click", (event) => {
          event.preventDefault();

          enableScroll();
          const elementLink = document.querySelector(link.hash);
          elementLink.style.scrollMarginTop = headerMenu.offsetHeight + 'px'
          setTimeout(() => {
            elementLink?.scrollIntoView();
          }, 200);
        });
      }
    });
  }
}
