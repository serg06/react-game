import {Vector2} from 'three';
import {angleBetween, signedAngleTo, vec2vec3} from '../utils/three';
import {clamp} from 'lodash-es';

function max_ball_dist(thickness: number): number {
    return thickness / 10;
}

export class Player {
    looking: Vector2;
    dir: Vector2;
    points: number;
    balls: Vector2[];

    constructor() {
        this.looking = new Vector2(1, 0);
        this.dir = new Vector2(1, 0);
        this.points = 1;
        this.balls = Array(10).fill(new Vector2(0, 0));
    }

    pos(): Vector2 {
        return this.balls[0];
    }

    next_pos(delta: number): Vector2 {
        return this.pos().clone().add(this.dir.clone().multiplyScalar(delta * 200));
    }

    thickness() {
        return Math.log10(this.points);
    }

    next_dir(delta: number): Vector2 {
        // Allow turning 360 deg / 2pi radians per delta

        // The total radians between there
        const rad = angleBetween(this.dir, this.looking);
        signedAngleTo(vec2vec3(this.dir), vec2vec3(this.looking));

        // The maximum we can rotate
        const max_rad = 2 * Math.PI * delta;

        // Clamp it to that max rotation
        let rot = clamp(rad, -max_rad, max_rad);
        console.log(Math.floor(rad));

        // Get new direction
        let newdir = this.dir.clone().rotateAround(new Vector2(0, 0), rot);

        // Normalize it!
        return newdir.normalize();
    }

    update(delta: number) {
        // Update dir
        this.dir = this.next_dir(delta);

        // Update head
        this.balls[0] = this.next_pos(delta);
        let max_dist = max_ball_dist(this.thickness());

        for (let i = 1; i < this.balls.length; i++) {
            const [first, second] = this.balls.slice(i - 1, i + 1);
            const dist = first.distanceTo(second);
            if (dist > max_dist) {
                const dir = first.clone().sub(second).clampLength(0, max_dist - dist);
                second.add(dir);
            }
        }
    }
}
