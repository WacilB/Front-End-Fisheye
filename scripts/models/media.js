class Media{
    constructor(data, photographer) {
        this._id = data.id
        this._photographer = photographer
        this._date = new Date(data.date)
        this._likes = data.likes
        this._price = data.price
        this._title = data.title
        this._userLike = false
        this._template = null
    }

    //Getters

    get id () {
        return this._id
    }

    get date () {
        return this._date
    }

    get likes () {
        return this._likes
    }

    get userLike () {
        return this._userLike
    }

    get price () {
        return this._price
    }

    get title () {
        return this._title
    }

    get photographer () {
        return this._photographer
    }

    get template () {
        return this._template
    }

    set template (template) {
        this._template = template
    }


    set likes (value) {
        this._likes = value
        this._userLike = !this._userLike
    }
}

class Picture extends Media{
    constructor(data) {
        super(data);
        this._type = 'picture'
        this._image = data.image
        this._imageThumbPath = `assets/images/${data.photographerId}/${this._image}`
        this._imagePath = `assets/images/${data.photographerId}/${this._image}`
    }
    //getters

    get path () {
        return this._imagePath
    }

    get image () {
        return this._image
    }
    get thumbPath () {
        return this._imageThumbPath
    }
    get type () {
        return this._type
    }

}
class Video extends Media{
    constructor(data) {
        super(data);
        this._type = 'video'
        this._video = data.video
        this._videoThumbPath = `assets/images/${data.photographerId}/videoThumbnail/${this._video.split('.').slice(0, -1).join('.')}.jpg`
        this._videoPath = `assets/images/${data.photographerId}/${this._video}`
    }

    //Getters
    get thumbPath () {
        return this._videoThumbPath
    }
    get path () {
        return this._videoPath
    }

    get video () {
        return this._video
    }

    get type () {
        return this._type
    }
}