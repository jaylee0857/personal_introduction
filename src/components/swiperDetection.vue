<template>
  <div
    ref="swipeElement"
    @mousedown.prevent="handleStart"
    @mousemove.prevent="handleMove"
    @mouseup="handleEnd"
    @mouseleave="handleEnd"
    @touchstart.prevent="handleStart"
    @touchmove.prevent="handleMove"
    @touchend="handleEnd"
  >
    <slot />
  </div>
</template>

<script setup>
// props
const props = defineProps({
  minSwipeDistance: {
    type: Number,
    default: 50
  },
  usePercentage: {
    type: Boolean,
    default: false
  }
});

// 發出事件
const emit = defineEmits(["swipeLeft", "swipeRight", "swipeMove"]);

// 參考到DOM元素
const swipeElement = ref(null);

// 狀態變數
const startX = ref(0);
const startY = ref(0); // 新增Y軸起始位置
const isDragging = ref(false);
const lastX = ref(0);
const lastY = ref(0); // 新增Y軸最後位置

// 計算實際的最小滑動距離
const actualMinSwipeDistance = computed(() => {
  if (!props.usePercentage) return props.minSwipeDistance;

  const elementWidth = swipeElement.value?.clientWidth || 0;
  return elementWidth * (props.minSwipeDistance / 100);
});

// 處理開始事件
const handleStart = (event) => {
  isDragging.value = true;
  event.preventDefault();

  if (event.type.includes("mouse")) {
    startX.value = event.clientX;
    startY.value = event.clientY;
  } else {
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  }

  lastX.value = startX.value;
  lastY.value = startY.value;
};

// 處理移動事件
const handleMove = (event) => {
  if (!isDragging.value) return;
  event.preventDefault();

  const currentX = event.type.includes("mouse")
    ? event.clientX
    : event.touches[0].clientX;
  const currentY = event.type.includes("mouse")
    ? event.clientY
    : event.touches[0].clientY;

  const diffX = currentX - startX.value;
  const diffY = currentY - startY.value;
  const moveDistanceX = currentX - lastX.value;
  const moveDistanceY = currentY - lastY.value;

  // 判斷移動方向是水平還是垂直
  const isHorizontal = Math.abs(diffX) > Math.abs(diffY);

  // 發送每次移動的資訊
  emit("swipeMove", {
    distance: Math.abs(isHorizontal ? moveDistanceX : moveDistanceY),
    direction: isHorizontal
      ? moveDistanceX > 0
        ? "right"
        : "left"
      : moveDistanceY > 0
        ? "right"
        : "left" // 往下觸發right，往上觸發left
  });

  // 更新最後位置
  lastX.value = currentX;
  lastY.value = currentY;

  // 判斷是否達到最小滑動距離
  const significantMove = isHorizontal
    ? Math.abs(diffX) >= actualMinSwipeDistance.value
    : Math.abs(diffY) >= actualMinSwipeDistance.value;

  if (significantMove) {
    if (isHorizontal) {
      // 水平滑動
      if (diffX > 0) {
        emit("swipeRight");
      } else {
        emit("swipeLeft");
      }
      startX.value = currentX;
    } else {
      // 垂直滑動
      if (diffY > 0) {
        // 往下滑
        emit("swipeRight");
      } else {
        // 往上滑
        emit("swipeLeft");
      }
      startY.value = currentY;
    }
  }
};

// 處理結束事件
const handleEnd = (event) => {
  isDragging.value = false;
  event.preventDefault();
};
</script>
