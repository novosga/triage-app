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
          <div class="columns">
            <div class="column is-4">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.locale'|trans }}
                </label>
                <div class="control is-expanded has-icons-left">
                  <span class="select is-fullwidth">
                    <select v-model="config.locale">
                      <option value="en">English</option>
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
            <div class="column is-5">
              <div class="field">
                <label class="label">&nbsp;</label>
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="config.departments" :value="true">
                    {{ 'settings.label.departments'|trans }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
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

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">
                  {{ 'settings.label.web_hook'|trans }}
                </label>
                <div class="control">
                  <input class="input is-medium" type="url" placeholder="https://" v-model="config.webHook">
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
                <select v-model="config.unity" @change="loadServices">
                  <option></option>
                  <option v-for="unity in unities" :value="unity.id" :key="unity.id">
                    {{ unity.nome }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ 'settings.label.services'|trans }}
            </label>
            <div class="control" v-for="su in services" :key="su.servico.id">
              <label class="checkbox">
                <input type="checkbox" :value="su.servico.id" v-model="config.services">
                {{su.sigla}} - {{su.servico.nome}}
              </label>
            </div>
            <div class="control" v-if="!services || !services.length">
              {{ 'settings.services.empty'|trans }}
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
    ctx.config.departments = !!ctx.config.departments
    ctx.config.services = ctx.config.services || []
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

    if (ctx.fetchUnities && ctx.config.server) {
      ctx.$store.dispatch('fetchUnities')
        .then(() => {}, (error) => {
          ctx.$swal('Oops!', error, 'error')
        })
      ctx.fetchUnities = false
    }

    if (ctx.fetchServices && ctx.config.unity) {
      ctx.$store.dispatch('fetchServices', ctx.config.unity)
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
        fetchUnities: !this.unities,
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
        this.fetchServices = false
      },
      loadServices () {
        this.$store.dispatch('fetchServices', this.config.unity)
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
