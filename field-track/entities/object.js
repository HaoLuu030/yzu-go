import Entity from "./entity";

export default class Object extends Entity {
    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height);
        this.img = img;
    }
    update() {
        this.update();
    }
}