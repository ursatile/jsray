import { Vector } from './vector.js';
import { Ray } from './ray.js';
import { THRESHOLD } from './settings.js';

export class Camera {
    constructor(location, look_at, width = 4, height = 3) {
        this.location = location;
        this.look_at = look_at;

        // If the camera is DIRECTLY above the look_at point, things go weird, so 
        // we nudge it backwards ever so slightly...
        if (this.location.x == this.look_at.x && this.location.x == this.look_at.z) {
            this.location = this.location.add(new Vector(0,0,-THRESHOLD));
        }

        // Calculate the direction - the vector pointing at the centre of the "frame"
        this.direction = this.look_at.add(this.location.invert()).normalize();

        //  then work out which way is "right" and "up" relative to the camera
        this.right = Vector.Y.cross(this.direction).normalize().scale(width / 2);
        this.up = this.right.cross(this.direction).invert().normalize().scale(height / 2);
    }

    trace(scene, x, y) {
        let vx = this.right.scale(x);
        let vy = this.up.scale(y).invert();
        let r = this.direction.add(vx).add(vy);
        let ray = new Ray(this.location, r);
        return ray.trace(scene);
    }
}
