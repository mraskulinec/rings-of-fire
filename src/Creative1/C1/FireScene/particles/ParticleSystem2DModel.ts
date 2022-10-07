import {
    AParticle,
    ASerializable,
    BasicParticleSystem2DModel,
    Color,
    Mat3,
    V2,
    Vec2,
    VertexArray2D,
} from "../../../../anigraph";
import {Particle} from "./Particle";

enum AppStateKeys{
    ParticleColor="ParticleColor",
    ParticleRadius="ParticleRadius",
}

@ASerializable("ParticleSystem2DModel")
export class ParticleSystem2DModel extends BasicParticleSystem2DModel{
    static AppStateKeys = AppStateKeys;

    particleColor:Color;
    nParticles:number;
    lifespan:number;
    width:number;
    height:number; 
    radius:number;
    speed:number;
    origin:Vec2;

    constructor() {
        super();
        this.lifespan = 1.1; 
        this.particleColor = Color.FromRGBA(1, 1, 0);
        this.width = 1.5;
        this.height = 0.75;
        this.nParticles = 150;
        this.radius = 1.4;
        this.speed = 10;
        this.origin = V2(0,0);
    }

    get particles(): Particle[] {
        return this._particles as Particle[];
    };

    getTransformForParticle(p: Particle): Mat3 {
        return Mat3.Translation2D(p.position).times(Mat3.Scale2D(p.radius));
    }

    //changes the origin to v
    moveOrigin(v:Vec2) {
        this.origin = v;
    }

    //a random number in range [-range,range)
    rand(range:number): number {
        return (2*range)*Math.random()-range
    }

    //the randomized starting position of a particle, weighted by lifespan
    getRandomizedPosition(lifespan:number): Vec2 {
        if (Math.abs(this.lifespan-lifespan)/(0.4) < 0.2) {
            let x_pos = this.rand(this.width/5)
            return V2(x_pos+this.origin.x,this.rand(this.height)+this.origin.y)
        }
        return V2(this.rand(this.width)+this.origin.x,this.rand(this.height)+this.origin.y);
    }

    init(): void {
        for(let i=0;i<this.nParticles;i++){
            let s_time = i*this.lifespan/this.nParticles //the spawntime of the particle
            let life = this.lifespan*(2*Math.random()/5+0.6)
            this.particles.push(new Particle(i,life,s_time,V2(this.rand(this.width),this.rand(this.height)), 0, this.particleColor))
        }
    }

    signalParticleUpdate() {
        super.signalParticleUpdate();
        let color = this.particleColor;
        for (let i = 0; i < this.nParticles; i++) {
            let p = this.particles[i];
            p.color = this.particleColor;
        }
    }

    getColorForParticle(p: Particle): Color {
        return p.color;
    }

    //re-randomizes p's initial position
    recenter(p:Particle) {
        p.init_pos = this.getRandomizedPosition(p.lifespan);
        //if the lifespan is closer to the actual value then give it a value closer to the center
        p.position = p.init_pos;
    }


    timeUpdate(t:number){
        let color = this.particleColor;
        for(let p of this.particles){
            if (t>p.spawntime && p.life==0) {
                //if the particle is not visible yet, give it a life
                p.life+=1;
            }
            if (p.life > 0) { //if the particle is visible
                if ((t - p.spawntime) / p.lifespan >= p.life) {
                    //if the particle has recently been respawned
                    p.life += 1;
                    this.recenter(p);
                } else {
                    //linearly decrease radius depending on lifespan
                    p.radius = this.radius - this.radius*((t-p.spawntime) % p.lifespan) / p.lifespan
                    if (p.radius <= 0.15) {
                        p.radius = 0;
                    }
                    p.position = (p.init_pos).plus(V2(Math.cos(((t-p.spawntime) % p.lifespan) + p.id), this.speed * ((t-p.spawntime) % p.lifespan)));
                    //linearly move from RGB(1,1,0) to RGB(1,0,0)

                    if (color.b == 0) {
                        p.color = Color.FromRGBA(color.r ,color.g - (((t-p.spawntime) % p.lifespan) / p.lifespan), color.b);
                    } else if (color.r == 0) {
                        p.color = Color.FromRGBA(color.r , color.g, color.b - (((t-p.spawntime) % p.lifespan) / p.lifespan));
                    } else if (color.g == 0) {
                        p.color = Color.FromRGBA(color.r - (((t-p.spawntime) % p.lifespan) / p.lifespan), color.g, color.b);
                    } else {
                        p.color = Color.FromRGBA(color.r - (((t-p.spawntime) % p.lifespan) / p.lifespan), color.g, color.b);
                    }
                }
            }
        }
        this.signalParticleUpdate();
    }
}

