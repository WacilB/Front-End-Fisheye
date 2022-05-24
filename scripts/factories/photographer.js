class PhotographerTemplate {
constructor(photographer) {
  this._photographer = photographer
  this._photographerCard = null
  this._photographerHeader = null
    this._photographerModalPrice =null
    this._buttonModal = null
}
    get btnModal () {
        return this._buttonModal
    }
createPhotographerCard() {
    //Constantes des éléments HTML
    this._photographerCard = document.createElement("article");

    //Afficher les elements dans la balise article
    const article=`
    <a href="photographer.html?id=${this._photographer.id}" aria-label="${this._photographer.name}">
    <img src="${this._photographer.portrait}" alt="${this._photographer.name}">
    <h2>${this._photographer.name}</h2>
    </a>
    <h3>${this._photographer.city}, ${this._photographer.country}</h3>
    <h4>${this._photographer.tagline}</h4>
    <p>${this._photographer.price}€/jour</p>
    
    `
    this._photographerCard.innerHTML = article
    return this._photographerCard;
  }

  createPhotographerHeader() {
        this._photographerHeader = document.createElement("div")
      this._photographerHeader.classList.add("photographe-header")
      const content =`
    <div class="photograph-header-infos">
    <h2>${this._photographer.name}</h2> 
    <h4>${this._photographer.city}, ${this._photographer.country}</h4>
    <p>${this._photographer.tagline}</p>
    </div>
    <div class="photograph-header-btn">
    <button class="contact_button" id="contact_modal__open"  aria-controls="contact-modal">Contactez-moi</button>
    </div>
    <div class="photograph-header-img">
    <img src="${this._photographer.portrait}" alt="${this._photographer.name}">
    </div>
    `
      this._photographerHeader.innerHTML = content
    this._buttonModal = this._photographerHeader.querySelector('[aria-controls="contact-modal"]')
    return this._photographerHeader
  }

  createPhotographerModalPrice(){
    this._photographerModalPrice = document.createElement('aside')
      this._photographerModalPrice.setAttribute('data-hidden-on-modal', '')
      this._photographerModalPrice.setAttribute('aria-label', `${this._photographer.likes} j'aimes, tarifs: ${this._photographer.price}€ par jour`)
      this._photographerModalPrice.classList.add('photographer-modal-price')

      this._photographerModalPrice.innerHTML= `
       <div class="photographer-modal-price__like" aria-hidden="true">${this._photographer.likes}
       
        </div>
        <div class="photgrapher-modal-price__picto">
        
               <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="photographer-modal-price__pictoLikes">
        <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#000000"/>
        </svg>
</div>
      <div class="photographer-modal-price__price" aria-hidden="true">${this._photographer.price}€ / jour</div>
      `
      return this._photographerModalPrice
}
    refreshPhotographerContentModal(){
    if (this._photographerModalPrice){
    this._photographerModalPrice.querySelector(".photographer-modal-price__like").innerHTML =`${this._photographer.likes}`
    }
    }
}