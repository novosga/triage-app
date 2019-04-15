import axios from 'axios'

class Client {
  constructor (server) {
    let host = server + ''

    if (!host.endsWith('/')) {
      host += '/'
    }

    this.endpoint = host + 'api'
  }

  request (url, config) {
    config.withCredentials = true

    return new Promise((resolve, reject) => {
      axios
        .request(`${this.endpoint}/${url}`, config)
        .then(response => {
          resolve(response.data)
        }, error => {
          let message = error.message
          if (error.response) {
            message = error.response.statusText
            if (error.response.data && error.response.data.error_description) {
              message += ': ' + error.response.data.error_description
            }
          }
          reject(message)
        })
    })
  }

  priorities (token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    return this.request(`prioridades`, config)
  }

  unities (token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    return this.request(`unidades`, config)
  }

  services (token, unityId) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    return this.request(`unidades/${unityId}/servicos`, config)
  }

  service (token, serviceId) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    return this.request(`servicos/${serviceId}`, config)
  }

  departments (token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    return this.request(`departamentos`, config)
  }

  ticket (token, unityId, serviceId, priorityId, customerId, customerName) {
    const data = {
      unidade: unityId,
      servico: serviceId,
      prioridade: priorityId,
      cliente: {
        nome: customerId,
        documento: customerName
      }
    }

    const config = {
      method: 'post',
      data: data,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    return this.request(`distribui`, config)
  }

  print (token, ticket) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'X-Hash': ticket.hash
      }
    }
    return this.request(`print/${ticket.id}`, config)
  }
}

export { Client }
