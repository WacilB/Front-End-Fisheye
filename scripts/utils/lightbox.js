class Lightbox {
    constructor(photographer, media) {
        this._media = media
        this._photographer = photographer
        this._template = new LightboxTemplate(this._media)
        this._controls = undefined
        this._previousFocus = null

        // Garde les fonctions dans le context de l'objet
        this._onKeyUp = this._onKeyUp.bind(this)
        this._close = this._close.bind(this)
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }

    /**
     * Init LigthBox
     */
    init () {
        // memorisation de l'element focus precedent
        this._previousFocus = document.querySelector(':focus-visible')

        // Insertion de la lightbox dans le DOM
        document.body.appendChild(this._template.createLightbox())
        document.addEventListener('keydown', this._onKeyUp)
        this._template.lightBoxPrevBtn.addEventListener('click', this._prev)
        this._template.lightBoxNextBtn.addEventListener('click', this._next)
        this._template.lightBoxCloseBtn.addEventListener('click', this._close)
        this._template.loadFactory(this._media)
        this._initControls()
    }

    /**
     * Passe à l'élément suivant
     */
    _next (e) {
        e.preventDefault()
        let i = this._photographer.portfolio.findIndex(media => media.id === this._media.id)

        if (i === this._photographer.portfolio.length - 1) {
            i = -1
        }

        this._media = this._photographer.portfolio[i + 1]
        this._template.loadFactory(this._media)
        this._initControls()
    }

    /**
     * Passe à l'élément suivant

     */
    _prev (e) {
        e.preventDefault()
        let i = this._photographer.portfolio.findIndex(media => media.id === this._media.id)

        if (i === 0) {
            i = this._photographer.portfolio.length
        }

        this._media = this._photographer.portfolio[i - 1]
        this._template.loadFactory(this._media)
        this._initControls()
    }

    /**
     * Ferme la lightbox
     */
    _close (e) {
        e.preventDefault()
        this._template.LightBoxContainer.classList.add('fadeout')
        const timer = setTimeout(() => {
            this._template.LightBoxContainer.parentNode.removeChild(this._template.LightBoxContainer)
            clearTimeout(timer)
        }, 500)
        document.removeEventListener('keydown', this._onKeyUp)

        // focus sur le dernier element avant ouverture lightbox
        if (this._previousFocus) {
            this._previousFocus.focus()
        }
    }

    /**
     *  Navigation avec le Clavier
     */
    _onKeyUp (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            this._close(e)
        }
        if (e.key === 'ArrowLeft') {
            this._prev(e)
        }
        if (e.key === 'ArrowRight') {
            this._next(e)
        }
        if (e.key === 'Tab') {
            this._focusInLightBox(e)
        }
        if (e.key === 'ArrowUp') {
            this._template.lightBoxCloseBtn.focus()
        }
    }

    /**
     * Met le focus sur l'element TAB
     */
    _focusInLightBox (e) {
        e.preventDefault()

        // Recupere l'element qui est focus dans la modal
        let index = this._controls.findIndex(elmnt => elmnt === this._template.LightBoxContainer.querySelector(':focus'))

        // Incerment ou Decrement ( TAB || Shift+TAB )
        if (e.shiftKey === true) {
            index--
        } else {
            index++
        }
        // Lors du Tab il passe a l'index suivant
        if (index >= this._controls.length) {
            index = 0
        }
        if (index < 0) {
            index = this._controls.length - 1
        }

        this._controls[index].focus()
    }

    _initControls () {
        this._controls = [
            this._template.media,
            this._template.title,
            this._template.lightBoxNextBtn,
            this._template.lightBoxPrevBtn,
            this._template.lightBoxCloseBtn
        ]
        // reinitialise le focus au changement de media
        const timer = setTimeout(() => {
            if (this._template.LightBoxContainer.querySelector(':focus')) {
                this._template.media.focus()
            } else {
                this._template.LightBoxContainer.focus()
            }
            clearTimeout(timer)
        }, 100)
    }
}