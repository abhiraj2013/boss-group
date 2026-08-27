"use strict";


const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(
    ".navbar a"
);

const body = document.body;



const openMenu = () => {

    if(!navbar) return;


    navbar.classList.add("active");


    if(menuBtn){

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    body.style.overflow = "hidden";

};



const closeMenu = () => {

    if(!navbar) return;


    navbar.classList.remove("active");


    if(menuBtn){

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    body.style.overflow = "";

};



if(menuBtn){

    menuBtn.addEventListener(
        "click",
        ()=>{

            const isOpen =
            navbar.classList.contains(
                "active"
            );


            if(isOpen){

                closeMenu();

            }
            else{

                openMenu();

            }

        }
    );

}



navLinks.forEach(link=>{


    link.addEventListener(
        "click",
        ()=>{

            closeMenu();

        }
    );


});



document.addEventListener(
"click",
(event)=>{


    if(
        navbar &&
        menuBtn &&
        !navbar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ){

        closeMenu();

    }


});



document.addEventListener(
"keydown",
(event)=>{


    if(
        event.key === "Escape"
    ){

        closeMenu();

    }


});
const header = document.querySelector(
    ".header"
);

const backToTop = document.getElementById(
    "backToTop"
);



const handleHeaderScroll = () => {

    if(!header) return;


    if(window.scrollY > 40){

        header.classList.add(
            "scrolled"
        );

    }
    else{

        header.classList.remove(
            "scrolled"
        );

    }

};



const handleBackToTop = () => {

    if(!backToTop) return;


    if(window.scrollY > 500){

        backToTop.classList.add(
            "show"
        );

    }
    else{

        backToTop.classList.remove(
            "show"
        );

    }

};



if(backToTop){

    backToTop.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}



window.addEventListener(
"scroll",
()=>{

    handleHeaderScroll();

    handleBackToTop();

},
{
    passive:true
}
);
const sections = document.querySelectorAll(
    "section[id]"
);



const updateActiveNavigation = () => {

    let currentSection = "";


    sections.forEach(section=>{


        const sectionTop =
        section.offsetTop - 150;


        const sectionHeight =
        section.offsetHeight;


        if(
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ){

            currentSection =
            section.getAttribute(
                "id"
            );

        }


    });



    navLinks.forEach(link=>{


        link.removeAttribute(
            "aria-current"
        );


        const href =
        link.getAttribute(
            "href"
        );


        if(
            href === `#${currentSection}`
        ){

            link.setAttribute(
                "aria-current",
                "page"
            );

        }


    });


};



const smoothLinks =
document.querySelectorAll(
    'a[href^="#"]'
);



smoothLinks.forEach(link=>{


    link.addEventListener(
        "click",
        event=>{


            const targetId =
            link.getAttribute(
                "href"
            );


            if(
                targetId === "#"
            ) return;



            const target =
            document.querySelector(
                targetId
            );


            if(target){

                event.preventDefault();


                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }


        }
    );


});



window.addEventListener(
"scroll",
updateActiveNavigation,
{
    passive:true
}
);



updateActiveNavigation();
const revealElements = document.querySelectorAll(
    ".company-card, .overview-card, .stat-box"
);



revealElements.forEach(element=>{

    element.classList.add(
        "hidden"
    );

});



const revealObserver =
new IntersectionObserver(

(entries)=>{


    entries.forEach(entry=>{


        if(
            entry.isIntersecting
        ){

            entry.target.classList.add(
                "show"
            );


            revealObserver.unobserve(
                entry.target
            );

        }


    });


},
{
    threshold:0.15
}

);



revealElements.forEach(element=>{


    revealObserver.observe(
        element
    );


});
const counters = document.querySelectorAll(
    ".stat-box h2"
);



const animateCounter = (counter)=>{


    const value =
    counter.textContent.trim();


    const number =
    parseInt(value);


    if(
        isNaN(number)
    ){

        return;

    }



    const hasPlus =
    value.includes("+");


    let current = 0;


    const speed = 40;


    const updateCounter = ()=>{


        const increment =
        Math.ceil(
            number / speed
        );



        current += increment;



        if(
            current < number
        ){

            counter.textContent =
            current +
            (hasPlus ? "+" : "");


            requestAnimationFrame(
                updateCounter
            );

        }
        else{

            counter.textContent =
            number +
            (hasPlus ? "+" : "");

        }


    };


    updateCounter();


};



const counterObserver =
new IntersectionObserver(

(entries)=>{


    entries.forEach(entry=>{


        if(
            entry.isIntersecting
        ){


            animateCounter(
                entry.target
            );


            counterObserver.unobserve(
                entry.target
            );


        }


    });


},
{
    threshold:.7
}

);



counters.forEach(counter=>{


    counterObserver.observe(
        counter
    );


});
const images = document.querySelectorAll(
    "img"
);



images.forEach(image=>{


    if(
        !image.hasAttribute(
            "loading"
        )
    ){

        image.setAttribute(
            "loading",
            "lazy"
        );

    }



    image.addEventListener(
        "load",
        ()=>{


            image.classList.add(
                "loaded"
            );


        }
    );



    image.addEventListener(
        "error",
        ()=>{


            image.src =
            "placeholder.png";


            image.alt =
            "Image unavailable";


        }
    );


});
const focusElements =
document.querySelectorAll(
    "a, button, input, textarea, select"
);



focusElements.forEach(element=>{


    element.addEventListener(
        "focus",
        ()=>{


            element.classList.add(
                "focused"
            );


        }
    );



    element.addEventListener(
        "blur",
        ()=>{


            element.classList.remove(
                "focused"
            );


        }
    );


});



document.addEventListener(
"keydown",
(event)=>{


    if(
        event.key === "Tab"
    ){

        document.body.classList.add(
            "keyboard-navigation"
        );

    }


});



const reduceMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
);



if(
reduceMotion.matches
){

document.documentElement.style.scrollBehavior =
"auto";

}
const debounce = (
    func,
    delay = 250
)=>{

    let timer;


    return (...args)=>{


        clearTimeout(timer);


        timer = setTimeout(()=>{


            func(...args);


        },delay);


    };

};



const throttle = (
    func,
    limit = 100
)=>{

    let waiting = false;


    return (...args)=>{


        if(!waiting){


            func(...args);


            waiting = true;


            setTimeout(()=>{


                waiting = false;


            },limit);


        }


    };

};




const handleResize = debounce(()=>{


    if(
        window.innerWidth > 992
    ){

        closeMenu();

    }


});




const optimizedScroll = throttle(()=>{


    handleHeaderScroll();

    handleBackToTop();

    updateActiveNavigation();


},100);




window.addEventListener(
"resize",
handleResize
);



window.addEventListener(
"scroll",
optimizedScroll,
{
    passive:true
}
);
const initCompaniesPage = ()=>{


    handleHeaderScroll();


    handleBackToTop();


    updateActiveNavigation();



    if(
        menuBtn
    ){

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );


    }



    images.forEach(image=>{


        if(
            image.complete
        ){

            image.classList.add(
                "loaded"
            );


        }


    });



};



document.addEventListener(
"DOMContentLoaded",
()=>{


    initCompaniesPage();


});
window.addEventListener(
"error",
(event)=>{


    console.warn(
        "Page error:",
        event.message
    );


});



window.addEventListener(
"unhandledrejection",
(event)=>{


    console.warn(
        "Promise error:",
        event.reason
    );


});



const currentYear =
document.querySelector(
    ".current-year"
);



if(currentYear){

    currentYear.textContent =
    new Date().getFullYear();

}



document.querySelectorAll(
    "a"
).forEach(link=>{


    const href =
    link.getAttribute(
        "href"
    );


    if(
        href &&
        href.startsWith("http")
    ){

        link.setAttribute(
            "target",
            "_blank"
        );


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    }


});