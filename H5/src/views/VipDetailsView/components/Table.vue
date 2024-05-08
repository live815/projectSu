<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(column, columnIndex) in row" :key="columnIndex">
          <span v-if="columnIndex == 0">VIP</span>
          <span> {{ column === null ? '-' : column }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Number,
    required: true
  },
  columns: {
    type: Number,
    required: true
  },
  columnData: {
    type: Array,
    required: true
  }
})

// const columns = ref(['VIP等级', '累计存款', '累计有效流水', '升级礼金', '生日礼金'])
const tableData = computed(() => {
  const data = []

  for (let i = 0; i < props.rows; i++) {
    const row = []
    for (let j = 0; j < props.columns; j++) {
      row.push(
        i < props.columnData.length && j < props.columnData[i].length ? props.columnData[i][j] : ''
      )
    }
    data.push(row)
  }
  console.log(data, 53)
  return data
})
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 355px;
}
th,
td {
  border: 1px solid #eee;
}
thead {
  width: 100%;
  background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  color: #fff;
  text-align: center;

  font-size: 10px;
  font-weight: 500;
  height: 32px;
}
tbody tr {
  text-align: center;
  height: 32px;
  color: #111;
  text-align: center;

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
}
tbody tr td {
  border: 1px solid #eee;
}

tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

tbody tr:nth-child(even) {
  background-color: #fff5f0;
}
</style>
