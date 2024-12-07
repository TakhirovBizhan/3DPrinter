 <script setup lang="ts">
 import CoilCard from '../PlasticComponents/CoilCard.vue';
  
  </script>
     <template>
         <div>
           <el-carousel class="carousel" indicator-position="" :autoplay="false" trigger="click" arrows="always">
             <el-carousel-item class="content">
                 <CoilCard/>
             </el-carousel-item>
             <el-carousel-item class="content">
                 <CoilCard/>
             </el-carousel-item>
             <el-carousel-item class="content">
                 <CoilCard/>
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