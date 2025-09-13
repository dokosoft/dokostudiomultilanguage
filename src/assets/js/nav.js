// Astro:page-load wrapper for View Transitions purposes
document.addEventListener('astro:page-load', () => { // Make the script controlling the <Hamburger /> mobile menu component available after navigating to a new page.

    const CSbody = document.querySelector('body');
    const CSnavbarMenu = document.getElementById('cs-navigation');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    function toggleMenu() {
        mobileMenuToggle.classList.toggle('cs-active');
        CSnavbarMenu.classList.toggle('cs-active');
        CSbody.classList.toggle('cs-open');
    }

    // Toggles the hamburger mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        toggleMenu()
        ariaExpanded(mobileMenuToggle);
    });
  
    // Checks the value of aria expanded on an element and changes it accordingly whether it is expanded or not
    function ariaExpanded(element) {
        const isExpanded = element.getAttribute('aria-expanded');
        element.setAttribute("aria-expanded", isExpanded === "false" ? "true" : "false");
    };

    // Add event listeners to each dropdown element for accessibility
    const dropdownElements = document.querySelectorAll(".cs-dropdown");
    dropdownElements.forEach(element => {
        // This variable tracks if the Escape key was pressed. This flag will be checked in the focusout event handler to ensure that pressing the Escape key does not trigger the focusout event and subsequently remove the cs-active class from the dropdown
        let escapePressed = false;

        element.addEventListener("focusout", (event) => {
            if (escapePressed) {
                escapePressed = false;
                return; // Skip the focusout logic if escape was pressed
            }
            // If the focus has moved outside the dropdown, remove the active class from the dropdown 
            if (!element.contains(event.relatedTarget)) {
                element.classList.remove("cs-active");
                // adjust aria-expanded attribute on the dropdown button only
                const dropdownButton = element.querySelector(".cs-dropdown-button");
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            }
        });

        element.addEventListener("keydown", (event) => {
            const dropdownButton = element.querySelector(".cs-dropdown-button");
            // If the dropdown is active, stop the event from propagating. This is so we can use Escape to close the dropdown, then press it again to close the hamburger menu (if needed)
            if (element.classList.contains("cs-active")) {
                event.stopPropagation();
            }

            // Pressing Enter or Space will toggle the dropdown and adjust the aria-expanded attribute
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                element.classList.toggle("cs-active");
                // adjust aria-expanded attribute on the dropdown button only
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            };

            // Pressing Escape will remove the active class from the dropdown. The stopPropagation above will stop the hamburger menu from closing
            if (event.key === "Escape" && element.classList.contains("cs-active")) {
                escapePressed = true;
                element.classList.remove("cs-active");
                // adjust aria-expanded attribute on the dropdown button only
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            }
        });

        // Handles dropdown menus on mobile - the matching media query (max-width: 63.9375rem) is necessary so that clicking the dropdown button on desktop does not add the active class and thus interfere with the hover state
        const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
        if (maxWidthMediaQuery.matches) {
            element.addEventListener("click", () => {
                element.classList.toggle("cs-active")
                const dropdownButton = element.querySelector(".cs-dropdown-button");
                    if (dropdownButton) {
                        ariaExpanded(dropdownButton);
                    }
            });

            // If you press Escape and the hamburger menu is open, close it
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && mobileMenuToggle.classList.contains("cs-active")) {
                    toggleMenu();
                }
            });
        };
    });

    // Pressing Enter will redirect to the href
    const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
    dropdownLinks.forEach(link => {
        link.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                window.location.href = this.href;
            } 
        });
    });   
});

//transparent header
(() => {
  let observer = null;

  function setInitialState(homepage, hero, threshold = 0.1) {
    const r = hero.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const ratio = r.height ? (visible / r.height) : 0;
    if (ratio >= threshold) homepage.classList.add('in-hero');
    else homepage.classList.remove('in-hero');
  }

  function initTransparentHeader() {
    if (observer) { observer.disconnect(); observer = null; }

    const homepage = document.querySelector('.homepage');
    const hero = document.getElementById('hero');
    if (!homepage || !hero) return;


    setInitialState(homepage, hero, 0.1);
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) homepage.classList.add('in-hero');
        else homepage.classList.remove('in-hero');
      });
    }, { threshold: 0.1 });

    observer.observe(hero);
  }

  // Run on first load
  document.addEventListener('DOMContentLoaded', initTransparentHeader);

  // Run from bfcache
  window.addEventListener('pageshow', initTransparentHeader);

  // Re-run
  document.addEventListener('astro:page-load', initTransparentHeader);
  document.addEventListener('astro:after-swap', initTransparentHeader);
})();

//faq functionality
const bindFaq = () => {
  document.querySelectorAll('.cs-faq-item').forEach((item) => {
    if (item.dataset.bound) return;        // avoid duplicate listeners
    item.dataset.bound = '1';
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
};

// Run on initial load
if (document.readyState !== 'loading') bindFaq();
else window.addEventListener('DOMContentLoaded', bindFaq);

// Re-run
window.addEventListener('astro:page-load', bindFaq);
window.addEventListener('astro:after-swap', bindFaq);

