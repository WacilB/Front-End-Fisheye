class Photographer {
    constructor(data) {
        this._imagePath = `assets/images/photographers/`
        this._id = data.id
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
        this._portfolio = []

        this._templatePhotographer = null
        this._templatePortfolio = null
        this._templateModal = null
        this._templateFilter = null
    }

    // Getters

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get likes() {
        return this._totalLikes()
    }

    get portrait() {
        return this._imagePath + this._portrait
    }

    get portfolio() {
        return this._portfolio
    }
    get templateModal () {
        return this._templateModal
    }
    get templatePhotographer() {
        return this._templatePhotographer
    }

    get templatePortfolio() {
        return this._templatePortfolio
    }

    get templateFilter () {
        return this._templateFilter
    }
    //Setter

    set portfolio(medias) {
        this._portfolio = medias
    }


    set templatePhotographer(template) {
        this._templatePhotographer = template
    }


    set templatePortfolio(template) {
        this._templatePortfolio = template
    }
    set templateModal (template) {
        this._templateModal = template
    }
    set templateFilter (template) {
        this._templateFilter = template
    }
    addPortfolioMedia(media) {
        this._portfolio.push(media)
        this._likes += media.likes
    }

    _totalLikes() {
        let totalLikes = 0
        this._portfolio.forEach(media => {
            totalLikes += media.likes
        })

        return totalLikes
    }
}