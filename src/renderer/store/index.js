import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

const state = {
  config: {},
  dict: {},
  priorities: [],
  lastTicket: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
