
class Vector2 {
    x = 0;
    y = 0;

    constructor( _x, _y )
    {
        this.x = _x;
        this.y = _y;
    }

    normalize()
    {
        var _s = 1 / this.length();
        this.x *= _s;
        this.y *= _s;

        return this;
    }

    length()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }

    scale( f )
    {
        this.x *= f;
        this.y *= f;

        return this;
    }

    add( v )
    {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    limit( value )
    {
        var _l = this.length();
        if (_l > value) {
            var _s = 1 / _l;
            this.x *= _s * value;
            this.y *= _s * value;
            this.normalize().scale( value );
        }
    }
}

export default Vector2;