/* ========================================
   META IT SCHOOL
   PREMIUM JAVASCRIPT
======================================== */


/* ========================================
   PRELOADER
======================================== */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 1200);

});


/* ========================================
   NAVBAR
======================================== */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ========================================
   MOBILE MENU
======================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll(".nav-link")
.forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });

});


/* ========================================
   ACTIVE NAV LINK
======================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});


/* ========================================
   SMOOTH SCROLL
======================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ========================================
   REVEAL ANIMATION
======================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ========================================
   COUNTERS
======================================== */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 70));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {
                counter.textContent = target;
                return;
            }

            counter.textContent = current;

            requestAnimationFrame(
                updateCounter
            );

        };

        updateCounter();

    });

}


const statsSection =
    document.querySelector(".stats-section");

const statsObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting
            ) {
                startCounters();
            }

        },
        {
            threshold: 0.3
        }
    );


if (statsSection) {
    statsObserver.observe(statsSection);
}


/* ========================================
   BACK TO TOP
======================================== */

const backTop =
    document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ========================================
   PHONE FORMAT
======================================== */

const phoneInput =
    document.getElementById("studentPhone");

phoneInput.addEventListener(
    "input",
    function() {

        let value =
            this.value.replace(/\D/g, "");

        if (value.startsWith("998")) {
            value = value.substring(3);
        }

        value = value.substring(0, 9);

        let formatted = "+998";

        if (value.length > 0) {
            formatted += " " +
                value.substring(0, 2);
        }

        if (value.length > 2) {
            formatted += " " +
                value.substring(2, 5);
        }

        if (value.length > 5) {
            formatted += " " +
                value.substring(5, 7);
        }

        if (value.length > 7) {
            formatted += " " +
                value.substring(7, 9);
        }

        this.value = formatted;

    }
);


/* ========================================
   DEMO REGISTRATION
======================================== */

const courseForm =
    document.getElementById("courseForm");

const successMessage =
    document.getElementById("successMessage");

const newApplication =
    document.getElementById("newApplication");


courseForm.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        const name =
            document
                .getElementById("studentName")
                .value
                .trim();

        const phone =
            document
                .getElementById("studentPhone")
                .value
                .trim();

        const course =
            document
                .getElementById("courseSelect")
                .value;

        const message =
            document
                .getElementById("studentMessage")
                .value
                .trim();


        if (!name || !phone || !course) {

            alert(
                "Iltimos, kerakli maydonlarni to‘ldiring."
            );

            return;
        }


        const application = {

            name: name,

            phone: phone,

            course: course,

            message: message,

            date: new Date()
                .toLocaleString("uz-UZ")

        };


        console.log(
            "META IT SCHOOL DEMO ARIZA:",
            application
        );


        /* LocalStorage */

        const applications =
            JSON.parse(
                localStorage.getItem(
                    "metaApplications"
                )
            ) || [];


        applications.push(application);


        localStorage.setItem(
            "metaApplications",
            JSON.stringify(applications)
        );


        /* FORMNI YASHIRISH */

        courseForm.style.display =
            "none";


        /* SUCCESS OYNASI */

        successMessage.classList.add(
            "show"
        );

    }
);


/* ========================================
   NEW APPLICATION
======================================== */

newApplication.addEventListener(
    "click",
    () => {

        courseForm.reset();

        successMessage.classList.remove(
            "show"
        );

        setTimeout(() => {

            courseForm.style.display =
                "block";

        }, 250);

    }
);


/* ========================================
   COURSE CARD TILT
======================================== */

const cards =
    document.querySelectorAll(
        ".course-card, .teacher-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            if (window.innerWidth < 800) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* ========================================
   HERO CODE PARALLAX
======================================== */

const codeCard =
    document.querySelector(".code-card");

document.addEventListener(
    "mousemove",
    e => {

        if (
            !codeCard ||
            window.innerWidth < 900
        ) {
            return;
        }

        const x =
            (window.innerWidth / 2 - e.clientX)
            / 100;

        const y =
            (window.innerHeight / 2 - e.clientY)
            / 100;

        codeCard.style.transform =
            `perspective(1000px)
             rotateY(${-7 + x}deg)
             rotateX(${y}deg)`;

    }
);


/* ========================================
   MAGNETIC BUTTONS
======================================== */

const magneticButtons =
    document.querySelectorAll(
        ".btn-primary, .nav-button"
    );


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        e => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px,
                           ${y * 0.12}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* ========================================
   ESCAPE MENU
======================================== */

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Escape") {
            navMenu.classList.remove("open");
        }

    }
);


/* ========================================
   CONSOLE
======================================== */

console.log(
    "%c META IT SCHOOL ",
    "background:#7c5cff;color:#fff;font-size:20px;font-weight:bold;padding:10px;"
);

console.log(
    "Kelajakni kod bilan yarat. 🚀"
);