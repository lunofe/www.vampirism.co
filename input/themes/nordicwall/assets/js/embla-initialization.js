/*********************************************
 * embla-initialization.js
 *********************************************/
function initEmblaCarousel(rootSelector, userOpts) {
  // 1) Get the main slider element in the DOM
  const rootNode = document.querySelector(rootSelector);
  if (!rootNode) return null;

  // 2) Default options
  const defaultOptions = {
    dragFree: false,
    loop: true,
    align: 'start',
    direction: 'ltr',
    duration: 60,
    fade: false,
    fadeDuration: 0.4,
    parallax: true,
    parallaxFactor: 0.4,
    autoplay: {
      enabled: true,
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: false
    },
    useClassNames: false,
    classNamesOptions: {
      snapped: 'is-snapped',
      inView: 'is-in-view',
      draggable: 'is-draggable',
      dragging: 'is-dragging',
      loop: 'is-loop'
    },
    wheelGestures: {
      enabled: true,
      forceWheelAxis: 'x'
    },
    // Dodana opcja dla progress baru
    progressBar: false,
    arrows: false
  };

  // 3) Merge the default options with userOpts
  const opts = Object.assign({}, defaultOptions, userOpts);

  // 4) If fade is true, disable parallax
  if (opts.fade) {
    opts.parallax = false;
  }

  // 5) Extract the class prefix from rootSelector
  //    e.g. ".hero__slider" -> "hero__slider"
  const dotPrefix = rootSelector.replace(/^\./, "");

  // 6) Find required elements within the rootNode
  const viewportNode = rootNode.querySelector(`${rootSelector}__viewport`);
  const containerNode = rootNode.querySelector(`${rootSelector}__container`);
  const prevBtn = rootNode.querySelector(`${rootSelector}__button--prev`);
  const nextBtn = rootNode.querySelector(`${rootSelector}__button--next`);
  const dotsNode = rootNode.querySelector(`${rootSelector}__dots`);

  // 7) Plugins array
  const plugins = [];

  // (a) Fade plugin
  if (opts.fade && typeof EmblaCarouselFade === 'function') {
    plugins.push(
      EmblaCarouselFade({
        fadeDuration: opts.fadeDuration
      })
    );
  }

  // (b) Class Names plugin
  if (opts.useClassNames && typeof EmblaCarouselClassNames === 'function') {
    plugins.push(
      EmblaCarouselClassNames(opts.classNamesOptions)
    );
  }

  // (c) Autoplay plugin
  let autoplay;
  if (opts.autoplay?.enabled && typeof EmblaCarouselAutoplay === 'function') {
    const autoplayOptions = {
      delay: opts.autoplay.delay,
      stopOnInteraction: opts.autoplay.stopOnInteraction,
      stopOnMouseEnter: opts.autoplay.stopOnMouseEnter
    };
    autoplay = EmblaCarouselAutoplay(autoplayOptions);
    plugins.push(autoplay);
  }

  // (d) Wheel Gestures plugin
  let wheelGestures;
  if (opts.wheelGestures?.enabled && typeof EmblaCarouselWheelGestures === 'function') {
    const wheelGesturesOptions = {
      forceWheelAxis: opts.wheelGestures.forceWheelAxis
    };
    wheelGestures = EmblaCarouselWheelGestures(wheelGesturesOptions);
    plugins.push(wheelGestures);
  }

  // 8) Initialize the main EmblaCarousel
  const emblaApi = viewportNode
    ? EmblaCarousel(
      viewportNode,
      {
        dragFree: opts.dragFree,
        loop: opts.loop,
        align: opts.align,
        direction: opts.direction,
        duration: opts.duration,
        skipSnaps: !opts.dragFree
      },
      plugins
    )
    : null;

  // 9) Handle PARALLAX
  let removeParallax = () => { };
  if (opts.parallax && emblaApi) {
    if (typeof setupTweenParallax === 'function') {
      // Pass prefix = dotPrefix, and factor = opts.parallaxFactor
      removeParallax = setupTweenParallax(
        emblaApi,
        dotPrefix,
        opts.parallaxFactor
      );
      emblaApi.on('destroy', removeParallax);
    } else {
      console.error("Function setupTweenParallax not found.");
    }
  }

  // 10) Handle previous / next buttons
  let removePrevNextBtnsClickHandlers = () => { };
  if (opts.arrows && emblaApi) {
    if (typeof addPrevNextBtnsClickHandlers === 'function') {
      removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
        emblaApi,
        rootSelector
      );
      emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
    } else {
      console.error("Function addPrevNextBtnsClickHandlers not found.");
    }
  }


  // 11) Handle dot buttons
  let removeDotBtnsAndClickHandlers = () => { };
  if (dotsNode && emblaApi) {
    if (typeof addDotBtnsAndClickHandlers === 'function') {
      // Pass in the prefix to generate .hero__slider__dot classes, etc.
      removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
        emblaApi,
        dotsNode,
        dotPrefix
      );
      emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
    } else {
      console.error("Function addDotBtnsAndClickHandlers not found.");
    }
  }

  // 12) Handle progress bar – opcja włączona, jeśli opts.progressBar === true
  let removeProgressBarHandler = () => { };
  if (opts.progressBar && emblaApi) {
    if (typeof setupEmblaProgressBar === 'function') {
      removeProgressBarHandler = setupEmblaProgressBar(emblaApi, rootNode, dotPrefix);
      emblaApi.on('destroy', removeProgressBarHandler);
    } else {
      console.error("Function setupEmblaProgressBar not found.");
    }
  }

  // 13) Cleanup on destroy
  if (emblaApi) {
    emblaApi
      .on('destroy', removeParallax)
      .on('destroy', removePrevNextBtnsClickHandlers)
      .on('destroy', removeDotBtnsAndClickHandlers);

    // If Autoplay is running, stop it on destroy
    if (autoplay && typeof autoplay.stop === 'function') {
      emblaApi.on('destroy', autoplay.stop);
    }
  }

  return emblaApi;
}
