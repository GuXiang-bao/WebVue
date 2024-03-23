<template>
    <div class="wall-index">
        <top-bar></top-bar>
        <video src="@/assets/images/qm1.mp4" autoplay="autoplay" muted="nuted" loop="loop" class="bg-video"></video>
        <router-view></router-view>
        <foot-bar-vue></foot-bar-vue>
    </div>
</template>

<script>
import topBar from '@/components/TopBar.vue';
import FootBarVue from '@/components/FootBar.vue'

import {signIpApi} from '@/api/index'
export default {
    data(){
        return{
            aaa:'',
        }
    },

    components:{
        //组建
        topBar,
        FootBarVue,
    },
    computed:{

    },
    created(){
        this.getUser();
    },
    methods:{
        getUser(){
            signIpApi().then((res) => {
                // console.log(res)
                let user={
                    id:res.ip,
                }

                this.$store.commit('getUser',user);
            })
        }
    }
}

</script>

<style lang="less" scoped>
.wall-index{
    .bg-video{
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        height: 840px;
    }
}
</style>