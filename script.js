// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scrolling for Navigation Links
    const smoothScroll = () => {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Form Submission Handling
    const handleFormSubmission = () => {
        const form = document.querySelector('#contact form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault(); // Prevent default form submission
                
                // Send form data to Formspree
                const formData = new FormData(form);
                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        alert("Thank you for your message! I'll get back to you soon.");
                        form.reset(); // Reset the form after successful submission
                    } else {
                        alert("There was a problem submitting your message. Please try again.");
                    }
                } catch (error) {
                    alert("There was a problem submitting your message. Please try again.");
                }
            });
        }
    };

    // Fade-in effect using Intersection Observer
    const fadeInEffect = () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("#navbar ul li a");

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
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

        window.addEventListener("scroll", highlightNav);
    };

    // Initialize Functions
    smoothScroll();
    handleFormSubmission();
    fadeInEffect();
});
