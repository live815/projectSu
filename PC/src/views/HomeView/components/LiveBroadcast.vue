<template>
    <div >
        <swiper  
            style="width: 1320px;border: 1px solid red;"
            :modules="[Virtual,Navigation]" 
            :slides-per-view="4"
            :="3"
            :space-between="20" :grabCursor="true" virtual   
            navigation
        >
            <swiper-slide
                class="swiperMain"
                v-for="(slideContent, index) in slides"
                :key="index"
                :virtualIndex="index"
                >{{slideContent}}
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script setup>
    import { Virtual,Navigation } from 'swiper/modules';
    import { Swiper, SwiperSlide} from 'swiper/vue';
    import 'swiper/css';
    import "swiper/scss/navigation";
    const slides = Array.from({ length: 22 }).map(
        (el, index) => `Slide ${index + 1}`
    );
</script>
  
<style lang="scss" scoped>
:deep() .swiper-slide{
    width: 370px !important;
    height: 120px !important;
    flex-shrink: 0;
    background-color: aqua !important;
    margin-top: 30px;
}
</style>
