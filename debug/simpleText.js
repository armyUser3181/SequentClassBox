export default class simpleText {
    /** @type {string} */
    string = "";
    binded = false;
    /** @type {HTMLElement|null} */
    element = null;

    set innerText(text) {
        this.string = text;
    }

    set textContent( text ) {
        this.element.textContent = text;
    }
    get textContent() {
        this.element.textContent = text;
    }

    /**
     * @param { ClientRect } point
     */
    set setPoint( point ) {
        this.bindNextSetting = ()=>{
            for( const key in point ) {
                this.element.style[key] = point[key];
            }
            this.element.style.position = 'absolute';
        }
    }

    get innerText() {
        return this.string;
    }

    get isBinded() {
        return this.binded;
    }

    get bind() {
        if (!this.element) this.element = document.createElement("p");
        this.element.innerText = this.string;
        document.body.appendChild(this.element);
        this.bindNextSetting && this.bindNextSetting();
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
