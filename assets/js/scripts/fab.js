export default function fab() {
  const fab = document.querySelector(".fab-contact");
  const fabBtn = fab?.querySelector("button");
  fabBtn?.addEventListener("click", () => {
    fab.classList.toggle("fab-contact--open");
  });
}
