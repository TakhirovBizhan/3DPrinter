<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, type ComponentSize, type FormInstance, type FormRules } from 'element-plus'
import type { FigureProps } from '@/models/dataProps'
import { figureRep } from '@/repositories/FigureRep';

// Форма
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<FigureProps>({
  modelName: '',
  perimetr: 0,
})

// Правила валидации
const rules = reactive<FormRules<FigureProps>>({
  modelName: [
    { required: true, message: 'Please input the model name', trigger: 'blur' },
  ],
  perimetr: [
    { required: true, message: 'Please input the perimeter', trigger: 'blur' },
    { type: 'number', message: 'Perimeter must be a number', trigger: 'blur' },
    { validator: (rule, value) => value > 0, message: 'Perimeter must be greater than 0', trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const { data, error } = await figureRep.post(ruleForm);
        if (error) {
          ElNotification({
            title: 'Error',
            message: `Error type: ${error}`,
            type: 'error',
            zIndex: 9999,
            position: 'top-right'
          })
        } if (data) {
          ElNotification({
            title: 'Success',
            message: 'Data submitted successfully',
            type: 'success',
            zIndex: 9999,
            position: 'top-right'
          })
          resetForm(formEl)
        }
      } catch (err) {
        ElNotification({
          title: 'Error',
          message: `Error type: ${err}`,
          type: 'error',
          zIndex: 9999,
          position: 'top-right'
        })
      }
    } else {
      ElNotification({
        title: 'Prompt',
        message: 'This is a message that does not automatically close',
        duration: 0,
      })
    }
  });
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-form ref="ruleFormRef" style="max-width: 380px" :model="ruleForm" :rules="rules" label-width="auto"
    class="demo-ruleForm" :size="formSize" status-icon>
    <el-form-item label="Model Name" prop="modelName">
      <el-input v-model="ruleForm.modelName" />
    </el-form-item>

    <el-form-item label="Perimeter (mm)" prop="perimetr">
      <el-input-number v-model="ruleForm.perimetr" :min="1" :precision="2" :step="0.1" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-message {
  background-color: black !important;
  height: fit-content !important;
  position: fixed !important;
  z-index: 9999 !important;

}
</style>