<template>
  <div id="home">
    <div class="menu" v-if="showMenu">
      <router-link to="/settings">
        <span class="icon">
          <i class="fa fa-cog"></i>
        </span>
        {{ 'menu.settings'|trans }}
      </router-link>
    </div>
    <!--
      Unity departments
    -->
    <article v-if="page=='departments'" :style="{'background-color': config.pageBgColor, 'color': config.pageFontColor}">
      <header :style="{'background-color': config.headerBgColor}">
        <h1 :style="{'color': config.headerFontColor, 'background-image': logoUrl}">
          <span v-if="config.showTitle">{{'home.departments.title'|trans}}</span>&nbsp;
        </h1>
      </header>
      <section>
        <p v-if="config.showSubtitle">{{ 'home.departments.subtitle'|trans }}</p>
        <div class="columns is-multiline is-mobile">
          <div :class="columnClasses()" v-for="config in enabledDepartments" :key="config.department.id">
            <button type="button" class="button is-xlarge is-block" @click="selectDepartment(config.department)" :style="buttonStyle(config)">
              {{config.department.nome}}
            </button>
          </div>
        </div>
      </section>
      <footer :style="{'background-color': config.footerBgColor, 'color': config.footerFontColor}">
      </footer>
    </article>

    <!--
      Department services
    -->
    <article v-if="page=='department'" :style="{'background-color': config.pageBgColor, 'color': config.pageFontColor}">
      <header :style="{'background-color': config.headerBgColor}">
        <h1 :style="{'color': config.headerFontColor, 'background-image': logoUrl}">
          <span v-if="config.showTitle">{{department.nome}}</span>&nbsp;
        </h1>
      </header>
      <section>
        <p v-if="config.showSubtitle">{{ 'home.services.subtitle'|trans }}</p>
        <div class="columns is-multiline is-mobile">
          <div :class="columnClasses()" v-for="config in departmentServices" :key="config.servicoUnidade.servico.id">
            <button type="button" class="button is-xlarge is-block" @click="selectService(config.servicoUnidade)" :style="buttonStyle(config)">
              {{config.servicoUnidade.servico.nome}}
            </button>
          </div>
        </div>
      </section>
      <footer :style="{'background-color': config.footerBgColor, 'color': config.footerFontColor}">
        <button type="button" class="button is-large" @click="begin">
          <span class="icon is-small">
            <i class="fa fa-chevron-left"></i>
          </span>
          <span>{{ 'home.btn.back'|trans }}</span>
        </button>

        <span class="tag is-dark is-large is-pulled-right" v-if="timer">
          {{timer}}s
        </span>
      </footer>
    </article>

    <!--
      All services
    -->
    <article v-if="page=='allServices'" :style="{'background-color': config.pageBgColor, 'color': config.pageFontColor}">
      <header :style="{'background-color': config.headerBgColor}">
        <h1 :style="{'color': config.headerFontColor, 'background-image': logoUrl}">
          <span v-if="config.showTitle">{{'home.services.title'|trans}}</span>&nbsp;
        </h1>
      </header>
      <section>
        <p v-if="config.showSubtitle">{{ 'home.services.subtitle'|trans }}</p>
        <div class="columns is-multiline is-mobile">
          <div :class="columnClasses()" v-for="config in enabledServices" :key="config.servicoUnidade.servico.id">
            <button type="button" class="button is-xlarge is-block" @click="selectService(config.servicoUnidade)" :style="buttonStyle(config)">
              {{config.servicoUnidade.servico.nome}}
            </button>
          </div>
        </div>
      </section>
      <footer :style="{'background-color': config.footerBgColor, 'color': config.footerFontColor}">
      </footer>
    </article>

    <!--
      Service overview
    -->
    <article v-if="page=='service'" :style="{'background-color': config.pageBgColor, 'color': config.pageFontColor}">
      <header :style="{'background-color': config.headerBgColor}">
        <h1 :style="{'color': config.headerFontColor, 'background-image': logoUrl}">
          <span v-if="config.showTitle">{{servicoUnidade.servico.nome}}</span>&nbsp;
        </h1>
      </header>
      <section>
        <div class="subservices" v-if="subservices.length">
          <p v-if="config.showSubtitle">{{ 'home.service.subtitle'|trans }}</p>
          <ul class="columns is-multiline is-mobile">
            <li v-for="subservice in subservices" :key="subservice.id" class="column is-6">
              {{subservice.nome}}
            </li>
          </ul>
        </div>
        <div class="columns is-multiline is-mobile">
          <div class="column is-6">
            <button type="button" class="button is-xlarge is-block" :style="{'color': config.buttonNormalFontColor,'background-color': config.buttonNormalBgColor}" :disabled="busy" @click="ticket(null)">
              {{ 'home.btn.normal'|trans }}
            </button>
          </div>
          <div class="column is-6">
            <button type="button" class="button is-xlarge is-block" :style="{'color': config.buttonPriorityFontColor,'background-color': config.buttonPriorityBgColor}" :disabled="busy" @click="selectPriority">
              {{ 'home.btn.priority'|trans }}
            </button>
          </div>
        </div>
      </section>
      <footer :style="{'background-color': config.footerBgColor, 'color': config.footerFontColor}">
        <button type="button" class="button is-large" @click="begin">
          <span class="icon is-small">
            <i class="fa fa-chevron-left"></i>
          </span>
          <span>{{ 'home.btn.back'|trans }}</span>
        </button>

        <span class="tag is-dark is-large is-pulled-right" v-if="timer">
          {{timer}}s
        </span>
      </footer>
    </article>

    <!--
      Priorities
    -->
    <article v-if="page=='priorities'" :style="{'background-color': config.pageBgColor, 'color': config.pageFontColor}">
      <header :style="{'background-color': config.headerBgColor}">
        <h1 :style="{'color': config.headerFontColor, 'background-image': logoUrl}">
          <span v-if="config.showTitle">{{servicoUnidade.servico.nome}}</span>&nbsp;
        </h1>
      </header>
      <section>
        <div class="columns is-multiline is-mobile">
          <div class="column is-6" v-for="priority in priorities" :key="priority.id">
            <button type="button" class="button is-danger is-xlarge is-block" :disabled="busy" @click="ticket(priority)">
              {{priority.nome}}
            </button>
          </div>
        </div>
      </section>
      <footer :style="{'background-color': config.footerBgColor, 'color': config.footerFontColor}">
        <button type="button" class="button is-large" @click="begin">
          <span class="icon is-small">
            <i class="fa fa-chevron-left"></i>
          </span>
          <span>{{ 'home.btn.back'|trans }}</span>
        </button>

        <span class="tag is-dark is-large is-pulled-right" v-if="timer">
          {{timer}}s
        </span>
      </footer>
    </article>

    <!--
      Printing
    -->
    <article v-if="page=='printing'" class="printing" :style="{'background-color': config.pageBgColor, 'color': config.pageFontColor}">
      <header :style="{'background-color': config.headerBgColor}">
        <h1 :style="{'color': config.headerFontColor, 'background-image': logoUrl}">
          <span v-if="config.showTitle">{{'home.print.title'|trans}}</span>&nbsp;
        </h1>
      </header>
      <section>
        <p>{{ 'home.print.subtitle'|trans }}</p>
        <div class="columns is-mobile is-centered" v-if="ticketInfo">
          <div class="column is-half is-narrow">
            <div class="tile is-child notification is-warning is-vertical">
              <p class="subtitle">{{ticketInfo.prioridade.nome}}</p>
              <p class="title">{{ticketInfo.senha.format}}</p>
              <p class="subtitle">{{ticketInfo.servico.nome}}</p>
            </div>
          </div>
        </div>
      </section>
      <footer :style="{'background-color': config.footerBgColor, 'color': config.footerFontColor}">
        <button type="button" class="button is-large" @click="begin">
          <span class="icon is-small">
            <i class="fa fa-chevron-left"></i>
          </span>
          <span>{{ 'home.btn.back'|trans }}</span>
        </button>

        <span class="tag is-dark is-large is-pulled-right" v-if="timer">
          {{timer}}s
        </span>
      </footer>
    </article>

    <iframe id="frame-impressao" width="0" height="0" style="border:none;"></iframe>
  </div>
</template>

<script>
  import auth from '@/store/modules/auth'
  import axios from 'axios'
  import socketIO from 'socket.io-client/dist/socket.io'
  import { log } from '@/util/functions'

  let remote = null
  if (!process.env.IS_WEB) {
    remote = require('electron').remote
  }
  
  let socket = null
  let running = false
  let intervalId = 0
  let timeoutId = 0

  function isExpired ($store) {
    return auth.getters.isExpired($store.state.auth)
  }

  function doConnect ($root, $store) {
    const tokens = $store.state.config.server.split('//')
    const schema = tokens[0]
    const host = tokens[1].split('/')[0].split(':')[0]
    const port = 2020
    const url = `${schema}//${host}:${port}`

    log('[websocket] trying connect to websocket server: ' + url)

    socket = socketIO(url, {
      path: '/socket.io',
      transports: ['websocket'],
      secure: true,
      timeout: 2000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 3
    })

    socket.on('connect', () => {
      log('[websocket] connected')
      socket.emit('register triage', {
        unity: $store.state.config.unity
      })
    })

    socket.on('disconnect', () => {
      log('[websocket] disconnected!')
    })
  
    socket.on('connect_error', (evt) => {
      log('[websocket] connect error', evt)
    })

    socket.on('connect_timeout', () => {
      log('[websocket] timeout')
    })
  
    socket.on('reconnect_failed', () => {
      log('[websocket] max attempts reached, ajax polling fallback')
      socket.open()
    })
  
    socket.on('error', (evt) => {
      log('[websocket] error', evt)
    })

    socket.on('register ok', () => {
      log('[websocket] triage registered')
    })
  }

  function connect ($root, $store) {
    if (!$store.state.config || !$store.state.config.server) {
      log('triage no configured yet. go to settings!')
      $root.$router.push('/settings')
      return
    }

    if ($store.getters.isAuthenticated && $store.getters.isExpired) {
      log('token expired, trying to refresh')

      $store.dispatch('token').then(() => {
        log('token refreshed successfully!')
        doConnect($root, $store)
      }, () => {
        log('error on refresh token. go to settings!')
        $root.$router.push('/settings')
      })
    } else {
      doConnect($root, $store)
    }
  }

  function disconnect () {
    if (socket) {
      socket.close()
    }
  }

  function checkToken (ctx, $store) {
    clearTimeout(timeoutId)

    if (!running) {
      log('not running')
      return
    }

    log('checking token. Authenticated: ' + $store.getters.isAuthenticated)

    if ($store.getters.isAuthenticated && isExpired($store)) {
      log('token expired, refreshing')
      $store
        .dispatch('refresh')
        .then(() => {
          log('token refreshed')
          ctx.fetchData()
        }, e => {
          log(e)
        })
    }

    timeoutId = setTimeout(() => {
      checkToken(ctx, $store)
    }, 60 * 1000)
  }

  function b64EncodeUnicode (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1)
    }))
  }

  function desktopPrint (deviceName, response) {
    if (deviceName) {
      let win = new remote.BrowserWindow({ width: 800, height: 600, show: false })
      win.once('ready-to-show', () => {
        if (win) {
          win.hide()
        }
      })
      win.loadURL('data:text/html;charset=utf-8,' + response)
      win.webContents.on('did-finish-load', () => {
        win.webContents.print({
          silent: true,
          printBackground: true,
          deviceName: deviceName
        })
        // close window after print order
        win = null
      })
    }
  }

  function webPrint (response) {
    const iframe = document.getElementById('frame-impressao')
    const base64 = b64EncodeUnicode(response)
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write('<iframe onload="print()" src="data:text/html;charset=UTF-8;base64,' + base64 + '" width="303" height="303" frameborder="0" marginheight="0" marginwidth="0">')
    iframe.contentWindow.document.close()
  }

  export default {
    name: 'home',
    data () {
      return {
        busy: false,
        firstPage: 'allServices',
        page: '',
        enabledServices: [],
        enabledDepartments: [],
        servicoUnidade: null,
        department: null,
        departmentServices: [],
        subservices: [],
        priorities: [],
        customer: {
          id: '',
          name: ''
        },
        ticketInfo: null,
        timer: null,
        startTime: null,
        showMenu: true
      }
    },
    computed: {
      config () {
        return this.$store.state.config
      },
      logoUrl () {
        const url = this.config.logo || '/static/images/logo.png'
        return `url(${url})`
      }
    },
    methods: {
      begin () {
        this.page = this.firstPage
        this.department = null
        this.service = null
        this.ticketInfo = null
        this.timer = null
      },

      tick () {
        if (this.page !== this.firstPage) {
          if (this.timer === null) {
            this.timer = this.startTime
          } else {
            this.timer--
          }
          if (this.timer <= 0) {
            this.timer = null
            this.page = this.firstPage
          }
        }
      },

      selectDepartment (department) {
        this.page = 'department'
        this.department = department
        this.departmentServices = this.enabledServices.filter(s => {
          return s.servicoUnidade.departamento && s.servicoUnidade.departamento.id === department.id
        })
      },

      selectService (su) {
        this.servicoUnidade = su
        if (!su.prioridade || this.priorities.length === 0) {
          this.ticket(null)
        } else {
          this.page = 'service'
        }
      },

      selectPriority () {
        if (this.priorities.length > 1) {
          this.page = 'priorities'
        } else {
          this.ticket(this.priorities[0])
        }
      },

      ticket (priority) {
        this.busy = true
        let promise = Promise.resolve()

        const data = {
          unityId: this.config.unity,
          serviceId: this.servicoUnidade.servico.id,
          priorityId: (priority ? priority.id : 1),
          customer: this.customer
        }
        if (this.config.preTicketWebHook) {
          promise = axios.request(this.config.preTicketWebHook, { method: 'post', data: data })
        }
        promise
          .then(() => {
            this.$store.dispatch('newTicket', data)
              .then((ticket) => {
                socket.emit('new ticket', {
                  unity: data.unityId
                })
                this.print(ticket)
                if (this.config.postTicketWebHook) {
                  axios.request(this.config.postTicketWebHook, { method: 'post', data: ticket })
                }
                this.busy = false
              }, () => {
                this.busy = false
              })
          }, (e) => {
            log(e)
          })
          .catch((e) => {
            log(e)
          })
      },

      print (ticket) {
        this.page = 'printing'
        this.ticketInfo = ticket
        this.$store.dispatch('print', ticket).then((response) => {
          if (this.config.printWebHook) {
            axios.request(this.config.printWebHook, { headers: { 'Content-Type': 'text/html' }, responseType: 'text', method: 'post', data: response })
          }

          if (this.config.printEnabled) {
            if (remote) {
              // Desktop
              desktopPrint(this.config.printer, response)
            } else {
              // Web
              webPrint(response)
            }
          }
        })
      },

      columnClasses () {
        let classes = [ 'column' ]
        switch (this.config.columns) {
          case 1:
            classes.push('is-12')
            break
          case 2:
            classes.push('is-half')
            break
          case 3:
            classes.push('is-one-third')
            break
        }

        return classes.join(' ')
      },

      unlockMenuListener (evt) {
        if (evt.keyCode === 81) {
          this.showMenu = true
        }
      },

      buttonStyle (config) {
        config = (config || {})

        let style = {
          color: config.fontColor || this.config.buttonFontColor,
          backgroundColor: config.bgColor || this.config.buttonBgColor
        }

        return style
      },

      fetchData () {
        this.enabledDepartments = []
        this.enabledServices = []
        let promise = null
        let promises = []

        promise = this.$store.dispatch('fetchPriorities', this.config.unity).then((priorities) => {
          this.priorities = priorities.filter((p) => {
            return p.peso > 0
          })
        })
        promises.push(promise)

        // refreshing saved data
        promise = this.$store.dispatch('fetchDepartments').then((departments) => {
          this.config.departments.forEach(d => {
            const config = JSON.parse(JSON.stringify(d))
            if (config.enabled) {
              config.departament = departments.filter((d2) => d2.id === config.department.id)[0]
              if (config.departament) {
                this.enabledDepartments.push(config)
              }
            }
          })
        })
        promises.push(promise)

        // refreshing saved data
        promise = this.$store.dispatch('fetchServices', this.config.unity).then((services) => {
          this.config.services.forEach(s => {
            const config = JSON.parse(JSON.stringify(s))
            if (config.enabled) {
              const su = services.filter((s2) => s2.servico.id === config.servicoUnidade.servico.id)[0]
              if (su) {
                config.servicoUnidade = su
                this.enabledServices.push(config)
              }
            }
          })
        })
        promises.push(promise)

        Promise.all(promises).then(() => {
          if (this.enabledServices.length === 0) {
            this.$router.push('/settings')
            return
          }

          if (this.enabledServices.length > 1) {
            if (this.config.groupByDepartments && this.enabledDepartments.length > 0) {
              this.firstPage = 'departments'
            } else {
              this.firstPage = 'allServices'
            }
          } else {
            this.firstPage = 'service'
            this.servicoUnidade = this.enabledServices[0].servicoUnidade
          }

          this.begin()
        })
      }
    },
    mounted () {
      document.querySelector('html').style.fontSize = (this.config.scale * 100) + '%'
    },
    beforeMount () {
      connect(this, this.$store)

      const store = this.$store
      const config = store.state.config

      this.showMenu = !store.state.config.lockMenu
      document.addEventListener('keydown', this.unlockMenuListener)

      this.startTime = config.timer || 15

      if (!config || !config.server) {
        this.$router.push('/settings')
        return
      }
      if (!running) {
        running = true
        checkToken(this, store)
      }

      this.fetchData()

      this.intervalId = setInterval(() => {
        this.tick()
      }, 1000)
    },
    beforeDestroy () {
      running = false
      disconnect()
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      document.removeEventListener('keydown', this.unlockMenuListener)
    },
    watch: {
      page () {
        this.timer = null
      }
    }
  }
</script>

<style lang="sass">
  #home
    height: 100%
    position: fixed
    width: 100%
    .menu
      position: fixed
      top: 2vh
      left: 2vw
      background-color: rgba(0,0,0,.5)
      padding: 10px
      border-radius: 8px
      opacity: 0
      z-index: 100
      &:hover
        opacity: 1
        transition: opacity 0.2s ease-in-out
        background-color: rgba(0,0,0,1)
      a
        color: #ffffff

  article
    width: 100%
    height: 100%
    top: 0
    left: 0
    position: fixed
    header
      padding: 1.5rem 2rem
      h1
        color: #ffffff
        font-size: 3rem
        font-weight: bold
        padding: .5rem 0
        text-align: center
        background-repeat: no-repeat
        background-size: contain
    section
      padding: 2rem
      p
        text-align: center
        font-size: 1.5rem
    &.printing
      .is-centered
        padding-top: 2rem
        .tile
          .title
            font-size: 5rem
          .subtitle
            font-size: 2.5rem
    footer
      width: 100%
      padding: 2rem
      position: fixed
      bottom: 0
    .is-block
      width: 100%
      margin-top: 1rem
    .is-xlarge
      font-size: 2.25rem
      line-height: 1
      border-radius: .3rem

    .subservices
      font-size: 1.5rem
      ul
        padding: 2rem 0
</style>
