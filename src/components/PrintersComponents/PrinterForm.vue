<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import type { PrinterProps } from '@/models/dataProps';
import { usePrinterStore } from '@/store/PrinterStore';

const printerStore = usePrinterStore();

// Форма
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<PrinterProps>({
  mark: '',
  articule: '',
  printingSpeed: 0,
});

// Правила валидации
const rules = reactive<FormRules<PrinterProps>>({
  mark: [
    { required: true, message: 'Please input printer mark', trigger: 'blur' },
  ],
  articule: [
    { required: true, message: 'Please input articule', trigger: 'blur' },
  ],
  printingSpeed: [
    { required: true, message: 'Please input printing speed', trigger: 'blur' },
    { type: 'number', message: 'Printing speed must be a number', trigger: 'blur' },
    { validator: (rule, value) => value > 0, message: 'Speed must be greater than 0', trigger: 'blur' },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        await printerStore.addPrinter(ruleForm);
        if (printerStore.error) {
          ElNotification({
            message: `Error type: ${printerStore.error}`,
            type: 'error',
            customClass: 'message-error',
            duration: 2000,
            position: 'bottom-right',
            showClose: false,
          });
        } else {
          ElNotification({
            customClass: 'message-success',
            message: 'Data submitted successfully',
            type: 'success',
            duration: 2000,
            position: 'bottom-right',
            showClose: false,
          });
          resetForm(formEl);
        }
      } catch (err) {
        ElNotification({
          message: `Error type: ${err}`,
          type: 'error',
          customClass: 'message-error',
          duration: 2000,
          position: 'bottom-right',
          showClose: false,
        });
      }
    } else {
      ElNotification({
        message: `Validation error!`,
        type: 'error',
        customClass: 'message-error',
        duration: 2000,
        position: 'bottom-right',
        showClose: false,
      });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form ref="ruleFormRef" style="max-width: 380px" :model="ruleForm" :rules="rules" label-width="150px"
    class="demo-ruleForm" status-icon>
    <el-form-item label="Printer Mark" prop="mark">
      <el-input v-model="ruleForm.mark" placeholder="Enter printer mark" />
    </el-form-item>

    <el-form-item label="Articule" prop="articule">
      <el-input v-model="ruleForm.articule" placeholder="Enter articule" />
    </el-form-item>

    <el-form-item label="Printing Speed (mm/s)" prop="printingSpeed">
      <el-input-number v-model="ruleForm.printingSpeed" :min="1" placeholder="Set speed" />
    </el-form-item>

    <el-form-item>
      <el-button :loading="printerStore.loading" type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>