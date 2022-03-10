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
            :data-src="require('@/assets/images/home/main-banner-1.jpg')"
            :alt="translations.translation('banner1ImgAlt')"
            class="banner swiper-lazy"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            :data-src="require('@/assets/images/home/main-banner-2.jpg')"
            :alt="translations.translation('banner2ImgAlt')"
            class="banner swiper-lazy"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            :data-src="require('@/assets/images/home/main-banner-4.jpg')"
            :alt="translations.translation('banner3ImgAlt')"
            class="banner swiper-lazy"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            :data-src="require('@/assets/images/home/main-banner-4.jpg')"
            :alt="translations.translation('banner4ImgAlt')"
            class="banner swiper-lazy"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Lazy, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import Translations from "@/translations";
import translationsData from "./translations.json";
import "./main-banner.scss";

const translations = new Translations(translationsData);

export default {
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
      modules: [Navigation, Lazy],
    };
  },
};
</script>
