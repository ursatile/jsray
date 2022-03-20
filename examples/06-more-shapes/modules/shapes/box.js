import { Shape } from '../shape.js';
import { THRESHOLD } from '../settings.js';
import { Vector } from '../vector.js';

const axes = ['x', 'y', 'z'];

export class Box extends Shape {

    constructor(corner1, corner2, color) {
        super(color);
        axes.forEach(a => {
            if (corner1[a] > corner2[a])
                [corner1[a], corner2[a]] = [corner2[a], corner1[a]];
        });
        this.v1 = corner1;
        this.v2 = corner2;
        this.vertices = [this.v1, this.v2];
    }

    contains = (point, axis) => this.v1[axis] < point[axis] && point[axis] < this.v2[axis];

    findIntersectionsOnAxis = (axis, ray) => {
        let [o1, o2] = axes.filter(a => a != axis);
        let intersections = new Array();
        if (ray.direction[axis] == 0) return [];
        this.vertices.forEach(vertex => {
            let intersect = (vertex[axis] - ray.start[axis]) / ray.direction[axis];
            let point = ray.start.add(ray.direction.scale(intersect));
            if (this.contains(point, o1) && this.contains(point, o2)) intersections.push(intersect);
        });
        return intersections;
    }

    findIntersections = (ray) => {
        return this.findIntersectionsOnAxis('x', ray)
            .concat(this.findIntersectionsOnAxis('y', ray))
            .concat(this.findIntersectionsOnAxis('z', ray));
    }

    getNormalAt = (pos) => {
        if (Math.abs(this.v1.x - pos.x) < THRESHOLD) return Vector.X.invert();
        if (Math.abs(this.v2.x - pos.x) < THRESHOLD) return Vector.X;
        if (Math.abs(this.v1.y - pos.y) < THRESHOLD) return Vector.Y.invert();
        if (Math.abs(this.v2.y - pos.y) < THRESHOLD) return Vector.Y;
        if (Math.abs(this.v1.z - pos.z) < THRESHOLD) return Vector.Z.invert();
        if (Math.abs(this.v2.z - pos.z) < THRESHOLD) return Vector.Z;
    }
    toString = () => `Box from ${this.v1.toString()} to ${this.v2.toString()}`;
}
