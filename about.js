document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector("header");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const isActive = navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
        });

        navItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    let ticking = false;

    function handleScrollUpdates() {
        const scrollY = window.scrollY;

        if (header) {
            if (scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        }

    
        let currentSectionId = "";
        const headerHeight = header ? header.offsetHeight : 72;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");
            if (currentSectionId && link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollUpdates();
            });
            ticking = true;
        }
    });

    handleScrollUpdates();

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 72;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const revealElements = document.querySelectorAll(
        ".company-card, .about-content, .vision-content, .mission-content, .cta-content, .feature-card, .leader-card"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
      
        revealElements.forEach(el => el.classList.add("show"));
    }

    const lazyImages = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window && lazyImages.length > 0) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    img.classList.add("loaded");
                    imgObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imgObserver.observe(img));
    } else {
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add("loaded");
            }
        });
    }

    document.body.classList.add("loaded");
});

