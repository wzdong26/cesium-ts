import * as Cesium from 'cesium';
import CesiumNavigation from 'cesium-navigation-es6';

import geoLocation from './utils/geoLocation';

import './css/main.css';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZmI4MmEzZC0yOGM5LTRhMTQtOGQ1ZC0yMDcwNjhkNTc1ZmMiLCJpZCI6OTM0MzYsImlhdCI6MTY1MjMyMzMyMX0.DH5InTrTDF1DyipwMTn2oAU1hzbH6lfz2s_2TnZTDXQ';

const viewer = new Cesium.Viewer('cesiumContainer', {
  animation: false,
  baseLayerPicker: false,
  // fullscreenButton: false,
  // vrButton: true,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  // sceneModePicker: false,
  // selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
  scene3DOnly: true,
  // shouldAnimate: true,
  terrainProvider: Cesium.createWorldTerrain(),
  // imageryProvider:new Cesium.ArcGisMapServerImageryProvider({
  //     url : 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
  // }),
  // imageryProvider : Cesium.createWorldImagery({
  //     style : Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
  // }),
});

// const imageryLayers = viewer.scene.imageryLayers;
// const blackMarble = imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3812 }));

viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;

// viewer.scene.screenSpaceCameraController.minimumZoomDistance = 5e1;
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 5e6;
viewer.scene.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(122.39, 29.995, 1000),
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
    roll: 0,
  },
});

const compassController = new CesiumNavigation(viewer, {
  defaultResetView: Cesium.Rectangle.fromDegrees(80.0, 22.0, 130.0, 50.0),
});

const buildingTileset = viewer.scene.primitives.add(
  Cesium.createOsmBuildings()
);

// viewer.camera.flyTo({
//     destination: Cesium.Cartesian3.fromDegrees(122.39, 29.995, 10000),
//     orientation: {
//         heading: Cesium.Math.toRadians(0.0),
//         pitch: Cesium.Math.toRadians(-90.0),
//         roll: 0,
//     }
// });
// const url = 'public/models/CesiumMan/Cesium_Man.glb'
const logoUrl = 'public/img/location.svg';
let userModelEntities, userLocalIconEntities;
geoLocation
  .then(({ coords: { longitude, latitude } }) => {
    // userModelEntities = viewer.entities.add({
    //     name: url,
    //     position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
    //     model: {
    //         uri: url,
    //         scale: 30,
    //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //     },
    // })
    userLocalIconEntities = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 20),
      billboard: {
        image: logoUrl,
        pixelOffset: new Cesium.Cartesian2(0, -100),
        translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e6, 0),
      },
    });
    // const pinBuilder = new Cesium.PinBuilder();
    // pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
    // pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48)
    // viewer.trackedEntity = userModelEntities  // 追踪
    // viewer.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 1000),
    //     orientation: {
    //         heading: Cesium.Math.toRadians(0.0),
    //         pitch: Cesium.Math.toRadians(-30.0),
    //         roll: 0,
    //     }
    // });
  })
  .catch((err) => {
    console.error(err);
  });
