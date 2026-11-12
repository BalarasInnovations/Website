/**
 * Balaras Innovations (balaras.in) - Client Interactivity
 * Implements:
 * 1. Scroll-aware Header (sticky background & hide-on-scroll-down / show-on-scroll-up)
 * 2. Mobile Navigation Drawer (Sheet)
 * 2b. Top Hero Banner Auto-Slider (Water -> Environmental -> Lab & Research -> Industrial)
 * 3. Hero Feature Carousel (7s auto-rotation + pagination dots)
 * 4. "Sectors We Serve" Interactive Cards & Image Switcher (hover + click)
 * 5. "Enterprise Solutions" Tabs on /solutions (Electronics/AV, Fire Detection, Cyber Security, Access Control)
 * 6. "Get in Touch" Consultation Form Validation, Netlify Submission & Toast Notification
 */

document.addEventListener("DOMContentLoaded", () => {
  const isHome = document.body.getAttribute("data-page") === "home";

  // ---------------------------------------------------------------------------
  // 1. Scroll-aware Header
  // ---------------------------------------------------------------------------
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  let mobileMenuOpen = false;

  function updateHeader() {
    if (!header) return;
    const currentScrollY = window.scrollY;
    const isScrolled = currentScrollY > 20;
    const hideHeader = currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen;

    if (isScrolled || !isHome) {
      header.classList.remove("bg-transparent");
      header.classList.add("bg-white/95", "backdrop-blur-md", "border-b", "shadow-sm");
    } else {
      header.classList.add("bg-transparent");
      header.classList.remove("bg-white/95", "backdrop-blur-md", "border-b", "shadow-sm");
    }

    if (hideHeader) {
      header.classList.remove("translate-y-0");
      header.classList.add("-translate-y-full");
    } else {
      header.classList.remove("-translate-y-full");
      header.classList.add("translate-y-0");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // ---------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer
  // ---------------------------------------------------------------------------
  const menuToggleBtn = document.querySelector('header button[aria-haspopup="dialog"]');
  const drawer = document.getElementById("mobile-drawer");
  const drawerBackdrop = document.getElementById("mobile-drawer-backdrop");
  const drawerCloseBtn = document.getElementById("mobile-drawer-close");

  function openMobileMenu() {
    if (!drawer || !drawerBackdrop) return;
    mobileMenuOpen = true;
    drawerBackdrop.classList.remove("hidden");
    requestAnimationFrame(() => {
      drawerBackdrop.classList.remove("opacity-0");
      drawerBackdrop.classList.add("opacity-100");
      drawer.classList.remove("translate-x-full");
      drawer.classList.add("translate-x-0");
    });
    updateHeader();
  }

  function closeMobileMenu() {
    if (!drawer || !drawerBackdrop) return;
    mobileMenuOpen = false;
    drawerBackdrop.classList.remove("opacity-100");
    drawerBackdrop.classList.add("opacity-0");
    drawer.classList.remove("translate-x-0");
    drawer.classList.add("translate-x-full");
    setTimeout(() => {
      if (!mobileMenuOpen) drawerBackdrop.classList.add("hidden");
    }, 300);
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeMobileMenu);
  if (drawer) {
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenuOpen) closeMobileMenu();
  });

  // ---------------------------------------------------------------------------
  // 2b. Top Hero Banner Auto-Slider (Water -> Environmental -> Lab & Research -> Industrial)
  // ---------------------------------------------------------------------------
  const heroTexts = Array.from(document.querySelectorAll("[data-hero-text]"));
  const heroImgs = Array.from(document.querySelectorAll("[data-hero-img]"));
  const heroDots = Array.from(document.querySelectorAll("[data-hero-dot]"));
  if (heroTexts.length >= 2 && heroImgs.length >= 2) {
    let currentHeroIdx = 0;
    const heroCount = heroTexts.length;

    function setHeroSlide(idx) {
      currentHeroIdx = idx;
      heroTexts.forEach((el, i) => {
        if (i === idx) {
          el.className =
            "transition-all duration-700 ease-in-out opacity-100 translate-y-0 pointer-events-auto";
        } else {
          el.className =
            "transition-all duration-700 ease-in-out opacity-0 translate-y-4 absolute top-0 left-0 w-full pointer-events-none";
        }
      });
      const heroGradient = document.querySelector(".hero-col-right > .bg-gradient-to-r");
      if (heroGradient) {
        if (idx === 1) {
          heroGradient.style.display = "none";
        } else {
          heroGradient.style.display = "";
        }
      }
      heroImgs.forEach((img, i) => {
        const isEnvSlide = img.getAttribute("data-hero-img") === "1";
        if (i === idx) {
          if (isEnvSlide) {
            img.className =
              "absolute inset-0 transition-opacity duration-1000 opacity-100 group-hover:scale-105 bg-white pointer-events-auto";
          } else {
            img.className =
              "object-cover transition-opacity duration-1000 opacity-100 group-hover:scale-105";
          }
        } else {
          if (isEnvSlide) {
            img.className =
              "absolute inset-0 transition-opacity duration-1000 opacity-0 group-hover:scale-105 bg-white pointer-events-none";
          } else {
            img.className =
              "object-cover transition-opacity duration-1000 opacity-0 group-hover:scale-105";
          }
        }
      });

      heroDots.forEach((dot, i) => {
        if (i === idx) {
          dot.className = "h-2 rounded-full transition-all duration-300 w-8 bg-primary";
        } else {
          dot.className =
            "w-2 h-2 rounded-full transition-all duration-300 bg-neutral-300 hover:bg-neutral-400";
        }
      });
    }

    let heroTimer = setInterval(() => {
      setHeroSlide((currentHeroIdx + 1) % heroCount);
    }, 5000);

    heroDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        setHeroSlide(i);
        clearInterval(heroTimer);
        heroTimer = setInterval(() => {
          setHeroSlide((currentHeroIdx + 1) % heroCount);
        }, 5000);
      });
    });

    // Environmental Analysis hero brochure cycling
    const heroEnvPics = Array.from(document.querySelectorAll("[data-hero-env-pic]"));
    const heroEnvDots = Array.from(document.querySelectorAll("[data-hero-env-dot]"));
    const heroEnvTitle = document.getElementById("hero-env-active-name");
    let currentHeroEnvPic = 0;
    if (heroEnvPics.length > 1) {
      setInterval(() => {
        currentHeroEnvPic = (currentHeroEnvPic + 1) % heroEnvPics.length;
        heroEnvPics.forEach((pic, pIdx) => {
          if (pIdx === currentHeroEnvPic) {
            pic.classList.remove("opacity-0");
            pic.classList.add("opacity-100");
            if (heroEnvTitle && pic.getAttribute("data-hero-env-title")) {
              heroEnvTitle.textContent = pic.getAttribute("data-hero-env-title");
            }
          } else {
            pic.classList.remove("opacity-100");
            pic.classList.add("opacity-0");
          }
        });
        heroEnvDots.forEach((dot, dIdx) => {
          if (dIdx === currentHeroEnvPic) {
            dot.className = "w-2 h-2 rounded-full bg-primary transition-all duration-300";
          } else {
            dot.className = "w-2 h-2 rounded-full bg-neutral-300 transition-all duration-300";
          }
        });
      }, 2500);
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Hero Feature Carousel (Homepage)
  // ---------------------------------------------------------------------------
  const dotButtons = Array.from(document.querySelectorAll('button[aria-label^="Go to slide "]'));
  if (dotButtons.length >= 2) {
    const slideCount = dotButtons.length;
    const carouselContainer = dotButtons[0].closest(".grid");
    if (carouselContainer) {
      const textSlides = Array.from(
        carouselContainer.querySelectorAll(".min-h-\\[200px\\] > div")
      );
      const imageSlides = Array.from(
        carouselContainer.querySelectorAll(".rounded-xl.overflow-hidden > div")
      );
      let currentSlide = 0;

      function setSlide(index) {
        currentSlide = index;
        textSlides.forEach((slide, i) => {
          if (i === index) {
            slide.className =
              "transition-all duration-700 ease-in-out opacity-100 translate-y-0 pointer-events-auto";
          } else {
            slide.className =
              "transition-all duration-700 ease-in-out opacity-0 translate-y-4 absolute top-0 left-0 w-full pointer-events-none";
          }
        });
        imageSlides.forEach((imgWrap, i) => {
          if (i === index) {
            imgWrap.className =
              "absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 scale-100";
          } else {
            imgWrap.className =
              "absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 scale-105";
          }
        });
        dotButtons.forEach((btn, i) => {
          if (i === index) {
            btn.className = "h-2 rounded-full transition-all duration-300 w-8 bg-primary";
          } else {
            btn.className =
              "w-2 h-2 rounded-full transition-all duration-300 bg-neutral-300 hover:bg-neutral-400";
          }
        });
      }

      dotButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          setSlide(idx);
          resetTimer();
        });
      });

      let timer = setInterval(() => {
        setSlide((currentSlide + 1) % slideCount);
      }, 7000);

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
          setSlide((currentSlide + 1) % slideCount);
        }, 7000);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 4. "Sectors We Serve" Interactive Cards (Homepage #solutions)
  // ---------------------------------------------------------------------------
  const sectorsSection = document.getElementById("solutions");
  if (sectorsSection) {
    const sectorGrid = sectorsSection.querySelector(".grid.lg\\:grid-cols-2");
    if (sectorGrid) {
      const cardsCol = sectorGrid.querySelector(".flex.flex-col.gap-6");
      const imgsCol = sectorGrid.querySelector(".relative.min-h-\\[500px\\]");
      if (cardsCol && imgsCol) {
        const cards = Array.from(cardsCol.children);
        const imgs = Array.from(imgsCol.children);

        function activateSector(idx) {
          cards.forEach((card, i) => {
            const iconBox = card.querySelector(".p-3.rounded-sm");
            const title = card.querySelector("h3");
            if (i === idx) {
              card.className =
                "p-8 rounded-sm border transition-all duration-300 group cursor-pointer bg-white border-primary shadow-xl shadow-primary/5";
              if (iconBox)
                iconBox.className =
                  "p-3 rounded-sm transition-all duration-300 bg-primary text-white scale-110";
              if (title)
                title.className =
                  "text-xl font-extrabold tracking-tight transition-colors text-neutral-900";
            } else {
              card.className =
                "p-8 rounded-sm border transition-all duration-300 group cursor-pointer bg-white/40 border-neutral-200 hover:bg-white hover:border-neutral-300";
              if (iconBox)
                iconBox.className =
                  "p-3 rounded-sm transition-all duration-300 bg-neutral-100 text-neutral-400 group-hover:text-primary";
              if (title)
                title.className =
                  "text-xl font-extrabold tracking-tight transition-colors text-neutral-700";
            }
          });

          imgs.forEach((imgWrap, i) => {
            if (i === idx) {
              imgWrap.className =
                "absolute inset-0 transition-all duration-700 ease-in-out opacity-100 scale-100 pointer-events-auto";
            } else {
              imgWrap.className =
                "absolute inset-0 transition-all duration-700 ease-in-out opacity-0 scale-105 pointer-events-none";
            }
          });
        }

        cards.forEach((card, idx) => {
          card.addEventListener("mouseenter", () => activateSector(idx));
          card.addEventListener("click", () => activateSector(idx));
        });

        // Sub-carousel buttons inside Environmental Analysis card
        const envBtns = Array.from(sectorsSection.querySelectorAll(".env-slide-btn"));
        const envPanels = Array.from(sectorsSection.querySelectorAll("[data-env-panel]"));
        let currentEnvSlide = 0;

        function setEnvSlide(index) {
          currentEnvSlide = index;
          envBtns.forEach((btn, i) => {
            if (i === index) {
              btn.className =
                "env-slide-btn px-3 py-1.5 text-xs font-bold rounded-sm border transition-all bg-primary text-white border-primary";
            } else {
              btn.className =
                "env-slide-btn px-3 py-1.5 text-xs font-bold rounded-sm border transition-all bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-primary";
            }
          });
          envPanels.forEach((panel, i) => {
            if (i === index) {
              panel.className =
                "absolute inset-0 transition-opacity duration-500 opacity-100 flex items-center justify-center p-2";
            } else {
              panel.className =
                "absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none flex items-center justify-center p-2";
            }
          });
        }

        envBtns.forEach((btn, i) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            activateSector(0);
            setEnvSlide(i);
            resetEnvTimer();
          });
          btn.addEventListener("mouseenter", () => {
            activateSector(0);
            setEnvSlide(i);
            resetEnvTimer();
          });
        });

        let envTimer = null;
        if (envPanels.length >= 2) {
          envTimer = setInterval(() => {
            setEnvSlide((currentEnvSlide + 1) % envPanels.length);
          }, 4000);
        }
        function resetEnvTimer() {
          if (envTimer) clearInterval(envTimer);
          if (envPanels.length >= 2) {
            envTimer = setInterval(() => {
              setEnvSlide((currentEnvSlide + 1) % envPanels.length);
            }, 4000);
          }
        }

        // Lightbox modal for viewing specification sheets full-screen
        const lightboxTriggers = Array.from(
          sectorsSection.querySelectorAll(".env-lightbox-trigger")
        );
        if (lightboxTriggers.length > 0) {
          const modal = document.createElement("div");
          modal.className =
            "fixed inset-0 z-[100] bg-black/80 backdrop-blur-md hidden items-center justify-center p-4";
          modal.innerHTML = `
            <div class="relative max-w-4xl max-h-[90vh] bg-white rounded-md p-2 shadow-2xl flex flex-col items-center">
              <button type="button" class="absolute -top-12 right-0 text-white hover:text-primary transition-colors flex items-center gap-1 text-sm font-bold">
                Close <span class="text-xl">&times;</span>
              </button>
              <img id="env-lightbox-img" src="" alt="" class="max-h-[82vh] w-auto object-contain rounded-sm"/>
            </div>
          `;
          document.body.appendChild(modal);

          const modalImg = modal.querySelector("#env-lightbox-img");
          const closeBtn = modal.querySelector("button");

          function closeLightbox() {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          }

          lightboxTriggers.forEach((imgEl) => {
            imgEl.addEventListener("click", () => {
              modalImg.src = imgEl.getAttribute("src");
              modalImg.alt = imgEl.getAttribute("alt") || "";
              modal.classList.remove("hidden");
              modal.classList.add("flex");
            });
          });
          closeBtn.addEventListener("click", closeLightbox);
          modal.addEventListener("click", (e) => {
            if (e.target === modal) closeLightbox();
          });
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
          });
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 5. "Enterprise Solutions" Tabs (/solutions page)
  // ---------------------------------------------------------------------------
  const tabTriggers = Array.from(document.querySelectorAll('[role="tab"]'));
  const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  if (tabTriggers.length > 0 && tabPanels.length > 0) {
    function activateTab(targetTrigger) {
      const targetPanelId = targetTrigger.getAttribute("aria-controls");
      tabTriggers.forEach((t) => {
        const isSelected = t === targetTrigger;
        t.setAttribute("aria-selected", isSelected ? "true" : "false");
        t.setAttribute("data-state", isSelected ? "active" : "inactive");
      });
      tabPanels.forEach((p) => {
        const isMatch = p.id === targetPanelId;
        p.setAttribute("data-state", isMatch ? "active" : "inactive");
        if (isMatch) {
          p.removeAttribute("hidden");
          p.style.animationDuration = "";
        } else {
          p.setAttribute("hidden", "");
        }
      });
    }

    tabTriggers.forEach((trigger, idx) => {
      trigger.addEventListener("click", () => activateTab(trigger));
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const next = tabTriggers[(idx + 1) % tabTriggers.length];
          next.focus();
          activateTab(next);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prev = tabTriggers[(idx - 1 + tabTriggers.length) % tabTriggers.length];
          prev.focus();
          activateTab(prev);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Consultation Form Validation & Toast Notification (Homepage #consultation)
  // ---------------------------------------------------------------------------
  const consultSection = document.getElementById("consultation");
  if (consultSection) {
    const form = consultSection.querySelector("form");
    if (form) {
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      function setFieldError(inputEl, message) {
        if (!inputEl) return;
        const container = inputEl.closest(".space-y-2");
        if (!container) return;
        const label = container.querySelector("label");
        let errEl = container.querySelector(".form-error-msg");
        if (message) {
          if (label) label.classList.add("text-destructive");
          inputEl.setAttribute("aria-invalid", "true");
          if (!errEl) {
            errEl = document.createElement("p");
            errEl.className = "form-error-msg text-sm font-medium text-destructive";
            container.appendChild(errEl);
          }
          errEl.textContent = message;
        } else {
          if (label) label.classList.remove("text-destructive");
          inputEl.setAttribute("aria-invalid", "false");
          if (errEl) errEl.remove();
        }
      }

      function validateForm() {
        let valid = true;
        const nameVal = (nameInput?.value || "").trim();
        const emailVal = (emailInput?.value || "").trim();
        const msgVal = (messageInput?.value || "").trim();

        if (nameVal.length < 2) {
          setFieldError(nameInput, "Name must be at least 2 characters.");
          valid = false;
        } else {
          setFieldError(nameInput, "");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
          setFieldError(emailInput, "Please enter a valid email.");
          valid = false;
        } else {
          setFieldError(emailInput, "");
        }

        if (msgVal.length < 10) {
          setFieldError(messageInput, "Message must be at least 10 characters.");
          valid = false;
        } else {
          setFieldError(messageInput, "");
        }

        return valid;
      }

      [nameInput, emailInput, messageInput].forEach((el) => {
        if (el) {
          el.addEventListener("input", () => {
            if (el.getAttribute("aria-invalid") === "true") validateForm();
          });
        }
      });

      function showToast(title, description) {
        const toastList = document.querySelector('[aria-label="Notifications (F8)"] ol');
        if (!toastList) return;
        toastList.innerHTML = "";
        const li = document.createElement("li");
        li.setAttribute("data-state", "open");
        li.className =
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all border bg-background text-foreground animate-in fade-in slide-in-from-bottom-4 duration-300";
        li.innerHTML = `
          <div class="grid gap-1">
            <div class="text-sm font-semibold">${title}</div>
            <div class="text-sm opacity-90">${description}</div>
          </div>
          <button type="button" class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:text-foreground hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        `;
        const closeBtn = li.querySelector("button");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => li.remove());
        }
        toastList.appendChild(li);
        setTimeout(() => {
          if (li.parentNode) li.remove();
        }, 5000);
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending...";
        }

        try {
          const formData = new FormData(form);
          if (!formData.get("form-name")) {
            formData.append("form-name", "contact");
          }
          await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
          });
        } catch (_err) {
          // Local dev server fallback
          await new Promise((r) => setTimeout(r, 600));
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }

        showToast(
          "Message Sent!",
          "Thank you for contacting us. We will get back to you shortly."
        );
        form.reset();
      });
    }
  }
});
