// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    historyLists: []
  },
  mutations: {
    // 更改 数据源state里面的内容
    SET_HISTORY_LISTS(state, history) {
      state.historyLists = history
    }
  },
  // 页面调用的是这个异步方法
  actions: {
    set_history({
      commit,
      state
    }, history) {
      let list = state.historyLists
      list.unshift(history)
      
      // 调用最终修改数据的方法
      commit('SET_HISTORY_LISTS', list)
    }
  },
})

export default store
