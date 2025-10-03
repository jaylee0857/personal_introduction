<script setup lang="ts">
import SwiperDetection from "@/components/swiperDetection.vue";
import { defineExpose } from "vue";
import { getRemInPixels } from "@/utils/getRemInPixels";
// import getImageUrl from "@/utils/getImageUrl";
interface Icon {
  // src: string;
  value: string;
}

interface State {
  centerX: number;
  centerY: number;
  orbitRadius: number;
  icons: Icon[];
  totalIcons: number;
}
// 定義圖標介面

// 圖標數據
const icons: Icon[] = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "1" },
  { value: "2" },
  { value: "3" }
];

const currentRotation = ref(0);
const rem = ref(getRemInPixels());
const containerRef = ref<HTMLElement | null>(null);

const state: State = reactive({
  centerX: 10 * rem.value, // 中心點X
  centerY: 10 * rem.value, // 中心點Y
  orbitRadius: 4.9 * rem.value, // 軌道半徑
  icons: icons, // 圖標數據
  totalIcons: computed(() => state.icons.length) // 圖標總數
});

// 計算圖標總數
// const totalIcons: number = icons.length;
//
// // 定義中心點坐標（可以根據需要調整）
// const centerX = 100;
// const centerY = 100;
//
// // 定義軌道半徑
// const orbitRadius = 120;

// 當前旋轉角度，使用 ref 使其成為響應式變量

// 計算每個環繞圖標的樣式
const getIconStyle = (index: number): any => {
  // 計算當前圖標的角度
  const angle =
    (index * (360 / state.totalIcons) + currentRotation.value) % 360;
  // 將角度轉換為弧度
  const radian = angle * (Math.PI / 180);
  // 計算 x 和 y 坐標
  const x = state.centerX + Math.sin(radian) * state.orbitRadius;
  const y = state.centerY - Math.cos(radian) * state.orbitRadius;
  const isVisible = angle >= 30 && angle <= 150;
  // 返回樣式對象
  return {
    position: "absolute",
    left: "0px",
    top: "0px",
    transform: `translate(${x}px, ${y}px)`,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transition: "all 0.3s ease" // 添加過渡效果
  };
};

// 更新狀態的函數
const updateState = () => {
  if (containerRef.value) {
    const container = containerRef.value;
    const rect = container.getBoundingClientRect();

    // 計算軌道元素的大小（容器寬度的 10%）
    const elementSize = rect.width * 0.1;

    // 中心點位置需要減去元素尺寸的一半
    state.centerX = rect.width / 2 - elementSize / 2;
    state.centerY = rect.height / 2 - elementSize / 2;

    state.orbitRadius = Math.min(rect.width, rect.height) * 0.4;
  }
};

const onSwiper = (res) => {
  console.log(res);
};

const onSwiperLeftEvent = () => {
  console.log("left");
  rotateRight();
};

const onSwiperRightEvent = () => {
  console.log("right");
  rotateLeft();
};

// 向左旋轉的函數
const rotateLeft = () => {
  currentRotation.value =
    (currentRotation.value + 360 / state.totalIcons) % 360;
};

// 向右旋轉的函數
const rotateRight = () => {
  currentRotation.value =
    (currentRotation.value - 360 / state.totalIcons + 360) % 360;
};

defineExpose({
  rotateLeft,
  rotateRight
});

// 修改生命週期鉤子
onMounted(() => {
  updateState();
  window.addEventListener("resize", updateState);
});

// 記得在組件卸載時移除事件監聽
onUnmounted(() => {
  window.removeEventListener("resize", updateState);
});
</script>

<template>
  <swiper-detection
    @swipe-left="onSwiperLeftEvent"
    @swipe-right="onSwiperRightEvent"
    @swipe-move="onSwiper"
    :use-percentage="true"
    :min-swipe-distance="20"
  >
    <div class="slide-control">
      <div class="slide-control-header">
        <span class="slide-control-header-left-arrow" @click="rotateRight"
          >右邊</span
        >
        {{ "------" }}
        <span class="slide-control-header-right-arrow" @click="rotateLeft"
          >左邊</span
        >
      </div>
      <div class="slide-control-main">
        <div class="container" ref="containerRef">
          <!--        &lt;!&ndash; 中心圖標 &ndash;&gt;-->
          <!--        <div class="center" :style="centerStyle">-->
          <!--          <i class="fa fa-plus"></i>-->
          <!--        </div>-->
          <!-- 環繞的圖標 -->
          <div
            v-for="(icon, index) in icons"
            :key="index"
            class="orbiting-icon"
            :style="getIconStyle(index)"
          >
            {{ index }}
          </div>
        </div>
      </div>
    </div>
  </swiper-detection>
</template>

<style scoped lang="scss">
.slide-control {
  .container {
    position: relative;
    width: 50vw;
    height: 50vw;
    .orbiting-icon {
      width: 10%;
      height: 10%;
      background: red;
      border-radius: 50%;
    }
  }
}
</style>
