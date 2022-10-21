export class Texture {
    constructor(material, finish) {
        this.material = material;
        this.finish = finish;
    }

    getColorAt = point => this.material.getColorAt(point);
}

export class Finish {
    static Default = new Finish();

    constructor(options = {}) {
        this.ambient = options.ambient ?? 0.1;
        this.diffuse = options.diffuse ?? 0.5;
        this.specular = options.specular ?? 0;
    }
}