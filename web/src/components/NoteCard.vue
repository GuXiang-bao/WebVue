<template>
    <div class="yk-node-card" :style="{ width: width, background:cardColor[card.color] }">
        <div class="top">
            <p class="titme">{{dateOne(card.moment)}}</p>
            <p class="label">{{label[card.type][card.label]}}</p>
        </div>
        <p class="message">{{ card.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon">
                    <span class="iconfont icon-xiai" :class="{ islike:card.like[0].count > 0 }"></span>
                    <span class="value">{{ card.like[0].count }}</span>
                </div>
                <div class="icon">
                    <span class="iconfont icon-liuyan"></span>
                    <span class="value">{{ card.comment }}</span>
                </div>
            </div>
            <div class="name">{{ card.name }}</div>
        </div>
    </div>
</template>

<script>
import { label,cardColor } from '@/utils/data';
import { dateOne } from '@/utils/yksg';
export default {
    data(){
        return{
            label,
            cardColor,
            dateOne,
        }
    },

    props: {
        width: {
            default: '100%',
        },

        note:{
            default:{},
        }
    },
    computed:{
        card(){
            return this.note;
        }
    },

    // created(){
    //     // console.log(this.card);
    // }
}
</script>

<style lang='less' scoped>


.yk-node-card {
    height: 240px;
    padding: 10px 20px 60px;
    box-sizing: border-box;
    position: relative;

    .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;

        p {
            font-size: @size-12;
            color: @gray-3;
        }
    }

    .message {
        height: 140px;
        font-family: fa;
        font-size: @size-14;
        color: @gray-1;
        cursor: pointer;

    }

    .foot {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left: 0;
        padding: 0 @padding-20;
        box-sizing: border-box;
        width: 100%;

        .foot-left {
            display: flex;

            .value {
                font-size: @size-12;
                color: @gray-3;
                line-height: 16px;
                padding-left: @padding-4;
            }

            .iconfont{
                font-size: @size-16;
                color: @gray-3;
            }

            .icon{
                padding-right: @padding-8;
                display: flex;
                align-items: center;
            }

            .icon-xiai{
                cursor: pointer;
                transition: @tr;

                &:hover{
                    color: @like;

                }
            }

            .islike{
                color: @like;
            }
        }
    }

    .name{
        font-family: fa;
        font-size: @size-16;
        color: @gray-1;

    }
}
</style>
