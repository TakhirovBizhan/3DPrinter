<template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      status-icon
      size='default'
    >
      <el-form-item label="Printer Mark" prop="mark">
        <el-input v-model="ruleForm.mark" placeholder="Enter printer mark" />
      </el-form-item>
  
      <el-form-item label="Articule" prop="articule">
        <el-input v-model="ruleForm.articule" placeholder="Enter articule" />
      </el-form-item>
  
      <el-form-item label="Plastic Coil" prop="plasticCoil">
        <el-select v-model="ruleForm.plasticCoil" placeholder="Select a plastic coil">
          <el-option
            v-for="coil in plasticCoilOptions"
            :key="coil.material"
            :label="`${coil.material} - ${coil.color}`"
            :value="coil"
          />
        </el-select>
      </el-form-item>
  
      <el-form-item label="Printing Speed (mm/s)" prop="printingSpeed">
        <el-input-number v-model="ruleForm.printingSpeed" :min="1" placeholder="Set speed" />
      </el-form-item>
  
      <el-form-item label="Print Queue" prop="printQueue">
        <el-select
          v-model="ruleForm.printQueue"
          multiple
          clearable
          collapse-tags
          placeholder="Select figures"
          :max-collapse-tags="1"
        >
          <template #header>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAll"
            >
              Select All
            </el-checkbox>
          </template>
          <el-option
            v-for="item in figureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import type { IFigure } from '@/models/dataInterfaces';
  
  // Моковые данные
  const mockFigures: IFigure[] = [
    { modelName: 'Cube', perimetr: 50, creatingTime: 10 },
    { modelName: 'Sphere', perimetr: 60, creatingTime: 15 },
    { modelName: 'Pyramid', perimetr: 40, creatingTime: 12 },
  ];
  
  // Данные для формы
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    mark: '',
    articule: '',
    plasticCoil: null as string | null,
    printingSpeed: 0,
    printQueue: [] as string[],
  });
  
  const rules = reactive<FormRules>({
    mark: [
      { required: true, message: 'Please input printer mark', trigger: 'blur' },
    ],
    articule: [
      { required: true, message: 'Please input articule', trigger: 'blur' },
    ],
    plasticCoil: [
      { required: true, message: 'Please select a plastic coil', trigger: 'change' },
    ],
    printingSpeed: [
      { required: true, message: 'Please input printing speed', trigger: 'blur' },
      { type: 'number', message: 'Printing speed must be a number', trigger: 'blur' },
      { validator: (rule, value) => value > 0, message: 'Speed must be > 0', trigger: 'blur' },
    ],
    printQueue: [
      { required: true, message: 'Please select at least one figure', trigger: 'change' },
    ],
  });
  
  // Данные для select
  const plasticCoilOptions = [
    { material: 'PLA', color: 'Red', threadLength: 500, lengthToCut: 50 },
    { material: 'ABS', color: 'Blue', threadLength: 700, lengthToCut: 70 },
    { material: 'PETG', color: 'Green', threadLength: 800, lengthToCut: 80 },
  ];
  
  const checkAll = ref(false);
  const indeterminate = ref(false);
  const figureOptions = ref(
    mockFigures.map((figure) => ({
      value: figure.modelName,
      label: figure.modelName,
    }))
  );
  
  watch(
    () => ruleForm.printQueue,
    (val) => {
      if (val.length === 0) {
        checkAll.value = false;
        indeterminate.value = false;
      } else if (val.length === figureOptions.value.length) {
        checkAll.value = true;
        indeterminate.value = false;
      } else {
        checkAll.value = false;
        indeterminate.value = true;
      }
    }
  );
  
  const handleCheckAll = (val: boolean) => {
    if (val) {
      ruleForm.printQueue = figureOptions.value.map((opt) => opt.value);
    } else {
      ruleForm.printQueue = [];
    }
  };
  
  // Методы формы
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        console.log('Submit:', ruleForm);
      } else {
        console.log('Validation failed.');
      }
    });
  };
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
  </script>
  
  <style lang="scss">
  .custom-header {
    .el-checkbox {
      display: flex;
      height: unset;
    }
  }
  </style>