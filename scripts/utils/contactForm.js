// eslint-disable-next-line no-unused-vars
class Modal {

    constructor (template, ariaSelector = "button, a, input, textarea, [role=\"button\"], [tabindex=\"0\"]") {
        this._modalContainer = template._modalSection;
        this._closeNode = template.modalClose;
        this._sendButton = template.modalSubmit;
        this._ariaSelector = ariaSelector;
        this._previousFocus = null;
        this._ariaElements = [];
        this._hiddenOnModal = Array.from(document.querySelectorAll("[data-hidden-on-modal]"));

        // fonctions pour garder le context this
        this._stopPropagation = this._stopPropagation.bind(this);
        this._ariaModal = this._ariaModal.bind(this);
        this._closeModal = this.closeModal.bind(this);
        this._sendEmail = this._sendEmail.bind(this);
    }


    init (btnOpenModal) {
        // Cache l'element modal par default
        this._modalContainer.style.display = "none";

        // Si la modal a un bouton de fermture on ajoute l'evenement
        if (this._closeNode) {
            this._closeNode.addEventListener("click", this._closeModal);
        }

        this._sendButton.addEventListener("click", () => {
            this._sendEmail();
        });

        btnOpenModal.addEventListener("click", () => this.displayModal());
    }

    get element () {
        return this._modalContainer;
    }

    get previousFocus () {
        return this._previousFocus;
    }

    /**
     * Affiche la boite modal
     */
    displayModal () {
        // Initialise l'Element HTML
        this._modalContainer.style.display = null;
        this._modalContainer.removeAttribute("aria-hidden");
        this._modalContainer.setAttribute("aria-modal", true);

        // Masque les elements aria en arrière plan
        this._hiddenOnModal.forEach(item => {
            item.setAttribute("aria-hidden", true);
        });

        // Memorise le precedent element focus
        this._previousFocus = document.querySelector(":focus");

        // Recupération de tous les elements qui intéragissent avec tab (focus)
        this._ariaElements = Array.from(this._modalContainer.querySelectorAll(this._ariaSelector));

        // Ferme la modal si on click sur son arriere plan
        this._modalContainer.addEventListener("click", this._closeModal);

        // Stop la propagation des evenement si on click sur la modal
        this._modalContainer.querySelector("[data-stop-propagation]").addEventListener("click", this._stopPropagation);

        // Ecoute les evenement au clavier pour fermer la modal
        window.addEventListener("keydown", this._ariaModal);

        this._modalDisplay = true;
    }

    /**
     * Ferme la boite modal
     */
    closeModal () {
        // rends les elements aria actifs
        this._hiddenOnModal.forEach(item => {
            item.removeAttribute("aria-hidden");
        });

        // Focus sur l'element avant l'ouverture de la modal
        if (this._previousFocus !== null) {
            this._previousFocus.focus();
        }

        // Change les attributs aria et style
        this._modalContainer.style.display = "none";
        this._modalContainer.setAttribute("aria-hidden", true);
        this._modalContainer.removeAttribute("aria-modal");

        // Suppression des listeners present lors de l'ouverture de la modal
        this._modalContainer.removeEventListener("click", this._closeModal);
        this._modalContainer.querySelector("[data-stop-propagation]").removeEventListener("click", this._stopPropagation);
        window.removeEventListener("keydown", this._ariaModal);

        this._modalDisplay = false;
    }


    _stopPropagation (e) {
        e.stopPropagation();
    }


    _ariaModal (e) {
        // Si on appuie sur echap on ferme la modal
        if (e.key === "Escape" || e.key === "Esc") {
            e.preventDefault();
            this._closeModal();
        }
        // Si l'element focus est le bouton close et que la touche est enter on ferme la modal
        if (this.
            _modalContainer.querySelector(":focus") === this._closeNode && e.key === "Enter") {
            e.preventDefault();
            this._closeModal();
        }

        if (e.key === "Tab" && this._modalContainer !== null) {
            e.preventDefault();
            this._focusInModal(e);
        }
    }

    /**
     * Met le focus sur TAB

     */
    _focusInModal (e) {
        e.preventDefault();

        // Recupere l'element qui est focus dans la modal
        let index = this._ariaElements.findIndex(elmnt => elmnt === this._modalContainer.querySelector(":focus"));

        // Incerment ou Decrement ( TAB || Shift+TAB )
        if (e.shiftKey === true) {
            index--;
        } else {
            index++;
        }
        // Lors du Tab il passe a l'index suivant
        if (index >= this._ariaElements.length) {
            index = 0;
        }
        if (index < 0) {
            index = this._ariaElements.length - 1;
        }

        this._ariaElements[index].focus();
    }

    /**
     * Renseigne dans la console l'email envoyé
     */
    _sendEmail () {
        const form = this._modalContainer.querySelector("form");
        const formTitle = this._modalContainer.querySelector("h1");
        if (form.checkValidity()) {
            const formData = new FormData(form);
            console.log("ENVOI DE L'EMAIL:");
            console.log("******************");
            console.log("Prenom : ", formData.get("firstName"));
            console.log("Nom : ", formData.get("lastName"));
            console.log("Email : ", formData.get("email"));
            console.log("message : ");
            console.log(formData.get("message"));
            form.reset();
            form.innerHTML="";
            formTitle.classList.add("modal_title_submit");
            formTitle.textContent =  "Merci pour votre message !";

        }


    }
}