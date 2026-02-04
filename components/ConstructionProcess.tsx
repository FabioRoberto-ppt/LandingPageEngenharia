"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function ConstructionProcess() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const stagesRef = useRef({});
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    
    const updateCanvasSize = () => {
      if (!container) return { width: 800, height: 600 };
      const rect = container.getBoundingClientRect();
      return {
        width: rect.width || 800,
        height: rect.height || 600
      };
    };

    const { width, height } = updateCanvasSize();

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 25, 60);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 55 : 40,
      width / height,
      0.1,
      1000
    );
    
    if (isMobile) {
      camera.position.set(18, 14, 22);
    } else {
      camera.position.set(14, 10, 18);
    }
    camera.lookAt(0, 3.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      powerPreference: "high-performance",
    });
    
    rendererRef.current = renderer;
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.7 : 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5e6, isMobile ? 1.8 : 1.4);
    mainLight.position.set(12, 18, 10);
    if (!isMobile) {
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      mainLight.shadow.camera.left = -20;
      mainLight.shadow.camera.right = 20;
      mainLight.shadow.camera.top = 20;
      mainLight.shadow.camera.bottom = -20;
    }
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, isMobile ? 0.6 : 0.4);
    fillLight.position.set(-10, 8, -8);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0x87ceeb, isMobile ? 0.5 : 0.3);
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
    ground.receiveShadow = !isMobile;
    scene.add(ground);

    // Grid helper
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
    foundationBase.castShadow = !isMobile;
    foundationBase.receiveShadow = !isMobile;
    foundation.add(foundationBase);

    const driveway = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.15, 5),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.9 })
    );
    driveway.position.set(-5, 0.075, 0);
    driveway.receiveShadow = !isMobile;
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

    // Trees
    const createTree = (x, z, height = 2.5) => {
      const group = new THREE.Group();
      
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.2, height, 8),
        new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.9 })
      );
      trunk.position.set(x, height / 2, z);
      trunk.castShadow = !isMobile;
      group.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x2d5016, roughness: 0.8 })
      );
      foliage.position.set(x, height + 0.6, z);
      foliage.scale.set(1, 1.3, 1);
      foliage.castShadow = !isMobile;
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
    gardenBed1.receiveShadow = !isMobile;
    foundation.add(gardenBed1);

    const gardenBed2 = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.2, 1.5),
      gardenBedMaterial
    );
    gardenBed2.position.set(6.5, 0.1, 0);
    gardenBed2.receiveShadow = !isMobile;
    foundation.add(gardenBed2);

    // Bushes
    const createBush = (x, z, size = 0.4) => {
      const bush = new THREE.Mesh(
        new THREE.SphereGeometry(size, 8, 6),
        new THREE.MeshStandardMaterial({ color: 0x1a4d0a, roughness: 0.9 })
      );
      bush.position.set(x, size * 0.7, z);
      bush.scale.set(1, 0.8, 1);
      bush.castShadow = !isMobile;
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
      stone.receiveShadow = !isMobile;
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
    frontWall.castShadow = !isMobile;
    frontWall.receiveShadow = !isMobile;
    groundFloor.add(frontWall);

    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.5, 0.25),
      wallMaterial
    );
    backWall.position.set(0, 2.55, -3.5);
    backWall.castShadow = !isMobile;
    backWall.receiveShadow = !isMobile;
    groundFloor.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.5, 7),
      wallMaterial
    );
    leftWall.position.set(-5, 2.55, 0);
    leftWall.castShadow = !isMobile;
    leftWall.receiveShadow = !isMobile;
    groundFloor.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.5, 7),
      wallMaterial
    );
    rightWall.position.set(5, 2.55, 0);
    rightWall.castShadow = !isMobile;
    rightWall.receiveShadow = !isMobile;
    groundFloor.add(rightWall);

    // Door
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 2.4, 0.12),
      woodMaterial
    );
    door.position.set(-1.2, 2, 3.58);
    door.castShadow = !isMobile;
    groundFloor.add(door);

    // Door handle
    const doorHandle = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.05 })
    );
    doorHandle.position.set(-0.7, 2, 3.64);
    doorHandle.castShadow = !isMobile;
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
    mailboxPost.castShadow = !isMobile;
    groundFloor.add(mailboxPost);

    const mailboxBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.25, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.6 })
    );
    mailboxBody.position.set(-3.8, 1.3, 4.2);
    mailboxBody.castShadow = !isMobile;
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
    mat.receiveShadow = !isMobile;
    groundFloor.add(mat);

    // Doorbell
    const doorbell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16),
      new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.7 })
    );
    doorbell.rotation.z = Math.PI / 2;
    doorbell.position.set(-0.6, 2.3, 3.64);
    groundFloor.add(doorbell);

    // House numbers
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

    // Floor slab
    const midSlab = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.35, 7),
      concreteMaterial
    );
    midSlab.position.y = 4.375;
    midSlab.castShadow = !isMobile;
    midSlab.receiveShadow = !isMobile;
    secondFloor.add(midSlab);

    // Walls
    const frontWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.2, 0.25),
      wallMaterial
    );
    frontWall2.position.set(0, 6.15, 3.5);
    frontWall2.castShadow = !isMobile;
    frontWall2.receiveShadow = !isMobile;
    secondFloor.add(frontWall2);

    const backWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.2, 0.25),
      wallMaterial
    );
    backWall2.position.set(0, 6.15, -3.5);
    backWall2.castShadow = !isMobile;
    backWall2.receiveShadow = !isMobile;
    secondFloor.add(backWall2);

    const leftWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.2, 7),
      wallMaterial
    );
    leftWall2.position.set(-5, 6.15, 0);
    leftWall2.castShadow = !isMobile;
    leftWall2.receiveShadow = !isMobile;
    secondFloor.add(leftWall2);

    const rightWall2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 3.2, 7),
      wallMaterial
    );
    rightWall2.position.set(5, 6.15, 0);
    rightWall2.castShadow = !isMobile;
    rightWall2.receiveShadow = !isMobile;
    secondFloor.add(rightWall2);

    // === WINDOWS ===
    const createWindow = (width, height, x, y, z) => {
      const group = new THREE.Group();
      
      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 0.08),
        glassMaterial.clone()
      );
      glass.position.set(x, y, z);
      group.add(glass);

      const frameThickness = 0.08;
      
      // Frames
      for (let i = 0; i < 2; i++) {
        const hFrame = new THREE.Mesh(
          new THREE.BoxGeometry(width + frameThickness, frameThickness, 0.1),
          frameMaterial.clone()
        );
        hFrame.position.set(x, y + (i === 0 ? -height/2 : height/2), z);
        group.add(hFrame);
      }
      
      for (let i = 0; i < 2; i++) {
        const vFrame = new THREE.Mesh(
          new THREE.BoxGeometry(frameThickness, height + frameThickness, 0.1),
          frameMaterial.clone()
        );
        vFrame.position.set(x + (i === 0 ? -width/2 : width/2), y, z);
        group.add(vFrame);
      }

      const centerFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, height, 0.1),
        frameMaterial.clone()
      );
      centerFrame.position.set(x, y, z);
      group.add(centerFrame);
      
      return group;
    };

    secondFloor.add(createWindow(2.6, 1.8, 1.5, 2.4, 3.58));
    secondFloor.add(createWindow(1.4, 1.4, -3.2, 2.2, 3.58));
    secondFloor.add(createWindow(3, 2, 1, 6.15, 3.58));
    secondFloor.add(createWindow(2, 1.7, -2.6, 6.15, 3.58));
    secondFloor.add(createWindow(1.3, 1.7, 3.5, 6.15, 3.58));

    // Balcony
    const balcony = new THREE.Group();
    
    const balconyFloor = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.15, 1.2),
      concreteMaterial.clone()
    );
    balconyFloor.position.set(0.5, 4.65, 4.1);
    balconyFloor.castShadow = !isMobile;
    balcony.add(balconyFloor);

    const railingMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.3,
      metalness: 0.7,
    });

    const topRail = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.08, 0.08),
      railingMaterial.clone()
    );
    topRail.position.set(0.5, 5.6, 4.7);
    balcony.add(topRail);

    for (let i = 0; i < 7; i++) {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.8, 0.06),
        railingMaterial.clone()
      );
      post.position.set(-1 + i * 0.5, 5.2, 4.7);
      balcony.add(post);
    }

    secondFloor.add(balcony);

    // Pillars
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e8e8,
      roughness: 0.6,
      metalness: 0.1,
    });

    const pillar1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 7.5, 0.3),
      pillarMaterial.clone()
    );
    pillar1.position.set(-4.3, 4.35, 3.3);
    pillar1.castShadow = !isMobile;
    secondFloor.add(pillar1);

    const pillar2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 7.5, 0.3),
      pillarMaterial.clone()
    );
    pillar2.position.set(4.3, 4.35, 3.3);
    pillar2.castShadow = !isMobile;
    secondFloor.add(pillar2);

    secondFloor.visible = false;
    scene.add(secondFloor);
    stagesRef.current.secondFloor = secondFloor;

    // === STAGE 4: ROOF ===
    const roof = new THREE.Group();
    roof.name = "roof";

    const roofSlab = new THREE.Mesh(
      new THREE.BoxGeometry(11, 0.5, 8),
      roofMaterial.clone()
    );
    roofSlab.position.y = 7.95;
    roofSlab.castShadow = !isMobile;
    roofSlab.receiveShadow = !isMobile;
    roof.add(roofSlab);

    const roofEdge = new THREE.Mesh(
      new THREE.BoxGeometry(11.3, 0.25, 8.3),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.5 })
    );
    roofEdge.position.y = 7.7;
    roofEdge.castShadow = !isMobile;
    roof.add(roofEdge);

    // Solar panel
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
    solarPanel.castShadow = !isMobile;
    roof.add(solarPanel);

    roof.visible = false;
    scene.add(roof);
    stagesRef.current.roof = roof;

    // === STAGE 5: LIGHTS ===
    const lightsGroup = new THREE.Group();
    lightsGroup.name = "lightsGroup";

    const lightPositions = [
      [-2.5, 7.6, 2.5],
      [0, 7.6, 2.5],
      [2.5, 7.6, 2.5],
      [-2.5, 7.6, -2.5],
      [0, 7.6, -2.5],
      [2.5, 7.6, -2.5],
    ];

    lightPositions.forEach((pos) => {
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

      const pointLight = new THREE.PointLight(0xffd700, 1.2, 10);
      pointLight.position.set(...pos);
      pointLight.castShadow = !isMobile;
      pointLight.userData.baseIntensity = 1.2;
      lightsGroup.add(pointLight);
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
      
      const movementScale = isMobile ? 0.2 : 0.5;
      const baseX = isMobile ? 18 : 14;
      const baseZ = isMobile ? 22 : 18;
      
      camera.position.x = baseX + Math.sin(elapsed * 0.08) * movementScale;
      camera.position.z = baseZ + Math.cos(elapsed * 0.08) * movementScale;
      camera.lookAt(0, 3.5, 0);
      
      renderer.render(scene, camera);
    };
    
    renderer.render(scene, camera);
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current) return;
      const container = canvasRef.current.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const newWidth = rect.width || window.innerWidth;
      const newHeight = rect.height || window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight, false);
    };
    
    setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [isMobile]);

  // Update visibility based on scroll
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

    const foundationOpacity = lerp(0, 1, (progress - 0.0) / 0.2);
    const wallsOpacity = lerp(0, 1, (progress - 0.2) / 0.25);
    const secondFloorOpacity = lerp(0, 1, (progress - 0.45) / 0.25);
    const roofOpacity = lerp(0, 1, (progress - 0.7) / 0.15);
    const lightsOpacity = lerp(0, 1, (progress - 0.85) / 0.15);

    const updateStage = (stage, opacity) => {
      if (!stage) return;
      stage.visible = opacity > 0.01;
      stage.traverse(child => {
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.transparent = true;
              mat.opacity = opacity;
              mat.needsUpdate = true;
            });
          } else {
            child.material.transparent = true;
            child.material.opacity = opacity;
            child.material.needsUpdate = true;
          }
        }
        if (child.intensity !== undefined) {
          child.intensity = child.userData.baseIntensity 
            ? child.userData.baseIntensity * opacity 
            : opacity;
        }
      });
    };

    updateStage(stagesRef.current.foundation, foundationOpacity);
    updateStage(stagesRef.current.groundFloor, wallsOpacity);
    updateStage(stagesRef.current.secondFloor, secondFloorOpacity);
    updateStage(stagesRef.current.roof, roofOpacity);
    updateStage(stagesRef.current.lightsGroup, lightsOpacity);
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
          width: 100% !important;
          height: 100% !important;
          display: block;
          touch-action: none;
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

        @media (max-width: 1024px) {
          .sticky-viewport {
            flex-direction: column;
            gap: 2rem;
            padding: 1.5rem;
            justify-content: flex-start;
            padding-top: 3rem;
          }
          
          .text-panel {
            width: 100%;
            max-width: 600px;
            order: 2;
          }

          .canvas-container {
            width: 100%;
            max-width: 700px;
            height: 45vh;
            min-height: 350px;
            order: 1;
          }

          .prog-track {
            bottom: 40px;
            width: 70%;
            max-width: 400px;
          }
        }

        @media (max-width: 768px) {
          .sticky-viewport {
            gap: 1.5rem;
            padding: 1rem;
            padding-top: 2rem;
          }

          .canvas-container {
            height: 40vh;
            min-height: 300px;
          }

          .title-text {
            font-size: 1.6rem;
          }

          .title-desc {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .canvas-container {
            height: 35vh;
            min-height: 250px;
          }

          .title-text {
            font-size: 1.4rem;
          }

          .title-desc {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}