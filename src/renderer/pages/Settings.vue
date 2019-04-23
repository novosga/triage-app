<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2-desktop is-3-tablet is-3-mobile column-menu">
        <aside class="menu">
          <img src="static/images/logo.png">

          <hr>

          <router-link to="/">
            <span class="icon">
              <i class="fa fa-chevron-left"></i>
            </span>
            {{ 'menu.go_back'|trans }}
          </router-link>

          <p class="menu-label">
            {{ 'menu.general'|trans }}
          </p>

          <ul class="menu-list">
            <li>
              <a @click="showTab('interface')" :class="{'is-active': tab==='interface'}">
                {{ 'menu.interface'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('server')" :class="{'is-active': tab==='server'}">
                {{ 'menu.server'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('services')" :class="{'is-active': tab==='services'}">
                {{ 'menu.services'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('departments')" :class="{'is-active': tab==='departments'}">
                {{ 'menu.departments'|trans }}
              </a>
            </li>
            <li>
              <a @click="showTab('web_hooks')" :class="{'is-active': tab==='web_hooks'}">
                {{ 'menu.web_hooks'|trans }}
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div class="heading">
          <h1 class="title">
            {{ 'settings.title'|trans }}
          </h1>
          <h2 class="subtitle">
            {{ 'settings.subtitle'|trans }}
          </h2>
        </div>

        <hr>

        <form @submit.prevent="save" v-if="tab==='interface'">
          <div class="columns is-gapless">
            <div class="column is-8">
              <div class="columns is-multiline">
                <div class="column is-6">
                  <div class="field">
                    <label class="label">
                      {{ 'settings.label.locale'|trans }}
                    </label>
                    <div class="control is-expanded has-icons-left">
                      <span class="select is-fullwidth">
                        <select v-model="config.locale">
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="pt_BR">Português (Brasil)</option>
                        </select>
                      </span>
                      <span class="icon is-left">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-3">
                  <div class="field">
                    <label class="label">
                      {{ 'settings.label.columns'|trans }}
                    </label>
                    <div class="control is-expanded has-icons-left">
                      <span class="select is-fullwidth">
                        <select v-model="config.columns">
                          <option :value="1">1</option>
                          <option :value="2">2</option>
                          <option :value="3">3</option>
                        </select>
                      </span>
                      <span class="icon is-left">
                        <i class="fa fa-columns"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-3">
                  <div class="field">
                    <label class="label">
                      {{ 'settings.label.scale'|trans }}
                    </label>
                    <div class="control is-expanded has-icons-left">
                      <span class="select is-fullwidth">
                        <select v-model="config.scale">
                          <option :value=".50">50%</option>
                          <option :value=".75">75%</option>
                          <option :value="1.0">100%</option>
                          <option :value="1.25">125%</option>
                          <option :value="1.5">150%</option>
                          <option :value="2">200%</option>
                        </select>
                      </span>
                      <span class="icon is-left">
                        <i class="fa fa-columns"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-8" v-if="isDesktop">
                  <div class="field">
                    <label class="label">
                      {{ 'settings.label.printer'|trans }}
                    </label>
                    <div class="control has-icons-left">
                      <span class="select is-fullwidth">
                        <select v-model="config.printer">
                          <option v-for="p in availablePrinters" :value="p.name" :key="p.name">
                            {{p.name}}
                          </option>
                        </select>
                      </span>
                      <span class="icon is-left">
                        <i class="fa fa-print"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label">
                      {{ 'settings.label.timer'|trans }}
                    </label>
                    <div class="control is-expanded has-icons-left">
                      <span class="select is-fullwidth">
                        <select v-model="config.timer">
                          <option :value="5">5s</option>
                          <option :value="10">10s</option>
                          <option :value="15">15s</option>
                          <option :value="20">20s</option>
                          <option :value="25">25s</option>
                          <option :value="30">30s</option>
                        </select>
                      </span>
                      <span class="icon is-left">
                        <i class="fa fa-clock-o"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-5">
              <div class="field">
                <label class="label">&nbsp;</label>
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="config.printEnabled" :value="true">
                    {{ 'settings.label.print_enabled'|trans }}
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="config.showTitle" :value="true">
                    {{ 'settings.label.show_title'|trans }}
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="config.showSubtitle" :value="true">
                    {{ 'settings.label.show_subtitle'|trans }}
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="config.lockMenu" :value="true">
                    {{ 'settings.label.lock_menu'|trans }}
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="config.groupByDepartments" :value="true">
                    {{ 'settings.label.group_by_departments'|trans }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">

          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.logo'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="url" placeholder="https://" v-model="config.logo">
                </div>
              </div>
            </div>
          </div>

          <h3 class="title">Cores</h3>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.page_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.pageBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.page_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.pageFontColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.header_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.headerBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.header_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.headerFontColor">
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.footer_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.footerBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.footer_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.footerFontColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.button_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.buttonBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.button_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.buttonFontColor">
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.button_priority_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.buttonPriorityBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.button_priority_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.buttonPriorityFontColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.button_normal_bg_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.buttonNormalBgColor">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.button_normal_font_color'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="config.buttonNormalFontColor">
                </div>
              </div>
            </div>
          </div>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='server'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.server'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="url" placeholder="https://" v-model="config.server" @change="changeServer">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.username'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="text" placeholder="" v-model="config.username">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.password'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="password" placeholder="" v-model="config.password">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.client_id'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="text" placeholder="" v-model="config.clientId">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.client_secret'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="password" placeholder="" v-model="config.clientSecret">
            </div>
          </div>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='services'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.unity'|trans }}
            </label>
            <div class="control">
              <div class="select">
                <select v-model="config.unity" @change="changeUnity">
                  <option></option>
                  <option v-for="unity in unities" :value="unity.id" :key="unity.id">
                    {{ unity.nome }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th colspan="2">
                  {{ 'settings.label.services'|trans }}
                </th>
                <th>
                  {{'settings.label.button_color'|trans}}
                </th>
                <th>
                  {{'settings.label.font_color'|trans}}
                </th>
              </tr>
            </thead>
            <tbody v-sortable="config.services">
              <tr v-for="s in config.services" :key="s.servicoUnidade.servico.id">
                <td style="width:20px">
                  <input type="checkbox" v-model="s.enabled" :value="true">
                </td>
                <td>
                  {{s.servicoUnidade.servico.nome}}
                </td>
                <td style="width:200px">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="s.bgColor">
                </td>
                <td style="width:200px">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="s.fontColor">
                </td>
              </tr>
              <tr v-if="!config.services || !config.services.length">
                <td colspan="4">
                  {{ 'settings.services.empty'|trans }}
                </td>
              </tr>
            </tbody>
          </table>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='departments'">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th colspan="2">
                  {{'settings.label.department'|trans}}
                </th>
                <th>
                  {{'settings.label.button_color'|trans}}
                </th>
                <th>
                  {{'settings.label.font_color'|trans}}
                </th>
              </tr>
            </thead>
            <tbody v-sortable="config.departments">
              <tr v-for="d in config.departments" :key="d.department.id">
                <td style="width:20px">
                  <input type="checkbox" v-model="d.enabled" :value="true">
                </td>
                <td>
                  {{d.department.nome}}
                </td>
                <td style="width:200px">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="d.bgColor">
                </td>
                <td style="width:200px">
                  <input class="input is-medium" type="text" placeholder="#000000" v-model="d.fontColor">
                </td>
              </tr>
            </tbody>
          </table>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="save" v-if="tab==='web_hooks'">
          <div class="field">
            <label class="label">
              {{ 'settings.label.pre_ticket_web_hook'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="url" placeholder="https://" v-model="config.preTicketWebHook">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.post_ticket_web_hook'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="url" placeholder="https://" v-model="config.postTicketWebHook">
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.print_web_hook'|trans }}
            </label>
            <div class="control">
              <input class="input is-medium" type="url" placeholder="https://" v-model="config.printWebHook">
            </div>
          </div>

          <hr>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button type="submit" class="button is-primary is-large">
                {{ 'settings.btn.save'|trans }} &nbsp;
                <span class="icon is-small">
                  <i class="fa fa-save"></i>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Sortable from 'sortablejs'

  Vue.directive('sortable', {
    inserted: function (el, binding) {
      const list = (binding.value || [])
      /* eslint-disable no-new */
      new Sortable(el, {
        onEnd: (evt) => {
          const movedItem = list.splice(evt.oldIndex, 1)[0]
          list.splice(evt.newIndex, 0, movedItem)
        }
      })
    }
  })

  let remote = null
  if (!process.env.IS_WEB) {
    remote = require('electron').remote
  }

  function load (ctx) {
    ctx.config = JSON.parse(JSON.stringify(ctx.$store.state.config))
    // defaults
    ctx.config.locale = ctx.config.locale || 'en'
    ctx.config.columns = ctx.config.columns || 2
    ctx.config.timer = ctx.config.timer || 10
    ctx.config.groupByDepartments = !!ctx.config.groupByDepartments
    ctx.config.services = ctx.config.services || []
    ctx.config.departments = ctx.config.departments || []
    ctx.config.pageBgColor = ctx.config.pageBgColor || '#FFFFFF'
    ctx.config.pageFontColor = ctx.config.pageFontColor || '#000000'
    ctx.config.headerBgColor = ctx.config.headerBgColor || '#4FC08D'
    ctx.config.headerFontColor = ctx.config.headerFontColor || '#FFFFFF'
    ctx.config.footerBgColor = ctx.config.footerBgColor || '#F1F1F1'
    ctx.config.footerFontColor = ctx.config.footerFontColor || '#FFFFFF'
    ctx.config.buttonBgColor = ctx.config.buttonBgColor || '#00C4A7'
    ctx.config.buttonFontColor = ctx.config.buttonFontColor || '#FFFFFF'
    ctx.config.buttonNormalBgColor = ctx.config.buttonNormalBgColor || '#209CEE'
    ctx.config.buttonNormalFontColor = ctx.config.buttonNormalFontColor || '#FFFFFF'
    ctx.config.buttonPriorityBgColor = ctx.config.buttonPriorityBgColor || '#FF3860'
    ctx.config.buttonPriorityFontColor = ctx.config.buttonPriorityFontColor || '#FFFFFF'

    if (ctx.config.scale === undefined) {
      ctx.config.scale = 1
    }

    if (ctx.config.printEnabled === undefined) {
      ctx.config.printEnabled = true
    }

    if (ctx.config.showTitle === undefined) {
      ctx.config.showTitle = true
    }

    if (ctx.config.showSubtitle === undefined) {
      ctx.config.showSubtitle = true
    }

    if (ctx.fetchUnities && ctx.config.server) {
      ctx.loadUnities()
      ctx.fetchUnities = false
    }

    if (ctx.fetchDepartments && ctx.config.server) {
      ctx.loadDepartments()
      ctx.fetchDepartments = false
    }

    if (ctx.fetchServices && ctx.config.unity) {
      ctx.loadServices()
      ctx.fetchServices = false
    }

    ctx.initialClientId = ctx.config.clientId
    ctx.initialClientSecret = ctx.config.initialClientSecret
    ctx.initialUsername = ctx.config.initialUsername
    ctx.initialPassword = ctx.config.initialPassword
  }

  export default {
    name: 'Settings',
    data () {
      return {
        tab: 'interface',
        config: {},
        initialClientId: null,
        initialClientSecret: null,
        initialUsername: null,
        initialPassword: null,
        servicesConfig: [],
        fetchUnities: !this.unities,
        fetchDepartments: !this.departments,
        fetchServices: !this.services
      }
    },
    computed: {
      unities () {
        return this.$store.state.settings.unities
      },
      services () {
        return this.$store.state.settings.services
      },
      departments () {
        return this.$store.state.settings.departments
      },
      activeDepartments () {
        return this.departments.filter(d => {
          return d.ativo
        })
      },
      isCredentialChanged () {
        return (
          this.initialClientId !== this.config.clientId ||
          this.initialClientSecret !== this.config.initialClientSecret ||
          this.initialUsername !== this.config.initialUsername ||
          this.initialPassword !== this.config.initialPassword
        )
      },
      isDesktop () {
        return !!remote
      },
      availablePrinters () {
        if (remote) {
          return remote.getCurrentWebContents().getPrinters()
        }
        return []
      }
    },
    methods: {
      showTab (tab) {
        this.tab = tab
      },
      changeServer () {
        this.config.unity = null
        this.fetchUnities = true
        this.fetchDepartments = true
        this.fetchServices = false
      },
      changeUnity () {
        this.loadServices()
      },
      loadUnities () {
        this.$store.dispatch('fetchUnities').then(() => {}, (error) => {
          this.$swal('Oops!', error, 'error')
        })
      },
      loadServices () {
        this.$store.dispatch('fetchServices', this.config.unity).then(() => {
          const current = this.config.services
          const services = [].concat(this.services)
          this.config.services = []
          // keeping saved config order
          for (let c of current) {
            for (let s of this.services) {
              if (s.servico.id === c.servicoUnidade.servico.id) {
                this.config.services.push(c)
                services.splice(services.indexOf(s), 1)
                break
              }
            }
          }
          // appeding new services
          this.config.services = this.config.services.concat(services.map(su => {
            return {
              enabled: false,
              servicoUnidade: su,
              buttonColor: null,
              fontColor: null
            }
          }))
        })
      },
      loadDepartments () {
        this.$store.dispatch('fetchDepartments').then(() => {
          const current = this.config.departments
          const departments = [].concat(this.activeDepartments)
          this.config.departments = []
          // keeping saved config order
          for (let c of current) {
            for (let d of this.activeDepartments) {
              if (d.id === c.department.id) {
                this.config.departments.push(c)
                departments.splice(departments.indexOf(d), 1)
                break
              }
            }
          }
          // appeding new departments
          this.config.departments = this.config.departments.concat(departments.map(d => {
            return {
              enabled: false,
              department: d,
              buttonColor: null,
              fontColor: null
            }
          }))
        })
      },
      save () {
        this.$store.dispatch('saveConfig', this.config)

        const token = (!this.$store.getters.isAuthenticated ||
          this.$store.getters.isExpired ||
          this.isCredentialChanged
        )

        let promise

        if (token) {
          promise = this.$store.dispatch('token')
        } else {
          promise = Promise.resolve()
        }

        promise.then(() => {
          this.$swal('Success', 'Configuration Ok', 'success')
          load(this)
        }, error => {
          this.$swal('Oops!', error, 'error')
        })
      }
    },
    mounted () {
      document.querySelector('html').style.fontSize = (this.config.scale * 100) + '%'
    },
    beforeMount () {
      load(this)
    }
  }
</script>

  <style lang="sass">
    aside
      img
        height: 60px
    .columns .column
      padding: 2rem
  </style>
