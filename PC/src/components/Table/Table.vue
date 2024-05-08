<template>
  <div class="table">
    <table v-for="tableItem in tableData" :key="tableItem.id">
      <thead>
        <tr>
          <th
            v-for="(item, index) in tableItem.columns"
            :key="item.id"
            :class="index === 0 ? '' : 'border-left'"
            :style="{ height, backgroundColor }"
          >
            {{ item.label || '-' }}
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
        <tr class="border-bottom">
          <span class="border-bottom-noData">暂无数据</span>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['tableData', 'height', 'width', 'backgroundColor'])
</script>

<style lang="scss" scoped>
* {
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  text-align: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
}
.table {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  th,
  td {
    height: 40px;
    text-align: center;
    font-size: 11px;
  }
  th:first-child,
  td:first-child {
    width: 180px !important;
    white-space: nowrap;
  }
  th {
    font-size: 12px;
    background-color: #1d223c;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .border-left {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
  .border-bottom {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    height: 40px;
    position: relative;
    .border-bottom-noData {
      line-height: 40px;
      position: absolute;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.second-table-row {
  .border-bottom {
    .border-bottom-noData {
      line-height: 40px;
      position: absolute;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
