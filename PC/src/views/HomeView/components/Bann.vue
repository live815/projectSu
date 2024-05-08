<template>
    <div class="boox">
        <el-carousel ref="sildeCarousel" arrow="never" indicator-position="none" height="120px" :pause-on-hover="false"  :current-index="currentIndex">
            <el-carousel-item v-for="item in advertisementList" :key="item">
                <div class="swiper-slide"
                        :class="[currentIndex==index?'item swiper-slide-active':'item'] "
                    >
                        <div class="content_box" @click="goSlide(index)">
                            <div class="icon_box">
                                <div class="promo_img">
                                    <img :src="item.srcImg" class="el-image__inner">
                                </div>
                            </div>
                            <div class="content_right">
                                <p class="title">{{ item.title }}</p>
                                <p class="time">{{ item.content_box }}</p>
                            </div>
                        </div>
                    </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>
import i18n from '@/i18n'   
import {reactive,ref} from 'vue';
const sildeCarousel=ref()
const currentIndex=ref(0)
const advertisementList=reactive([
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group1/M00/01/78/rBSMGGT26K-AfIa3AAAgYA4osw4274.jpg',
        title:i18n.global.t('HomeView.Banner_1'),
        content_box:i18n.global.t('HomeView.Content_box_1')
    },
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group2/M00/00/2E/rBSHwWT1PXaANCJZAAAPJetv4cs459.jpg',
        title:i18n.global.t('HomeView.Banner_2'),
        content_box:i18n.global.t('HomeView.Content_box_2')
    },
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group1/M00/00/2D/rBSHwGTxueKAFktOAAAM-Lh2l0k193.jpg',
        title:i18n.global.t('HomeView.Banner_3'),
        content_box:i18n.global.t('HomeView.Content_box_3')
    },
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group1/M00/01/78/rBSMGGT24MqABkqFAAAK4niC9BY840.jpg',
        title:i18n.global.t('HomeView.Banner_4'),
        content_box:i18n.global.t('HomeView.Content_box_4')
    },
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group1/M00/00/2E/rBSHwGT1t-2AXg0lAAALLk0lhcU122.jpg',
        title:i18n.global.t('HomeView.Banner_5'),
        content_box:i18n.global.t('HomeView.4')
    },
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group1/M00/00/2E/rBSHwGT1t-2AXg0lAAALLk0lhcU122.jpg',
        title:i18n.global.t('HomeView.Banner_6'),
        content_box:i18n.global.t('HomeView.Content_box_4')
    },
    {
        srcImg:'https://h86-lx-fdfs.owproofing.com/group1/M00/00/2E/rBSHwGT1t-2AXg0lAAALLk0lhcU122.jpg',
        title:i18n.global.t('HomeView.Banner_7'),
        content_box:i18n.global.t('HomeView.Content_box_4')
    }
])
</script>
<style lang="scss" scoped>
.boox{
    width: 1080px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
}
.t1{
    width: 180px;
    background-color: aqua;
}
.boox ::deep(){
    .el-carousel--horizontal{
        overflow: unset;
    }
}
:deep() .el-carousel--horizontal{
    width: 200px;
    overflow: unset;
}
.swiper-slide{
    width: 200px;
    // padding-top: 40px;
    // display: flex;
    // align-items: center;
    // overflow: hidden;
    // column-gap: 15px;
    .item{
        width: 100%;
        height: 44px;
        border-radius: 8px;
        margin-right: 12px;
        z-index: 99;
    }
    .content_box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .icon_box{
        opacity: .7;
        width: 44px;
        height: 44px;
        margin-right: 8px;
        border-radius: 4px;
        img{
            width: 44px;
            height: 44px;
            border-radius: 4px;
        }
    }
    .promo_img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .content_right{
        opacity: .7;
        height: 48px;
        color: #fff;
        font-weight: regular;
        font-size: 12px;
        .title{
            font-size: 14px;
            margin-bottom: 4px;
            line-height: 21px;
        }
        .time{
            color: hsla(0,0%,100%,.6);
            font-weight: regular;
            font-size: 12px;
            line-height: 18px;
            width: 145px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 4px;
        }
    }
}


.swiper-slide-active .content_right,.swiper-slide-active .icon_box{
    opacity: 1!important
}

.swiper-slide-active .dot{
    opacity: 1;
    background-color: #FF5000!important
}

.swiper-slide-active .bg_line{
    background-color: #FF5000!important
}

.swiper-slide-active .line_wrapper{
    width: 207px!important;
    transition: all 3s linear
}
</style>