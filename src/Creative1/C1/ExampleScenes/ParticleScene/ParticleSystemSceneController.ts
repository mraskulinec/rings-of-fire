import {
    AClickInteraction,
    ADragInteraction,
    AGLContext,
    AInteractionEvent,
    AKeyboardInteraction, ANodeModel,
    Basic2DSceneController, BezierTween, Mat3, V2, Vec2,
} from "../../../../anigraph";
import {CreativeSceneControllerBase} from "../../CreativeSceneControllerBase";
import {GetAppState} from "../../../Creative1AppState";
import {ParticleSystemSceneModel} from "./ParticleSystemSceneModel";
import {ParticleSystem2DView} from "./particles/ParticleSystem2DView";
import {ParticleSystem2DModel} from "./particles/ParticleSystem2DModel";

let appState = GetAppState();



export class ParticleSystemSceneController extends CreativeSceneControllerBase {
    get model(): ParticleSystemSceneModel {
        return this._model as ParticleSystemSceneModel;
    }

    async initScene(): Promise<void> {
        super.initScene();
        const self = this;
    }

    initModelViewSpecs(): void {
        this.addModelViewSpec(ParticleSystem2DModel, ParticleSystem2DView);
    }

}
