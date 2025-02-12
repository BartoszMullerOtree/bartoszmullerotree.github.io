export default function scrollAnimate() {
  const elementsToAnimate = document.querySelectorAll(
    ".scrollAnimatedSections > *"
  );

  elementsToAnimate?.forEach((currentElement) => {
    const onScrollSection = () => {
      const elementOffset = currentElement.getBoundingClientRect();
      const viewPoint = window.innerHeight * 0.85;
      if (
        elementOffset.top <= viewPoint &&
        elementOffset.bottom >= window.innerHeight - viewPoint
      ) {
        currentElement.classList.add("isCurrentWindow");
      } else {
        if (elementOffset.bottom <= window.innerHeight - viewPoint) {
          currentElement.classList.add("animateFromTop");
        } else {
          currentElement.classList.remove("animateFromTop");
        }
        currentElement.classList.remove("isCurrentWindow");
      }
    };
    
    window.addEventListener("scroll", onScrollSection);
   
  });
}
