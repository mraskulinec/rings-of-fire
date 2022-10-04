import {Layout} from "./style";
import {AThreeJSContextComponent, ControlPanel} from "../../anigraph";
import React, {useState} from "react";
import {EmptySceneController} from "./ExampleScenes/EmptyScene/EmptySceneController";
import {EmptySceneModel} from "./ExampleScenes/EmptyScene/EmptySceneModel";
import {GetAppState} from "../Creative1AppState";
import {CurveSceneController} from "./ExampleScenes/CurveScene/CurveSceneController";
import {CurveSceneModel} from "./ExampleScenes/CurveScene/CurveSceneModel";
import {ParticleSystem2DModel} from "./ExampleScenes/ParticleScene/particles";
import {CustomSceneModel} from "./ExampleScenes/PolygonTypeScene/CustomSceneModel";
import {CustomSceneController} from "./ExampleScenes/PolygonTypeScene/CustomSceneController";
import {ParticleSystemSceneModel} from "./ExampleScenes/ParticleScene/ParticleSystemSceneModel";
import {ParticleSystemSceneController} from "./ExampleScenes/ParticleScene/ParticleSystemSceneController";
import {FireSceneModel} from "./FireScene/FireSceneModel";
import {FireSceneController} from "./FireScene/FireSceneController";

let appState = GetAppState();



/**
 * This would be good starter code for a project like the pyramid example we provide. It even has some of the controls set up already.
 */
// const SceneModel = new CustomSceneModel();
// SceneModel.confirmInitialized();
// const SceneController = new CustomSceneController(SceneModel);

/**
 * This example is an empty scene. Room to fill with your hopes and dreams...
 */
// const SceneModel = new EmptySceneModel();
// SceneModel.confirmInitialized();
// const SceneController = new EmptySceneController(SceneModel);


/**
 * This would be a good project for procedural / animated curves
 */
// const SceneModel = new CurveSceneModel();
// SceneModel.confirmInitialized();
// const SceneController = new CurveSceneController(SceneModel);

/**
 * This is a starter particle system project. It shows you how to render and position particles.
 * You just have to write code to make them move in interesting ways.
 */
// const SceneModel = new ParticleSystemSceneModel();
// SceneModel.confirmInitialized();
// const SceneController = new ParticleSystemSceneController(SceneModel);

const FireModel = new FireSceneModel();
FireModel.confirmInitialized();
const SceneController = new FireSceneController(FireModel);



export function CreativeAppComponent() {
    return (
        <div>
            <ControlPanel appState={appState}></ControlPanel>
                <Layout>
                    <div className={"container-fluid"}>
                    <div className={"row"}>
                        <h1><a
                            href={"https://www.cs.cornell.edu/courses/cs4620/2022fa/assignments/docs/category/creative-1"}>Creative 01</a></h1>
                    </div>
                    <div className={"row"}>
                        <AThreeJSContextComponent
                            controller={SceneController}
                        />
                    </div>
                    </div>
                </Layout>

        </div>
    );
}
