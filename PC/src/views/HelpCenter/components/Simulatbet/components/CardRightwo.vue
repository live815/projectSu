<template>
  <div class="card-right">
    <div v-if="props.activeIndex == 0 || props.activeIndex == 1 || props.activeIndex == 3">
      <!-- 第一行阿森纳 -->
      <div class="first-hang">
        <div class="img-box">
          <img src="../img/imageone2x.png" v-if="props.iconShow" />
        </div>
        <div class="screen-content">
          <div
            class="screen-card"
            :class="{ active: item.id == bgIndex }"
            v-for="item in asenaList"
            :key="item.id"
            @click="handleClick(item)"
          >
            <div class="screen-left">{{ item.num1 }}</div>
            <div class="screen-right" :class="{ green: item.imgpath, red: item.imgpathred }">
              <div>{{ item.num2 }}</div>
              <div class="icon-box">
                <img v-if="item.imgpath" :src="item.imgpath" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 第二行切尔西 -->
      <div class="first-hang">
        <div class="img-box">
          <img src="../img/image112x.png" v-if="props.iconShow" />
        </div>
        <div class="screen-content">
          <div
            class="screen-card"
            :class="{ active: item.id == bgIndex }"
            v-for="item in qiexierList"
            :key="item.id"
            @click="handleClick(item)"
          >
            <div class="screen-left">{{ item.num1 }}</div>
            <div class="screen-right" :class="{ green: item.imgpath, red: item.imgpathred }">
              <div>{{ item.num2 }}</div>
              <div class="icon-box">
                <img v-if="item.imgpath" :src="item.imgpath" alt="" />
                <img v-if="item.imgpathred" :src="item.imgpathred" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="props.activeIndex == 2 || props.activeIndex == 4 || props.activeIndex == 5"
      class="win-content"
    >
      <div
        class="win-item"
        :class="{ active: item.id == bgIndex }"
        v-for="item in duyingList"
        :key="item"
        @click="handleClick(item)"
      >
        <div class="screen-left">{{ item.num1 }}</div>
        <div class="screen-right" :class="{ green: item.imgpath, red: item.imgpathred }">
          <div>{{ item.num2 }}</div>
          <div class="icon-box">
            <img v-if="item.imgpath" :src="item.imgpath" alt="" />
            <img v-if="item.imgpathred" :src="item.imgpathred" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  qiexierList: {
    type: Array,
    default: () => []
  },
  asenaList: {
    type: Array,
    default: () => []
  },
  iconShow: {
    type: Boolean
  },
  activeIndex: {
    type: Number
  },
  duyingList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['clickItem'])
const qiexierList = computed(() => props.qiexierList)
const asenaList = computed(() => props.asenaList)
const duyingList = computed(() => props.duyingList)
const bgIndex = ref('')
const resultObj = ref({})
const handleClick = (item) => {
  bgIndex.value = item.id

  resultObj.value = item
  emit('clickItem', resultObj.value)
  // console.log(item, '0000')
}
</script>

<style lang="scss" scoped>
.active {
  background: #323c6f !important;
}
.card-right {
  width: 567px;
  padding: 16px 16px 16px 60px;
  .first-hang:last-child {
    margin-bottom: 0;
  }
  .first-hang {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 8px;
    .img-box {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .screen-content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .screen-card:last-child {
      margin-right: 0 !important;
    }
    .screen-card {
      width: 109px;
      height: 40px;
      background: #23294a;
      border-radius: 2px;
      padding: 0px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      margin-right: 8px;
      .screen-left {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--40, rgba(255, 255, 255, 0.4));
      }
      .screen-right {
        display: flex;
        font-size: 14px;
        font-weight: 700;
        color: var(--100, #fff);
        .icon-box {
          width: 8px;
          height: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .green {
    display: flex;
    color: var(--unnamed, #67c23a) !important;
  }
  .red {
    display: flex;
    color: #e93d3d !important;
  }
  .win-content {
    display: flex;
    align-items: center;
    height: 100%;
    .win-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      height: 40px;
      background: #23294a;
      border-radius: 2px;
      padding: 0px 10px;
      flex-shrink: 0;
      margin-left: 8px;
      .screen-left {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--40, rgba(255, 255, 255, 0.4));
      }
      .screen-right {
        display: flex;
        font-size: 14px;
        font-weight: 700;
        color: var(--100, #fff);
        .icon-box {
          width: 8px;
          height: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
