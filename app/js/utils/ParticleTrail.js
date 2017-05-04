
import Vector2 from '../utils/Vector2.js';
import Particle from '../utils/Particle.js';

class ParticleTrail extends Particle {

    last = new Vector2(0,0);
    last2 = new Vector2(0,0);

    gradient2 = null;

    /**
     * Need a constructor definition to create all member's class (object properties)
     */
    constructor( m, r, x, y, c ) {
        super( m, r, x, y, c );
        this.position( x, y );
    }

    position( x, y )
    {
        this.x = this.last.x = this.last2.x = x;
        this.y = this.last.y = this.last2.y = y;
    }

    move()
    {
        this.last2.x = this.last.x;
        this.last2.y = this.last.y;

        this.last.x = this.x;
        this.last.y = this.y;

        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    render( ctx )
    {
        if (!this.gradient) {
            this.gradient = ctx.createLinearGradient(0, 0, 5, 0);
            this.gradient.addColorStop(0, this.color);
            this.gradient.addColorStop(1, 'rgba(255,255,255,0.5)');

            this.gradient2 = ctx.createLinearGradient(0, 0, 10, 0);
            this.gradient2.addColorStop(0, 'rgba(255,255,255,0.5)');
            this.gradient2.addColorStop(1, 'rgba(255,255,255,0)');
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = this.radius * 2;
        ctx.strokeStyle = this.gradient;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.last.x, this.last.y);
        ctx.stroke();

        ctx.lineWidth = this.radius;
        ctx.strokeStyle = this.gradient2;
        ctx.lineTo(this.last2.x, this.last2.y);
        ctx.stroke();
    }
}

export default ParticleTrail;