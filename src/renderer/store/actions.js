import storage from '@/services/storage'
import { Client } from '@/services/api'

export const loadConfig = ({ commit }) => {
  const config = storage.get('config', {})
  commit('updateConfig', config)
}

export const saveConfig = ({ commit }, config) => {
  commit('updateConfig', config)
}

export const fetchPriorities = ({ state, commit, rootState }) => {
  return new Promise((resolve, reject) => {
    const api = new Client(rootState.config.server)

    api
      .priorities(rootState.auth.accessToken)
      .then(data => {
        commit('updatePriorities', data)
        resolve(data)
      }, error => {
        reject(error)
      })
  })
}

export const newTicket = ({ state, commit, rootState }, { unityId, serviceId, priorityId, customer }) => {
  return new Promise((resolve, reject) => {
    const api = new Client(rootState.config.server)

    api
      .ticket(rootState.auth.accessToken, unityId, serviceId, priorityId, customer.id, customer.name)
      .then(data => {
        commit('updateLastTicket', data)
        resolve(data)
      }, error => {
        reject(error)
      })
  })
}

export const print = ({ state, commit, rootState }, ticket) => {
  return new Promise((resolve, reject) => {
    const api = new Client(rootState.config.server)

    api
      .print(rootState.auth.accessToken, ticket)
      .then(data => {
        resolve(data)
      }, error => {
        reject(error)
      })
  })
}
