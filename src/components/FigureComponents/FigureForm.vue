<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import type { IFigure } from '@/models/dataInterfaces'

// Форма
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IFigure>({
    modelName: '',
    perimetr: 0,
    creatingTime: 0,
})

// Правила валидации
const rules = reactive<FormRules<IFigure>>({
  modelName: [
    { required: true, message: 'Please input the model name', trigger: 'blur' },
  ],
  perimetr: [
    { required: true, message: 'Please input the perimeter', trigger: 'blur' },
    { type: 'number', message: 'Perimeter must be a number', trigger: 'blur' },
    { validator: (rule, value) => value > 0, message: 'Perimeter must be greater than 0', trigger: 'blur' },
  ],
  creatingTime: [
    { required: true, message: 'Please input the creation time', trigger: 'blur' },
    { type: 'number', message: 'Creation time must be a number', trigger: 'blur' },
    { validator: (rule, value) => value > 0, message: 'Creation time must be greater than 0', trigger: 'blur' },
  ],
})

// Методы отправки и сброса формы
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('Submit!', ruleForm)
    } else {
      console.log('Error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 400px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Model Name" prop="modelName">
      <el-input v-model="ruleForm.modelName" />
    </el-form-item>

    <el-form-item label="Perimeter (mm)" prop="perimetr">
      <el-input-number v-model="ruleForm.perimetr" :min="1" :precision="2" :step="0.1" />
    </el-form-item>

    <el-form-item label="Creation Time (sec)" prop="creatingTime">
      <el-input-number v-model="ruleForm.creatingTime" :min="1" :precision="0" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>