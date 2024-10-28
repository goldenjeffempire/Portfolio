function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark');
    body.classList.toggle('light');
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggler = document.getElementById("theme-toggler");

    // Check for saved user preference and set initial theme
    const currentTheme = localStorage.getItem("theme") || "light"; // Default to light theme
    document.body.classList.add(currentTheme);
    document.querySelector('nav').classList.add(currentTheme);

    // Toggler functionality
    themeToggler.addEventListener("click", () => {
        // Toggle between dark and light themes
        const isLight = document.body.classList.contains("light");
        
        document.body.classList.toggle("light", !isLight);
        document.body.classList.toggle("dark", isLight);
        document.querySelector('nav').classList.toggle("light", !isLight);
        document.querySelector('nav').classList.toggle("dark", isLight);

        // Update button text based on the theme
        themeToggler.textContent = isLight ? "Switch to Dark Mode" : "Switch to Light Mode";

        // Save the user's preference
        localStorage.setItem("theme", isLight ? "dark" : "light");
    });

    // Smooth Scrolling for Navigation Links
    const smoothScroll = () => {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor click behavior
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
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

                // Prepare and send form data to Formspree
                const formData = new FormData(form);
                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json',
                        },
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
        const navLinks = document.querySelectorAll("nav ul li a");

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Stop observing the target after it's visible
                }
            });
        }, options);

        sections.forEach(section => {
            section.classList.add("fade-in"); // Add fade-in class for animations
            observer.observe(section); // Observe each section for fade-in effect
        });

        // Highlight active section in the navbar
        const highlightNav = () => {
            let index = sections.length;

            while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

            navLinks.forEach(link => link.classList.remove("active"));
            if (navLinks[index]) { // Ensure index is valid before accessing
                navLinks[index].classList.add("active");
            }
        };

        window.addEventListener("scroll", highlightNav); // Update active link on scroll
    };

    // Initialize Functions
    smoothScroll();
    handleFormSubmission();
    fadeInEffect();
});
