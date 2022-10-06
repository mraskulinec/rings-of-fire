import {
    AParticle,
    ASerializable,
    BasicParticleSystem2DModel,
    Color,
    Mat3,
    V2,
    Vec2,
    VertexArray2D
} from "../../../../../anigraph";
import {Particle} from "./Particle";

enum AppStateKeys{
    ExampleParticleParam="ExampleParticleParam"
}

@ASerializable("ParticleSystem2DModel")
export class ParticleSystem2DModel extends BasicParticleSystem2DModel{
    static AppStateKeys = AppStateKeys;

    exampleParticleParam:number=1

    nParticles = 10;
    get particles(): Particle[] {
        return this._particles as Particle[];
    };

    getTransformForParticle(p: Particle): Mat3 {
        return Mat3.Translation2D(p.position).times(Mat3.Scale2D(p.radius));
    }

    init(): void {
        for(let i=0;i<this.nParticles;i++){
            this.particles.push(new Particle(i, Vec2.Random([-0.2,0.5]), 1, Color.Random()))
        }
    }


    getColorForParticle(p: Particle): Color {
        return p.color;
    }


    timeUpdate(t:number){
        for(let p of this.particles){
            p.position = V2(Math.cos(t+p.id), Math.sin(t+p.id)).times(this.exampleParticleParam);
        }
        this.signalParticleUpdate();
    }



}

