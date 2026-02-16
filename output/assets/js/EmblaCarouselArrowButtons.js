/**
 * addTogglePrevNextBtnsActive
 * @param {Object} emblaApi - EmblaCarousel instance
 * @param {string} rootSelector - Main slider selector, e.g., ".hero__slider"
 */
const addTogglePrevNextBtnsActive = (emblaApi, rootSelector) => {
  // Get the prefix based on the main slider class
  const prefix = rootSelector.replace(/^\./, "");

  // Search for arrow buttons only within the specific slider, not globally
  const rootNode = document.querySelector(rootSelector);
  if (!rootNode) return () => {};

  const prevBtn = rootNode.querySelector(`.${prefix}__button--prev`);
  const nextBtn = rootNode.querySelector(`.${prefix}__button--next`);

  if (!prevBtn || !nextBtn) {
      console.error(`Arrow buttons not found inside: ${rootSelector}`);
      return () => {}; // Empty cleanup function
  }

  const togglePrevNextBtnsState = () => {
      prevBtn.toggleAttribute('disabled', !emblaApi.canScrollPrev());
      nextBtn.toggleAttribute('disabled', !emblaApi.canScrollNext());
  };

  emblaApi
      .on('select', togglePrevNextBtnsState)
      .on('init', togglePrevNextBtnsState)
      .on('reInit', togglePrevNextBtnsState);

  return () => {
      prevBtn.removeAttribute('disabled');
      nextBtn.removeAttribute('disabled');
  };
};

/**
 * addPrevNextBtnsClickHandlers
 * @param {Object} emblaApi - EmblaCarousel instance
 * @param {string} rootSelector - Main slider selector, e.g., ".hero__slider"
 */
window.addPrevNextBtnsClickHandlers = function (emblaApi, rootSelector) {
  const prefix = rootSelector.replace(/^\./, "");

  // Search for arrow buttons only within this specific slider
  const rootNode = document.querySelector(rootSelector);
  if (!rootNode) return () => {};

  const prevBtn = rootNode.querySelector(`.${prefix}__button--prev`);
  const nextBtn = rootNode.querySelector(`.${prefix}__button--next`);

  if (!prevBtn || !nextBtn) {
      console.error(`Arrow buttons not found inside: ${rootSelector}`);
      return () => {}; // Empty cleanup function
  }

  const scrollPrev = () => emblaApi.scrollPrev();
  const scrollNext = () => emblaApi.scrollNext();

  prevBtn.addEventListener('click', scrollPrev, false);
  nextBtn.addEventListener('click', scrollNext, false);

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(emblaApi, rootSelector);

  return () => {
      removeTogglePrevNextBtnsActive();
      prevBtn.removeEventListener('click', scrollPrev, false);
      nextBtn.removeEventListener('click', scrollNext, false);
  };
};
