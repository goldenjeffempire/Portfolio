document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar ul li a");

    // Fade-in effect using Intersection Observer
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add("fade-in");
        observer.observe(section);
    });

    // Highlight active section in the navbar
    const highlightNav = () => {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach(link => link.classList.remove("active"));
        if (navLinks[index]) { // Ensure index is valid
            navLinks[index].classList.add("active");
        }
    };

    // Add smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        });
    });

    window.addEventListener("scroll", highlightNav);
});
