

// eslint-disable-next-line no-unused-vars
class ListMediaTemplate{
    constructor(photographer) {
        this._photographer = photographer;
        this._wrapperListCards = null;
    }

    createListMedia () {
        this._wrapperListCards = document.createElement("ul");
        this._wrapperListCards.classList.add("media-cards-list");

        this._photographer.portfolio.forEach(media => {
            const mediaTemplate = new MediaTemplate(this._photographer, media);
            media.template = mediaTemplate;
            this._wrapperListCards.appendChild(mediaTemplate.createCard("li"));
        });

        return this._wrapperListCards;
    }
    refreshListMedia (callback = () => {}) {
        const parentNode = this._wrapperListCards.parentNode;

        parentNode.classList.remove("loaded");
        parentNode.classList.add("loading");

        const timer = setTimeout(() => {
            parentNode.removeChild(this._wrapperListCards);
            parentNode.appendChild(this.createListMedia());
            parentNode.classList.remove("loading");
            parentNode.classList.add("loaded");
            callback();
            clearTimeout(timer);
        }, 300);
    }


}

class MediaTemplate{
    constructor(photographer, media) {
        this._photographer =photographer;
        this._media = media;
        this._mediaCard = null;
    }

    // Getter

    get mediaWarper(){
        return this._mediaCard;
    }

    createCard(tagName){
        this._mediaCard = document.createElement(tagName);
        this._mediaCard.classList.add("media-container");

        const card= `
        <a href="${this._media.path}" class="media-card__cover" aria-label="${this._media._title}, agrandir l'image">
        <img src="${this._media.thumbPath}" alt="${this._media.title}">
        </a>
        <div class="media-infos">
        <h3>${this._media.title}</h3>
        <div class="media-infos-like">
            <div class="media-card__content__like favorite">
          <label id="like-${this._media.id}" for="like-${this._media.id}-input" class="favorite__counter">${this._media.likes}</label>
          <input id="like-${this._media.id}-input" aria-label="${this._media.likes} j'aimes" class="favorite__input" type="checkbox" />
        </div>
        </div>
        </div>
        `;
        this._mediaCard.innerHTML = card;
        this.likeCounter();
        this._mediaCard.querySelector(`#like-${this._media.id}-input`).checked = this._media.userLike;

        return this._mediaCard;
    }
    likeCounter() {
        this._mediaCard.querySelector("input[type=\"checkbox\"]").addEventListener("click", (e) => {
            if (e.target.checked) {
                this._media.likes += 1;
            } else {
                this._media.likes -= 1;
            }
            this._mediaCard.querySelector("label.favorite__counter").innerHTML = this._media.likes;
            this._mediaCard.querySelector("input.favorite__input").setAttribute("aria-label", `${this._media.likes} j'aime`);


            //rafraichie le Prix dans la modal
            this._photographer.templatePhotographer.refreshPhotographerContentModal();

        });
    }
}