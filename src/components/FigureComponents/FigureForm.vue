<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import type { FigureProps } from '@/models/dataProps'
import { useFigureStore } from '@/store/FigureStore';


const figureStore = useFigureStore();

// Форма
const dialogFormVisible = ref(false)

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
        await figureStore.addFigure(ruleForm);
        if (figureStore.error) {
          ElNotification({
            message: `Error type: ${figureStore.error}`,
            type: 'error',
            customClass: 'message-error',
            duration: 2000,
            position: 'bottom-right',
            showClose: false
          })
        } else {
          ElNotification({
            customClass: 'message-success',
            message: 'Data submitted successfully',
            type: 'success',
            duration: 2000,
            position: 'bottom-right',
            showClose: false
          })
          resetForm(formEl)
        }
      } catch (err) {
        ElNotification({
          message: `Error type: ${err}`,
          type: 'error',
          customClass: 'message-error',
          duration: 2000,
          position: 'bottom-right',
          showClose: false
        })

      }
    } else {
      ElNotification({
        message: `Validation error!`,
        type: 'error',
        customClass: 'message-error',
        duration: 2000,
        position: 'bottom-right',
        showClose: false
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
  <el-button plain @click="dialogFormVisible = true">
    add new
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="Figure form" width="360">
    <el-form ref="ruleFormRef" style="max-width: 300px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" status-icon>
      <el-form-item label="Model Name" prop="modelName">
        <el-input v-model="ruleForm.modelName" />
      </el-form-item>

      <el-form-item label="Perimeter (mm)" prop="perimetr">
        <el-input-number v-model="ruleForm.perimetr" :min="1" :precision="2" :step="0.1" />
      </el-form-item>

      <el-form-item>
        <el-button :loading="figureStore.loading" type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
