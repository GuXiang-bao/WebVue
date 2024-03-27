<template>
    <div class="new-card">
        <div class="colors" v-show="id == 0">
            <p class="color-li" v-for="(e, index) in cardColor1" :key="index" :style="{ background: e }"
                :class="{ colorselected: index == colorSelected }" @click="changColor(index)"></p>
        </div>
        <!-- 照片 -->
        <div class="add-photo" v-if="id == 1">
            <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto">
            <div class="add-bt" v-if="url == ''">
                <span class="iconfont icon-tianjia-"></span>
            </div>
            <div class="chang-bt" v-if="url != ''">
                <span class="iconfont icon-xiugai"></span>
            </div>
            <div class="photo-div"><img :src="url"></div>
        </div>
        <!-- 卡片 -->
        <div class="card-main" :style="{ background: id == 0 ? cardColor[colorSelected] : cardColor[5] }">
            <textarea placeholder="留言。。。" class="message" maxlength="96" v-model="message"></textarea>
            <input type="text" placeholder="签名" class="name" v-model="name">
        </div>
        <div class="labels">
            <p class="title">选择标签</p>
            <div class="label">
                <p v-for="(e, index) in label[id]" :key="index" class="label-li"
                    :class="{ labelselected: index == labelSelected }" @click="changLabel(index)">{{ e }}</p>
            </div>
        </div>
        <div data-v-7dbc48d7="">
            <p class="title" data-v-7dbc48d7="">免责声明</p>
            <p class="mzsm" data-v-7dbc48d7=""> 一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br
                    data-v-7dbc48d7=""> 1、反对宪法所确定的基本原则的；<br data-v-7dbc48d7=""> 2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br
                    data-v-7dbc48d7=""> 3、损害国家荣誉和利益的； <br data-v-7dbc48d7="">4、煽动民族仇恨、民族歧视，破坏民族团结的；<br
                    data-v-7dbc48d7=""> 5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br data-v-7dbc48d7=""> 6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br
                    data-v-7dbc48d7=""> 7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br data-v-7dbc48d7=""> 8、侮辱或者诽谤他人，侵害他人合法权益的；<br
                    data-v-7dbc48d7=""> 9、含有法律、行政法规禁止的其他内容的信息。 </p>
        </div>
        <div class="footbt">
            <yk-button-vue size="max" nom="secondary" @click="colseModal(0)">丢弃</yk-button-vue>
            <yk-button-vue size="max" class="submit" @click="submit()">确定</yk-button-vue>
        </div>
    </div>
</template>
<script>
import { cardColor, cardColor1, label } from "@/utils/data";
import { getObjectURL } from "@/utils/yksg";
import YkButtonVue from "./YkButton.vue";
import { insertWallApi } from "@/api/index";
export default {
    data() {
        return {
            cardColor,
            cardColor1,
            label,
            colorSelected: 0,   //当前选择颜色
            labelSelected: 0,   //当前选择标签
            message: '',         //留言信息
            name: '',            //签名
            user: this.$store.state.user,
            url: '',
        }
    },

    props: {
        //当前在留言墙或照片墙
        id: {
            default: 0,
        }
    },

    components: {
        YkButtonVue,
    },

    methods: {
        //点击切换颜色
        changColor(e) {
            this.colorSelected = e;
        },

        //点击切换标签
        changLabel(e) {
            this.labelSelected = e;
        },

        //关闭窗口
        colseModal(data) {
            this.$emit('addClose', data);
        },

        //提交x新建wall
        submit() {
            let name = '匿名'
            if (this.name) {
                name = this.name;
            }

            let data = {
                type: this.id,
                message: this.message,
                name: name,
                userId: this.user.id,
                moment: new Date(),
                label: this.labelSelected,
                color: 5,
                imgurl: '',
            };
            // console.log(data);

            if (this.message && this.id == 0) {
                data.color = this.colorSelected,
                    insertWallApi(data).then((res) => {
                        console.log(res);
                        let cardD = {
                            type: this.id,
                            message: this.message,
                            name: name,
                            userId: this.user.id,
                            moment: new Date(),
                            label: this.labelSelected,
                            color: this.colorSelected,
                            imgurl: '',
                            id:res.message.insertId,
                            islike:[{count:0}],
                            like:[{count:0}],
                            comcount:[{count:0}],
                            report:[{count:0}],
                            revoke:[{count:0}],
                        };
                        this.$emit("clickbt", cardD);
                        this.message = '';
                        this.$message({ type: "success", message: "留下了你的足迹。" });

                    });
            }
        },

        //图片显示
        showPhoto() {
            let aa = getObjectURL(document.getElementById("file").files[0]);
            this.url = aa;
        },

        //接口测试使用
        aipTest() {
            let data = {
                type: 0,
                message: '测试使用',
                name: '故乡',
                userId: '21',
                moment: new Date(),
                label: 0,
                color: 3,
                imgurl: 'www.huohuo90.com',
            }

            this.axios
                .post("http://localhost:3000/insertwall", data)
                .then((res) => {
                    console.log(res);
                })
        }
    }
}
</script>
<style lang='less' scoped>
.new-card {
    padding: 0 @padding-20 120px;
    position: relative;

    .colors {
        padding-bottom: @padding-12;
        display: flex;
        align-items: center;

        .color-li {
            width: 24px;
            height: 24px;
            margin-right: @padding-8;
            cursor: pointer;

        }

        .colorselected {
            border: 1px solid @primary-color;
        }
    }

    .card-main {
        width: 100%;
        height: 240px;
        padding: 12px;
        box-sizing: border-box;
        transition: @tr;


        .message {
            background: none;
            border: none;
            resize: none;
            padding: @padding-8;
            box-sizing: border-box;
            height: 172px;
            width: 100%;
            font-family: fa;
            font-size: 16px;
        }

        .name {
            width: 100%;
            box-sizing: border-box;
            padding: @padding-8;
            background: none;
            border: #fff 1px solid;
            line-height: 20px;
            font-family: fa;
            font-size: 16px;

        }
    }

    .title {
        color: @gray-1;
        font-weight: 600;
        padding-top: 30px;
    }

    .label {
        display: flex;
        flex-wrap: wrap;
        // border: 1px solid red;
        width: 320px;

        .label-li {
            padding: 2px 10px;
            border-radius: 20px;
            margin: 16px @padding-4 0 0;
            cursor: pointer;
            color: @gray-2;
            transition: @tr;
        }

        .labelselected {
            background: #ebebeb;
            font-weight: 600;
            color: @gray-1;

        }
    }

    .mzsm {
        padding-top: 10px;
        font-size: 12px;
        color: @gray-3;
    }

    .add-photo {
        padding-bottom: 20px;
        position: relative;

        #file {
            position: absolute;
            z-index: 10;
            top: -10;
            height: 74px;
            width: 64px;
            opacity: 0;
            cursor: pointer;
        }

        .add-bt {
            width: 64px;
            height: 64px;
            border: 1px solid @gray-3;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .photo-div {
            max-height: 200px;
            width: 100%;
            background: #f0f0f0;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                width: 100%;
            }
        }

        .chang-bt {
            position: absolute;
            top: 12px;
            left: 12px;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-xiugai {
                color: #fff;
            }
        }
    }

    .footbt {
        padding: @padding-20;
        box-sizing: border-box;
        position: fixed;
        bottom: 52px;
        left: 0;
        background: rgba(255, 255, 255, 0.6);
        width: 100%;
        backdrop-filter: blur(10px);

        .submit {
            margin-left: @padding-20;
            width: 200px;
        }
    }
}
</style>