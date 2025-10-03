// NavGooey.vue
<template>
  <div
    ref="navRef"
    class="nav-container"
    :class="customClass"
    :style="{
      width: width,
      height: height,
      borderRadius: borderRadius
    }"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot>
      <div>Default Content</div>
    </slot>

    <svg
      ref="gooeyRef"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      :viewBox="svgViewBox"
      fill="none"
      class="nav-gooey"
      :style="gooeyStyles"
      preserveAspectRatio="none"
    >
      <path :d="pathD" class="nav-gooey-path" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Types
type Direction = "top" | "bottom" | "left" | "right";

interface Transform {
  x: number;
  y: number;
}

interface Props {
  width: string;
  height: string;
  direction: Direction;
  color?: string;
  borderRadius?: string;
  customClass?: string;
  archHeight?: number;
}

// Props
const props = withDefaults(defineProps<Props>(), {
  width: "auto",
  height: "100%",
  direction: "bottom",
  color: "#8b5cf6",
  archHeight: 0.5
});

// Refs
const navRef = ref<HTMLDivElement | null>(null);
const gooeyRef = ref<SVGSVGElement | null>(null);
const isHovered = ref(false);

// Computed
const SVG_SIZE = computed(() => {
  return props.direction === "left" || props.direction === "right" ? 24 : 96;
});

const ARCH_VERTICAL_HEIGHT = props.archHeight;

const svgViewBox = computed(() => {
  switch (props.direction) {
    case "top":
    case "bottom":
      return "0 0 96 24";
    case "left":
    case "right":
      return "0 0 24 96";
    default:
      return "0 0 96 24";
  }
});

const pathD = computed(() => {
  const mid =
    props.direction === "left" || props.direction === "right" ? 48 : 48;

  switch (props.direction) {
    case "top":
      return `M${mid} 24C${mid * 1.5} 24 ${mid * 1.51} 0 ${mid * 2} 0L0 0C${mid * 0.49} 0 ${mid * 0.5} 24 ${mid} 24Z`;
    case "bottom":
      return `M${mid} 0C${mid * 1.5} 0 ${mid * 1.51} 24 ${mid * 2} 24L0 24C${mid * 0.49} 24 ${mid * 0.5} 0 ${mid} 0Z`;
    case "left":
      return `M24 ${mid}C24 ${mid * 1.5} 0 ${mid * 1.51} 0 ${mid * 2}L0 0C0 ${mid * 0.49} 24 ${mid * 0.5} 24 ${mid}Z`;
    case "right":
      return `M0 ${mid}C0 ${mid * 1.5} 24 ${mid * 1.51} 24 ${mid * 2}L24 0C24 ${mid * 0.49} 0 ${mid * 0.5} 0 ${mid}Z`;
    default:
      return `M${mid} 24C${mid * 1.5} 24 ${mid * 1.51} 0 ${mid * 2} 0L0 0C${mid * 0.49} 0 ${mid * 0.5} 24 ${mid} 24Z`;
  }
});

const gooeyStyles = computed(() => {
  const baseStyles = {
    width: "100%",
    height: "100%"
  };

  switch (props.direction) {
    case "top":
      return {
        ...baseStyles,
        top: "0",
        left: "0",
        transformOrigin: "top"
      };
    case "bottom":
      return {
        ...baseStyles,
        bottom: "0",
        left: "0",
        transformOrigin: "bottom"
      };
    case "left":
      return {
        ...baseStyles,
        top: "0",
        left: "0",
        transformOrigin: "left"
      };
    case "right":
      return {
        ...baseStyles,
        top: "0",
        right: "0",
        transformOrigin: "right"
      };
    default:
      return baseStyles;
  }
});

// Methods
const calculateTransforms = (e: MouseEvent): Transform => {
  if (!navRef.value) return { x: 0, y: 0 };

  const rect = navRef.value.getBoundingClientRect();
  let translate = 0;
  let scale = 0;

  switch (props.direction) {
    case "top":
    case "bottom": {
      const relativeX = e.clientX - rect.left;
      const svgOffset =
        (SVG_SIZE.value / rect.width) * relativeX - SVG_SIZE.value / 2;
      translate = (svgOffset / SVG_SIZE.value) * 100;

      const relativeY =
        props.direction === "bottom"
          ? rect.height - (e.clientY - rect.top)
          : e.clientY - rect.top;
      console.log(ARCH_VERTICAL_HEIGHT, "Arch");
      const threshold = rect.height * ARCH_VERTICAL_HEIGHT;
      scale =
        Math.min(relativeY / threshold, ARCH_VERTICAL_HEIGHT) * 0.5 + 0.00032;
      break;
    }
    case "left":
    case "right": {
      const relativeY = e.clientY - rect.top;
      const svgOffset =
        (SVG_SIZE.value / rect.height) * relativeY - SVG_SIZE.value / 2;
      translate = (svgOffset / SVG_SIZE.value) * 100;

      const relativeX =
        props.direction === "right"
          ? rect.width - (e.clientX - rect.left)
          : e.clientX - rect.left;
      const threshold = rect.width * 0.5;
      scale = Math.min(relativeX / threshold, 1) * 0.5 + 0.00032;
      break;
    }
  }

  return { x: translate, y: scale };
};

const updateGooeyTransform = (transforms: Transform): void => {
  if (!gooeyRef.value) return;

  const scale = isHovered.value ? transforms.y : 0.00032;
  const isVertical = props.direction === "top" || props.direction === "bottom";

  const scaleTransform = isVertical
    ? `scale3d(1, ${scale}, 1)`
    : `scale3d(${scale}, 1, 1)`;

  const translateTransform = `translate3d(${
    isVertical ? transforms.x : 0
  }%, ${!isVertical ? transforms.x : 0}%, 0px)`;

  gooeyRef.value.style.transform = `
    ${translateTransform}
    ${scaleTransform}
    rotateX(0deg) rotateY(0deg) rotateZ(0deg)
    skew(0deg, 0deg)
  `;
};

// Event handlers
let animationFrame: number | null = null; // 用於存儲 requestAnimationFrame 的 ID

const handleMouseMove = (e: MouseEvent): void => {
  if (!isHovered.value) return;

  const transforms = calculateTransforms(e);

  // 使用 requestAnimationFrame 進行平滑更新
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  animationFrame = requestAnimationFrame(() => {
    updateGooeyTransform(transforms);
  });
};
const handleMouseEnter = (): void => {
  isHovered.value = true;
};

const handleMouseLeave = (): void => {
  isHovered.value = false;

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  updateGooeyTransform({ x: 0, y: 0.00032 });
};

onMounted(() => {
  updateGooeyTransform({ x: 0, y: 0.00032 });
});
</script>

<style scoped lang="scss">
.nav-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 10px;
  position: relative;
  overflow: hidden;
}

.nav-gooey {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  will-change: transform;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); /* 優化動畫曲線 */
}

.nav-gooey-path {
  fill: v-bind("color");
}
</style>
