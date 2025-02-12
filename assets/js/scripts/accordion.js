export default function accordion() {
  const accordionItems = document.querySelectorAll(".accordion__item");
  let lastItem = undefined;
  accordionItems?.forEach((item) => {
    const itemHeader = item.querySelector(".accordion__header");
    const itemContent = item.querySelector(".accordion__content");
    itemHeader.addEventListener("click", () => {
      lastItem?.classList.remove('accordion__item--open')
      itemContent.style.height = itemContent.scrollHeight + "px";
      item.classList.toggle("accordion__item--open");
      lastItem = item;
    });
    accordionItems[0]?.querySelector(".accordion__header")?.dispatchEvent(new Event('click'));
  });
}
