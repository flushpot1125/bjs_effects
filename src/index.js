import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { DebugLayer } from '@babylonjs/core/Debug/debugLayer';
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
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

//var config = {embedMode: true};
//var debugLayer = new DebugLayer();
//DebugLayer.show();

// This creates and positions a free camera (non-mesh)
var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

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

var systemJson = { "name": "particles", "id": "particles", "capacity": 2000, "emitterId": "foutain", "particleEmitterType": { "type": "BoxParticleEmitter", "direction1": [-7, 8, 3], "direction2": [7, 8, -3], "minEmitBox": [-1, 0, 0], "maxEmitBox": [1, 0, 0] }, "texture": { "tags": null, "url": "../Assets/textures/flare.png", "uOffset": 0, "vOffset": 0, "uScale": 1, "vScale": 1, "uAng": 0, "vAng": 0, "wAng": 0, "uRotationCenter": 0.5, "vRotationCenter": 0.5, "wRotationCenter": 0.5, "isBlocking": true, "uniqueId": 9, "name": "textures/flare.png", "hasAlpha": false, "getAlphaFromRGB": false, "level": 1, "coordinatesIndex": 0, "coordinatesMode": 0, "wrapU": 1, "wrapV": 1, "wrapR": 1, "anisotropicFilteringLevel": 4, "isCube": false, "is3D": false, "is2DArray": false, "gammaSpace": true, "invertZ": false, "lodLevelInAlpha": false, "lodGenerationOffset": 0, "lodGenerationScale": 0, "linearSpecularLOD": false, "isRenderTarget": false, "animations": [], "invertY": true, "samplingMode": 3 }, "isLocal": false, "animations": [], "beginAnimationOnStart": false, "beginAnimationFrom": 0, "beginAnimationTo": 60, "beginAnimationLoop": false, "startDelay": 0, "renderingGroupId": 0, "isBillboardBased": true, "billboardMode": 7, "minAngularSpeed": 0, "maxAngularSpeed": 3.141592653589793, "minSize": 0.1, "maxSize": 0.5, "minScaleX": 1, "maxScaleX": 1, "minScaleY": 1, "maxScaleY": 1, "minEmitPower": 1, "maxEmitPower": 3, "minLifeTime": 0.3, "maxLifeTime": 1.5, "emitRate": 1500, "gravity": [2, -9.81, 1], "noiseStrength": [10, 10, 10], "color1": [0.7, 0.8, 1, 1], "color2": [0.2, 0.5, 1, 1], "colorDead": [0, 0, 0.2, 0], "updateSpeed": 0.005, "targetStopDuration": 0, "blendMode": 0, "preWarmCycles": 0, "preWarmStepOffset": 1, "minInitialRotation": 0, "maxInitialRotation": 0, "startSpriteCellID": 0, "endSpriteCellID": 0, "spriteCellChangeSpeed": 1, "spriteCellWidth": 0, "spriteCellHeight": 0, "spriteRandomStartCell": false, "isAnimationSheetEnabled": false, "textureMask": [1, 1, 1, 1], "customShader": null, "preventAutoStart": false };
var birthdaySystem = ParticleSystem.Parse(systemJson, scene, "");
var particleSource = new AbstractMesh("particleSource", scene);
particleSource.position = new Vector3(0, 0, 0);
birthdaySystem.emitter = particleSource;
birthdaySystem.start();  //birthdaySystem.stop()にすればとまる。

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});