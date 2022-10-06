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

    lifespan = 1.25;
    width = 1.5;
    height = 0.75;
    nParticles = 100;
    radius = 1.25;
    speed = 7;
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
            this.particles.push(new Particle(i,s_time,V2(this.rand(this.width),this.rand(this.height)), 0, Color.FromRGBA(1,1,0)))
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
                if ((t - p.spawntime) / this.lifespan > p.life) {
                    //if the particle has recently been respawned
                    p.life += 1;
                    this.recenter(p);
                } else {
                    p.radius = this.radius - ((t-p.spawntime) % this.lifespan) / this.lifespan
                    p.position = (p.init_pos).plus(V2(Math.cos(((t-p.spawntime) % this.lifespan) + p.id), this.speed * ((t-p.spawntime) % this.lifespan)));
                    p.color = Color.FromRGBA(1,1-(((t-p.spawntime) % this.lifespan) / this.lifespan),0);
                }
            }
        }
        this.signalParticleUpdate();
    }
}

