
import Vector2 from '../utils/Vector2.jsx';

class Particle {

    alive = true;
    mass = 0;
    radius = 1;

    x = 0;
    y = 0;

    speed  = new Vector2(0,0);
    limit = 24;

    gradient = null;

    /**
     * New physic particle.
     * @param {float} m Mass
     * @param {int} r Radius
     * @param x
     * @param y
     * @param {String} c A color, rgba format.
     * @constructor
     */
    constructor( m, r, x, y, c )
    {
        this.mass = m;
        this.radius = r;
        this.color = c;
        // don't call position -> overrided by ParticleTrail
        this.x = x;
        this.y = y;
    }

    position( x, y )
    {
        this.x = x;
        this.y = y;
    }

    move()
    {
        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    applyGravity( p, duration )
    {
        // custom G constant
        var G = 10;
        var _contact = false;

        var dx = p.x - this.x;
        var dy = p.y - this.y;
        // square distance from black hole
        var d = dx * dx + dy * dy;

        if (d < p.radius * p.radius) {
            this.alive = false;
            _contact = true;
        }

        // minus other radius: maximum gravity will be on other surface (prevent infinite gravity force when near center)
        d = Math.max( p.radius, d );
        // gravity
        var f = G * ((this.mass * p.mass) / d) * duration;

        // force (direction)
        var _dir = new Vector2(dx, dy).normalize().scale( f );

        this.speed.add( _dir ).limit( this.limit );

        return _contact;
    }

    randomImpulse( min, max, center )
    {
        // inital angle from center
        var _a = Math.atan( this.y - center.y, this.x - center.x );
        // add random -90° + 90°
        _a = _a + (Math.random() * Math.PI) - (Math.PI * 0.5);
        var _factor = min + Math.random() * (max-min);
        this.speed.x = Math.cos(_a) * _factor;
        this.speed.y = Math.sin(_a) * _factor;
        this.alive = true;
    }

    render( ctx )
    {
        if (!this.gradient) {
            this.gradient = ctx.createRadialGradient(this.x,this.y,7, this.x,this.y,this.radius*2);
            this.gradient.addColorStop(0, this.color);
            this.gradient.addColorStop(1, 'rgba(153,0,153,0)');
        }

        ctx.arc(this.x, this.y, this.radius*2, 0, 2 * Math.PI);
        ctx.fillStyle = this.gradient;
        ctx.fill();
    }
}

export default Particle;