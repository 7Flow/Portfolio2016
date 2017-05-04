
import Vector2 from '../utils/Vector2.js';

class Transform2D {

    matrix = new Array(6);

    constructor()
    {

    }

    scale( v2 )
    {
        this.matrix[0]  = v2.x;
        this.matrix[3]  = v2.y;
    }

    translate( v2 )
    {
        this.matrix[4]  = v2.x;
        this.matrix[5]  = v2.y;
    }

    rotate( euler )
    {
        var mathCosX = Math.cos( euler.x * (Math.PI / 180) );
        var mathSinX = Math.sin( euler.x * (Math.PI / 180) );
        var mathCosY = Math.cos( euler.y * (Math.PI / 180) );
        var mathSinY = Math.sin( euler.y * (Math.PI / 180) );

        this.matrix[1]  = mathSinY;
        this.matrix[2]  = mathSinX;
    }
}

export default Transform2D;
