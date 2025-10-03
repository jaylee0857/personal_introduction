<script setup lang="ts">
import IntroductionCard from "@/components/introductionCard.vue";
import gameCard from "@/components/gameCard.vue";
import SpotifyIframe from "@/components/spotify-iframe.vue";
import getImageUrl from "@/utils/getImageUrl";

import { spotifyEmbed } from "@/types/global";
import { useI18n } from "@/i18n";
import { Vue3Marquee } from "vue3-marquee";
import { ref } from "vue";
import { openUrl } from "@/utils/tool";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();
const { t } = useI18n();
interface WorkItem {
  title: string;
  text: string;
  date: string;
}

const spotifyEmbeds: spotifyEmbed[] = [
  {
    uri: "https://open.spotify.com/embed/track/6oilrypHWm0iylwgX6ujQc?utm_source=generator",
    theme: "dark"
  },
  {
    uri: "https://open.spotify.com/embed/track/7JY1LciLO1MpI3XikSUgzy?utm_source=generator",
    theme: "dark"
  }
];

const spotifyEmbedsTwo: spotifyEmbed[] = [
  {
    uri: "https://open.spotify.com/embed/track/49gU95GpWNOY4hzUWYefjp?utm_source=generator",
    theme: "dark"
  },
  {
    uri: "https://open.spotify.com/embed/track/17KAKg35T2DDLFAVy7MjPb?utm_source=generator&theme=0",
    theme: "dark"
  },
  {
    uri: "https://open.spotify.com/embed/track/3e12wnQn65ERiv96IChro2?utm_source=generator",
    theme: "dark"
  }
];

const worksData = ref<WorkItem[]>([
  {
    title: "傑思數位",
    text: "這份工作我任職了全端工程師開發軟體與軟體串接硬體的功能",
    date: "2024/3 - 至今"
  },
  {
    title: "享亦數位",
    text: "這份工作我擔任前端工程師，與後端合作串接直播視訊的功能",
    date: "2023/8 - 2024/3"
  },
  {
    title: "巨兆數位",
    text: "這份工作我接觸了遊戲產業相關的開發",
    date: "2022/3 - 2023/8"
  },
  {
    title: "群益數位",
    text: "是我第一份前端工程師工作，開發後台系統",
    date: "2021/10 - 2022/2"
  }
]);
</script>

<template>
  <div class="about">
    <div class="about-avatar">
      <img
        class="about-avatar--img"
        src="@/assets/images/card_green.png"
        alt=""
      />
    </div>
    <div class="about-marquee">
      <Vue3Marquee>
        <h2 class="about-marquee--text">{{ t("about.about") }}</h2>
      </Vue3Marquee>
    </div>
    <section class="about-bar page-container">
      <div class="about-left">
        <div class="about-left--title">
          <p class="about-left--title__text">{{ t("about.helloTitle") }}</p>
        </div>
        <div class="about-left--introduce">
          <div class="about-left--introduce__bar">
            <p class="about-left--introduce__text">
              {{ t("about.im") }}
              <span class="about-left--introduce__bright">{{
                t("about.jobTitle")
              }}</span>
              {{ t("about.openingText") }}
            </p>
          </div>
          <button class="connectBtn" @click="openUrl(appStore.linkedin)">
            {{ t("about.button") }}
            <img
              class="connectBtnImg"
              src="../assets/images/icon/link.png"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="about-right">
        <header-host>
          <img
            class="about-right--img"
            src="@/assets/images/card_green.png"
            alt=""
          />
        </header-host>
      </div>
    </section>
    <section class="card-pd">
      <div class="about-introduce">
        <IntroductionCard
          :title="t('about.introductionCard.title')"
          :narrative="t('about.introductionCard.narrative')"
          :content="t('about.introductionCard.connect')"
          :titleColor="'black'"
          :textColor="'black'"
          :contentColor="'black'"
          :fontSize="'8vw'"
        />
        <div
          class="about-introduce--block"
          v-for="(item, index) in worksData"
          :key="index"
        >
          <div class="about-introduce--bar">
            <h1 class="about-introduce--title">{{ item.title }}|</h1>
            <p class="about-introduce--text">{{ item.text }}</p>
          </div>
          <p class="about-introduce--text">{{ item.date }}</p>
        </div>
      </div>
    </section>
    <section class="page-container">
      <div>
        <IntroductionCard
          :title="t('about.introductionCard.title.music')"
          :narrative="t('about.introductionCard.narrative.music')"
          :content="t('about.introductionCard.connect.music')"
          :fontSize="'8vw'"
        />
      </div>
      <div class="spotify grid-col grid-col-two">
        <spotify-iframe
          v-for="({ uri, theme }, index) in spotifyEmbeds"
          :key="`${index}-${uri}`"
          :song-url="uri"
          :theme="theme"
          class="spotify-block"
        ></spotify-iframe>
        <!--        <div-->
        <!--          v-for="(item, index) in spotifyEmbedUrl"-->
        <!--          :key="index"-->
        <!--          class="spotify-block"-->
        <!--        >-->
        <!--          <iframe-->
        <!--            class="spotify-iframe"-->
        <!--            :src="item"-->
        <!--            frameborder="0"-->
        <!--            allowfullscreen-->
        <!--            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"-->
        <!--          >-->
        <!--          </iframe>-->
        <!--        </div>-->
      </div>
      <div class="spotify grid-col grid-col-three">
        <spotify-iframe
          v-for="({ uri, theme }, index) in spotifyEmbedsTwo"
          :key="`${index}-${uri}`"
          :song-url="uri"
          :theme="theme"
          class="spotify-block"
        ></spotify-iframe>
        <!--        <div-->
        <!--          v-for="(item, index) in spotifyEmbedUrl"-->
        <!--          :key="index"-->
        <!--          class="spotify-block"-->
        <!--        >-->
        <!--          <iframe-->
        <!--            class="spotify-iframe"-->
        <!--            :src="item"-->
        <!--            frameborder="0"-->
        <!--            allowfullscreen-->
        <!--            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"-->
        <!--          >-->
        <!--          </iframe>-->
        <!--        </div>-->
      </div>
    </section>
    <section class="card-pd page-section">
      <div>
        <IntroductionCard
          :title="t('about.introductionCard.title.game')"
          :narrative="t('about.introductionCard.narrative.game')"
          :content="t('about.introductionCard.connect.game')"
          :fontSize="'8vw'"
        />
      </div>
      <div class="about-gameCard">
        <gameCard
          :title="t('about.introductionCard.gameTitle.one')"
          :text="t('about.introductionCard.gameText.one')"
          :img="getImageUrl('game/lol.png')"
        />
        <gameCard
          :title="t('about.introductionCard.gameTitle.two')"
          :text="t('about.introductionCard.gameText.two')"
          :img="getImageUrl('worksDisplay/baldursGate.webp')"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/about";
</style>
