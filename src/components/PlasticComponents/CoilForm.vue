<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import type { PlasticProps } from '@/models/dataProps';
import { usePlasticStore } from '@/store/PlasticStore';

const plasticStore = usePlasticStore();

// Форма
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<PlasticProps>({
  material: '',
  color: '',
  threadLength: 1,
});

const allowedColors = ['red', 'blue', 'green', 'yellow', 'black'];

// Правила валидации
const rules = reactive<FormRules<PlasticProps>>({
  material: [
    { required: true, message: 'Please input coil material', trigger: 'blur' },
  ],
  color: [
    { required: true, message: 'Please select coil color', trigger: 'change' },
  ],
  threadLength: [
    { required: true, message: 'Please input thread length', trigger: 'blur' },
    { type: 'number', message: 'Thread length must be a number', trigger: 'blur' },
    {
      validator: (rule, value) => value > 0,
      message: 'Thread length must be greater than 0',
      trigger: 'blur',
    },
  ],
});

// Обработчик отправки формы
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        await plasticStore.addPlastic(ruleForm);
        if (plasticStore.error) {
          ElNotification({
            message: plasticStore.error,
            type: 'error',
            customClass: 'message-error',
            duration: 2000,
            position: 'bottom-right',
            showClose: false,
          });
        } else {
          ElNotification({
            customClass: 'message-success',
            message: 'Plastic coil added successfully!',
            type: 'success',
            duration: 2000,
            position: 'bottom-right',
            showClose: false,
          });
          resetForm(formEl);
        }
      } catch (err) {
        ElNotification({
          message: `Error occurred: ${err}`,
          type: 'error',
          customClass: 'message-error',
          duration: 2000,
          position: 'bottom-right',
          showClose: false,
        });
      }
    } else {
      ElNotification({
        message: 'Form validation failed!',
        type: 'error',
        customClass: 'message-error',
        duration: 2000,
        position: 'bottom-right',
        showClose: false,
      });
    }
  });
};

// Сброс формы
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="el-form">
    <el-form-item label="Material" prop="material">
      <el-input v-model="ruleForm.material" placeholder="Enter coil material" />
    </el-form-item>

    <el-form-item label="Color" prop="color">
      <el-select v-model="ruleForm.color" placeholder="Select a color">
        <el-option v-for="color in allowedColors" :key="color" :label="color" :value="color" />
      </el-select>
    </el-form-item>

    <el-form-item label="Thread Length" prop="threadLength">
      <el-input-number :min="1" v-model="ruleForm.threadLength" placeholder="Enter thread length" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Add Coil
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-form {
  max-width: 380px;
  margin: auto;
}
</style>