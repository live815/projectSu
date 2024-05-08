<template>
  <div class="app-container">
    系统接口
    <i-frame v-model:src="url"></i-frame>
  </div>
</template>

<script setup>
import iFrame from "@/components/iFrame";

const url = ref("/swagger-ui/index.html");
</script>
