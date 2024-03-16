<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ lbselected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
      <p class="label-list" :class="{ lbselected: nlabel == index }" v-for="(e, index) in label[id]" :key="index"
        @click="selectNode(index)">{{ e }}</p>
    </div>
    <div class="card" :style="{ width: nWidth + 'px' }">
      <note-card-vue v-for="(e, index) in note" :key="index" :note="e" class="card-inner" :width="'288px'"
        :class="{ cardselected: index == cardselected }" @click="seletedCard(index)"></note-card-vue>
    </div>
    <div class="add" :style="{ bottom: addBottom + 'px' }" @click="addCard" v-show="!modal">
      <span class="iconfont icon-tianjia-"></span>
    </div>
    <yk-modal-vue :title="title" @cloose="changeModal" :isModal="modal">
      <new-card-vue :id="id" @addClose="changeModal()" v-if="cardselected==-1"></new-card-vue>
      <card-detail-vue v-if="cardselected != -1"></card-detail-vue>
    </yk-modal-vue>
  </div>
</template>

<script>
import { wallType, label } from '@/utils/data';
import NoteCardVue from '@/components/NoteCard.vue';
import YkModalVue from '@/components/YkModal.vue';
import NewCardVue from '@/components/NewCard.vue';
import CardDetailVue from '@/components/CardDetail.vue';
import { note } from "../../mock/index";

export default {
  data() {
    return {
      wallType,
      label,
      id: 0,          //留言墙与照片墙的切换id
      nlabel: -1,      //当前对应标签
      note: note.data,
      nWidth: 0,       //卡片的宽度
      addBottom: 30,   //add按钮距离底部高度
      title: '写留言', //新建标题
      modal: false,    //是否调用弹窗
      cardselected: -1, //当前选择开片
    }
  },

  components: {
    NoteCardVue,
    YkModalVue,
    NewCardVue,
    CardDetailVue,
  },

  methods: {
    // 切换label
    selectNode(e) {
      this.nlabel = e;
    },

    // note的宽度
    notWidth() {
      //页面宽度
      let wWidth = document.body.clientWidth;
      this.nWidth = Math.floor((wWidth - 120) / 300) * 300;
    },

    //监听页面滚动
    scrollBottom() {

      //距离顶部高度
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      //屏幕高度
      let clientHeight = document.documentElement.clientHeight;

      //内容高度
      let scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + clientHeight + 200 >= scrollHeight) {
        this.addBottom = scrollTop + clientHeight + 230 - scrollHeight
      } else {
        this.addBottom = 30;
      }
    },

    //新建card
    addCard(){
      this.title="写留言";
      this.changeModal();
    },

    //切换弹窗打开与关闭
    changeModal() {
      this.modal = !this.modal;
    },

    //选择卡片
    seletedCard(e) {
      this.title = "";
      if (e != this.cardselected) {
        this.cardselected = e;
        this.modal = true;
      } else {
        this.cardselected = -1;
        this.modal = false;
      }
    }

  },

  mounted() {
    this.notWidth();

    //监听屏幕宽度变化
    window.addEventListener('resize', this.notWidth);

    //监听滚动高度变化
    window.addEventListener('scroll', this.scrollBottom);
  },

  unmounted() {

    //监听屏幕宽度变化
    window.addEventListener('resize', this.notWidth);

    //监听滚动高度变化
    window.addEventListener('scroll', this.scrollBottom);
  }
}
</script>

<style lang="less" scoped>
.wall-message {
  min-height: 700px;
  padding-top: 52px;

  .title {
    padding-top: 48px;
    padding-bottom: @padding-8;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }

  .slogan {
    color: @gray-2;
    text-align: center;

  }

  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .label-list {
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 30px;
      margin: @padding-4;
      color: @gray-2;
      box-sizing: border-box;
      cursor: pointer;
    }

    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;

    .card-inner {
      margin: 6px;
    }

    .cardselected {
      border: 1px solid @primary-color;
    }
  }

  .add {
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;

    .icon-tianjia- {
      color: @gray-10;
      font-size: 24px;
    }
  }

}
</style>