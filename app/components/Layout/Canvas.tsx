// import React from "react";
// import SwatchWrapper from "./SwatchWrapper";
// import { DataItem } from "@/app/data";
// import gsap from "gsap";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// interface CanvasProps {
//   activeData: DataItem;
//   swatchData: DataItem[];
//   handleSwatchClick: (item: DataItem) => void;
//   handleLoading: () => void;
//   condition: boolean;
// }

// class Canvas extends React.Component<CanvasProps> {
//   private container: HTMLElement | null = null;
//   private sizes: { width: number; height: number } | null = null;
//   private canvas: HTMLCanvasElement | null = null;
//   private scene: THREE.Scene = new THREE.Scene();
//   private camera: THREE.PerspectiveCamera | null = null;
//   private manager: THREE.LoadingManager = new THREE.LoadingManager();
//   private controls: OrbitControls | null = null;
//   private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({});

//   constructor(props: CanvasProps) {
//     super(props);
//   }

//   componentDidMount(): void {
//     this.InitialSetup();
//   }

//   componentDidUpdate(prevProps: CanvasProps, prevState: any) {
//     const { activeData } = this.props;
//     if (prevProps.activeData !== activeData) {
//       this.applyMaterial(activeData);
//     }
//   }

//   InitialSetup = () => {
//     const { handleLoading } = this.props;
//     this.container = document.getElementById("container");
//     const item = this.container?.getBoundingClientRect();

//     if (item) {
//       this.sizes = {
//         width: item.width,
//         height: item.height,
//       };
//     } else {
//       console.error(
//         "Container element not found or its dimensions could not be determined."
//       );
//       return;
//     }

//     this.canvas = document.querySelector("canvas.webgl");
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       45,
//       this.sizes.width / this.sizes.height,
//       10,
//       5000
//     );

//     this.camera.position.set(150, 20, 100);
//     this.scene.add(this.camera);

//     this.manager = new THREE.LoadingManager();
//     this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
//       const ProgressVal = (itemsLoaded / itemsTotal) * 100;
//       if (ProgressVal === 100) {
//         handleLoading()
//       }
//     };

//     if (this.canvas) {
//       this.controls = new OrbitControls(this.camera, this.canvas);
//       this.controls.touches = {
//         ONE: THREE.TOUCH.ROTATE,
//         TWO: THREE.TOUCH.DOLLY_PAN,
//       };
//       this.controls.enableDamping = true;
//       // this.controls.autoRotate = true;
//       this.controls.autoRotateSpeed = 2;
//       this.controls.enablePan = false;
//       this.controls.enableZoom = false;
//       this.controls.maxPolarAngle = Math.PI / 1.9;
//       // this.controls.minPolarAngle = Math.PI / 2;  -- prevent user to go the top view

//       this.renderer = new THREE.WebGLRenderer({
//         canvas: this.canvas,
//         antialias: true,
//         alpha: true,
//       });

//       this.renderer.setSize(this.sizes.width, this.sizes.height);
//       this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
//       this.renderer.toneMappingExposure = 1;
//       // this.renderer.outputEncoding = THREE.sRGBEncoding;  -- not working
//       // this.renderer.shadowMap.enabled = true;

//       const render = () => {
//         if (!this.controls || !this.camera) return;
//         this.controls.update();
//         this.renderer.render(this.scene, this.camera);
//         window.requestAnimationFrame(render);
//       };
//       render();

//       this.loadHDR();
//       this.addModel();
//       window.addEventListener("resize", this.resize);
//     } else {
//       console.error("Canvas element not found.");
//     }
//   };

//   resize = () => {
//     if (this.container && this.sizes) {
//       this.sizes.width = this.container.offsetWidth;
//       this.sizes.height = this.container.offsetHeight;
//       if (this.renderer) {
//         this.renderer.setSize(this.sizes.width, this.sizes.height);
//       }
//       if (this.camera) {
//         this.camera.aspect = this.sizes.width / this.sizes.height;
//         this.camera.updateProjectionMatrix();
//       }
//     }
//   };

//   loadHDR = () => {
//     new RGBELoader(this.manager)
//       .setDataType(THREE.HalfFloatType)
//       .load("default.hdr", (texture) => {
//         texture.minFilter = THREE.LinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         texture.needsUpdate = true;
//         this.scene.environment = texture;
//         texture.dispose();
//       });
//   };

//   addModel = () => {
//     const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
//     const DRACO_LOADER = new DRACOLoader(this.manager).setDecoderPath(
//       `${THREE_PATH}/examples/js/libs/draco/gltf/`
//     );

//     const bag = "bag.glb";
//     const GLtfLoader = new GLTFLoader(this.manager).setDRACOLoader(
//       DRACO_LOADER
//     );

//     GLtfLoader.load(bag, (gltf) => {
//       gltf.scene.position.set(0, -30, 0);
//       this.scene.add(gltf.scene);
//     });
//   };


//   applyMaterial = (data: DataItem) => {
//     this.scene.traverse((element: THREE.Object3D) => {
//       if ((element as THREE.Mesh).isMesh) {
//         const mesh = element as THREE.Mesh;
//         const material = mesh.material as THREE.Material | THREE.Material[];
  
//         if (Array.isArray(material)) {
//           material.forEach(mat => this.updateMaterial(mat, data, mesh));
//         } else {
//           this.updateMaterial(material, data, mesh);
//         }
//       }
//     });
//     gsap.to('.highlight', {
//       backgroundColor: data.buttonColor.background,
//       ease: 'power3.inOut',
//       duration: 0.8,
//     });
//   };
  
//   updateMaterial = (material: THREE.Material, data: DataItem, mesh: THREE.Mesh) => {
//     if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial) {
//       Object.entries(data.itemList).forEach(([name, item]) => {
//         if (name === mesh.name) {
//           const color = new THREE.Color(item.color).convertSRGBToLinear();
//           gsap.to(material.color, {
//             r: color.r,
//             g: color.g,
//             b: color.b,
//             ease: "power3.inOut",
//             duration: 0.8,
//           });
//           material.needsUpdate = true;
//         }
//       });
//     }
//   };
  

//   render() {
//     const { activeData, swatchData, handleSwatchClick, condition } = this.props;
//     return (
//       <div
//         id="container"
//         className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full "
//       >
//         <canvas className="webgl w-full h-full relative z-10"></canvas>

//         <SwatchWrapper
//           activeData={activeData}
//           swatchData={swatchData}
//           handleSwatchClick={handleSwatchClick}
//           condition={condition}
//         />
//         <div className="highlight w-2/5 h-1/2 bg-[#D7B172] absolute inset-x-40 top-0 -z-10 rounded-br-full rounded-bl-full md:inset-x-60  lg:inset-x-40"></div>
//       </div>
//     );
//   }
// }

// export default Canvas;

import React, { useEffect, useRef } from "react";
import SwatchWrapper from "./SwatchWrapper";
import { DataItem } from "@/app/data";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

interface CanvasProps {
  activeData: DataItem;
  swatchData: DataItem[];
  handleSwatchClick: (item: DataItem) => void;
  handleLoading: () => void;
  condition: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  activeData,
  swatchData,
  handleSwatchClick,
  handleLoading,
  condition,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sizes = useRef<{ width: number; height: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const managerRef = useRef(new THREE.LoadingManager());
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      InitialSetup();
    }
  }, []);

  useEffect(() => {
    applyMaterial(activeData);
  }, [activeData]);

  const InitialSetup = () => {
    const container = containerRef.current;
    const item = container?.getBoundingClientRect();

    if (item) {
      sizes.current = {
        width: item.width,
        height: item.height,
      };
    } else {
      console.error(
        "Container element not found or its dimensions could not be determined."
      );
      return;
    }

    canvasRef.current = document.querySelector("canvas.webgl");
    const scene = sceneRef.current;
    cameraRef.current = new THREE.PerspectiveCamera(
      45,
      sizes.current.width / sizes.current.height,
      10,
      5000
    );

    // cameraRef.current.position.set(150, 20, 100);
    cameraRef.current.position.set(0, 50, 200);

    scene.add(cameraRef.current);

    managerRef.current.onProgress = (url, itemsLoaded, itemsTotal) => {
      const ProgressVal = (itemsLoaded / itemsTotal) * 100;
      if (ProgressVal === 100) {
        handleLoading();
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      controlsRef.current = new OrbitControls(cameraRef.current, canvas);
      controlsRef.current.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      controlsRef.current.enableDamping = true;
      controlsRef.current.autoRotateSpeed = 2;
      controlsRef.current.enablePan = false;
      controlsRef.current.enableZoom = false;
      controlsRef.current.maxPolarAngle = Math.PI / 1.9;

      rendererRef.current = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });

      rendererRef.current.setSize(sizes.current.width, sizes.current.height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
      rendererRef.current.toneMappingExposure = 1;

      const render = () => {
        if (!controlsRef.current || !cameraRef.current || !rendererRef.current) return;
        controlsRef.current.update();
        rendererRef.current.render(scene, cameraRef.current);
        window.requestAnimationFrame(render);
      };
      render();

      loadHDR();
      addModel();
      window.addEventListener("resize", resize);
    } else {
      console.error("Canvas element not found.");
    }
  };

  const resize = () => {
    const container = containerRef.current;
    const sizesCurrent = sizes.current;

    if (container && sizesCurrent) {
      sizesCurrent.width = container.offsetWidth;
      sizesCurrent.height = container.offsetHeight;
      if (rendererRef.current) {
        rendererRef.current.setSize(sizesCurrent.width, sizesCurrent.height);
      }
      if (cameraRef.current) {
        cameraRef.current.aspect = sizesCurrent.width / sizesCurrent.height;
        cameraRef.current.updateProjectionMatrix();
      }
    }
  };

  const loadHDR = () => {
    new RGBELoader(managerRef.current)
      .setDataType(THREE.HalfFloatType)
      .load("default.hdr", (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.needsUpdate = true;
        sceneRef.current.environment = texture;
        texture.dispose();
      });
  };

  const addModel = () => {
    const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
    const DRACO_LOADER = new DRACOLoader(managerRef.current).setDecoderPath(
      `${THREE_PATH}/examples/js/libs/draco/gltf/`
    );

    const bag = "bag.glb";
    // const bag = "test.glb";
    const GLtfLoader = new GLTFLoader(managerRef.current).setDRACOLoader(
      DRACO_LOADER
    );

    GLtfLoader.load(bag, (gltf) => {
      gltf.scene.position.set(0, -30, 0);
      sceneRef.current.add(gltf.scene);
    });
  };

  const applyMaterial = (data: DataItem) => {
    sceneRef.current.traverse((element: THREE.Object3D) => {
      if ((element as THREE.Mesh).isMesh) {
        const mesh = element as THREE.Mesh;
        const material = mesh.material as THREE.Material | THREE.Material[];

        if (Array.isArray(material)) {
          material.forEach((mat) => updateMaterial(mat, data, mesh));
        } else {
          updateMaterial(material, data, mesh);
        }
      }
    });
    gsap.to(".highlight", {
      backgroundColor: data.buttonColor.background,
      ease: "power3.inOut",
      duration: 0.8,
    });
  };

  const updateMaterial = (
    material: THREE.Material,
    data: DataItem,
    mesh: THREE.Mesh
  ) => {
    if (
      material instanceof THREE.MeshStandardMaterial ||
      material instanceof THREE.MeshBasicMaterial
    ) {
      Object.entries(data.itemList).forEach(([name, item]) => {
        if (name === mesh.name) {
          const color = new THREE.Color(item.color).convertSRGBToLinear();
          gsap.to(material.color, {
            r: color.r,
            g: color.g,
            b: color.b,
            ease: "power3.inOut",
            duration: 0.8,
          });
          material.needsUpdate = true;
        }
      });
    }
  };

  return (
    <div
      id="container"
      ref={containerRef}
      className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full "
    >
      <canvas className="webgl w-full h-full relative z-10"></canvas>

      <SwatchWrapper
        activeData={activeData}
        swatchData={swatchData}
        handleSwatchClick={handleSwatchClick}
        condition={condition}
      />
      <div className="highlight w-2/5 h-1/2 bg-[#D7B172] absolute inset-x-40 top-0 -z-10 rounded-br-full rounded-bl-full md:inset-x-60  lg:inset-x-40"></div>
    </div>
  );
};

export default Canvas;
