<template>
  <div class="table" :class="{ 'tab-border': border }">
    <table v-for="tableItem in tableData" :key="tableItem.id">
      <thead>
        <tr>
          <th
            v-for="(item, index) in tableItem.columns"
            :key="item.id"
            :class="index === 0 ? '' : 'border-left'"
            :style="{ height, backgroundColor }"
          >
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody v-if="!!tableItem.data.length">
        <tr
          v-for="(rowData, idx) in tableItem.data"
          :key="rowData.id"
          :class="idx !== tableItem.data.length - 1 ? 'border-bottom' : ''"
        >
          <td
            v-for="(cell, cellIndex, index) in rowData"
            :key="index"
            :class="index !== 0 ? 'border-left' : ''"
            :style="{ height, width }"
          >
            {{ cell || '-' }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="border-bottom border-bottom-noData">
          <span>{{ $t('friends.nodata') }}</span>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  tableData: {
    type: Array,
    required: true
  },
  height: {
    type: String
  },
  width: {
    type: String
  },
  backgroundColor: {
    type: String
  },
  border: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.table {
  overflow: hidden;
  border: 1px solid #ccc;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    height: 40px;
    text-align: center;
    font-size: 11px;
  }
  th {
    font-size: 12px;
    background-color: #f2f2f2;
    border-bottom: 1px solid #ccc;
  }
  .border-left {
    border-left: 1px solid #ccc;
  }
  .border-bottom {
    border-bottom: 1px solid #ccc;
  }
  .border-bottom-noData.border-bottom {
    height: 40px;
    line-height: 40px;
    //text-align: center;
    position: relative;
    > span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.tab-border {
  border-radius: 6px;
}
</style>
