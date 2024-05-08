<template>
    <div class="box">
        <img class="imgBin" src="../../../assets//img/promptLeft.png">
        <div class="txt">
            {{props.title}}
        </div>
        <img class="imgBin" src="../../../assets//img/promptRight.png">
        
    </div>
  </template>
  
  <script setup>
  import { defineProps} from 'vue'
  const props=defineProps(['title'])
  </script>
  
  <style lang="scss" scoped>
  .box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 70px 0 40px 0;
    .txt{  
        margin: 0 50px;
        color: #f3f3f3;
        text-align: center;
        text-shadow: 0px 2.0795845985412598px 4.1591691970825195px rgba(0, 0, 0, 0.20), 0px 2.0795845985412598px 2.0795845985412598px rgba(0, 0, 0, 0.12), 0px 2.0795845985412598px 4.1591691970825195px rgba(0, 0, 0, 0.14);
        font-family: REEJI-HongGuangGB-Flash;
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        text-transform: uppercase;
        // background: linear-gradient(to bottom, #ff0000, #FFFFFF); /* 渐变背景 ff0000*/ 
        // -webkit-background-clip: text; /* 针对 Webkit 内核浏览器，将背景剪切到文本 */
        // color: transparent; /* 使文本透明 */

    }
    .imgBin{
        width: 374px;
        height: 34px;
    }
  }
  </style>
  