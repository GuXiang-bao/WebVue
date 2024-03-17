<template>
    <div class="card-detali">
        <div class="top-bt">
            <p class="revoke">联系墙🐖撕掉该标签</p>
            <p class="report">举报</p>
        </div>
        <note-card-vue :note="card"></note-card-vue>
        <div class="form">
            <textarea class="message" placeholder="说点什么。。。"></textarea>
            <div class="bt">
                <input type="text" class="name" placeholder="签名">
                <yk-button-vue>確定</yk-button-vue>
            </div>
        </div>
        <p class="title">评论{{ card.comment }}</p>
        <div class="commont">
            <div class="commont-li" v-for="(e, index) in commont" :key="index">
                <div class="user-head" :style="{backgroundImage:portrait[e.imgurl]}"></div>
                <div class="comm-m">
                    <div class="m-top">
                        <p class="name">{{ e.name }}</p>
                        <p class="time">{{ dateOne(e.moment) }}</p>
                    </div>
                    <div class="mm">
                        {{ e.message }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NoteCardVue from './NoteCard.vue';
import YkButtonVue from './YkButton.vue';
import { commont } from '../../mock/index';
import { portrait } from '@/utils/data';
import { dateOne } from '@/utils/yksg';

export default {
    data() {
        return {
            commont: commont.data,
            portrait,
            dateOne,
        }
    },

    props: {
        card: {
            default: {}
        }
    },

    components: {
        NoteCardVue,
        YkButtonVue
    },
}
</script>
<style lang='less' scoped>
.card-detali {
    position: relative;
    padding: 0 @padding-20;

    .top-bt {
        // border: 1px solid red;
        position: fixed;
        top: 0;
        left: 0;
        padding: @padding-20;
        display: flex;

        .revoke {
            color: @primary-color;
            cursor: pointer;
            padding-right: 30px;
            font-size: @size-16;
        }

        .report {
            font-size: @size-16;
            color: @warning-color;
            cursor: pointer;
        }
    }

    .form {

        .message {
            background: none;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            padding: @padding-8;
            box-sizing: border-box;
            width: 100%;
            margin-top: @padding-12;
        }

        .bt {
            display: flex;
            padding-top: 6px;
            justify-content: space-between;
        }

        .name {
            width: 200px;
            box-sizing: border-box;
            padding: 7px;
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            line-height: 20px;

        }
    }

    .title {
        font-weight: 600;
        padding-top: 30px;
    }

    .commont-li {
        display: flex;
        padding-bottom: 30px;

        .user-head {
            flex: none;
            width: 28px;
            height: 28px;
            border-radius: 20px;
            overflow: hidden;
            // background-image: linear-gradient(180deg, rgba(245, 65, 65, 0.50) 0%, #F43F3F 100%);
        }

        .comm-m {
            padding-left: @padding-8;
        }

        .m-top {
            display: flex;
            align-self: center;

            .name {
                font-weight: 600;
            }

            .time {
                font-size: @size-12;
                padding-left: @padding-4;
                color: @gray-3;
            }

            .mm {
                padding-top: @padding-4;
            }
        }
    }
}
</style>