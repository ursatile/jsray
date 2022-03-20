export class ColorMap {
    constructor(map) {
        this.map = map;
        this.keys = Object.keys(map).map(parseFloat);
        this.keys.sort((a, b) => a - b);
    }

    getColorAtValue = (value) => {
        value = Math.abs(value) % 1;
        if (this.map[value]) return this.map[value];
        let lowerKey = this.keys.filter(k => k < value).pop();
        let upperKey = this.keys.filter(k => k > value).shift();
        let interval = upperKey - lowerKey;
        let position = value - lowerKey;
        let upperProportion = position / interval;
        let lowerProportion = 1 - upperProportion;
        let upperColor = this.map[upperKey];
        let lowerColor = this.map[lowerKey];
        return lowerColor.scale(lowerProportion).add(upperColor.scale(upperProportion));
    }
}

