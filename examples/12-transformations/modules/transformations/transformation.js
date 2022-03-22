import { Vector } from '../vector.js';

class Transformation {
    apply = vector => vector;
    ylppa = vector => vector;
}

class Rotate extends Transformation {

}

class Scale extends Transformation {
    constructor(x, y, z) {
        super();
        this.scale = new Vector(x, y, z);
    }
    apply = vector => vector.multiply(this.scale);
    ylppa = vector => vector.multiply(this.scale.invert());
}

class Translate extends Transformation {
    constructor(x, y, z) {
        super();
        this.translation = new Vector(x, y, z);
    }
    apply = vector => vector.add(this.translation);
    ylppa = vector => vector.add(this.translation.invert());

}

export { Transformation, Rotate, Scale, Translate };