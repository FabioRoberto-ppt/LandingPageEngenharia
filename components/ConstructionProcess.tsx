"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function ConstructionProcess() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const stagesRef = useRef({});

  // Scroll tracking
  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 25, 60);

    const camera = new THREE.PerspectiveCamera(
      40,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(14, 10, 18);
    camera.lookAt(0, 3.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    mainLight.position.set(12, 18, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, 0.4);
    fillLight.position.set(-10, 8, -8);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
    backLight.position.set(0, 10, -15);
    scene.add(backLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.85,
      metalness: 0.15,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper (subtle)
    const gridHelper = new THREE.GridHelper(50, 50, 0x2a2a2a, 0x1f1f1f);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Materials
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      roughness: 0.9,
      metalness: 0.1,
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8f8f8,
      roughness: 0.65,
      metalness: 0.05,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccee,
      metalness: 0,
      roughness: 0.05,
      transmission: 0.95,
      transparent: true,
      thickness: 0.5,
    });

    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x252525,
      roughness: 0.5,
      metalness: 0.4,
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x7a5c42,
      roughness: 0.85,
      metalness: 0.05,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.4,
      metalness: 0.6,
    });

    // === STAGE 1: FOUNDATION ===
    const foundation = new THREE.Group();
    foundation.name = "foundation";
    
    const foundationBase = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.8, 7),
      concreteMaterial
    );
    foundationBase.position.y = 0.4;
    foundationBase.castShadow = true;
    foundationBase.receiveShadow = true;
    foundation.add(foundationBase);

    const driveway = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.15, 5),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.9 })
    );
    driveway.position.set(-5, 0.075, 0);
    driveway.receiveShadow = true;
    foundation.add(driveway);

    // Foundation edges
    for (let i = 0; i < 4; i++) {
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, i % 2 === 0 ? 10 : 7),
        new THREE.MeshStandardMaterial({ color: 0x3d3d3d })
      );
      const angle = (i * Math.PI) / 2;
      const radius = i % 2 === 0 ? 3.5 : 5;
      edge.position.set(
        Math.sin(angle) * radius,
        0.15,
        Math.cos(angle) * radius
      );
      edge.rotation.y = angle;
      foundation.add(edge);
    }

    // Landscape elements - trees
    const createTree = (x, z, height = 2.5) => {
      const group = new THREE.Group();
      
      // Trunk
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.2, height, 8),
        new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.9 })
      );
      trunk.position.set(x, height / 2, z);
      trunk.castShadow = true;
      group.add(trunk);

      // Foliage
      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x2d5016, roughness: 0.8 })
      );
      foliage.position.set(x, height + 0.6, z);
      foliage.scale.set(1, 1.3, 1);
      foliage.castShadow = true;
      group.add(foliage);

      return group;
    };

    foundation.add(createTree(-7.5, 2, 3));
    foundation.add(createTree(-7.5, -2, 2.8));
    foundation.add(createTree(7.5, 2, 2.6));
    foundation.add(createTree(7.5, -2, 3.2));

    // Garden beds
    const gardenBedMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a1a,
      roughness: 0.95,
    });

    const gardenBed1 = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.2, 1.5),
      gardenBedMaterial
    );
    gardenBed1.position.set(-6.5, 0.1, 0);
    gardenBed1.receiveShadow = true;
    foundation.add(gardenBed1);

    const gardenBed2 = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.2, 1.5),
      gardenBedMaterial
    );
    gardenBed2.position.set(6.5, 0.1, 0);
    gardenBed2.receiveShadow = true;
    foundation.add(gardenBed2);

    // Bushes/shrubs
    const createBush = (x, z, size = 0.4) => {
      const bush = new THREE.Mesh(
        new THREE.SphereGeometry(size, 8, 6),
        new THREE.MeshStandardMaterial({ color: 0x1a4d0a, roughness: 0.9 })
      );
      bush.position.set(x, size * 0.7, z);
      bush.scale.set(1, 0.8, 1);
      bush.castShadow = true;
      return bush;
    };

    foundation.add(createBush(-6.5, 0.5, 0.35));
    foundation.add(createBush(-6.5, -0.5, 0.4));
    foundation.add(createBush(6.5, 0.5, 0.38));
    foundation.add(createBush(6.5, -0.5, 0.35));

    // Stepping stones
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a5a5a,
      roughness: 0.85,
    });

    const stonePositions = [
      [-3.5, 0.05, 2.5],
      [-2.8, 0.05, 2.5],
      [-2.1, 0.05, 2.5],
    ];

    stonePositions.forEach((pos) => {
      const stone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8),
        stoneMaterial
      );
      stone.position.set(...pos);
      stone.receiveShadow = true;
      foundation.add(stone);
    });

    foundation.visible = false;
    scene.add(foundation);
    stagesRef.current.foundation = foundation;

    // === STAGE 2: GROUND FLOOR WALLS ===
    const groundFloor = new THREE.Group();
    groundFloor.name = "groundFloor";

    // Front wall
    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.5, 0.25),
      wallMaterial
    );
    frontWall.position.set(0, 2.55, 3.5);
    frontWall.castShadow = true;
    frontWall.receiveShadow = true;
    groundFloor.add(frontWall);

    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.5, 0.25),
      wallMaterial
    );
    backWall.position.set(0, 2.55, -3.5);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    groundFloor.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.5, 7),
      wallMaterial
    );
    leftWall.position.set(-5, 2.55, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    groundFloor.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.5, 7),
      wallMaterial
    );
    rightWall.position.set(5, 2.55, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    groundFloor.add(rightWall);

    // Door
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 2.4, 0.12),
      woodMaterial
    );
    door.position.set(-1.2, 2, 3.58);
    door.castShadow = true;
    groundFloor.add(door);

    // Door handle
    const doorHandle = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.05 })
    );
    doorHandle.position.set(-0.7, 2, 3.64);
    doorHandle.castShadow = true;
    groundFloor.add(doorHandle);

    // Door panels
    const panelGeo = new THREE.BoxGeometry(0.5, 0.75, 0.05);
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 2; x++) {
        const panel = new THREE.Mesh(
          panelGeo,
          new THREE.MeshStandardMaterial({ color: 0x6d5a45, roughness: 0.9 })
        );
        panel.position.set(-1.2 + (x - 0.5) * 0.55, 1.25 + y * 0.85, 3.64);
        groundFloor.add(panel);
      }
    }

    // Door number sign
    const numberPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.15, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 })
    );
    numberPlate.position.set(-1.2, 3.1, 3.64);
    groundFloor.add(numberPlate);

    // Mailbox
    const mailboxPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.5, metalness: 0.5 })
    );
    mailboxPost.position.set(-3.8, 0.6, 4.2);
    mailboxPost.castShadow = true;
    groundFloor.add(mailboxPost);

    const mailboxBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.25, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.6 })
    );
    mailboxBody.position.set(-3.8, 1.3, 4.2);
    mailboxBody.castShadow = true;
    groundFloor.add(mailboxBody);

    const mailboxFlag = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.05, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.5 })
    );
    mailboxFlag.position.set(-3.6, 1.35, 4.2);
    groundFloor.add(mailboxFlag);

    // Welcome mat
    const mat = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.02, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.95 })
    );
    mat.position.set(-1.2, 0.81, 3.9);
    mat.receiveShadow = true;
    groundFloor.add(mat);

    // Doorbell
    const doorbell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16),
      new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.7 })
    );
    doorbell.rotation.z = Math.PI / 2;
    doorbell.position.set(-0.6, 2.3, 3.64);
    groundFloor.add(doorbell);

    // House numbers on front
    const createNumber = (x, y) => {
      const num = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.2, 0.02),
        new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.9 })
      );
      num.position.set(x, y, 3.62);
      return num;
    };

    groundFloor.add(createNumber(3.5, 3.3));
    groundFloor.add(createNumber(3.7, 3.3));
    groundFloor.add(createNumber(3.9, 3.3));

    groundFloor.visible = false;
    scene.add(groundFloor);
    stagesRef.current.groundFloor = groundFloor;

    // === STAGE 3: SECOND FLOOR + WINDOWS ===
    const secondFloor = new THREE.Group();
    secondFloor.name = "secondFloor";

    // Floor slab between floors
    const midSlab = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.35, 7),
      concreteMaterial
    );
    midSlab.position.y = 4.375;
    midSlab.castShadow = true;
    midSlab.receiveShadow = true;
    secondFloor.add(midSlab);

    // Front wall second floor
    const frontWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.2, 0.25),
      wallMaterial
    );
    frontWall2.position.set(0, 6.15, 3.5);
    frontWall2.castShadow = true;
    frontWall2.receiveShadow = true;
    secondFloor.add(frontWall2);

    // Back wall second floor
    const backWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.2, 0.25),
      wallMaterial
    );
    backWall2.position.set(0, 6.15, -3.5);
    backWall2.castShadow = true;
    backWall2.receiveShadow = true;
    secondFloor.add(backWall2);

    // Left wall second floor
    const leftWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.2, 7),
      wallMaterial
    );
    leftWall2.position.set(-5, 6.15, 0);
    leftWall2.castShadow = true;
    leftWall2.receiveShadow = true;
    secondFloor.add(leftWall2);

    // Right wall second floor
    const rightWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.2, 7),
      wallMaterial
    );
    rightWall2.position.set(5, 6.15, 0);
    rightWall2.castShadow = true;
    rightWall2.receiveShadow = true;
    secondFloor.add(rightWall2);

    // === WINDOWS ===
    
    // Large window - ground floor right
    const createWindow = (width, height, x, y, z, hasFrame = true) => {
      const group = new THREE.Group();
      
      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 0.08),
        glassMaterial
      );
      glass.position.set(x, y, z);
      group.add(glass);

      if (hasFrame) {
        const frameThickness = 0.08;
        
        // Horizontal frames
        for (let i = 0; i < 2; i++) {
          const hFrame = new THREE.Mesh(
            new THREE.BoxGeometry(width + frameThickness, frameThickness, 0.1),
            frameMaterial
          );
          hFrame.position.set(x, y + (i === 0 ? -height/2 : height/2), z);
          group.add(hFrame);
        }
        
        // Vertical frames
        for (let i = 0; i < 2; i++) {
          const vFrame = new THREE.Mesh(
            new THREE.BoxGeometry(frameThickness, height + frameThickness, 0.1),
            frameMaterial
          );
          vFrame.position.set(x + (i === 0 ? -width/2 : width/2), y, z);
          group.add(vFrame);
        }

        // Center divider
        const centerFrame = new THREE.Mesh(
          new THREE.BoxGeometry(frameThickness, height, 0.1),
          frameMaterial
        );
        centerFrame.position.set(x, y, z);
        group.add(centerFrame);
      }
      
      return group;
    };

    // Ground floor window - main (direita da porta)
    const window1 = createWindow(2.6, 1.8, 1.5, 2.4, 3.58);
    secondFloor.add(window1);

    // Ground floor window - left side (esquerda)
    const window1b = createWindow(1.4, 1.4, -3.2, 2.2, 3.58);
    secondFloor.add(window1b);

    // Second floor large window - center
    const window2 = createWindow(3, 2, 1, 6.15, 3.58);
    secondFloor.add(window2);

    // Second floor window - left
    const window3 = createWindow(2, 1.7, -2.6, 6.15, 3.58);
    secondFloor.add(window3);

    // Second floor window - far right
    const window4 = createWindow(1.3, 1.7, 3.5, 6.15, 3.58);
    secondFloor.add(window4);

    // Side window on right wall - main
    const sideWindow = new THREE.Group();
    const sideGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.6, 2),
      glassMaterial
    );
    sideGlass.position.set(5.08, 6.15, 0.5);
    sideWindow.add(sideGlass);

    const sideFrame1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.68, 0.08),
      frameMaterial
    );
    sideFrame1.position.set(5.08, 6.15, 0.5 - 1);
    sideWindow.add(sideFrame1);

    const sideFrame2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.68, 0.08),
      frameMaterial
    );
    sideFrame2.position.set(5.08, 6.15, 0.5 + 1);
    sideWindow.add(sideFrame2);

    const sideFrameTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 2.08),
      frameMaterial
    );
    sideFrameTop.position.set(5.08, 6.15 + 0.8, 0.5);
    sideWindow.add(sideFrameTop);

    const sideFrameBottom = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 2.08),
      frameMaterial
    );
    sideFrameBottom.position.set(5.08, 6.15 - 0.8, 0.5);
    sideWindow.add(sideFrameBottom);

    secondFloor.add(sideWindow);

    // Side window on left wall
    const leftSideWindow = new THREE.Group();
    const leftSideGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.4, 1.6),
      glassMaterial
    );
    leftSideGlass.position.set(-5.08, 6.15, -1);
    leftSideWindow.add(leftSideGlass);

    const leftSideFrame1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.48, 0.08),
      frameMaterial
    );
    leftSideFrame1.position.set(-5.08, 6.15, -1 - 0.8);
    leftSideWindow.add(leftSideFrame1);

    const leftSideFrame2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.48, 0.08),
      frameMaterial
    );
    leftSideFrame2.position.set(-5.08, 6.15, -1 + 0.8);
    leftSideWindow.add(leftSideFrame2);

    const leftSideFrameTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 1.68),
      frameMaterial
    );
    leftSideFrameTop.position.set(-5.08, 6.15 + 0.7, -1);
    leftSideWindow.add(leftSideFrameTop);

    const leftSideFrameBottom = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 1.68),
      frameMaterial
    );
    leftSideFrameBottom.position.set(-5.08, 6.15 - 0.7, -1);
    leftSideWindow.add(leftSideFrameBottom);

    secondFloor.add(leftSideWindow);

    // Back wall small window - ground floor
    const backWindow1 = new THREE.Group();
    const backGlass1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1, 0.08),
      glassMaterial
    );
    backGlass1.position.set(1.5, 2.6, -3.58);
    backWindow1.add(backGlass1);

    const backFrame1Top = new THREE.Mesh(
      new THREE.BoxGeometry(1.28, 0.08, 0.12),
      frameMaterial
    );
    backFrame1Top.position.set(1.5, 3.1, -3.58);
    backWindow1.add(backFrame1Top);

    const backFrame1Bottom = new THREE.Mesh(
      new THREE.BoxGeometry(1.28, 0.08, 0.12),
      frameMaterial
    );
    backFrame1Bottom.position.set(1.5, 2.1, -3.58);
    backWindow1.add(backFrame1Bottom);

    const backFrame1Left = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.08, 0.12),
      frameMaterial
    );
    backFrame1Left.position.set(1.5 - 0.6, 2.6, -3.58);
    backWindow1.add(backFrame1Left);

    const backFrame1Right = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.08, 0.12),
      frameMaterial
    );
    backFrame1Right.position.set(1.5 + 0.6, 2.6, -3.58);
    backWindow1.add(backFrame1Right);

    secondFloor.add(backWindow1);

    // Back wall window - second floor
    const backWindow2 = new THREE.Group();
    const backGlass2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.5, 0.08),
      glassMaterial
    );
    backGlass2.position.set(-1.5, 6.15, -3.58);
    backWindow2.add(backGlass2);

    const backFrame2Top = new THREE.Mesh(
      new THREE.BoxGeometry(1.88, 0.08, 0.12),
      frameMaterial
    );
    backFrame2Top.position.set(-1.5, 6.9, -3.58);
    backWindow2.add(backFrame2Top);

    const backFrame2Bottom = new THREE.Mesh(
      new THREE.BoxGeometry(1.88, 0.08, 0.12),
      frameMaterial
    );
    backFrame2Bottom.position.set(-1.5, 5.4, -3.58);
    backWindow2.add(backFrame2Bottom);

    const backFrame2Left = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.58, 0.12),
      frameMaterial
    );
    backFrame2Left.position.set(-1.5 - 0.9, 6.15, -3.58);
    backWindow2.add(backFrame2Left);

    const backFrame2Right = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.58, 0.12),
      frameMaterial
    );
    backFrame2Right.position.set(-1.5 + 0.9, 6.15, -3.58);
    backWindow2.add(backFrame2Right);

    // Center divider
    const backFrame2Center = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 1.5, 0.12),
      frameMaterial
    );
    backFrame2Center.position.set(-1.5, 6.15, -3.58);
    backWindow2.add(backFrame2Center);

    secondFloor.add(backWindow2);

    // === ARCHITECTURAL DETAILS ===
    
    // Balcony on second floor
    const balcony = new THREE.Group();
    
    const balconyFloor = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.15, 1.2),
      concreteMaterial
    );
    balconyFloor.position.set(0.5, 4.65, 4.1);
    balconyFloor.castShadow = true;
    balcony.add(balconyFloor);

    // Balcony railing
    const railingMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.3,
      metalness: 0.7,
    });

    // Top rail
    const topRail = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.08, 0.08),
      railingMaterial
    );
    topRail.position.set(0.5, 5.6, 4.7);
    balcony.add(topRail);

    // Bottom rail
    const bottomRail = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.06, 0.06),
      railingMaterial
    );
    bottomRail.position.set(0.5, 4.8, 4.7);
    balcony.add(bottomRail);

    // Vertical posts
    for (let i = 0; i < 7; i++) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.8, 0.06),
        railingMaterial
      );
      post.position.set(-1 + i * 0.5, 5.2, 4.7);
      balcony.add(post);
    }

    secondFloor.add(balcony);

    // Decorative columns/pillars
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e8e8,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Front left pillar
    const pillar1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 7.5, 0.3),
      pillarMaterial
    );
    pillar1.position.set(-4.3, 4.35, 3.3);
    pillar1.castShadow = true;
    secondFloor.add(pillar1);

    // Front right pillar
    const pillar2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 7.5, 0.3),
      pillarMaterial
    );
    pillar2.position.set(4.3, 4.35, 3.3);
    pillar2.castShadow = true;
    secondFloor.add(pillar2);

    // Pillar caps (decorative top)
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.8,
    });

    const cap1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.15, 0.4),
      capMaterial
    );
    cap1.position.set(-4.3, 7.95, 3.3);
    cap1.castShadow = true;
    secondFloor.add(cap1);

    const cap2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.15, 0.4),
      capMaterial
    );
    cap2.position.set(4.3, 7.95, 3.3);
    cap2.castShadow = true;
    secondFloor.add(cap2);

    // Window shutters (decorative)
    const shutterMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.7,
      metalness: 0.2,
    });

    const createShutter = (x, y, z) => {
      const shutter = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 0.05),
        shutterMaterial
      );
      shutter.position.set(x, y, z);
      shutter.castShadow = true;
      return shutter;
    };

    // Shutters for main ground floor window
    secondFloor.add(createShutter(0.1, 2.4, 3.62));
    secondFloor.add(createShutter(2.9, 2.4, 3.62));

    // Planters on balcony
    const planterMaterial = new THREE.MeshStandardMaterial({
      color: 0x654321,
      roughness: 0.8,
    });

    const plantMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5016,
      roughness: 0.9,
    });

    const createPlanter = (x, z) => {
      const group = new THREE.Group();
      
      const pot = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.3, 0.4),
        planterMaterial
      );
      pot.position.set(x, 4.85, z);
      pot.castShadow = true;
      group.add(pot);

      // Plant
      const plant = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 8, 8),
        plantMaterial
      );
      plant.position.set(x, 5.1, z);
      plant.scale.set(1, 1.3, 1);
      group.add(plant);

      return group;
    };

    secondFloor.add(createPlanter(-0.8, 4.3));
    secondFloor.add(createPlanter(1.8, 4.3));

    // Wall texture detail strips
    const stripMaterial = new THREE.MeshStandardMaterial({
      color: 0xd0d0d0,
      roughness: 0.5,
      metalness: 0.2,
    });

    const strip1 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.08, 0.05),
      stripMaterial
    );
    strip1.position.set(0, 3.6, 3.52);
    secondFloor.add(strip1);

    const strip2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.08, 0.05),
      stripMaterial
    );
    strip2.position.set(0, 4.55, 3.52);
    secondFloor.add(strip2);

    secondFloor.visible = false;
    scene.add(secondFloor);
    stagesRef.current.secondFloor = secondFloor;

    // === STAGE 4: ROOF ===
    const roof = new THREE.Group();
    roof.name = "roof";

    const roofSlab = new THREE.Mesh(
      new THREE.BoxGeometry(11, 0.5, 8),
      roofMaterial
    );
    roofSlab.position.y = 7.95;
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roof.add(roofSlab);

    // Roof edge detail
    const roofEdge = new THREE.Mesh(
      new THREE.BoxGeometry(11.3, 0.25, 8.3),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.5 })
    );
    roofEdge.position.y = 7.7;
    roofEdge.castShadow = true;
    roof.add(roofEdge);

    // Parapet walls
    const parapetHeight = 0.4;
    const parapetMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.6 });
    
    const parapets = [
      new THREE.BoxGeometry(11, parapetHeight, 0.15),
      new THREE.BoxGeometry(11, parapetHeight, 0.15),
      new THREE.BoxGeometry(0.15, parapetHeight, 8),
      new THREE.BoxGeometry(0.15, parapetHeight, 8),
    ];
    
    const parapetPositions = [
      [0, 8.4, 4],
      [0, 8.4, -4],
      [-5.5, 8.4, 0],
      [5.5, 8.4, 0],
    ];

    parapets.forEach((geo, i) => {
      const parapet = new THREE.Mesh(geo, parapetMaterial);
      parapet.position.set(...parapetPositions[i]);
      parapet.castShadow = true;
      roof.add(parapet);
    });

    // Rooftop AC units (modern detail)
    const acUnit1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.5, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.6, metalness: 0.4 })
    );
    acUnit1.position.set(-3, 8.45, -2);
    acUnit1.castShadow = true;
    roof.add(acUnit1);

    const acUnit2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.5, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.6, metalness: 0.4 })
    );
    acUnit2.position.set(3, 8.45, -2);
    acUnit2.castShadow = true;
    roof.add(acUnit2);

    // Solar panel (modern touch)
    const solarPanel = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.08, 1.5),
      new THREE.MeshStandardMaterial({ 
        color: 0x1a3a5a, 
        roughness: 0.2, 
        metalness: 0.8,
      })
    );
    solarPanel.position.set(0, 8.4, 0.5);
    solarPanel.rotation.x = -0.3;
    solarPanel.castShadow = true;
    roof.add(solarPanel);

    // Roof drainage pipes
    const pipeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      roughness: 0.4,
      metalness: 0.6,
    });

    const drainPipe1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 8, 8),
      pipeMaterial
    );
    drainPipe1.position.set(-4.8, 4, 3.3);
    drainPipe1.castShadow = true;
    roof.add(drainPipe1);

    const drainPipe2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 8, 8),
      pipeMaterial
    );
    drainPipe2.position.set(4.8, 4, 3.3);
    drainPipe2.castShadow = true;
    roof.add(drainPipe2);

    roof.visible = false;
    scene.add(roof);
    stagesRef.current.roof = roof;

    // === STAGE 5: LIGHTS ===
    const lightsGroup = new THREE.Group();
    lightsGroup.name = "lightsGroup";

    // Recessed ceiling lights
    const lightPositions = [
      [-2.5, 7.6, 2.5],
      [0, 7.6, 2.5],
      [2.5, 7.6, 2.5],
      [-2.5, 7.6, -2.5],
      [0, 7.6, -2.5],
      [2.5, 7.6, -2.5],
    ];

    lightPositions.forEach((pos) => {
      // Light housing
      const housing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.18, 0.1, 16),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.5 })
      );
      housing.position.set(...pos);
      housing.castShadow = true;
      lightsGroup.add(housing);

      // Light bulb
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xfff8dc,
          emissive: 0xffd700,
          emissiveIntensity: 3,
        })
      );
      bulb.position.set(pos[0], pos[1] - 0.05, pos[2]);
      lightsGroup.add(bulb);

      // Point light
      const pointLight = new THREE.PointLight(0xffd700, 1.2, 10);
      pointLight.position.set(...pos);
      pointLight.castShadow = true;
      lightsGroup.add(pointLight);
    });

    // Accent spotlights
    const createSpotlight = (x, y, z, targetX, targetY, targetZ) => {
      const spot = new THREE.SpotLight(0xd4af37, 2, 20, Math.PI / 5, 0.4, 1.5);
      spot.position.set(x, y, z);
      spot.target.position.set(targetX, targetY, targetZ);
      spot.castShadow = true;
      scene.add(spot.target);
      return spot;
    };

    lightsGroup.add(createSpotlight(-7, 10, 6, -2, 0, 0));
    lightsGroup.add(createSpotlight(7, 10, 6, 2, 0, 0));

    // Ground uplights
    const uplightPositions = [
      [-6, 0.1, 4],
      [6, 0.1, 4],
    ];

    uplightPositions.forEach((pos) => {
      const uplight = new THREE.SpotLight(0xffd700, 1.5, 15, Math.PI / 4, 0.5, 2);
      uplight.position.set(...pos);
      uplight.target.position.set(pos[0], 8, pos[2] - 1);
      scene.add(uplight.target);
      lightsGroup.add(uplight);
    });

    // Wall sconces (decorative wall lights)
    const createSconce = (x, y, z, rotY = 0) => {
      const group = new THREE.Group();
      
      const backPlate = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.3, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.7 })
      );
      backPlate.position.set(x, y, z);
      backPlate.rotation.y = rotY;
      group.add(backPlate);

      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshStandardMaterial({
          color: 0xfff8dc,
          emissive: 0xffd700,
          emissiveIntensity: 2.5,
        })
      );
      bulb.position.set(x, y, z + 0.12);
      group.add(bulb);

      const spotLight = new THREE.SpotLight(0xffd700, 1, 8, Math.PI / 3, 0.5, 1.5);
      spotLight.position.set(x, y, z + 0.12);
      spotLight.target.position.set(x, y - 2, z + 2);
      scene.add(spotLight.target);
      group.add(spotLight);

      return group;
    };

    lightsGroup.add(createSconce(-4.3, 5.5, 3.4));
    lightsGroup.add(createSconce(4.3, 5.5, 3.4));

    // Path lights in driveway
    const pathLightPositions = [
      [-6.5, 0.5, 2],
      [-6.5, 0.5, 0],
      [-6.5, 0.5, -2],
    ];

    pathLightPositions.forEach((pos) => {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.5, metalness: 0.6 })
      );
      pole.position.set(pos[0], pos[1], pos[2]);
      lightsGroup.add(pole);

      const lampHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshStandardMaterial({
          color: 0xfff8dc,
          emissive: 0xffd700,
          emissiveIntensity: 2,
        })
      );
      lampHead.position.set(pos[0], pos[1] + 0.5, pos[2]);
      lightsGroup.add(lampHead);

      const pathLight = new THREE.PointLight(0xffd700, 0.8, 6);
      pathLight.position.set(pos[0], pos[1] + 0.5, pos[2]);
      lightsGroup.add(pathLight);
    });

    // Under-slab strip lighting
    const stripLightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffd700,
      emissiveIntensity: 1.5,
    });

    const stripLight1 = new THREE.Mesh(
      new THREE.BoxGeometry(9.5, 0.05, 0.2),
      stripLightMaterial
    );
    stripLight1.position.set(0, 7.68, 3.8);
    lightsGroup.add(stripLight1);

    const stripLight2 = new THREE.Mesh(
      new THREE.BoxGeometry(9.5, 0.05, 0.2),
      stripLightMaterial
    );
    stripLight2.position.set(0, 4.53, 3.8);
    lightsGroup.add(stripLight2);

    // Garden/Landscape lighting
    const gardenLightPositions = [
      [-7, 0.3, 1.5],
      [-7, 0.3, -1.5],
      [7, 0.3, 1.5],
      [7, 0.3, -1.5],
    ];

    gardenLightPositions.forEach((pos) => {
      const gardenLight = new THREE.SpotLight(0x90ee90, 0.6, 6, Math.PI / 3, 0.8, 2);
      gardenLight.position.set(pos[0], pos[1], pos[2]);
      gardenLight.target.position.set(pos[0] > 0 ? pos[0] - 1 : pos[0] + 1, 0, pos[2]);
      scene.add(gardenLight.target);
      lightsGroup.add(gardenLight);

      // Small stake light fixture
      const stake = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
      );
      stake.position.set(pos[0], 0.2, pos[2]);
      lightsGroup.add(stake);
    });

    lightsGroup.visible = false;
    scene.add(lightsGroup);
    stagesRef.current.lightsGroup = lightsGroup;

    // Animation loop
    let animationId;
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const elapsed = clock.getElapsedTime();
      
      // Gentle camera movement
      camera.position.x = 14 + Math.sin(elapsed * 0.1) * 0.5;
      camera.position.z = 18 + Math.cos(elapsed * 0.1) * 0.5;
      camera.lookAt(0, 3.5, 0);
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Update visibility based on scroll progress
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

    const foundationOpacity = lerp(0, 1, (progress - 0.0) / 0.2);
    const wallsOpacity = lerp(0, 1, (progress - 0.2) / 0.25);
    const secondFloorOpacity = lerp(0, 1, (progress - 0.45) / 0.25);
    const roofOpacity = lerp(0, 1, (progress - 0.7) / 0.15);
    const lightsOpacity = lerp(0, 1, (progress - 0.85) / 0.15);

    if (stagesRef.current.foundation) {
      stagesRef.current.foundation.visible = foundationOpacity > 0.01;
      stagesRef.current.foundation.children.forEach(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = foundationOpacity;
        }
      });
    }

    if (stagesRef.current.groundFloor) {
      stagesRef.current.groundFloor.visible = wallsOpacity > 0.01;
      stagesRef.current.groundFloor.children.forEach(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = wallsOpacity;
        }
      });
    }

    if (stagesRef.current.secondFloor) {
      stagesRef.current.secondFloor.visible = secondFloorOpacity > 0.01;
      stagesRef.current.secondFloor.traverse(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = secondFloorOpacity;
        }
      });
    }

    if (stagesRef.current.roof) {
      stagesRef.current.roof.visible = roofOpacity > 0.01;
      stagesRef.current.roof.children.forEach(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = roofOpacity;
        }
      });
    }

    if (stagesRef.current.lightsGroup) {
      stagesRef.current.lightsGroup.visible = lightsOpacity > 0.01;
      stagesRef.current.lightsGroup.traverse(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = lightsOpacity;
        }
        if (child.intensity !== undefined) {
          child.intensity = child.userData.baseIntensity 
            ? child.userData.baseIntensity * lightsOpacity 
            : lightsOpacity;
        }
      });
    }
  }, [progress]);

  const activeStep =
    progress < 0.2 ? 1 :
    progress < 0.45 ? 2 :
    progress < 0.7 ? 3 :
    progress < 0.85 ? 4 : 5;

  const titles = [
    "01. Fundação",
    "02. Paredes Térreo",
    "03. Segundo Andar & Janelas",
    "04. Laje",
    "05. Iluminação",
  ];
  
  const descs = [
    "Base sólida em concreto armado preparada para suportar toda a estrutura da construção.",
    "Levantamento das paredes do térreo com acabamento premium e porta de entrada em madeira nobre.",
    "Construção do pavimento superior com grandes janelas de vidro para máxima iluminação natural.",
    "Instalação da laje de cobertura plana com design arquitetônico contemporâneo.",
    "Sistema de iluminação LED integrado com spots embutidos e iluminação de destaque.",
  ];

  return (
    <section className="scroll-section" ref={sectionRef}>
      <div className="sticky-viewport">
        
        <div className="text-panel">
          {titles.map((t, i) => (
            <div key={i} className={`title-row ${activeStep === i + 1 ? "active" : ""}`}>
              <h2 className="title-text">{t}</h2>
              <p className="title-desc">{descs[i]}</p>
            </div>
          ))}
        </div>

        <div className="canvas-container">
          <canvas ref={canvasRef} />
          <div className="canvas-vignette"></div>
        </div>

        <div className="prog-track">
          <div className="prog-fill" style={{ width: `${progress * 100}%` }}></div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Pro:wght@300;400&display=swap');

        .scroll-section {
          height: 500vh;
          background: #0a0a0a;
          position: relative;
        }

        .sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          padding: 2rem;
          overflow: hidden;
          background: 
            radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.06) 0%, transparent 65%),
            radial-gradient(ellipse at 40% 80%, rgba(135,206,235,0.03) 0%, transparent 50%),
            #0a0a0a;
        }

        .text-panel {
          position: relative;
          z-index: 2;
          width: 340px;
          flex-shrink: 0;
        }

        .title-row {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-bottom: 2.2rem;
        }

        .title-row.active {
          opacity: 1;
          transform: translateX(0);
        }

        .title-text {
          font-family: "Playfair Display", serif;
          font-size: 2.1rem;
          font-weight: 900;
          color: #D4AF37;
          margin-bottom: 0.7rem;
          line-height: 1.05;
          letter-spacing: -0.03em;
          text-shadow: 0 3px 25px rgba(212,175,55,0.35);
        }

        .title-desc {
          font-family: "Crimson Pro", serif;
          font-size: 1.18rem;
          font-weight: 300;
          color: #F4E4B0;
          opacity: 0.88;
          line-height: 1.75;
          letter-spacing: 0.015em;
        }

        .canvas-container {
          position: relative;
          width: 750px;
          height: 550px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(212,175,55,0.1);
        }

        .canvas-container canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .canvas-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 30%, rgba(10,10,10,0.5) 100%);
          pointer-events: none;
        }

        .prog-track {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: 380px;
          height: 5px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
          box-shadow: 
            0 2px 10px rgba(0,0,0,0.4),
            inset 0 1px 2px rgba(0,0,0,0.3);
        }

        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #D4AF37 0%, #F4E4B0 50%, #D4AF37 100%);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 25px rgba(212,175,55,0.7);
          position: relative;
        }

        .prog-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 1300px) {
          .sticky-viewport {
            flex-direction: column;
            gap: 2.5rem;
            padding: 2rem 1.5rem;
          }
          
          .text-panel {
            width: 90%;
            max-width: 520px;
          }

          .canvas-container {
            width: 90%;
            max-width: 650px;
            height: 450px;
          }
        }

        @media (max-width: 768px) {
          .canvas-container {
            height: 380px;
          }

          .title-text {
            font-size: 1.7rem;
          }

          .title-desc {
            font-size: 1.05rem;
          }

          .prog-track {
            width: 300px;
            bottom: 40px;
          }
        }

        @media (max-width: 480px) {
          .canvas-container {
            height: 320px;
          }

          .title-text {
            font-size: 1.5rem;
          }

          .title-desc {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}