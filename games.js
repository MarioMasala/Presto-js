//evento scroll navbar//
AOS.init();
let navPrimaria = document.querySelector(".prima-navbar");
let navSecondaria = document.querySelector(".seconda-navbar");
let titoloPricipale =  document.querySelector("#titolo-pricipale");


window.addEventListener("scroll",()=>{
    
    let scrolled = window.scrollY;
    
    if(scrolled > 100){
        titoloPricipale.style.color ="var(--orange)"
        navSecondaria.style.transform = "translateY(0px)"
        navPrimaria.classList.remove ("bg-black-custom")
        navPrimaria.classList.add ("bg-red-custom")
    }else{
        if(window.innerWidth < 600){
            
            navSecondaria.style.transform = "translateY(-170px)"
        }else{
            navSecondaria.style.transform = "translateY(-100px)"
            navPrimaria.classList.remove ("bg-red-custom")
            navPrimaria.classList.add ("bg-black-custom")
        }
        
    } 
    
    
})

fetch("./giochi.json").then((response) => response.json()).then(data => {
    let radioWrapper = document.querySelector("#radioWrapper");

    //todo Funzione che mi genera i radio buttons
    function setRadios() {
        let radioCategories = data.map((gioco) => gioco.categoria)
        let uniqueCategories = [];
        radioCategories.forEach((categoria) => {
            if (!uniqueCategories.includes(categoria)) {
                uniqueCategories.push(categoria)
            }
        })
        uniqueCategories.forEach(categoria => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="categories"
            id="${categoria}" >
            <label class="form-check-label" for="${categoria}">
                ${categoria}
            </label>
            `
            radioWrapper.appendChild(div)
        })

    }
    setRadios()

    //todo funzione che mi crei le card dinamicamente
    console.log(data);

    let cardsWrapper = document.querySelector("#cardsWrapper");
    function showCards(array) {
        cardsWrapper.innerHTML = ``
        array.forEach((gioco, i) => {
            let div = document.createElement("div");
            div.classList.add("col-12", "col-md-4", "margin-navbar");
            div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://picsum.photos/${300 + i}" class="img-fluid rounded-start h-100"
                        alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${gioco.nome}</h5>
                        <p class="card-text">${gioco.categoria}
                        </p>
                        <p class="card-text"><small class="text-body-secondary">${gioco.prezzo}</small></p>
                    </div>
                </div>
            </div>
        </div>
        `
            cardsWrapper.appendChild(div);
        })
    }
    showCards(data);

    let radios = document.querySelectorAll(".form-check-input");

    function filterByCategory(array) {
        // Il metodo .find() ritorna il primo elemento di un array che soddisfa una determinata condizione;
        cardsWrapper.innerHTML = ``
        let checked = Array.from(radios).find((button) => button.checked);
        let categoria = checked.id;
        if (categoria == 'All') {
           return array
        } else {
            let filtered = array.filter(gioco => gioco.categoria == categoria)
            return filtered
        }
    }

    radios.forEach(button => {
        button.addEventListener("click", () => {
            globalFilter()
        })
    })



    //todo FILTRO PER PREZZO
    let inputRange = document.querySelector("#inputRange");
    let numberPrice = document.querySelector("#numberPrice");
    function setInputPrice() {
        let prezzi = data.map(gioco => gioco.prezzo)
        /* console.log(prezzi); */
        let maxPrezzo = Math.floor(Math.max(...prezzi))
        /* console.log(maxPrezzo); */
        inputRange.max = maxPrezzo;
        inputRange.value = maxPrezzo;
        numberPrice.innerHTML = `${maxPrezzo} &euro;  `
    }
    setInputPrice()


    function filterByPrice(array) {
        let filtered = array.filter(gioco=> gioco.prezzo<= inputRange.value)
        return filtered
    }

    inputRange.addEventListener("input", () => {
        if (inputRange.value % 5 == 0) {
            globalFilter()
            numberPrice.innerHTML = `${inputRange.value % 5 == 0 ? inputRange.value : ""} &euro;`
        }
    })
    let wordBtn = document.querySelector("#wordBtn")
    let wordInput = document.querySelector("#wordInput");
    //Creare una funzione filterByWord che ci filtri per parola, ed un evento che faccia in modo che quando scriviamo all'interno dell'input ci crei le sole card con i giochi che rispettano la condizione richiesta.

    function filterByWord(array) {
        let filtered = array.filter((gioco) => gioco.nome.toLowerCase().includes(wordInput.value.toLowerCase().replace(/[^a-zA-Z ]\s/g, '')))
        
        return filtered
    }
    
    wordBtn.addEventListener('click', () => {
        globalFilter(wordInput.value);
        wordInput.value = ""
        

    })


    //todo FILTRO GLOBALE
    function globalFilter(){
        let filteredByCategory = filterByCategory(data); // Array con i giochi filtrati per categoria
        let filteredByPrice = filterByPrice(filteredByCategory); // Array con giochi filtrati per categoria e per prezzo
        let filteredByWord = filterByWord(filteredByPrice) // Array con giochi filtrati per categoria, prezzo e parola
        showCards(filteredByWord)


    }


});