// ./main.js
// MapLibre GL JSの読み込み
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import OpacityControl from 'maplibre-gl-opacity';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';

const map = new maplibregl.Map({
  container: 'map', // div要素のid
  zoom: 5, // 初期表示のズーム
  center: [138, 37], // 初期表示の中心
  minZoom: 5, // 最小ズーム
  mazZoom: 18, // 最大ズーム
  maxBounds: [122, 20, 154, 50], // 表示可能な範囲
  style: {
    version: 8,
    sources: {
      // 背景地図ソース
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        maxzoom: 19,
        tileSize: 256,
        attribution: 
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      // 重ねるハザードマップはここから
      hazard_flood: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png',
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSise: 256,
        attribution:
        '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_hightide: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png',
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution: 
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_tsunami: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png',
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution: 
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_doseki: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png',
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution: 
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_kyukeisha: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png',
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution: 
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_jisuberi: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png',
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution: 
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 重ねるハザードマップここまで
    },
    layers: [
      // 背景地図レイヤー
      {
        id: 'osm-layer',
        source: 'osm',
        type: 'raster',
      },
      // 重ねるハザードマップここから
      {
        id: 'hazard_flood_layer',
        source: 'hazard_flood',
        type: 'raster',
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }, // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示
      },
      {
        id: 'hazard_hightide_layer',
        source: 'hazard_hightide',
        type: 'raster',
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }, 
      },
      {
        id: 'hazard_tsunami_layer',
        source: 'hazard_tsunami',
        type: 'raster',
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }, 
      },
      {
        id: 'hazard_doseki_layer',
        source: 'hazard_doseki',
        type: 'raster',
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }, 
      },
      {
        id: 'hazard_kyukeisha_layer',
        source: 'hazard_kyukeisha',
        type: 'raster',
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }, 
      },
      {
        id: 'hazard_jisuberi_layer',
        source: 'hazard_jisuberi',
        type: 'raster',
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }, 
      },
      // 重ねるハザードマップここまで
    ],
  },
});

// マップ初期ロード完了時に発火するイベントを定義
map.on('load', () => {
  // 背景地図・重ねるタイル地図のコントロール
  const opacity = new OpacityControl({
    baseLayers: {
      'hazard_flood_layer': '洪水浸水想定区域', // layer-id: レイヤー名
      'hazard_hightide_layer': '高潮浸水想定区域',
      'hazard_tsunami_layer': '津波浸水想定区域',
      'hazard_doseki_layer': '土石流警戒区域',
      'hazard_kyukeisha_layer': '急傾斜警戒区域',
      'hazard_jisuberi_layer': '地滑り警戒区域',
    },
  });
  map.addControl(opacity, 'top-left'); // 第二引数で場所を指定
});