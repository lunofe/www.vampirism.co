/*********************************************
 * EmblaCarouselParallax.js
 *********************************************/

/**
 * setupTweenParallax
 * @param {Object} emblaApi - EmblaCarousel API instance
 * @param {string} prefix   - Prefix for class names, e.g. "hero__slider" or "insides"
 * @param {number} factor   - The parallax factor, e.g. 0.6 from your HTML config
 *
 * Returns a cleanup function to remove inline styles on "destroy".
 */
window.setupTweenParallax = function (emblaApi, prefix, factor) {
  // If emblaApi does not exist, do nothing
  if (!emblaApi) return () => {};

  // Array of parallax layers
  let layers = [];

  /**
   * Collect parallax layers from each slide
   */
  const initLayers = () => {
    layers = emblaApi
      .slideNodes()
      .map((slide) => slide.querySelector(`.${prefix}__parallax__layer`))
      .filter(Boolean);
  };

  /**
   * The main function to handle the x-translation
   */
  const onScroll = () => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const snapList = emblaApi.scrollSnapList();

    snapList.forEach((snapPos, index) => {
      let diffToTarget = snapPos - scrollProgress;

      // Handle "loop" by adjusting diffToTarget for cloned slides
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopPoint) => {
          if (loopPoint.index === index) {
            const sign = Math.sign(loopPoint.target());
            if (sign === -1) {
              diffToTarget = snapPos - (1 + scrollProgress);
            } else if (sign === 1) {
              diffToTarget = snapPos + (1 - scrollProgress);
            }
          }
        });
      }

      // Calculate parallax offset
      const offsetX = diffToTarget * (-1 * factor) * 100;

      // Layers array is aligned with slide indexes
      const layer = layers[index];
      if (layer) {
        layer.style.transform = `translateX(${offsetX}%)`;
      }
    });
  };

  /**
   * Re-init callback: re-collect the layers and recalc offsets
   */
  const onReInit = () => {
    initLayers();
    onScroll();
  };

  // Initial setup
  initLayers();
  onScroll();

  // Subscribe to Embla events
  emblaApi
    .on("reInit", onReInit)
    .on("scroll", onScroll)
    .on("select", onScroll); // optional, in case you want updates on direct slide selects

  /**
   * Cleanup function, returned so it can be used on 'destroy'.
   */
  return () => {
    layers.forEach((layer) => {
      if (layer) {
        layer.removeAttribute("style");
      }
    });
    layers = [];
  };
};
