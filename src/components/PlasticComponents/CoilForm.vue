<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface IPlasticCoil {
  material: string;
  color: string;
  threadLength: number;
  lengthToCut: number;
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IPlasticCoil>({
  material: '',
  color: '',
  threadLength: 0,
  lengthToCut: 0,
})

const lengthToCutValidate = (value: number): boolean => {
    if(ruleForm.threadLength < value){
        return false
    } else {
        return true
    }
}

const rules = reactive<FormRules<IPlasticCoil>>({
  material: [
    { required: true, message: 'Please input coil material', trigger: 'blur' },
  ],
  color: [
    { required: true, message: 'Please input coil color', trigger: 'blur' },
  ],
  threadLength: [
    { required: true, message: 'Please input thread length', trigger: 'blur' },
    { type: 'number', message: 'Thread length must be a number', trigger: 'blur' },
  ],
  lengthToCut: [
    { required: true, message: 'Please input length to cut', trigger: 'blur' },
    { type: 'number', message: 'Length to cut must be a number', trigger: 'blur' },
    { required: lengthToCutValidate(ruleForm.lengthToCut), message: 'length to cut must be same or less then thread Length', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', ruleForm)
    } else {
      console.log('error submit!', fields)
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
      <el-form-item label="Coil material" prop="material">
        <el-input v-model="ruleForm.material" />
      </el-form-item>
      <el-form-item label="Coil color" prop="color">
        <el-input v-model="ruleForm.color" />
      </el-form-item>
      <el-form-item label="Thread length (mm)" prop="threadLength">
        <el-input-number v-model="ruleForm.threadLength" :min="1" :precision="2" :step="0.1" />
      </el-form-item>
      <el-form-item label="Length to cut (mm)" prop="lengthToCut">
        <el-input-number v-model="ruleForm.lengthToCut" :min="1" :precision="2" :step="0.1" />
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>