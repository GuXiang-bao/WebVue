
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0,
      user:'',
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    getUser(state,n){
      state.user = n;
    }
  }
})

export default store;

