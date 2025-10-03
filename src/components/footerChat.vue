<script setup lang="ts">
import ArchAnimation from "@/components/arch-animation.vue";
import FontMoveAnimation from "@/components/font-move-animation.vue";
import { openUrl } from "@/utils/tool";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app";

const { t } = useI18n();
const appStore = useAppStore();

const mailLink = () => {
  openUrl(`mailto: ${appStore.mail}`, { isBlank: true });
};

defineProps<{
  title: string;
  titleColor?: string;
}>();
</script>

<template>
  <footer class="footerChat page-container">
    <arch-animation
      direction="top"
      color="var(--dark-100)"
      border-radius="8px"
      :archHeight="0.1"
    >
      <div class="footerChat-container">
        <div class="footerChat-block">
          <h1 class="footerChat-title">
            <font-move-animation
              direction="top"
              :title="title"
              class="footerChat-title--text"
              :titleColor="titleColor"
            />
          </h1>
          <div class="footerChat-linkBar">
            <arch-animation color="var(--primary-100)" border-radius="8px">
              <a
                class="footerChat-link"
                :href="appStore.linkedin"
                target="_blank"
              >
                {{ t("footer.chat") }}
              </a>
            </arch-animation>

            <arch-animation color="var(--primary-100)" border-radius="8px">
              <a class="footerChat-link" @click="mailLink">
                {{ t("footer.email") }}
              </a>
            </arch-animation>
          </div>
        </div>
      </div>
    </arch-animation>

    <div class="footerChat-chatBlock">
      <div class="footerChat-chatBlock--bar">
        <p class="footerChat-chatBlock--text">
          {{ t("footer.text") }}
        </p>
        <p class="footerChat-chatBlock--signature">
          {{ t("footer.signature") }}
        </p>
      </div>
      <div class="footerChat-chatBlock--webflow">
        <p class="footerChat-chatBlock--signature">
          {{ t("footer.made") }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footerChat {
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding-top: 88px;
  padding-bottom: 88px;
  @include desktop {
    padding: 64px 24px;
  }
  &-block {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  &-container {
    grid-column-gap: 44px;
    grid-row-gap: 44px;
    color: var(--dark-100);
    border-radius: 16px;
    flex-flow: column;
    width: 100%;
    padding: 88px;
    display: flex;
    position: relative;
    background-color: var(--primary-100);
    justify-content: flex-start;
    align-items: center;
    @include desktop {
      padding: 24px;
    }
  }
  &-title {
    display: flex;
    justify-content: center;
    align-content: center;
    color: var(--white);
    text-transform: uppercase;
    width: 100%;
    font-family: var(--fontConcertOne);
    line-height: 0.95;
    &--text {
      font-size: 180px;
      @include desktop {
        font-size: 16vw;
      }
    }
  }
  &-linkBar {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
    @include tablet {
      flex-direction: column;
    }
  }
  &-link {
    padding: 16px 24px;
    border-radius: 8px;
    color: var(--white);
    background-color: var(--dark-100);
    font-size: 24px;
    font-family: var(--fontConcertOne);
    cursor: pointer;
  }
  &-chatBlock {
    display: flex;
    gap: 44px;
    @include desktop {
      flex-direction: column;
    }
    &--bar {
      display: flex;
      grid-row-gap: 24px;
      background-color: var(--dark-200);
      color: var(--low-contrast-text);
      letter-spacing: 0.2px;
      border-radius: 16px;
      flex-flow: column;
      width: 100%;
      padding: 32px;
      font-size: 14px;
      font-style: italic;
      font-weight: 700;
      line-height: 1.5;
    }
    &--webflow {
      background-color: var(--dark-200);
      color: var(--low-contrast-text);
      border-radius: 16px;
      font-family: var(--fontConcertOne);

      justify-content: flex-end;
      align-items: center;
      width: 100%;
      padding: 32px;
      display: flex;
    }
    &--text {
      letter-spacing: 0.5px;
      text-transform: none;
      font-size: 16px;
      font-style: italic;
      font-weight: 900;
      line-height: 1;
    }
    &--signature {
      font-size: 24px;
      font-family: var(--fontConcertOne);
    }
  }
}
</style>
