/*********************************************
 * EmblaCarouselProgressBar.js
 *********************************************/

/**
 * setupEmblaProgressBar
 * @param {Object} emblaApi - Instancja API EmblaCarousel
 * @param {HTMLElement} rootNode - Główny element kontenera karuzeli
 * @param {string} prefix - Prefix dla klas, np. "hero__slider" lub "insides"
 *
 * Funkcja ustawia obsługę progress baru dla karuzeli Embla. Progress bar
 * jest aktualizowany przy zdarzeniu "scroll" w Embla. Zwraca funkcję czyszczącą,
 * która usuwa podpięte event listenery.
 */
window.setupEmblaProgressBar = function(emblaApi, rootNode, prefix) {
   if (!emblaApi || !rootNode || !prefix) return () => {};
 
   // Szukanie elementu progress baru o klasie np. ".hero__slider__progress__bar"
   const progressBar = rootNode.querySelector(`.${prefix}__progress-bar`);
 
   // Funkcja aktualizująca progress bar
   const updateProgressBar = () => {
     if (progressBar) {
       const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
       progressBar.style.transform = `translateX(${progress * 100}%)`;
     }
   };
 
   // Pierwsza aktualizacja
   updateProgressBar();
 
   // Subskrypcja zdarzenia scroll
   emblaApi.on("scroll", updateProgressBar);
 
   // Zwracamy funkcję czyszczącą, która usuwa listener scroll
   return () => {
     emblaApi.off("scroll", updateProgressBar);
   };
 };
 