export default function stickyHeader() {
  const header = document.getElementById("main-header");
  const pageCtnr = document.querySelector(".page-ctnr");

  pageCtnr.style.paddingTop = header.offsetHeight + "px";

  let prevScrollY = 0;
  let showHeaderTimeout;
  const showHeader = () => {
    header.classList.remove("isHidden");
  };

  const headerStickyHandler = () => {
    const scrollY = window.scrollY;

    if (scrollY >= 100 && scrollY > prevScrollY) {
      clearTimeout(showHeaderTimeout);
      if (!header.classList.contains("header--active")) {
        header.classList.add("isHidden", "inMove");
      } else {

        header.classList.add("inMove");
      }
      showHeaderTimeout = setTimeout(showHeader, 500);
    } else if (scrollY <= 100) {
      header.classList.remove("inMove");
      header.classList.remove("isHidden");
    } else {
      header.classList.remove("isHidden");
    }

    prevScrollY = scrollY;
  };
  document.addEventListener("scroll", headerStickyHandler);
}
