<script setup lang="ts">
import { defineProps } from "vue";
import { WorkDisplay } from "@/types/home";

defineProps<{
  worksDisplay: WorkDisplay[];
}>();
</script>

<template>
  <div v-for="(item, index) in worksDisplay" :key="index" class="worksDisplay">
    <a class="worksDisplay-link" :href="item.url">
      <img class="worksDisplay-img" :src="item.img" alt="" />
      <div>
        <p class="worksDisplay-summary">{{ item.summary }}</p>
        <p class="worksDisplay-title">{{ item.title }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.worksDisplay {
  font-family: var(--fontConcertOne);

  &-link {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  &-img {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 2px solid var(--dark-200);
    border-radius: 16px;
    aspect-ratio: 3 / 2;
    transform-origin: center; /* 設置以正中間為縮放基準 */
    position: relative;
    overflow: hidden;
    transition: transform 0.5s ease; /* 平滑過渡 */
    width: 100%;
    object-fit: cover;
    @include desktop {
      width: 100%;
    }
  }
  &-summary {
    color: var(--primary-400);
    letter-spacing: 0.8px;
    font-size: 20px;
    font-style: italic;
    line-height: 1;
  }
  &-title {
    color: var(--white);
    letter-spacing: 0.5px;
    font-size: 32px;
    font-style: italic;
    line-height: 1.1;
  }
}

.worksDisplay-img:hover {
  transform: scale(0.9);
}
</style>
