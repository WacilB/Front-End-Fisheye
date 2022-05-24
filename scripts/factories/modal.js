class ModalTemplate {
    constructor(photographer) {
        this._photographer = photographer
        this._modalSection = null
        this._validationMessage = null
    }
    //getter
    get modalSection(){
        return this._modalSection
    }
    get modalClose(){
        return this._modalSection.querySelector('[data-dismiss="contact-modal"]')
    }
    get modalSubmit(){
        return this._modalSection.querySelector('button[type="submit"]')
    }

    createModalSection() {
        this._modalSection = document.createElement("div")
        this._modalSection.id = 'contact-modal'
        this._modalSection.style.display ='none'
        this._modalSection.setAttribute('role', 'dialog')
        this._modalSection.setAttribute('aria-labelledby', 'contact-modal__title')
        this._modalSection.setAttribute('aria-hidden', 'true')
        this._modalSection.setAttribute('tabindex', '-1')
        this._modalSection.innerHTML = `
                <div class="modal" data-stop-propagation>
        <div class="modal-header">
            <h1 id="contact_modal__title" tabindex="0">Contactez-moi <br> ${this._photographer.name}</h1>
            <img src="assets/icons/close.svg" alt="bouton fermeture modal" id="contact_modal__close" data-dismiss="contact-modal" tabindex="0" role="button" / >
        </div>
        <form action="#" method="post">
            <div>
                <label for="contact_modal_form__firstName" id="label_contact_modal_form__firstName" tabindex="0"> Prénom</label>
                <input type="text" name="firstName" id="contact_modal_form__firstName" aria-labelledby="contact_modal_form__firstName" required minlength="2"/>
            </div>                  
            <div>
                <label for="contact_modal_form__lastName" id="label_contact_form__name" tabindex="0"> Nom</label>
                <input type="text" name="lastName" id="contact_modal_form__lastName" aria-labelledby="contact_modal_form__lastName" required minlength="2"/>
            </div>
            <div>
                <label for="contact_modal_form__email" id="label_contact_form__email" tabindex="0"> Email</label>
                <input type="email" name="email" id="contact_modal_form__email" aria-labelledby="contact_modal_form__email" required/>
            </div>
            <div>
                <label for="contact_modal_form__message" id="label_contact_form__message" tabindex="0"> Votre message </label>
                <textarea name="message" id="contact_modal_form__message" aria-labelledby="contact_modal_form__message" rows="5" required minlength="10"></textarea>
            </div>
            <button class="contact_button" id="contact_modal__submit" type="submit" aria-label="Envoyer le message">Envoyer</button>
        </form>
    </div> 
   
        `
        return this._modalSection
    }

    ValidationMessage(){
        this._modalSection.innerHTML =`
        <h2>Merci pour votre message ! <br>
        ${this._photographer.name} vous répondra dans les plus brefs delais 
        </h2>
        `
        return this._modalSection
    }

}