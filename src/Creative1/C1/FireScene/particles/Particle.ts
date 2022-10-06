import {Basic2DParticle, Color, Vec2, Vec3} from "../../../../anigraph";

export class Particle extends Basic2DParticle{
    protected _color!:Color;
    protected _radius!:number;
    protected _alpha!:number;
    protected _init_pos!:Vec2;
    protected _life!:number;
    protected _spawntime!:number;
    protected _lifespan!:number;


    get color(){
        return this._color;
    }
    set color(v:Color){
        this._color = v;
    }

    set init_pos(ip:Vec2) {
        this._init_pos = ip;
    }

    get init_pos() {
        return this._init_pos;
    }

    get life() {
        return this._life;
    }

    set life(l:number) {
        this._life = l;
    }

    get spawntime() {
        return this._spawntime;
    }

    get lifespan() {
        return this._lifespan;
    }

    constructor(id:number,lsp:number, st:number, init_pos?:Vec2, radius?:number, color?:Color) {
        super();
        this._id = id;
        this._spawntime = st;
        this._life = 0;
        this._lifespan = lsp;
        if(init_pos){this.init_pos = init_pos; this.position = init_pos;}
        if(radius !== undefined){this.radius=radius;}
        if(color){this.color = color;}
    }
}
