<script lang="ts" setup>
import { usePrinterStore } from '@/store/PrinterStore';
import { onMounted } from 'vue';


defineProps({
  id: { type: String, required: true },
});

const printerStore = usePrinterStore();

onMounted(async () => {
  await printerStore.fetchPrinters();
});



const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<template>
  <h3>Print queue</h3>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column prop="perimetr" label="Perimetr" width="120" />
    <el-table-column prop="date" label="Date" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button type="primary" size="small" @click="handleClick">
          remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
