import React from 'react'
import SwatchWrapper from './SwatchWrapper';
import { DataItem } from '@/app/data';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


interface CanvasProps {
  activeData: DataItem;
  swatchData: DataItem[];
  handleSwatchClick: (item: DataItem) => void;
}

class Canvas extends React.Component<CanvasProps>{
 
  private container: HTMLElement | null = null;
  private sizes: { width: number; height: number } | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera | null = null;
  private manager: THREE.LoadingManager = new THREE.LoadingManager();

  constructor(props: CanvasProps){
    super(props)
  }

  componentDidMount(): void {
    this.InitialSetup();
  }

  InitialSetup=()=>{
    this.container = document.getElementById('container');
    const item = this.container?.getBoundingClientRect();

    if (item) {
      this.sizes = {
        width: item.width,
        height: item.height,
      };
    } else {
      console.error('Container element not found or its dimensions could not be determined.');
      return; 
    }

    this.canvas = document.querySelector('canvas.webgl')
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      10,
      5000
    );

    this.camera.position.set(150, 20, 100)
    this.scene.add(this.camera)

    this.manager = new THREE.LoadingManager()
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const ProgressVal = (itemsLoaded / itemsTotal) * 100;
      if (ProgressVal === 100) {
        console.log('loaded')
      }
    };
    
  }

  render(){
    const {activeData, swatchData, handleSwatchClick} = this.props;
    return(
      <div id="container" className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full ">
       
        <canvas className="webgl w-full h-full relative z-10"></canvas>
        
        <SwatchWrapper 
        activeData={activeData}
        swatchData={swatchData}
        handleSwatchClick={handleSwatchClick}
        />
      </div>
    )
  }
}

export default Canvas