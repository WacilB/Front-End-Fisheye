// eslint-disable-next-line no-unused-vars
class LightboxTemplate{
    constructor(media) {
        this._media =media;
        this.lightBoxContainer =null;
        this.lightBoxContent =null;
        this.lightBoxCloseBtn =null;
        this.lightBoxNextBtn =null;
        this.lightBoxPrevBtn = null;
        this.$media =null;
        this.$mediaTitle =null;
    }

    //Getters

    get LightBoxContainer(){
        return this.lightBoxContainer;
    }
    get LightBoxContent(){
        return this.lightBoxContent;
    }
    get closeBtn(){
        return this.lightBoxCloseBtn;
    }
    get nextBtn(){
        return this.lightBoxNextBtn;
    }
    get prevBtn (){
        return this.lightBoxPrevBtn;
    }
    get media (){
        return this.$media;
    }
    get title(){
        return this.$mediaTitle;
    }

    createLightbox(){
        const lightBoxTemplate = document.createElement("aside");
        lightBoxTemplate.setAttribute("aria-label", "Media plein écran");
        lightBoxTemplate.setAttribute("tabindex" , 0);
        lightBoxTemplate.classList.add("lightbox");

        lightBoxTemplate.innerHTML = `
        <button class="lightbox__close" aria-label="Fermer la boite">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M57 19.23L52.77 15L36 31.77L19.23 15L15 19.23L31.77 36L15 52.77L19.23 57L36 40.23L52.77 57L57 52.77L40.23 36L57 19.23Z" fill="#911C1C"/>
            </svg>
        </button>
        <button class="lightbox__next" aria-label="Media suivant">
            <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" fill="#911C1C"/>
            </svg>
        </button>
         <button class="lightbox__prev" aria-label="Media précédent">
            <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="#911C1C"/>
            </svg>
        </button>
        <div class="lightbox__container">
            <div class="lightbox__content">
            </div>
        </div>
        `;

        this.lightBoxContent = lightBoxTemplate.querySelector(".lightbox__content");
        this.lightBoxCloseBtn = lightBoxTemplate.querySelector(".lightbox__close");
        this.lightBoxNextBtn = lightBoxTemplate.querySelector(".lightbox__next");
        this.lightBoxPrevBtn = lightBoxTemplate.querySelector(".lightbox__prev");

        this.lightBoxContainer = lightBoxTemplate;
        return lightBoxTemplate;
    }

    loadImage(){
        const image = new Image();
        image.src = this._media._imagePath;


        const loader = document.createElement("div");
        loader.classList.add("lightbox__loader");

        this.lightBoxContent.innerHTML = "";
        this.lightBoxContent.appendChild(loader);
        this.$media =image;

        const title = document.createElement("h2");
        title.id ="picture-title";
        title.innerHTML= this._media._title;
        this.$mediaTitle = title;

        image.onload = ()=>{
            this.lightBoxContent.removeChild(loader);
            this.lightBoxContent.appendChild(image);
            this.lightBoxContent.appendChild(title);
        };


    }

    loadVideo(){
        const video = document.createElement("video");
        video.src = this._media._videoPath;
        video.autoplay =true;
        this.$media =video;

        const title = document.createElement("h2");
        title.id ="picture-title";
        title.innerHTML= this._media._title;
        this.$mediaTitle = title;

        this.lightBoxContent.innerHTML = "";
        this.lightBoxContent.appendChild(video);
        this.lightBoxContent.appendChild(title);

    }
    loadFactory (media) {
        this._media = media;
        // Definition du template de la lightbox
        if (this._media.type === "picture") {
            this.loadImage();
        } else if (this._media.type === "video") {
            this.loadVideo();
        } else {
            throw new Error(`Le média avec un type : ${this._media.type} est incompatible`);
        }
    }

}