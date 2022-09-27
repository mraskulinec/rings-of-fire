import {Basic2DParticle, Color, Vec2, Vec3} from "../../../../../anigraph";

export class Particle extends Basic2DParticle{
    protected _color!:Color;
    protected _radius!:number;
    protected _alpha!:number;

    get color(){
        return this._color;
    }
    set color(v:Color){
        this._color = v;
    }

    constructor(id:number, position?:Vec2, radius?:number, color?:Color) {
        super();
        this._id = id;
        if(position){this.position = position;}
        if(radius !== undefined){this.radius=radius;}
        if(color){this.color = color;}
    }
}
