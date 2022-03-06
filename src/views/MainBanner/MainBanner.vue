<template>
  <section class="main-banner">
    <div class="main-banner__carousel">
      <swiper
        :slides-per-view="2"
        :slides-per-group="2"
        :space-between="50"
        :speed="600"
        :navigation="true"
        :lazy="true"
        :allow-touch-move="false"
        :modules="modules"
        class="main-banner__carousel-wrapper"
      >
        <swiper-slide>
          <img
            :data-src="translations['banner1ImgSrc']"
            :alt="translations['banner1ImgAlt']"
            class="banner swiper-lazy"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            :data-src="translations['banner2ImgSrc']"
            :alt="translations['banner2ImgAlt']"
            class="banner swiper-lazy"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            :data-src="translations['banner3ImgSrc']"
            :alt="translations['banner3ImgAlt']"
            class="banner swiper-lazy"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            :data-src="translations['banner4ImgSrc']"
            :alt="translations['banner4ImgAlt']"
            class="banner swiper-lazy"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Lazy, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/lazy";

import translations from "./translations";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      translations,
    };
  },
  setup() {
    return {
      modules: [Lazy, Navigation],
    };
  },
});
</script>

<style src="./MainBanner.scss" lang="scss"></style>
