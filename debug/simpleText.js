
export default class simpleText {

    constructor() {
        this.string = "";
        this.binded = false;
        this.element = null;
    }

    set innerText(text) {
        this.string = text;
    }

    get innerText() {
        return this.string;
    }

    get isBinded() {
        return this.binded;
    }

    get bind() {
        if(!this.element) {
            this.element = document.createElement("div");
        }
        this.element.innerText = this.string;
        document.body.appendChild(this.element);
        this.binded = true;
        return this.element;
    }

    get unbind() {
        document.body.removeChild(this.element);
        this.binded = false;
        return this.element;
    }

    get view() {
        this.bind;
        return this.element;
    }

    


}