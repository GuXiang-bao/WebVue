<template>
    <div class="top-bar">
        <div class="logo">
            <img src="@/assets/images/yksg.svg" class="logo-img">
            <p class="logo-name">一刻時光</p>
        </div>
        <div class="menu">
            <yk-button-vue :nom="id==0?'cprimary':'csecondary'" class="menu-message" @click="changWall(0)">留言墻</yk-button-vue>
            <yk-button-vue :nom="id==1?'cprimary':'csecondary'" class="menu-photo" @click="changWall(1)">照片墻</yk-button-vue>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
  </template>
  <script>
  import YkButtonVue from './YkButton.vue';
  export default{
        data(){
            return {

            }
        },

        components:{
            YkButtonVue,
        },

        computed:{
            id(){
                return this.$route.query.id;
            }
        },

        methods:{

        //切换
        changWall(e){
            this.$router.push({
                query:{id:e},
            })
        }

        }
  }
  </script>
  
  <style lang="less" scoped>
  .top-bar{
    width: 100%;
    height: 52px;
    background: rgba(255,255,255,0.80);
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    .logo{
        display: flex;
        align-items: center;
        width: 300px;
        .logo-name{
            font-size: 20px;
            color: @gray-1;
            font-weight: 600;
            padding-left: 10px;
        }
    }
    .menu{
        .menu-message{
            margin-right: 24px;
        }
    }
    .user{
        width: 300px;
        .user-head{
            float: right;
            border-radius: 50%;
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, rgba(245,65,65,0.50) 0%, #F43F3F 100%);
        }
    }
  }
  </style>