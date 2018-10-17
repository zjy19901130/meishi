<template>
    <div class="app-container">        
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
    
    import  Footer from "../components/Footer.vue"
    export default {
        data:function(){
            return {
            
            }
        },
        components:{           
            Footer   
         }
    }
</script>

