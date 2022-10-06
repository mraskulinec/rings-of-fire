import {GetAppState} from "../../Creative1AppState";
import {CreativeSceneModelBase} from "../CreativeSceneModelBase";
import {Color, DefaultMaterials, Vec2} from "../../../anigraph";
import {ParticleSystem2DModel} from "./particles/ParticleSystem2DModel";
let appState = GetAppState();



export class FireSceneModel extends CreativeSceneModelBase {
    particleSystem!:ParticleSystem2DModel;
    async PreloadAssets() {
        await super.PreloadAssets();
        await this.materials.loadShaderModel(DefaultMaterials.RGBA_SHADER)
        this.initCamera();
    }

    initScene() {
        const self = this;
        /**
         * Add AppState controls here
         */
         appState.addColorControl(ParticleSystem2DModel.AppStateKeys.ParticleColor, new Color(1, 1, 0))
         this.subscribeToAppState(ParticleSystem2DModel.AppStateKeys.ParticleColor, (color:Color)=>{
             self.particleSystem.particleColor = color;
             self.particleSystem.signalParticleUpdate();
        })

        this.particleSystem = new ParticleSystem2DModel();
        this.particleSystem.init();
        this.addChild(this.particleSystem);
    }

    timeUpdate(t: number) {
        this.particleSystem.timeUpdate(t);
        // for(let c of this.children){
        //     c.timeUpdate(t);
        // }
    }
}
