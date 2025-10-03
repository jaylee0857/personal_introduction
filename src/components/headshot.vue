<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

let animationFrame: number | null = null;
const headshot = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

// 初始化transform值
const headshotTransform = ref({
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0
});

const contentTransform = ref({
  translateX: 0,
  translateY: 0
});

// 處理滑鼠移動
const handleMouseMove = (event: MouseEvent) => {
  if (!headshot.value) return;

  // 如果已經有待執行的動畫，先取消它
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  // 使用 requestAnimationFrame 進行平滑更新
  animationFrame = requestAnimationFrame(() => {
    // 使用 clientHeight（不包含滾動條的高度）
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    // 計算滑鼠在元素內的相對位置 (0-1)
    const x = event.clientX / viewportWidth;
    const y = event.clientY / viewportHeight;

    // 計算headshot的旋轉角度
    headshotTransform.value = {
      rotateX: (y - 0.5) * -20, // -10 to 10
      rotateY: (x - 0.5) * 60, // -30 to 30
      rotateZ: (x - 0.5) * 2 // -1 to 1
    };

    // 計算content的位移
    contentTransform.value = {
      translateX: (x - 0.5) * 100, // -50% to 50%
      translateY: (y - 0.5) * 24 // -12% to 12%
    };
  });
};

// 重置transform值
const handleMouseLeave = () => {
  headshotTransform.value = {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
  };
  contentTransform.value = {
    translateX: 0,
    translateY: 0
  };
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseleave", handleMouseLeave);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseleave", handleMouseLeave);

  // 清理待執行的動畫
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <div
    ref="headshot"
    class="headshot"
    :style="{
      transform: `translate3d(0px, 0%, 0px) scale3d(1, 1, 1)
                 rotateX(${headshotTransform.rotateX}deg)
                 rotateY(${headshotTransform.rotateY}deg)
                 rotateZ(${headshotTransform.rotateZ}deg)
                 skew(0deg, 0deg)`
    }"
  >
    <div
      ref="content"
      class="headshot-content"
      :style="{
        transform: `translate3d(${contentTransform.translateX}%, ${contentTransform.translateY}%, 0px)
                   scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                   skew(0deg, 0deg)`
      }"
    >
      <slot>
        <q-img src="@/assets/images/mock-bg.png"></q-img>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.headshot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.1s ease-out;

  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.1s ease-out;
  }
}
</style>
