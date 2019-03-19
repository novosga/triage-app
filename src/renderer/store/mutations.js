import storage from '../services/storage'

export default {
  updateConfig (state, config) {
    config = config || {}
    state.config = config
    storage.set('config', config)

    const locale = config.locale || 'en'

    state.dict = require(`../../../static/i18n/${locale}.json`)
  },

  updatePriorities (state, priorities) {
    state.priorities = priorities
  },

  updateLastTicket (state, lastTicket) {
    state.lastTicket = lastTicket
  }
}
