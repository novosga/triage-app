import storage from '../services/storage'

export default {
  updateConfig (state, config) {
    config = config || {}
    state.config = config
    storage.set('config', config)

    const locale = config.locale || 'en'

    state.dict = require(`../i18n/${locale}.js`).default
  },

  updatePriorities (state, priorities) {
    state.priorities = priorities
  },

  updateLastTicket (state, lastTicket) {
    state.lastTicket = lastTicket
  }
}
