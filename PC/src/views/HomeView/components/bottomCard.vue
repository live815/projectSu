<template >
    <div class="Cbox">
        <div :class="{brand_item:true, brand_item_active:currentCard==index}" 
                v-for="(item,index) in cardBgList" :key="index"
                @mouseenter="handleMouseEnter(index)"
        >
            <div class="brand_item_text">
                <h3 class="title"> {{item.title}} </h3>
                <p  class="subTitle"> {{item.subTitle}} </p>
            </div>
            <div class="brand_item_img_bg" v-if="currentCard==index" :style="{ backgroundImage: `url(${item.imgBg})` }"></div>
            <div class="brand_item_img" v-else>
                <img :src="`${item.img}`">
            </div>
        </div>
    </div>
</template>

<script setup>
import i18n from '@/i18n'
const cardBgList=ref([
    {
        title:i18n.global.t('HomeView.Cstyle'),
        subTitle:i18n.global.t('HomeView.SubTitle_1'),
        img: new URL('../../../assets/img/card01.png', import.meta.url).href,
        imgBg: new URL('../../../assets/img/cardbg01.png', import.meta.url).href
    },
    {
        title:i18n.global.t('HomeView.Title_2'),
        subTitle:i18n.global.t('HomeView.SubTitle_2'),
        img: new URL('../../../assets/img/card02.png', import.meta.url).href,
        imgBg: new URL('../../../assets/img/cardbg02.png', import.meta.url).href
    },
    {
        title:i18n.global.t('HomeView.Title_3'),
        subTitle:i18n.global.t('HomeView.SubTitle_3'),
        img: new URL('../../../assets/img/card03.png', import.meta.url).href,
        imgBg: new URL('../../../assets/img/cardbg03.png', import.meta.url).href
    },
    {
        title:i18n.global.t('HomeView.Title_4'),
        subTitle:i18n.global.t('HomeView.SubTitle_4'),
        img: new URL('../../../assets/img/card04.png', import.meta.url).href,
        imgBg: new URL('../../../assets/img/cardbg04.png', import.meta.url).href
    }
])
const currentCard=ref(0)
const handleMouseEnter = (index) => {
    currentCard.value=index
}
</script>

<style lang="scss" scoped>
.Cbox{
    min-width: 1320px;
    max-width: 1320px;
    margin: 0 auto;
    display: flex;
    column-gap: 20px;
    .brand_item{
        width: 270px;
        height: 250px;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        transition: all .25s linear;
        overflow: hidden;
    }
    .brand_item_active{
        width: 450px !important;
    }
    .brand_item_text{
        display: grid;
        position: absolute;
        top: 74px;
        left: 32px;
        color: #fff;
        row-gap: 12px;
        .title{
            color: var(--100, #FFF);
            
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
        .subTitle{
            color: var(--100, #FFF);
            
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: hsla(0,0%,100%,.8);
            width: 200px;
        }
       
    }
    .brand_item_img_bg{
        width: 100%;
        height: 100%;
        background-size: auto 100%;
        background-repeat: no-repeat;
        border-radius: 8px;
        background-position: 0;
        transition: all .25s linear;
    }
    .brand_item_img{
        width: 100%;
        height: 100%;
        transition: all .25s linear;
    }
    .brand_item img{
        width: 270px;
        height: 250px;
        border-radius: 8px;
    }
}
</style>