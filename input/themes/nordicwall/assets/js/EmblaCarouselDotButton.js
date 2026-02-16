/**
 * addDotBtnsAndClickHandlers
 * @param {Object} embla     - instancja emblaApi
 * @param {HTMLElement} paginationContainer - kontener z "dotami"
 * @param {string} dotPrefix - np. "hero__slider" albo "insides"
 */
window.addDotBtnsAndClickHandlers = function (embla, paginationContainer, dotPrefix = "embla") {
    let dotButtons = [];
  
    /**
     * Tworzy przyciski
     */
    const createDots = () => {
      // Generujemy buttony w pętli
      paginationContainer.innerHTML = embla.scrollSnapList()
        .map((_, index) => {
          const slideNumber = String(index + 1).padStart(2, '0');
          // np. <button class="hero__slider__dot">01</button>
          return `<button class="${dotPrefix}__dot" type="button">${slideNumber}</button>`;
        })
        .join("");
  
      // Pobierz stworzone przyciski jako tablicę
      dotButtons = Array.from(
        paginationContainer.querySelectorAll(`.${dotPrefix}__dot`)
      );
  
      // Ustaw kliknięcia
      dotButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => embla.scrollTo(index), false);
      });
    };
  
    /**
     * Aktualizuje klasę "dot--selected"
     */
    const updateDots = () => {
      const previousIndex = embla.previousScrollSnap();
      const selectedIndex = embla.selectedScrollSnap();
  
      dotButtons[previousIndex]?.classList.remove(`${dotPrefix}__dot--selected`);
      dotButtons[selectedIndex]?.classList.add(`${dotPrefix}__dot--selected`);
    };
  
    // Podpinki do zdarzeń Embla
    embla
      .on("init", createDots)
      .on("reInit", createDots)
      .on("init", updateDots)
      .on("reInit", updateDots)
      .on("select", updateDots);
  
    // Funkcja do czyszczenia
    return () => {
      paginationContainer.innerHTML = "";
      dotButtons = [];
    };
  };
  