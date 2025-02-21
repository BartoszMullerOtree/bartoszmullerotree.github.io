export default function fadeInAnimation () {
  const elementsToCheck = [...document.querySelectorAll(".fadeInElements > *, .fadeInElement")];
  
  let currentHeight = undefined;
  let counter = 0;

  elementsToCheck.forEach((currentElement) => {
    const onScrollSection = () => {
      const elementOffset = currentElement.getBoundingClientRect();
      const viewPoint = window.innerHeight / 1.3;

      if (
        (elementOffset.top <= viewPoint || window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) &&
        elementOffset.bottom >= window.innerHeight - viewPoint
      ) {
        if (currentHeight !== elementOffset.top) {
          currentHeight = elementOffset.top;
          counter = 1;
        } else {
          counter++;
        }
        setTimeout(() => {
          currentElement.classList.add("upDownIn");
        }, 300 * counter);
        window.removeEventListener("scroll", onScrollSection);
      }
    };

    window.addEventListener("scroll", onScrollSection);
  });
};
