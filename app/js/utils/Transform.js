
import Vector3 from '../utils/Vector3.js';
import Vector2 from '../utils/Vector2.js';

class Transform
{
    position = new Vector3(0,0,0);
    scale = new Vector3(1,1,1);
    rotation = new Vector3(0,0,0);
    depth = new Vector2(0,0);

    prevision = 2;

    matrix3d = new Array(16);

    prefix = ["", "-webkit-", "-moz-", "-ms-"];

    toRad = Math.PI / 180;

    scale( v3 )
    {
        this.scale = v3;
    }

    /**
     * Add the vector to the position
     * @param {Vector3} v3
     */
    translate( v3 )
    {
        this.position = v3;
    }

    /**
     * Add the vector to the rotation
     * @param {Vector3} v3
     */
    rotate( v3 )
    {
        this.rotation = v3;
    }

    update()
    {
        var mathCosX = Math.cos( this.rotation.x * this.toRad );
        var mathSinX = Math.sin( this.rotation.x * this.toRad );
        var mathCosY = Math.cos( this.rotation.y * this.toRad );
        var mathSinY = Math.sin( this.rotation.y * this.toRad );
        var mathCosZ = Math.cos( this.rotation.z * this.toRad );
        var mathSinZ = Math.sin( this.rotation.z * this.toRad );

        //optim
        /*
        mathCosX = mathCosX.toFixed( this.precision );
        mathSinX = mathSinX.toFixed( this.precision );
        mathCosY = mathCosY.toFixed( this.precision );
        mathSinY = mathSinY.toFixed( this.precision );
        mathCosZ = mathCosZ.toFixed( this.precision );
        mathSinZ = mathSinZ.toFixed( this.precision );
        */
        this.matrix3d[0]  = mathCosY * mathCosZ * this.scale.x;
        this.matrix3d[1]  = (-1)*mathSinZ;
        this.matrix3d[2]  = mathSinY;
        this.matrix3d[3]  = this.depth.y;
        this.matrix3d[4]  = mathSinZ;
        this.matrix3d[5]  = mathCosX * mathCosZ * this.scale.y;
        this.matrix3d[6]  = mathSinX;
        this.matrix3d[7]  = this.depth.x;
        this.matrix3d[8]  = (-1) * mathSinY;
        this.matrix3d[9]  = (-1) * mathSinX;
        this.matrix3d[10] = mathCosY * mathCosX;
        this.matrix3d[11] = 0;
        this.matrix3d[12] = this.position.x;
        this.matrix3d[13] = this.position.y;
        this.matrix3d[14] = this.position.z;
        this.matrix3d[15] = 1;
    }

    /**
     * use of matrix3d will break child preserve-3d
     * better separate component
     */
    getMatrix()
    {
        this.update();
        var css = '';
        for (var i=0 ; i<this.prefix.length; ++i) {
            css += this.prefix[i]+"transform: matrix3d("+this.matrix3d[0]+","+this.matrix3d[1]+","+this.matrix3d[2]+","+this.matrix3d[3]+","+this.matrix3d[4]+","+this.matrix3d[5]+","+this.matrix3d[6]+","+this.matrix3d[7]+","+this.matrix3d[8]+","+this.matrix3d[9]+","+this.matrix3d[10]+","+this.matrix3d[11]+","+this.matrix3d[12]+","+this.matrix3d[13]+","+this.matrix3d[14]+","+this.matrix3d[15]+");&#13;";
        }
        return css;
    }
    getCss()
    {
        this.update();

        var css = 'rotateX('+this.rotation.x+'deg) rotateY('+(-this.rotation.y)+'deg) rotateZ('+this.rotation.z+'deg)';
        css += ' translate3d('+this.position.x+'px, '+this.position.y+'px, '+this.position.z+'px)';

        return css;
    }

    reset()
    {
        this.position.x = this.position.y = this.position.z = 0;
        this.scale.x = this.scale.y = this.scale.z = 1;
        this.rotation.x = this.rotation.y = this.rotation.z = 0;
        this.depth.x = this.depth.y = 0;
    }
}

export default Transform;