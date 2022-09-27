import {AObject, ASerializable, Color, Mat3, VertexArray2D} from "../../../index";
import {ANodeModel2D} from "../../../scene/ANodeModel";
import {AParticle} from "../../../math/particles/AParticle";

enum ParticleSystemEvents{
    PARTICLE_UPDATE="PARTICLE_UPDATE"
}

@ASerializable("BasicParticleSystem2DModel")
export abstract class BasicParticleSystem2DModel extends ANodeModel2D {
    protected _particles: AParticle[] = [];
    get particles(): AParticle[] {
        return this._particles;
    };

    static Events = ParticleSystemEvents;

    signalParticleUpdate() {
        this.signalEvent(BasicParticleSystem2DModel.Events.PARTICLE_UPDATE);
    }

    addUpdateListener(callback: (self: AObject) => void, handle?: string, synchronous: boolean = true) {
        return this.addEventListener(BasicParticleSystem2DModel.Events.PARTICLE_UPDATE, callback, handle);
    }

    abstract init(...args:any[]):void;
    // abstract getVertsForParticle(p: AParticle): VertexArray2D;
    getVertsForParticle(p: AParticle): VertexArray2D {
        return VertexArray2D.SquareXYUV(2);
    }

    abstract getTransformForParticle(p: AParticle): Mat3;
    abstract getColorForParticle(p:AParticle):Color;

}



