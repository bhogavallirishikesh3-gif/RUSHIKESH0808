import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Play, RotateCcw, ShieldCheck, Wrench, AlertTriangle, ChevronDown, ChevronUp, Eye, Sparkles, Trophy } from 'lucide-react';

interface ThreeCityViewProps {
  onReturnToDashboard?: () => void;
}

export const ThreeCityView: React.FC<ThreeCityViewProps> = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeHazard, setActiveHazard] = useState<'pothole' | 'water' | 'electric'>('pothole');
  const [isDrivingToSite, setIsDrivingToSite] = useState(false);
  const [repairStatus, setRepairStatus] = useState<string>('Ready for Dispatch');
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [gameScore, setGameScore] = useState(120);
  const [fixedCount, setFixedCount] = useState(0);

  // Store mutable runtime references
  const runtimeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    truckGroup: THREE.Group;
    waterParticles: THREE.Points;
    electricSparks: THREE.Points;
    potholeGroup: THREE.Group;
    waterMainGroup: THREE.Group;
    lightPoleGroup: THREE.Group;
    frameId: number;
    clock: THREE.Clock;
    targetPos: THREE.Vector3;
    isSoftwareGl: boolean;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Detect Software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Scene, Camera, Renderer
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection (RoomEnvironment)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // 4. Studio PBR Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x8bc34a, 0x1a237e, 0.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.8);
    keyLight.position.set(12, 22, 10);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -15;
    keyLight.shadow.camera.right = 15;
    keyLight.shadow.camera.top = 15;
    keyLight.shadow.camera.bottom = -15;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const blueFill = new THREE.DirectionalLight(0x38bdf8, 0.8);
    blueFill.position.set(-10, 10, -10);
    scene.add(blueFill);

    // 5. Procedural Ground & City Street Grid
    const streetCanvas = document.createElement('canvas');
    streetCanvas.width = 512;
    streetCanvas.height = 512;
    const sCtx = streetCanvas.getContext('2d')!;
    sCtx.fillStyle = '#1e2129';
    sCtx.fillRect(0, 0, 512, 512);
    sCtx.fillStyle = '#2b2f3a';
    sCtx.fillRect(64, 64, 384, 384);
    // Road center dashes
    sCtx.strokeStyle = '#facc15';
    sCtx.lineWidth = 6;
    sCtx.setLineDash([20, 20]);
    sCtx.beginPath();
    sCtx.moveTo(0, 256);
    sCtx.lineTo(512, 256);
    sCtx.moveTo(256, 0);
    sCtx.lineTo(256, 512);
    sCtx.stroke();
    // Crosswalk zebra stripes
    sCtx.fillStyle = '#ffffff';
    for (let i = 0; i < 6; i++) {
      sCtx.fillRect(160 + i * 32, 230, 16, 52);
    }

    const groundTex = new THREE.CanvasTexture(streetCanvas);
    groundTex.wrapS = THREE.RepeatWrapping;
    groundTex.wrapT = THREE.RepeatWrapping;
    groundTex.repeat.set(2, 2);
    groundTex.colorSpace = THREE.SRGBColorSpace;
    groundTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      roughness: 0.85,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 6. Composite 3-12 Part Procedural Municipal Repair Truck (THREE.Group)
    const truckGroup = new THREE.Group();

    // Part 1: Chassis
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.5, 4.4);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6, metalness: 0.8 });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.55;
    chassis.castShadow = true;
    truckGroup.add(chassis);

    // Part 2: Cabin
    const cabinGeo = new THREE.BoxGeometry(2.2, 1.4, 1.8);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.5 });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 1.4, 0.9);
    cabin.castShadow = true;
    truckGroup.add(cabin);

    // Part 3: Windshield & Windows
    const glassGeo = new THREE.BoxGeometry(2.05, 0.7, 0.1);
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.75 });
    const windshield = new THREE.Mesh(glassGeo, glassMat);
    windshield.position.set(0, 1.6, 1.81);
    truckGroup.add(windshield);

    // Part 4: Utility Cargo Bed & Cold Patch Container
    const bedGeo = new THREE.BoxGeometry(2.1, 1.0, 2.2);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.5, metalness: 0.4 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.set(0, 1.1, -1.0);
    bed.castShadow = true;
    truckGroup.add(bed);

    // Part 5: Roof Warning Emergency Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.25, 12);
    const beaconMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1.5 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 2.25, 0.9);
    truckGroup.add(beacon);

    // Part 6-9: 4 Wheels with Rims
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9, metalness: 0.1 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.3, metalness: 0.9 });

    const wheelPositions = [
      [-1.15, 0.42, 1.2],
      [1.15, 0.42, 1.2],
      [-1.15, 0.42, -1.2],
      [1.15, 0.42, -1.2],
    ];

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;
      truckGroup.add(wheel);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.37, 8), rimMat);
      rim.rotation.z = Math.PI / 2;
      rim.position.set(pos[0], pos[1], pos[2]);
      truckGroup.add(rim);
    });

    // Part 10: Headlights
    const lightGeo = new THREE.BoxGeometry(0.3, 0.15, 0.05);
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2.0 });
    const leftLight = new THREE.Mesh(lightGeo, lightMat);
    leftLight.position.set(-0.7, 0.7, 2.22);
    const rightLight = new THREE.Mesh(lightGeo, lightMat);
    rightLight.position.set(0.7, 0.7, 2.22);
    truckGroup.add(leftLight);
    truckGroup.add(rightLight);

    // Contact shadow beneath truck
    const shadowGeo = new THREE.PlaneGeometry(3.0, 5.0);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45, depthWrite: false });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.02;
    truckGroup.add(contactShadow);

    truckGroup.position.set(0, 0, 6);
    scene.add(truckGroup);

    // 7. Hazard 1: Pothole & Road Hazard (Near School Crosswalk)
    const potholeGroup = new THREE.Group();
    // Inner crater cavity
    const craterGeo = new THREE.CylinderGeometry(1.4, 0.9, 0.35, 18);
    const craterMat = new THREE.MeshStandardMaterial({ color: 0x0f1117, roughness: 0.95, metalness: 0.05 });
    const crater = new THREE.Mesh(craterGeo, craterMat);
    crater.position.set(0, 0.01, 0);
    potholeGroup.add(crater);

    // Cracked asphalt lip ring
    const lipGeo = new THREE.TorusGeometry(1.4, 0.15, 8, 24);
    const lipMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.9 });
    const lip = new THREE.Mesh(lipGeo, lipMat);
    lip.rotation.x = Math.PI / 2;
    lip.position.set(0, 0.05, 0);
    potholeGroup.add(lip);

    // Safety cones around pothole
    const coneGeo = new THREE.ConeGeometry(0.25, 0.75, 12);
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
    const cone1 = new THREE.Mesh(coneGeo, coneMat);
    cone1.position.set(1.6, 0.375, 1.2);
    cone1.castShadow = true;
    const cone2 = new THREE.Mesh(coneGeo, coneMat);
    cone2.position.set(-1.6, 0.375, -1.2);
    cone2.castShadow = true;
    potholeGroup.add(cone1);
    potholeGroup.add(cone2);

    potholeGroup.position.set(-6, 0, -2);
    scene.add(potholeGroup);

    // 8. Hazard 2: Water Main Geyser Rupture (With rising/falling particles)
    const waterMainGroup = new THREE.Group();
    const puddleGeo = new THREE.CircleGeometry(2.2, 24);
    const puddleMat = new THREE.MeshPhysicalMaterial({ color: 0x0284c7, roughness: 0.05, metalness: 0.95, transparent: true, opacity: 0.85 });
    const puddle = new THREE.Mesh(puddleGeo, puddleMat);
    puddle.rotation.x = -Math.PI / 2;
    puddle.position.y = 0.03;
    waterMainGroup.add(puddle);

    // Water fountain particle system
    const waterPartCount = 180;
    const waterGeo = new THREE.BufferGeometry();
    const waterPos = new Float32Array(waterPartCount * 3);
    for (let i = 0; i < waterPartCount; i++) {
      waterPos[i * 3] = (Math.random() - 0.5) * 0.8;
      waterPos[i * 3 + 1] = Math.random() * 3.5;
      waterPos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    waterGeo.setAttribute('position', new THREE.BufferAttribute(waterPos, 3));
    const waterMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.18, transparent: true, opacity: 0.85 });
    const waterParticles = new THREE.Points(waterGeo, waterMat);
    waterMainGroup.add(waterParticles);

    waterMainGroup.position.set(7, 0, -3);
    scene.add(waterMainGroup);

    // 9. Hazard 3: Sparking Broken Streetlight
    const lightPoleGroup = new THREE.Group();
    const poleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.6, 12), new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.7 }));
    poleBase.position.y = 0.3;
    lightPoleGroup.add(poleBase);

    const poleShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 5.5, 12), new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.3, metalness: 0.7 }));
    poleShaft.position.y = 3.0;
    poleShaft.castShadow = true;
    lightPoleGroup.add(poleShaft);

    // Electrical sparks particle system
    const sparkCount = 60;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 0.5;
      sparkPos[i * 3 + 1] = 0.8 + (Math.random() - 0.5) * 0.6;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({ color: 0xfacc15, size: 0.12 });
    const electricSparks = new THREE.Points(sparkGeo, sparkMat);
    lightPoleGroup.add(electricSparks);

    lightPoleGroup.position.set(5, 0, 5);
    scene.add(lightPoleGroup);

    // 10. Background Procedural Buildings
    const buildingMat1 = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.2 });
    const buildingMat2 = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8, metalness: 0.1 });

    const buildingCoords = [
      [-14, 0, -12, 6, 12, 6, buildingMat1],
      [-14, 0, 4, 5, 8, 5, buildingMat2],
      [14, 0, -12, 7, 14, 6, buildingMat2],
      [14, 0, 4, 6, 10, 6, buildingMat1],
    ];

    buildingCoords.forEach(([bx, by, bz, bw, bh, bd, mat]) => {
      const bGeo = new THREE.BoxGeometry(bw as number, bh as number, bd as number);
      const bMesh = new THREE.Mesh(bGeo, mat as THREE.Material);
      bMesh.position.set(bx as number, (bh as number) / 2, bz as number);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      scene.add(bMesh);
    });

    // Clock & Target State
    const clock = new THREE.Clock();
    const targetPos = new THREE.Vector3(-6, 0, 0);

    runtimeRef.current = {
      scene,
      camera,
      renderer,
      truckGroup,
      waterParticles,
      electricSparks,
      potholeGroup,
      waterMainGroup,
      lightPoleGroup,
      frameId: 0,
      clock,
      targetPos,
      isSoftwareGl,
    };

    // 11. Render Loop with Exponential Damping & Smooth 60fps
    const tick = () => {
      const dt = clock.getDelta();

      // Animate water geyser particles
      const wPos = waterParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < waterPartCount; i++) {
        wPos[i * 3 + 1] += dt * 4;
        if (wPos[i * 3 + 1] > 3.5) {
          wPos[i * 3 + 1] = 0.1;
          wPos[i * 3] = (Math.random() - 0.5) * 0.8;
          wPos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
      }
      waterParticles.geometry.attributes.position.needsUpdate = true;

      // Animate electric sparks
      const sPos = electricSparks.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < sparkCount; i++) {
        sPos[i * 3] += (Math.random() - 0.5) * 0.06;
        sPos[i * 3 + 1] += (Math.random() - 0.5) * 0.06;
        if (Math.abs(sPos[i * 3]) > 0.6 || Math.abs(sPos[i * 3 + 1] - 0.8) > 0.6) {
          sPos[i * 3] = (Math.random() - 0.5) * 0.2;
          sPos[i * 3 + 1] = 0.8;
          sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }
      }
      electricSparks.geometry.attributes.position.needsUpdate = true;

      // Truck motion exponential damping towards active target
      truckGroup.position.lerp(targetPos, Math.min(1.0, dt * 2.5));

      // Flasher beacon rotation
      beacon.rotation.y += dt * 8;

      renderer.render(scene, camera);
      runtimeRef.current!.frameId = requestAnimationFrame(tick);
    };

    runtimeRef.current.frameId = requestAnimationFrame(tick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (runtimeRef.current) {
        cancelAnimationFrame(runtimeRef.current.frameId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Dispatch truck to specified hazard
  const dispatchTruckTo = (hazard: 'pothole' | 'water' | 'electric') => {
    setActiveHazard(hazard);
    setIsDrivingToSite(true);
    setRepairStatus(`En Route to ${hazard.toUpperCase()} site...`);

    if (runtimeRef.current) {
      if (hazard === 'pothole') {
        runtimeRef.current.targetPos.set(-6, 0, 1.5);
      } else if (hazard === 'water') {
        runtimeRef.current.targetPos.set(7, 0, -0.5);
      } else {
        runtimeRef.current.targetPos.set(5, 0, 3.0);
      }
    }

    setTimeout(() => {
      setIsDrivingToSite(false);
      setRepairStatus(`Crew On-Site: Repairing ${hazard.toUpperCase()} Hazard`);
      setFixedCount((prev) => prev + 1);
      setGameScore((prev) => prev + 50);
    }, 2200);
  };

  return (
    <div className="relative w-full h-[620px] bg-neutral-950 overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl flex flex-col justify-between">
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Minimal Top Header Badge */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-neutral-900/90 border border-neutral-800 px-3.5 py-1.5 rounded-xl backdrop-blur text-xs">
          <span className="font-extrabold text-neutral-100">
            DamGo <span className="text-emerald-400">3D City Twin</span>
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">Three.js PBR Studio</span>
        </div>

        {/* Dispatch Game Score Card */}
        <div className="pointer-events-auto flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 px-3.5 py-1.5 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>{gameScore} pts</span>
          </div>
          <div className="h-4 w-[1px] bg-neutral-800" />
          <div className="text-[11px] text-emerald-400 font-medium">
            Repairs Done: {fixedCount}
          </div>
        </div>
      </div>

      {/* Central 3D Viewport is 100% Unobstructed */}

      {/* Unified Bottom Control Dock (Three.js Skill Directive) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pb-4 pointer-events-auto">
        <div className="bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
          {/* Dock Header & Collapse Toggle */}
          <div
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center justify-between px-4 py-2 bg-neutral-950/80 border-b border-neutral-800/80 cursor-pointer text-xs select-none"
          >
            <div className="flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-neutral-200">
                Municipal Rapid Dispatch Simulator
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {repairStatus}
              </span>
            </div>

            <button className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px]">
              {isDockCollapsed ? (
                <>
                  <span>Show Dock</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Hide Dock</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Dock Controls Body */}
          {!isDockCollapsed && (
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                <span>Select 3D Hazard Target to Dispatch Repair Truck:</span>
                <span className="text-neutral-500 font-mono">SLA Countdown: 18m</span>
              </div>

              {/* Hazard Target Selector Buttons */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => dispatchTruckTo('pothole')}
                  disabled={isDrivingToSite}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                    activeHazard === 'pothole'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">School Pothole</span>
                    <span className="text-[10px] font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400">
                      Zone A
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 truncate">Maplewood Crosswalk</span>
                </button>

                <button
                  type="button"
                  onClick={() => dispatchTruckTo('water')}
                  disabled={isDrivingToSite}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                    activeHazard === 'water'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Water Main Geyser</span>
                    <span className="text-[10px] font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400">
                      Zone B
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 truncate">Oakridge Transit Corridor</span>
                </button>

                <button
                  type="button"
                  onClick={() => dispatchTruckTo('electric')}
                  disabled={isDrivingToSite}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                    activeHazard === 'electric'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Sparking Lightpole</span>
                    <span className="text-[10px] font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400">
                      Zone C
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 truncate">Highland Senior Gateway</span>
                </button>
              </div>

              {/* Status and Action Row */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Procedural PBR Lighting • 3-12 Part Composite Truck Model</span>
                </div>

                <button
                  type="button"
                  onClick={() => dispatchTruckTo(activeHazard)}
                  disabled={isDrivingToSite}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold shadow transition flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Dispatch</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
