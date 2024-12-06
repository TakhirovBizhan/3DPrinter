 
 <script setup lang="ts">
import PrinterCard from '../PrintersComponents/PrinterCard.vue';
 
 </script>
    <template>
        <div>
          <el-carousel class="carousel" indicator-position="true" :autoplay="false" trigger="click" arrows="always">
            <el-carousel-item class="content">
                <PrinterCard/>
            </el-carousel-item>
            <el-carousel-item class="content">
                <PrinterCard/>
            </el-carousel-item>
            <el-carousel-item class="content">
                <PrinterCard :is-print-started="true"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
      
      <style scoped>

      .carousel {
        width: 350px;
        min-height: 615px;
      }
      
      .content {
        min-width: 350px;
        min-height: 615px;
      }
      </style>