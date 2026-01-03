/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Smooth scrolling for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /**
   * Enhanced page load animation
   */
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Smooth reveal of main content
    const main = document.querySelector('.main');
    if (main) {
      main.style.opacity = '0';
      main.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        main.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
      }, 100);
    }
  });

  /**
   * Enhanced scroll performance
   */
  let ticking = false;
  function updateScrollElements() {
    // Add any scroll-based animations here
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollElements);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  /**
   * Smooth hover effects for interactive elements
   */
  document.querySelectorAll('.portfolio-content, .resume-item, .info-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  /**
   * Enhanced button interactions
   */
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  /**
   * 3D Carousel Implementation - SIMPLE & DIRECT
   */
  const carouselStates = new Map();
  
  function initCarousel3D(carouselId, prevBtnId, nextBtnId) {
    const carousel3D = document.getElementById(carouselId);
    if (!carousel3D) {
      return;
    }
    
    const wrapper = carousel3D.closest('.carousel-3d-wrapper');
    if (!wrapper) return;
    
    const slides = carousel3D.querySelectorAll('.carousel-slide');
    const indicators = wrapper.querySelectorAll('.carousel-indicators .indicator');
    
    if (!slides.length) return;
    
    const state = {
      currentIndex: 0,
      isAnimating: false,
      slides: slides,
      indicators: indicators
    };
    
    carouselStates.set(carouselId, state);
    
    // Initialize first slide
    updateCarousel(carouselId);
    
    // SIMPLE: Direct button setup
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (prevBtn) {
      // Stop swipe handler from interfering
      prevBtn.addEventListener('mousedown', function(e) {
        e.stopPropagation();
      }, true);
      prevBtn.addEventListener('touchstart', function(e) {
        e.stopPropagation();
      }, true);
      
      prevBtn.onclick = function(e) {
        if (e) e.stopPropagation();
        const s = carouselStates.get(carouselId);
        if (!s || s.isAnimating) return;
        s.isAnimating = true;
        s.currentIndex = (s.currentIndex - 1 + s.slides.length) % s.slides.length;
        updateCarousel(carouselId);
        setTimeout(() => { s.isAnimating = false; }, 800);
      };
    }
    
    if (nextBtn) {
      // Stop swipe handler from interfering
      nextBtn.addEventListener('mousedown', function(e) {
        e.stopPropagation();
      }, true);
      nextBtn.addEventListener('touchstart', function(e) {
        e.stopPropagation();
      }, true);
      
      nextBtn.onclick = function(e) {
        if (e) e.stopPropagation();
        const s = carouselStates.get(carouselId);
        if (!s || s.isAnimating) return;
        s.isAnimating = true;
        s.currentIndex = (s.currentIndex + 1) % s.slides.length;
        updateCarousel(carouselId);
        setTimeout(() => { s.isAnimating = false; }, 800);
      };
    }
    
    // Set up swipe/drag handlers
    setupCarouselSwipe(carouselId);
  }
  
  // Immediate setup using wrapper
  function setupCarouselButtonsImmediate(wrapper, carouselId, prevBtnId, nextBtnId) {
    // Find buttons within the wrapper
    const prevBtn = wrapper.querySelector('#' + prevBtnId);
    const nextBtn = wrapper.querySelector('#' + nextBtnId);
    
    if (prevBtn && nextBtn) {
      console.log('Setting up buttons immediately for:', carouselId);
      
      prevBtn.onclick = function(e) {
        console.log('PREV clicked (immediate):', carouselId);
        if (e) e.preventDefault();
        prevSlide(carouselId);
        return false;
      };
      
      nextBtn.onclick = function(e) {
        console.log('NEXT clicked (immediate):', carouselId);
        if (e) e.preventDefault();
        nextSlide(carouselId);
        return false;
      };
      
      // Also use event delegation on wrapper as backup
      wrapper.addEventListener('click', function(e) {
        let btn = e.target.closest('button');
        if (!btn) return;
        
        if (btn.id === prevBtnId) {
          console.log('PREV via wrapper delegation:', carouselId);
          e.preventDefault();
          e.stopPropagation();
          prevSlide(carouselId);
        } else if (btn.id === nextBtnId) {
          console.log('NEXT via wrapper delegation:', carouselId);
          e.preventDefault();
          e.stopPropagation();
          nextSlide(carouselId);
        }
      }, true); // Use capture phase
    } else {
      console.warn('Buttons not found in wrapper for:', carouselId);
    }
  }
  
  function setupCarouselButtons(carouselId, prevBtnId, nextBtnId) {
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
      const prevBtn = document.getElementById(prevBtnId);
      const nextBtn = document.getElementById(nextBtnId);
      
      if (!prevBtn || !nextBtn) {
        console.error('Buttons not found for:', carouselId, 'Retrying...');
        setTimeout(() => setupCarouselButtons(carouselId, prevBtnId, nextBtnId), 200);
        return;
      }
      
      console.log('Setting up buttons for:', carouselId, {
        prevBtnFound: !!prevBtn,
        nextBtnFound: !!nextBtn
      });
      
      // Create handler functions
      const handlePrev = function(e) {
        console.log('PREV button clicked:', carouselId);
        if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
        prevSlide(carouselId);
        return false;
      };
      
      const handleNext = function(e) {
        console.log('NEXT button clicked:', carouselId);
        if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
        nextSlide(carouselId);
        return false;
      };
      
      // Remove any existing onclick attribute
      prevBtn.removeAttribute('onclick');
      nextBtn.removeAttribute('onclick');
      
      // Direct onclick assignment (most reliable)
      prevBtn.onclick = handlePrev;
      nextBtn.onclick = handleNext;
      
      // Also add event listeners as backup
      prevBtn.addEventListener('click', handlePrev, false);
      nextBtn.addEventListener('click', handleNext, false);
      
      // Ensure buttons are clickable
      prevBtn.style.pointerEvents = 'auto';
      nextBtn.style.pointerEvents = 'auto';
      prevBtn.style.cursor = 'pointer';
      nextBtn.style.cursor = 'pointer';
      
      // Prevent drag handlers from interfering
      prevBtn.addEventListener('mousedown', function(e) {
        e.stopPropagation();
      }, true);
      nextBtn.addEventListener('mousedown', function(e) {
        e.stopPropagation();
      }, true);
      
      console.log('Buttons setup complete for:', carouselId);
    }, 200);
  }
  
  function updateCarousel(carouselId) {
    const state = carouselStates.get(carouselId);
    if (!state || state.isAnimating || !state.slides) return;
    
    const slides = state.slides;
    const currentIndex = state.currentIndex;
    
    slides.forEach((slide, index) => {
      const diff = index - currentIndex;
      slide.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2', 'hidden');
      
      if (diff === 0) {
        slide.classList.add('active');
      } else if (diff === -1) {
        slide.classList.add('prev');
      } else if (diff === 1) {
        slide.classList.add('next');
      } else if (diff === -2) {
        slide.classList.add('prev-2');
      } else if (diff === 2) {
        slide.classList.add('next-2');
      } else {
        slide.classList.add('hidden');
      }
    });

    // Update indicators
    if (state.indicators) {
      state.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
  }

  function nextSlide(carouselId) {
    const state = carouselStates.get(carouselId);
    if (!state || state.isAnimating || !state.slides) return;
    state.isAnimating = true;
    state.currentIndex = (state.currentIndex + 1) % state.slides.length;
    updateCarousel(carouselId);
    setTimeout(() => {
      state.isAnimating = false;
    }, 800);
  }

  function prevSlide(carouselId) {
    const state = carouselStates.get(carouselId);
    if (!state || state.isAnimating || !state.slides) return;
    state.isAnimating = true;
    state.currentIndex = (state.currentIndex - 1 + state.slides.length) % state.slides.length;
    updateCarousel(carouselId);
    setTimeout(() => {
      state.isAnimating = false;
    }, 800);
  }

  function goToSlide(carouselId, index) {
    const state = carouselStates.get(carouselId);
    if (!state || state.isAnimating || !state.slides || index === state.currentIndex) return;
    state.isAnimating = true;
    state.currentIndex = index;
    updateCarousel(carouselId);
    setTimeout(() => {
      state.isAnimating = false;
    }, 800);
  }
  
  // Make functions globally accessible for main carousel (backward compatibility)
  window.carouselPrev = () => prevSlide('carousel3D');
  window.carouselNext = () => nextSlide('carousel3D');
  
  // Set up swipe/drag handlers for a carousel
  function setupCarouselSwipe(carouselId) {
    const carousel3D = document.getElementById(carouselId);
    if (!carousel3D) return;
    
    const state = carouselStates.get(carouselId);
    if (!state) return;
    
    const wrapper = carousel3D.closest('.carousel-3d-wrapper');
    if (!wrapper) return;
    
    // Set up indicators
    const indicators = wrapper.querySelectorAll('.carousel-indicators .indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(carouselId, index));
    });
    
    // Set up drag/swipe handlers
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;
    
    function handleStart(e) {
      const target = e.target;
      // CRITICAL: Don't start dragging if clicking on buttons or links
      const clickedButton = target.closest('button');
      if (clickedButton && (
          clickedButton.classList.contains('carousel-nav') ||
          clickedButton.classList.contains('carousel-prev') ||
          clickedButton.classList.contains('carousel-next') ||
          clickedButton.id === 'carouselPrevBtn' ||
          clickedButton.id === 'carouselNextBtn' ||
          clickedButton.id === 'researchCarouselPrevBtn' ||
          clickedButton.id === 'researchCarouselNextBtn'
      )) {
        console.log('Swipe handler: Ignoring button click');
        return;
      }
      if (target.closest('.slide-actions a') || 
          target.closest('.carousel-indicators') ||
          target.closest('a') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'I') {
        return;
      }
      isDragging = true;
      startTime = Date.now();
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      currentX = startX;
      carousel3D.style.cursor = 'grabbing';
      carousel3D.style.userSelect = 'none';
    }

    function handleMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.touches ? e.touches[0].clientX : e.clientX;
      
      // Visual feedback during drag
      const diff = currentX - startX;
      if (Math.abs(diff) > 10) {
        carousel3D.style.transform = `translateX(${diff * 0.1}px)`;
      }
    }

    function handleEnd(e) {
      if (!isDragging) return;
      const target = e.target;
      
      // CRITICAL: Don't trigger slide change if clicking on buttons or links
      if (target && (target.closest('.carousel-nav') || 
          target.closest('.carousel-prev') ||
          target.closest('.carousel-next') ||
          target.closest('.slide-actions a') || 
          target.closest('.carousel-indicators') ||
          target.closest('a') ||
          target.closest('button') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'I')) {
        isDragging = false;
        carousel3D.style.cursor = '';
        carousel3D.style.transform = '';
        carousel3D.style.userSelect = '';
        return;
      }
      
      isDragging = false;
      carousel3D.style.cursor = '';
      carousel3D.style.transform = '';
      carousel3D.style.userSelect = '';
      
      const diff = startX - currentX;
      const timeDiff = Date.now() - startTime;
      const threshold = 50; // Minimum swipe distance
      const speedThreshold = 0.3; // Minimum swipe speed (px/ms)
      const speed = Math.abs(diff) / timeDiff;
      
      // Trigger slide change if swipe is significant enough
      if (Math.abs(diff) > threshold || (Math.abs(diff) > 30 && speed > speedThreshold)) {
        if (diff > 0) {
          nextSlide(carouselId);
        } else {
          prevSlide(carouselId);
        }
      }
    }
    
    // Touch events
    carousel3D.addEventListener('touchstart', handleStart, { passive: false });
    carousel3D.addEventListener('touchmove', handleMove, { passive: false });
    carousel3D.addEventListener('touchend', handleEnd, { passive: false });
    
    // Mouse events
    carousel3D.addEventListener('mousedown', handleStart);
    carousel3D.addEventListener('mousemove', handleMove);
    carousel3D.addEventListener('mouseup', handleEnd);
    carousel3D.addEventListener('mouseleave', handleEnd);
  }
  
  // Initialize all carousels
  function initAllCarousels() {
    // Main projects carousel
    initCarousel3D('carousel3D', 'carouselPrevBtn', 'carouselNextBtn');
    
    // Research carousel
    initCarousel3D('researchCarousel3D', 'researchCarouselPrevBtn', 'researchCarouselNextBtn');
    
    // ALSO set up buttons directly as backup - SIMPLE
    setTimeout(function() {
      const prev1 = document.getElementById('carouselPrevBtn');
      const next1 = document.getElementById('carouselNextBtn');
      if (prev1) prev1.onclick = function() { prevSlide('carousel3D'); };
      if (next1) next1.onclick = function() { nextSlide('carousel3D'); };
      
      const prev2 = document.getElementById('researchCarouselPrevBtn');
      const next2 = document.getElementById('researchCarouselNextBtn');
      if (prev2) prev2.onclick = function() { prevSlide('researchCarousel3D'); };
      if (next2) next2.onclick = function() { nextSlide('researchCarousel3D'); };
    }, 500);
  }
  
  // Old code removed to prevent conflicts
  
  // Initialize carousels when DOM is ready - multiple attempts
  function tryInitCarousels() {
    const carousel3D = document.getElementById('carousel3D');
    const researchCarousel = document.getElementById('researchCarousel3D');
    
    if (carousel3D || researchCarousel) {
      console.log('Carousels found, initializing...');
      initAllCarousels();
    } else {
      console.log('Waiting for carousels...');
      setTimeout(tryInitCarousels, 100);
    }
  }
  
  
  // Try immediately
  tryInitCarousels();
  
  // Also try on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitCarousels);
  }
  
  // Also try on window load as fallback
  window.addEventListener('load', function() {
    setTimeout(tryInitCarousels, 300);
    
    // FINAL FALLBACK: Set up buttons directly after page loads
    setTimeout(function() {
      console.log('FINAL FALLBACK: Setting up buttons');
      
      // Main carousel
      const btn1 = document.getElementById('carouselPrevBtn');
      const btn2 = document.getElementById('carouselNextBtn');
      if (btn1) {
        btn1.onclick = function(e) {
          e.preventDefault();
          prevSlide('carousel3D');
        };
        console.log('Button 1 set up');
      }
      if (btn2) {
        btn2.onclick = function(e) {
          e.preventDefault();
          nextSlide('carousel3D');
        };
        console.log('Button 2 set up');
      }
      
      // Research carousel
      const btn3 = document.getElementById('researchCarouselPrevBtn');
      const btn4 = document.getElementById('researchCarouselNextBtn');
      if (btn3) {
        btn3.onclick = function(e) {
          e.preventDefault();
          prevSlide('researchCarousel3D');
        };
        console.log('Button 3 set up');
      }
      if (btn4) {
        btn4.onclick = function(e) {
          e.preventDefault();
          nextSlide('researchCarousel3D');
        };
        console.log('Button 4 set up');
      }
    }, 1000);
  });

})();