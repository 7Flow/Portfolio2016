
class Vector3
{
    x = 0;
    y = 0;
    z = 0;

    constructor( _x, _y, _z )
    {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    normalize()
    {
        var _s = 1 / this.length();
        this.x *= _s;
        this.y *= _s;
        this.z *= _s;

        return this;
    }

    length()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

    dot( v )
    {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    forward( t )
    {
        var x = this.x, y = this.y, z = this.z;
        var e = t.matrix3d;

        this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
        this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
        this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

        return this.normalize();
    }
}

export default Vector3;