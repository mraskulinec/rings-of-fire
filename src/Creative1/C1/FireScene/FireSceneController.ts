import {
    AClickInteraction,
    ADragInteraction,
    AGLContext,
    AInteractionEvent,
    AKeyboardInteraction, ANodeModel,
    Basic2DSceneController, BezierTween, Mat3, V2, Vec2,
} from "../../../anigraph";
import {CreativeSceneControllerBase} from "../CreativeSceneControllerBase";
import {GetAppState} from "../../Creative1AppState";
import {FireSceneModel} from "./FireSceneModel";
import {ParticleSystem2DView} from "./particles/ParticleSystem2DView";
import {ParticleSystem2DModel} from "./particles/ParticleSystem2DModel";

let appState = GetAppState();



export class FireSceneController extends CreativeSceneControllerBase {
    get model(): FireSceneModel {
        return this._model as FireSceneModel;
    }

    async initScene(): Promise<void> {
        super.initScene();
        const self = this;
    }

    initModelViewSpecs(): void {
        this.addModelViewSpec(ParticleSystem2DModel, ParticleSystem2DView);
    }

    // onClick(event: AInteractionEvent): void {
    //     let cursorWorldCoordinates:Vec2 = this.model.get2DWorldCoordinatesForCursorEvent(event);
    //     this.model.click(cursorWorldCoordinates);
    // }

    dragStartCallback(event: AInteractionEvent, interaction?: ADragInteraction) {
        let cursorWorldCoordinates:Vec2 = this.model.get2DWorldCoordinatesForCursorEvent(event);
        this.model.click(cursorWorldCoordinates);
    }
    dragEndCallback(event: AInteractionEvent, interaction?: ADragInteraction) {
        let cursorWorldCoordinates:Vec2 = this.model.get2DWorldCoordinatesForCursorEvent(event);
        this.model.click(cursorWorldCoordinates);
    }
    dragMoveCallback(event: AInteractionEvent, interaction?: ADragInteraction) {
        let cursorWorldCoordinates:Vec2 = this.model.get2DWorldCoordinatesForCursorEvent(event);
        this.model.click(cursorWorldCoordinates);
    }
}
