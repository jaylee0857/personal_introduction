<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

interface Props {
  title: string;
  direction: "top" | "bottom";
  titleColor: string;
  fontSize?: string;
}

// 預設參數
const props = withDefaults(defineProps<Props>(), {
  direction: "bottom"
});

const animationDelay = 50; // 每個字母動畫的延遲
const animationDuration = 300; // 每個字母動畫的持續時間

// 計算字母陣列
const fontsAry = computed(() => props.title?.split(""));

// 監聽 Intersection Observer 是否觸發
const isVisible = ref(false);
let observer: IntersectionObserver | null = null; // 用來存儲 Intersection Observer 實例

const generateRandomId = (length: number = 8): string => {
  // 定義可用的字元集合，包括大小寫字母與數字
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = ""; // 初始化結果字串
  for (let i = 0; i < length; i++) {
    // 隨機選取一個字元並追加到結果字串
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result; // 返回生成的字串
};

const elementId = generateRandomId();

// 定義觀察目標並處理可見性
const observeFontWrap = () => {
  const target = document.getElementById(`${elementId}`); // 獲取 font-wrap 元素
  if (!target) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true; // 元素進入可視範圍
          // observer?.disconnect(); // 停止監聽，避免重複觸發
        } else {
          isVisible.value = false; // 元素離開可視範圍
        }
      });
    },
    {
      root: null, // 使用視窗作為根
      rootMargin: "0px", // 可選，調整觸發範圍
      threshold: 0.5 // 當元素 50% 可見時觸發
    }
  );

  observer.observe(target); // 開始觀察目標元素
};

// 組件掛載時啟動觀察
onMounted(() => {
  observeFontWrap();
});

// 組件卸載時清除監聽
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect(); // 停止監聽
    observer = null; // 清除實例
  }
});
</script>

<template>
  <div class="font-wrap" :id="elementId" :class="{ visible: isVisible }">
    <span
      class="font-item"
      v-for="(font, index) in fontsAry"
      :key="`${index}-${font}`"
      :class="`font-item-${direction}`"
      :style="`--animation-delay:${index * animationDelay}ms; --animate-duration: ${animationDuration}ms; color: ${titleColor}; font-size:${fontSize};opacity: ${font !== ' ' ? '1' : '0'}`"
    >
      <template v-if="font === ' '">{{ "1" }}</template>
      <template v-else>
        {{ font }}
      </template>
    </span>
  </div>
</template>

<style scoped lang="scss">
.font-wrap {
  display: flex;
  align-items: center;
  overflow-y: hidden;
  //font-size: 2rem;

  // 當元素進入可視範圍時，加入 visible 樣式
  &.visible .font-item-bottom {
    animation: slideDown var(--animate-duration) var(--animation-delay) forwards;
  }

  &.visible .font-item-top {
    animation: slideUp var(--animate-duration) var(--animation-delay) forwards;
  }
}

.font-item {
  display: flex;
  color: #ffffff;

  // 預設樣式
  &-bottom {
    transform: translateY(-100%);
  }

  &-top {
    transform: translateY(100%);
  }
}
</style>
