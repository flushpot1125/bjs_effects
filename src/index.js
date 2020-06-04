import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { DebugLayer } from '@babylonjs/core/Debug/debugLayer';
import { Vector3 } from "@babylonjs/core/Maths/math";
import { Vector2} from "@babylonjs/core/Maths/math";

import {Color3} from "@babylonjs/core/Maths/math.color";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { WaterMaterial} from "@babylonjs/materials/water/waterMaterial";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
import { ParticleSystem } from "@babylonjs/core/Particles";

import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

scene.debugLayer.show();

//これを入れたが特に変化なし
/*
var environment = scene.createDefaultEnvironment({
    skyboxSize: 300
});
environment.setMainColor(new Color3(0.05, 0.05, 0.05));
*/

//var config = {embedMode: true};
//var debugLayer = new DebugLayer();
//DebugLayer.show();

// This creates and positions a free camera (non-mesh)
//var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
// This targets the camera to scene origin
//camera.setTarget(Vector3.Zero());
var camera = new ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new Vector3(
    0, 0, 0), scene);
camera.radius=1.0;

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Create a grid material
var material = new GridMaterial("grid", scene);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 2;

// Affect a material
sphere.material = material;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

// Affect a material
ground.material = material;
//ground.material = water;

//works (without gradient pattern1)
//var lineParticle ={"name":"CPU particle system","id":"default system","capacity":10000,"emitter":[0,0,0],"particleEmitterType":{"type":"BoxParticleEmitter","direction1":[-3,8,3],"direction2":[3,8,-3],"minEmitBox":[-0.3,0,0],"maxEmitBox":[0.3,0,0]},"texture":{"tags":null,"url":"https://www.babylonjs.com/assets/Flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"isBlocking":true,"uniqueId":11,"name":"https://www.babylonjs.com/assets/Flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":3.14,"minSize":0.1,"maxSize":0.5,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":0.5,"maxEmitPower":0.75,"minLifeTime":0.1,"maxLifeTime":3.5,"emitRate":30,"gravity":[0,-9,0],"noiseStrength":[10,10,10],"color1":[1,1,1,1],"color2":[1,1,1,1],"colorDead":[1,1,1,0],"updateSpeed":0.005,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};

//works (without gradient pattern2)
//var lineParticle={"name":"CPU particle system","id":"default system","capacity":10000,"emitter":[0,0,0],"particleEmitterType":{"type":"PointParticleEmitter","direction1":[0,1,0],"direction2":[0,1,0]},"texture":{"tags":null,"url":"https://www.babylonjs.com/assets/Flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"isBlocking":true,"uniqueId":14,"name":"https://www.babylonjs.com/assets/Flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":0.1,"maxSize":0.1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":5,"maxEmitPower":5,"minLifeTime":0.99,"maxLifeTime":1,"emitRate":30,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[1,1,1,1],"color2":[1,1,1,1],"colorDead":[1,1,1,0],"updateSpeed":0.016666666666666666,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};

//not works
var lineParticle={"name":"CPU particle system","id":"default system","capacity":10000,"emitter":[0,0,0],"particleEmitterType":{"type":"PointParticleEmitter","direction1":[0,1,0],"direction2":[0,1,0]},"texture":{"tags":null,"url":"https://www.babylonjs.com/assets/Flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"isBlocking":true,"uniqueId":14,"name":"https://www.babylonjs.com/assets/Flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":0.1,"maxSize":0.1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":5,"maxEmitPower":5,"minLifeTime":0.99,"maxLifeTime":1,"emitRate":30,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[1,1,1,1],"color2":[1,1,1,1],"colorDead":[1,1,1,0],"updateSpeed":0.016666666666666666,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"sizeGradients":[{"gradient":0,"factor1":0.1,"factor2":0},{"gradient":1,"factor1":0.6,"factor2":0.7}],"lifeTimeGradients":[{"gradient":0,"factor1":0.6,"factor2":0.6},{"gradient":1,"factor1":0.7,"factor2":0.7}],"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};

var lineParticleySystem = ParticleSystem.Parse(lineParticle,scene,"",true);
var lineParticleSource = new AbstractMesh("particleSource", scene);
lineParticleSource.position = new Vector3(0,0,0);

lineParticleySystem.beginAnimationOnStart=false;
lineParticleySystem.beginAnimationLoop =false;
lineParticleySystem.targetStopDuration=0;
//lineParticleySystem.addLifeTimeGradient(0,0.1);
//lineParticleySystem.addLifeTimeGradient(1,0.6);

lineParticleySystem.emitter = lineParticleSource;
lineParticleySystem.start();

lineParticleySystem.onAnimationEnd= function(){
    console.log("line particle ended!");
}


//shiny rain ( works : no gradient effect)
//var systemJson = { "name": "particles", "id": "particles", "capacity": 2000, "emitterId": "foutain", "particleEmitterType": { "type": "BoxParticleEmitter", "direction1": [-7, 8, 3], "direction2": [7, 8, -3], "minEmitBox": [-1, 0, 0], "maxEmitBox": [1, 0, 0] }, "texture": { "tags": null, "url": "../Assets/textures/flare.png", "uOffset": 0, "vOffset": 0, "uScale": 1, "vScale": 1, "uAng": 0, "vAng": 0, "wAng": 0, "uRotationCenter": 0.5, "vRotationCenter": 0.5, "wRotationCenter": 0.5, "isBlocking": true, "uniqueId": 9, "name": "textures/flare.png", "hasAlpha": false, "getAlphaFromRGB": false, "level": 1, "coordinatesIndex": 0, "coordinatesMode": 0, "wrapU": 1, "wrapV": 1, "wrapR": 1, "anisotropicFilteringLevel": 4, "isCube": false, "is3D": false, "is2DArray": false, "gammaSpace": true, "invertZ": false, "lodLevelInAlpha": false, "lodGenerationOffset": 0, "lodGenerationScale": 0, "linearSpecularLOD": false, "isRenderTarget": false, "animations": [], "invertY": true, "samplingMode": 3 }, "isLocal": false, "animations": [], "beginAnimationOnStart": false, "beginAnimationFrom": 0, "beginAnimationTo": 60, "beginAnimationLoop": false, "startDelay": 0, "renderingGroupId": 0, "isBillboardBased": true, "billboardMode": 7, "minAngularSpeed": 0, "maxAngularSpeed": 3.141592653589793, "minSize": 0.1, "maxSize": 0.5, "minScaleX": 1, "maxScaleX": 1, "minScaleY": 1, "maxScaleY": 1, "minEmitPower": 1, "maxEmitPower": 3, "minLifeTime": 0.3, "maxLifeTime": 1.5, "emitRate": 1500, "gravity": [2, -9.81, 1], "noiseStrength": [10, 10, 10], "color1": [0.7, 0.8, 1, 1], "color2": [0.2, 0.5, 1, 1], "colorDead": [0, 0, 0.2, 0], "updateSpeed": 0.005, "targetStopDuration": 0, "blendMode": 0, "preWarmCycles": 0, "preWarmStepOffset": 1, "minInitialRotation": 0, "maxInitialRotation": 0, "startSpriteCellID": 0, "endSpriteCellID": 0, "spriteCellChangeSpeed": 1, "spriteCellWidth": 0, "spriteCellHeight": 0, "spriteRandomStartCell": false, "isAnimationSheetEnabled": false, "textureMask": [1, 1, 1, 1], "customShader": null, "preventAutoStart": false };
//shiny rain effect
/*
var systemJson ={"name":"CPU particle system","id":"default system","capacity":10000,"emitterId":"foutain","particleEmitterType":{"type":"BoxParticleEmitter","direction1":[0,1,0],"direction2":[0,1,0],"minEmitBox":[-0.5,-0.5,-0.5],"maxEmitBox":[0.5,0.5,0.5]},"texture":{"tags":null,"url":"data:octet/stream;base64,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","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"isBlocking":true,"uniqueId":6,"name":"https://www.babylonjs.com/assets/Flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":1,"maxSize":1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":0,"maxEmitPower":0,"minLifeTime":0,"maxLifeTime":1,"emitRate":500,"gravity":[0,-9.8,0],"noiseStrength":[10,10,10],"color1":[0.30196078431372547,0.9137254901960784,0.615686274509804,1],"color2":[0.8196078431372549,0.5411764705882353,0.5411764705882353,1],"colorDead":[1,1,1,0],"updateSpeed":0.016666666666666666,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"velocityGradients":[],"emitRateGradients":[],"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};
var birthdaySystem = ParticleSystem.Parse(systemJson, scene, "",false);
var particleSource = new AbstractMesh("particleSource", scene);
particleSource.position = new Vector3(0, 0, 0);
birthdaySystem.emitter = particleSource;
//birthdaySystem.start();  //birthdaySystem.stop()にすればとまる。
*/
// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});