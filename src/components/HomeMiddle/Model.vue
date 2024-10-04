<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AnimationClip } from "three/src/animation/AnimationClip.d.ts";
import { onMounted, ref } from "vue";

const canvasContainer = ref<HTMLDivElement | null>(null);
let mixer: THREE.AnimationMixer | null = null; // 动画混合器
let actionA: THREE.AnimationAction | null = null; // 动作A
let actionB: THREE.AnimationAction | null = null; // 动作B

onMounted(() => {
  if (!canvasContainer.value) return;

  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    45,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.25,
    100,
  );
  camera.position.set(-5, -3, 10);
  camera.lookAt(0, 2, 0);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  );

  // 将渲染器的canvas元素添加到指定容器中
  canvasContainer.value.appendChild(renderer.domElement);

  // 添加光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // 加载GLB模型
  const loader = new GLTFLoader();
  loader.load(
    "./glb/surf+hello.glb", // 替换为你的GLB文件路径
    (gltf) => {
      scene.add(gltf.scene);

      // 设置动画混合器
      mixer = new THREE.AnimationMixer(gltf.scene);

      // 获取并设置动作A和动作B
      actionA = mixer.clipAction(gltf.animations[0] as AnimationClip); // 假设第一个动画是动作A
      actionB = mixer.clipAction(gltf.animations[1] as AnimationClip); // 假设第二个动画是动作B

      // 播放动作A
      actionA.play();

      // 调整模型位置
      gltf.scene.position.set(1, 1, 1);
      // 调整缩放
      gltf.scene.scale.set(2, 2, 2);

      animate();
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the GLB model:", error);
    },
  );

  // 动画循环
  const animate = () => {
    requestAnimationFrame(animate);

    if (mixer) {
      mixer.update(0.01); // 更新动画混合器
    }

    renderer.render(scene, camera);
  };

  // 窗口调整事件
  window.addEventListener("resize", () => {
    if (canvasContainer.value) {
      camera.aspect =
        canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        canvasContainer.value.clientWidth,
        canvasContainer.value.clientHeight,
      );
    }
  });

  // 点击事件切换动画
  window.addEventListener("click", () => {
    if (actionA && actionB) {
      actionA.stop(); // 停止动作A
      actionB.play(); // 播放动作B
    }
  });
});
</script>

<template>
  <div
    class="canvas-container"
    ref="canvasContainer"></div>
</template>

<style lang="scss" scoped>
.canvas-container {
  width: 100%;
  height: 100%;
}
</style>
