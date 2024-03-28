AOS.init();
let navPrimaria = document.querySelector(".prima-navbar");
let navSecondaria = document.querySelector(".seconda-navbar");
let titoloPricipale =  document.querySelector("#titolo-pricipale");


window.addEventListener("scroll",()=>{
    
    let scrolled = window.scrollY;
    
    if(scrolled > 100){
        titoloPricipale.style.color ="var(--red)"
        navPrimaria.classList.add("animation-gradient")
        navSecondaria.style.transform = "translateY(0px)"
        navPrimaria.classList.remove ("bg-black-custom")
        navPrimaria.classList.add ("bg-green-custom")
    }else{
        if(window.innerWidth < 600){
            
            navSecondaria.style.transform = "translateY(-170px)"
        }else{
            navPrimaria.classList.remove("animation-gradient")
            navSecondaria.style.transform = "translateY(-110px)"
            navPrimaria.classList.remove ("bg-green-custom")
            navPrimaria.classList.add ("bg-black-custom")
        }
        
    } 
    
    
})

let primoNumero = document.querySelector("#primoNumero");
let secondoNumero = document.querySelector("#secondoNumero");
let terzoNumero = document.querySelector("#terzoNumero");
/* let counter = 0; */

function createInterval(total, finalNumber, time) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < total) {
            counter++
            finalNumber.innerHTML = counter
        } else {
            clearInterval(interval)
        }
    }, time)
    
    
}

let check = false;
let observer= new IntersectionObserver((entries)=> {
    entries.forEach((el)=>{
        if(el.isIntersecting && !check){
            createInterval(500, primoNumero, 10)
            createInterval(400, secondoNumero, 10)
            createInterval(300, terzoNumero, 10)
            check= true;
            setTimeout(()=>{
                check=false; 
            }, 8000)
        }
    })
})

observer.observe(terzoNumero)


let cardsWrapper = document.querySelector("#cardsWrapper")

let giochi =[
    {nome : 'Call Of Duty', categoria : 'fps', prezzo :'20'},
    {nome : 'Call Of Duty 2', categoria : 'fps', prezzo :'25'},
    {nome : 'Call Of Duty 3', categoria : 'fps', prezzo :'28'},
    {nome : 'Call Of Duty 4 ', categoria : 'fps', prezzo :'30'},
    {nome : 'Call Of Duty Black Ops', categoria : 'fps', prezzo :'33'},
    {nome : 'Call Of Duty Vanguard', categoria : 'fps', prezzo :'50', url : "media\cod7.jpg"},
    {nome : 'Call Of Duty Modern Walfare', categoria : 'fps', prezzo :'70', url : "media\cod8.jpeg"},
    {nome : 'Call Of Duty Black Ops 2', categoria : 'fps', prezzo :'80', url : "media\cod9.jpeg"}
]

giochi.forEach((gioco, i) => {
    if (i >= (giochi.length -3 ) ){
        let div = document.createElement("div")
        div.classList.add("col-6", "col-md-4", "col-lg-3","my-3")
        div.setAttribute("data-aos","zoom-out-up")
        div.setAttribute("data-aos-duration","1500")
        div.setAttribute("data-aos-delay",`${100* i}`)

        div.innerHTML= `
        <div class="card bg-green-custom" style="background-image: url(${gioco.url})">
        <div class="card-body font-secondo fw-semibold font-red-custom pe-4">
        <h6 class="titolo-card fw-bold">${gioco.nome}</h6>
        <p class="testo-card ">${gioco.categoria}</p>
        <p class="testo-card">€${gioco.prezzo}</p>
        <div class="d-flex justify-content-end">
        <a href="" class="btn btn-danger">CLICCA QUI PER INFORMAZIONI</a>
        </div>
        
        </div>
        </div>
        </div>
        
        `
    cardsWrapper.appendChild(div)
     
    }
   
})

   const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });


  let swiperWrapper = document.querySelector(".swiper-wrapper")
  let reviews =[
    {nome : 'Mario', descrizione : 'Sito molto interessante'},
    {nome : 'Gregorio', descrizione : 'Belli colori del sito!'},
    {nome : 'Geronimo', descrizione : 'Giochi interessanti'},
    {nome : 'Benito', descrizione : 'Vincere, e vinceremo!'},
    {nome : 'Adolf', descrizione : 'Bel sito sui giochi di guerra'}
  ]
  
reviews.forEach((review)=>{
    let div = document.createElement("div");
    div.classList.add("swiper-slide", "font-red-custom","font-secondo","fw-bold", "d-flex", "justify-content-center", "align-items-center", "flex-column", "fs-5");
    div.innerHTML = `
        <h4 class="mb-5 font-secondary font-yellow-custom">${review.nome}</h4>
        <p class="text-center font-secondary word-break">${review.descrizione}</p>
    `;
    swiperWrapper.appendChild(div)
}  )
