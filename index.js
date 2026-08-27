const cursor = document.querySelector(".cursor-glow");
const hero = document.querySelector(".hero");


if(cursor && window.innerWidth > 700){

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;
        mouseY = e.clientY;

    });


    function cursorMove(){

        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;


        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;


        requestAnimationFrame(cursorMove);

    }


    cursorMove();

}




const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn"
);


buttons.forEach(button=>{


    button.addEventListener("mouseenter",()=>{

        if(cursor){

            cursor.style.transform =
            "translate(-50%,-50%) scale(1.5)";

        }

    });


    button.addEventListener("mouseleave",()=>{

        if(cursor){

            cursor.style.transform =
            "translate(-50%,-50%) scale(1)";

        }

    });


});





if(hero && window.innerWidth > 900){


    window.addEventListener("mousemove",(e)=>{


        const rotateX =
        (window.innerHeight / 2 - e.clientY) / 120;


        const rotateY =
        (e.clientX - window.innerWidth / 2) / 120;


        hero.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;


    });



    document.addEventListener("mouseleave",()=>{


        hero.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";


    });


}





buttons.forEach(button=>{


    button.addEventListener("click",()=>{

        button.style.transform="scale(.96)";


        setTimeout(()=>{

            button.style.transform="";

        },150);


    });


});





window.addEventListener("load",()=>{


    document.body.classList.add("loaded");


});