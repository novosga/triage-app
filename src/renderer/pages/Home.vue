<template>
  <div id="home">
    <!--
      Unity departments
    -->
    <article v-if="page=='departments'">
      <header>
        <h1>
          Departamentos
        </h1>
      </header>
      <section>
        <p>Escolha o departamento aonde deseja atendimento</p>
        <div class="row">
          <div class="col-6" v-for="department in departments" :key="department.id">
            <button type="button" class="btn btn-secondary btn-xl btn-block mt-2" @click="selectDepartment(department)">
              {{department.nome}}
            </button>
          </div>
        </div>
      </section>
      <footer>
      </footer>
    </article>

    <!--
      Department services
    -->
    <article v-if="page=='department'">
      <header>
        <h1>{{department.nome}}</h1>
      </header>
      <section>
        <p>Escolha o serviço desejado</p>
        <div class="row">
          <div class="col-6" v-for="service in services" :key="service.id">
            <button type="button" class="btn btn-secondary btn-xl btn-block mt-2" @click="selectService(service)">
              {{service.nome}}
            </button>
          </div>
        </div>
      </section>
      <footer>
        <button type="button" class="btn btn-secondary btn-lg" @click="begin">
          Voltar
        </button>
      </footer>
    </article>

    <!--
      Service overview
    -->
    <article v-if="page=='service'">
      <header>
        <h1>{{service.nome}}</h1>
      </header>
      <section>
        <p>Atividades executadas pelo serviço escolhido</p>
        <div class="subservices">
          <ul class="row">
            <li v-for="subservice in subservices" :key="subservice.id" class="col-6">
              {{subservice.nome}}
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-6">
            <button type="button" class="btn btn-primary btn-xl btn-block mt-2">
              Normal
            </button>
          </div>
          <div class="col-6">
            <button type="button" class="btn danger btn-xl btn-block mt-2">
              Prioridade
            </button>
          </div>
        </div>
      </section>
      <footer>
        <button type="button" class="btn btn-secondary btn-lg" @click="begin">
          Voltar
        </button>
      </footer>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        page: 'departments',
        department: null,
        departments: [
          {
            id: 1,
            nome: 'Departamento 1'
          },
          {
            id: 2,
            nome: 'Departamento 2'
          },
          {
            id: 3,
            nome: 'Departamento 3'
          },
          {
            id: 4,
            nome: 'Departamento 4'
          }
        ],
        services: [
          {
            id: 1,
            nome: 'Serviço 1'
          },
          {
            id: 2,
            nome: 'Serviço 2'
          },
          {
            id: 3,
            nome: 'Serviço 3'
          },
          {
            id: 4,
            nome: 'Serviço 4'
          },
          {
            id: 5,
            nome: 'Serviço 5'
          },
          {
            id: 6,
            nome: 'Serviço 6'
          }
        ],
        subservices: [
          {
            id: 1,
            nome: 'Subserviço 1'
          },
          {
            id: 2,
            nome: 'Subserviço 2'
          },
          {
            id: 3,
            nome: 'Subserviço 3'
          }
        ]
      }
    },
    methods: {
      begin (department) {
        this.page = 'departments'
        this.department = null
        this.service = null
      },

      selectDepartment (department) {
        this.page = 'department'
        this.department = department
      },

      selectService (service) {
        this.page = 'service'
        this.service = service
      }
    }
  }
</script>

<style>
  article {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
  }

  article header {
    padding: 1.5rem 2rem;
    background-color: #4fc08d;
  }

  article header h1 {
    color: #ffffff;
    font-size: 3rem;
    font-weight: bold;
    padding: .5rem 0;
    text-align: center;
    background-image: url('/static/images/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  article section p {
    text-align: center;
    font-size: 1.5rem;
  }

  article footer {
    width: 100%;
    padding: 2rem;
    position: fixed;
    bottom: 0;
    background-color: #f1f1f1;
  }

  article .btn-xl {
    padding: 1.5rem 1rem;
    font-size: 2.25rem;
    line-height: 1.5;
    border-radius: .3rem;
  }

  article section {
    padding: 2rem;
  }

  article .subservices {
    font-size: 1.5rem;
    padding: 2rem 0;
  }
</style>
