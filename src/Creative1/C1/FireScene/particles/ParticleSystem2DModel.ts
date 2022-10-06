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
    ExampleParticleParam="ExampleParticleParam"
}

@ASerializable("ParticleSystem2DModel")
export class ParticleSystem2DModel extends BasicParticleSystem2DModel{
    static AppStateKeys = AppStateKeys;

    exampleParticleParam:number=1

    lifespan = 1;
    width = 1.5;
    height = 0.75;
    nParticles = 150;
    radius = 1.3;
    speed = 10;
    get particles(): Particle[] {
        return this._particles as Particle[];
    };

    getTransformForParticle(p: Particle): Mat3 {
        return Mat3.Translation2D(p.position).times(Mat3.Scale2D(p.radius));
    }

    //a random number in range [-range,range)
    rand(range:number): number {
        return (2*range)*Math.random()-range
    }

    init(): void {
        for(let i=0;i<this.nParticles;i++){
            let s_time = i*this.lifespan/this.nParticles //the spawntime of the particle
            let life = this.lifespan*(Math.random()/4+0.75)
            this.particles.push(new Particle(i,life,s_time,V2(this.rand(this.width),this.rand(this.height)), 0, Color.FromRGBA(1,1,0)))
        }
    }


    getColorForParticle(p: Particle): Color {
        return p.color;
    }

    //re-randomizes p's initial position
    recenter(p:Particle) {
        p.init_pos = V2(this.rand(this.width),this.rand(this.height));
        p.position = p.init_pos;
    }


    timeUpdate(t:number){
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
                    p.color = Color.FromRGBA(1,1-(((t-p.spawntime) % p.lifespan) / p.lifespan),0);
                }
            }
        }
        this.signalParticleUpdate();
    }
}

