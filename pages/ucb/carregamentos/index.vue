<template>
  
  <!-- <v-breadcrumbs :items="items_breadcrumbs" bg-color="" class="mb-6"> -->
  <!-- <v-breadcrumbs v-for="i in items-breadcrumbs">

    <NuxtLink :to="i.href">
      <v-breadcrumbs-item  :title='i.title' />
    </NuxtLink>

    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template> -->
  <!-- </v-breadcrumbs> -->

  <v-breadcrumbs class="bg-grey-lighten-3 mb-6">
    
    <v-breadcrumbs-item>
      <NuxtLink to="/">Início</NuxtLink>
    </v-breadcrumbs-item>
    
    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item>
      <NuxtLink to="/ucb">UCB</NuxtLink>
    </v-breadcrumbs-item>

    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item disabled>
      <NuxtLink to="/ucb/carregamentos">Carregamentos</NuxtLink>
    </v-breadcrumbs-item>
    
  </v-breadcrumbs>

  <!-- <TituloPagina texto="Declarações" /> -->
  <v-row class="mb-1">
    <v-col cols="12" lg="4" md="4">
      <NuxtLink to="/ucb/carregamentos/entrar_carreta">
        <v-btn prepend-icon="mdi-plus" text="Entrada de Carreta"></v-btn>
      </NuxtLink>
    </v-col>
    <v-spacer ></v-spacer>
    <v-col cols="12" lg="4" md="4" align="right">
      <v-btn 
        text="Filtros" 
        :prepend-icon = "existe_filtro ? 'mdi-filter' : 'mdi-filter-outline'"
        :variant = "existe_filtro ? 'elevated' : 'elevated'"
        :color = "existe_filtro ? 'green-lighten-1' : ''"
        @click="filter_dialog = !filter_dialog">
      </v-btn>
      <!-- <v-btn icon="mdi-filter" @click="getCarregamentos('ambev_cachoeiras')"></v-btn> -->
    </v-col>
  </v-row>

  <v-alert 
    v-if="existe_filtro"
    border="start"
    border-color="green-lighten-1"
    variant="outlined"
    color="green-lighten-1"
    class="mb-3"
    >
    <span class="text-overline font-weight-bold">Atenção:</span> <span class="text-body-2">Existem um ou mais filtros ativos. Clique neste botão</span> <v-btn class="ml-1" variant="tonal" size="small" @click="limparFiltros()">Limpar</v-btn> <span class="text-body-2">para limpar os filtros</span>.
    <!-- <v-chip v-for="i in filtrosAtivos">
      {{i.nome}}
    </v-chip> -->
  </v-alert>

  <v-snackbar v-model="limparFiltrosSnackbar" color="green-lighten-1" :timeout="1750">
    Os filtros foram desativados.

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="limparFiltrosSnackbar = false"
        prepend-icon="mdi-close"
      >
        
      </v-btn>
    </template>
  </v-snackbar>

  <v-snackbar v-model="ativarFiltrosSnackbar" color="green-lighten-1" :timeout="1750">
    Os filtros foram ativados.

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="ativarFiltrosSnackbar = false"
        prepend-icon="mdi-close"
      >
        
      </v-btn>
    </template>
  </v-snackbar>

  <v-dialog v-model="detalhes_declaracao_dialog" max-width="640">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            ID:
          </v-col>
          <v-col>
            {{id_declaracao_clicada}}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="filter_dialog" max-width="640">
    <v-card
        title="Filtros de Carregamentos"
    >
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="11" md="11" lg="11">
            <v-autocomplete 
              v-model="filter_dialog_cliente_retorno_interno"
              :items="lista_clientes_apelido" 
              label="Cliente Retorno"
              variant="outlined"
              auto-select-first
              clearable
            >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row dense class="d-flex align-center">
          <v-col cols="12" sm="5" md="4" lg="4">
            <v-text-field 
              v-model="filter_dialog_data_entrada_inicio_interno"
              label="Data de Entrada (Início)"
              type="date"
              variant="outlined"
              v-on:update:model-value="fn_teste_mostrar_data_entrada()"
              clearable
            ></v-text-field>
          </v-col>
          <v-card class="mt-n6 mx-4" elevation="0">até</v-card>
          <v-col cols="12" sm="5" md="4" lg="4">
            <v-text-field 
              v-model="filter_dialog_data_entrada_fim_interno"
              label="Data de Entrada (Fim)"
              type="date"
              variant="outlined"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="5" md="5" lg="5">
            <v-autocomplete 
              v-model="filter_dialog_placa_carreta_interno"
              :items="lista_placa_carreta" 
              label="Placa Carreta"
              variant="outlined"
              auto-select-first
              clearable
            >
          </v-autocomplete>
        </v-col>
      </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text="Limpar Filtros" variant="plain" @click="limparFiltros()"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="filter_dialog = false"></v-btn>
        <v-btn text="Aplicar Filtros" color="primary" variant="tonal" @click="getCarregamentos()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- <v-data-table-virtual 
    height="480"
    fixed-header
    class="mt-6 elevation-1"
    :items="dados_carregamentos"
    :headers="headers"
    hover
    sticky
    >
  </v-data-table-virtual> -->

  <v-alert 
    border="start"
    border-color="white"
    
    color="red"
    class="mb-3"
    
    >
    <span class="text-overline font-weight-bold">Atenção:</span> <span class="text-body-2">Os dados abaixo são dados falsos (ou "dummy") usados apenas para fins de demonstração e desenvolvimento!</span>
    <!-- <v-chip v-for="i in filtrosAtivos">
      {{i.nome}}
    </v-chip> -->
  </v-alert>

  <v-data-table
    :items="dados_carregamentos"
    fixed-header
    :headers="headers"
    :height="existe_filtro ? 383 : 460"
    items-per-page="10"
    item-value="_id"
    return-object
    @click:row="fn_teste_click"
    items-per-page-text="Itens por pág."
    :items-per-page-options="ippo"
    show-current-page="true"
    hover
    no-data-text="Não existem registros."
  ></v-data-table>

</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

function fn_teste_click(event, row) {
  // alert(aTesteID.value)
  // this.highlightClickedRow(valor)
  // alert(row.item._id);
  detalhes_declaracao_dialog.value = true
  id_declaracao_clicada.value = row.item._id
}

const ippo = [
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: 'Todos'}
]

const dados_placas_carretas_mongodb = ref();

const dados_carregamentos = ref();
const dados_clientes = ref()
const headers = ref();
const dados_clientes_mongodb = ref();
const lista_clientes_apelido = ref([]);
const lista_placa_carreta = ref();

const detalhes_declaracao_dialog = ref(false);
const id_declaracao_clicada = ref('');

const filter_dialog = ref(false);
const filter_dialog_cliente = ref();
const filter_dialog_cliente_retorno_interno = ref();
const filter_dialog_data_entrada_inicio = ref();
const filter_dialog_data_entrada_inicio_interno = ref();
const filter_dialog_data_entrada_fim = ref();
const filter_dialog_data_entrada_fim_interno = ref();
const filter_dialog_placa_carreta = ref();
const filter_dialog_placa_carreta_interno = ref();
const existe_filtro = computed(() => {
  if(
    filter_dialog_cliente.value != undefined || 
    filter_dialog_data_entrada_inicio.value != undefined || 
    filter_dialog_placa_carreta.value != undefined) 
    {
    return true
  }
})

const limparFiltrosSnackbar = ref(false);
const ativarFiltrosSnackbar = ref(false);

const filtrosAtivos = ref();
// const filtrosAtivos = computed(() => {
//   // const array = [filter_dialog_cliente, filter_dialog_data_entrada_inicio, filter_dialog_placa_carreta];
//   const array = [
//     {
//       nome: 'Cliente',
//       filtro: filter_dialog_cliente.value
//     },
//     {
//       nome: 'Data de Sáida',
//       filtro: filter_dialog_data_entrada_inicio.value
//     },
//     {
//       nome: 'Placa da Carreta',
//       filtro: filter_dialog_placa_carreta.value
//     },
//   ]
//   console.log(array)
//   // return array.map(e => e.value != undefined)
//   return array.map(e => {
//     console.log(e.filtro == undefined)
//     if(e.filtro != undefined) {
//       return e
//     } else {
//       return {nome: null, filtro: undefined}
//     }
//   })
// })


async function fetchClientes() {
  const clientesResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Clientes/getAll');
  dados_clientes_mongodb.value = clientesResponse.data;
}

async function fetchPlacasCarretas() {
  const placasResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/placas_carretas')
  dados_placas_carretas_mongodb.value = placasResponse.data;
}

const dados_produto = ref([
  {
    'produto_cod': '61020007',
    'produto_descricao': 'biometano' 
  }
])

const items_breadcrumbs = ref([])
items_breadcrumbs.value = [
  {
    title: "Início",
    href: "/"
  },
  {
    title: "Central de Operações",
    href: "/central_operacoes/"
  },
  {
    title: "Declarações",
    href: "/cenral_operacoes/declaracoes/"
  },
]

onMounted(async () => {
  await getClientes();
  await getCarregamentos();
  console.log(dados_carregamentos.value);
  await fetchClientes();
  fn_preencher_lista_clientes_apelido();

  await fetchPlacasCarretas();
  lista_placa_carreta.value = dados_placas_carretas_mongodb.value.map(e => e.placa_carreta)
})

headers.value = [
  // {title: 'Data Reg.', align: 'start', key: 'meta_data_reg_entrada', sortable: false},
  {title: 'Placa Carreta', align: 'start', key: 'placa_carreta', sortable: false},
  {title: 'Data Entrada', align: 'start', key: 'data_entrada', sortable: false},
  {title: 'Status', align: 'start', key: 'status', sortable: false},
  {title: 'Vaga', align: 'start', key: 'vaga', sortable: false},
  {title: 'Mesa', align: 'start', key: 'mesa', sortable: false},
  {title: 'Cliente Retorno', align: 'start', key: 'cliente_retorno', sortable: false},
  // {title: 'Placa Cavalo', align: 'start', key: 'placa_cavalo', sortable: false},
  // {title: 'Motorista', align: 'end', key: 'motorista', sortable: false},
]

// function get_descricao_produto(cod) {
//   console.log("cod: " + cod)
//   return dados_produto.value.find(b => {
//     return b.produto_cod == cod
//   }).produto_descricao
// }

async function getClientes() {
  const clientesResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Clientes/getAll');
  dados_clientes.value = clientesResponse.data;
}

function siglaEmprAtende(emp_at) {
  if(emp_at == "urca_gas") {
    return "UG";
  } else if(emp_at == "gas_verde") {
    return "GV";
  }
}

async function getCarregamentos() {
  if(
    filter_dialog_cliente_retorno_interno.value != undefined || 
    filter_dialog_data_entrada_inicio_interno.value != undefined ||
    filter_dialog_placa_carreta_interno.value != undefined
    ) {
      ativarFiltrosSnackbar.value = true;
    } else {
      ativarFiltrosSnackbar.value = false;
    }

  console.log("filter_dialog_cliente_retorno_interno.value: " + filter_dialog_cliente_retorno_interno.value)
  let carregamentosResponse;
  let url_params = '';

  if(
    filter_dialog_cliente_retorno_interno.value != undefined ||
    filter_dialog_data_entrada_inicio_interno.value != undefined ||
    filter_dialog_data_entrada_fim_interno.value != undefined ||
    filter_dialog_placa_carreta_interno.value != undefined
  ) {
    url_params += '?';
  }

  // Filtro Cliente de Retorno
  if(
    filter_dialog_cliente_retorno_interno.value != undefined && 
    filter_dialog_cliente_retorno_interno.value != null
    ) {
      filter_dialog_cliente.value = filter_dialog_cliente_retorno_interno.value
      url_params += 'cliente_retorno=' + filter_dialog_cliente.value;
  }

  // Filtro Data de Entrada
  if(
    filter_dialog_data_entrada_inicio_interno.value != undefined && 
    filter_dialog_data_entrada_inicio_interno.value != null &&
    filter_dialog_data_entrada_inicio_interno.value != '' && 
    filter_dialog_data_entrada_fim_interno.value != undefined && 
    filter_dialog_data_entrada_fim_interno.value != null && 
    filter_dialog_data_entrada_fim_interno.value != ''
  ) {
    filter_dialog_data_entrada_inicio.value = filter_dialog_data_entrada_inicio_interno.value
    filter_dialog_data_entrada_fim.value = filter_dialog_data_entrada_fim_interno.value
    url_params += '&data_entrada_inicio=' + filter_dialog_data_entrada_inicio.value + '&data_entrada_fim=' + filter_dialog_data_entrada_fim.value;
  }

  // Filtro Placa da Carreta
  if(
    filter_dialog_placa_carreta_interno.value != undefined && 
    filter_dialog_placa_carreta_interno.value != null
  ) {
    filter_dialog_placa_carreta.value = filter_dialog_placa_carreta_interno.value;
    url_params += '&placa_carreta=' + filter_dialog_placa_carreta.value
  }

  console.log('url_params: \n' + url_params);
  carregamentosResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/get' + url_params);
  dados_carregamentos.value = carregamentosResponse.data;
  
  dados_carregamentos.value = dados_carregamentos.value.map((e) => {
    return {
      ...e,
      data_entrada: DateToString(new Date(e.data_entrada.$date)),
      meta_data_reg_entrada: DateToString(new Date(e.meta.data_reg_entrada.$date)),
      // num: siglaEmprAtende(e.num.empresa_atende) + "-" + e.num.cliente_sigla + "-" + e.num.seq.toString().padStart(3,'0') + "/" + e.num.mes.toString().padStart(2, '0') + "-" + e.num.ano.toString().padStart(4, '0'),
      // produto_descricao: string_capitalize(dados_produto.value.find(b => {
      //   return (b.produto_cod == e.produto_codigo) || e.produto_codigo != undefined
      // }).produto_descricao),
      cliente_retorno: dados_clientes.value.find(cliente => {
        return cliente.meta.cliente_cod == e.cliente_retorno
      }).meta.apelido
    }
  })

  if(filter_dialog.value = true) {
    filter_dialog.value = false
  }
}

function string_capitalize(umaString) {
  return umaString[0].toUpperCase() + umaString.slice(1)
}

function DateToString(date) {
  return date.getDate().toString().padStart(2, '0') + "/" + 
    (date.getMonth() + 1).toString().padStart(2,'0') + "/" + 
    date.getFullYear().toString().padStart(4, '0') + " " +
    date.getHours().toString().padStart(2, '0') + ":" +
    date.getMinutes().toString().padStart(2, '0')
}

function fn_preencher_lista_clientes_apelido() {
  var arrayTemp = [];
  dados_clientes_mongodb.value.forEach(obj => {
      const partialObj = {};
      partialObj.title = obj.meta.apelido;
      partialObj.value = obj.meta.cliente_cod;
      arrayTemp.push(partialObj);
  })
  lista_clientes_apelido.value = arrayTemp;
}

function limparFiltros() {
  filter_dialog.value = false
  filter_dialog_cliente.value = null
  filter_dialog_cliente_retorno_interno.value = null
  filter_dialog_data_entrada_inicio.value = null
  filter_dialog_data_entrada_inicio_interno.value = null
  filter_dialog_data_entrada_fim.value = null
  filter_dialog_data_entrada_fim_interno.value = null
  filter_dialog_placa_carreta.value = null
  filter_dialog_placa_carreta_interno.value = null

  getCarregamentos();

  limparFiltrosSnackbar.value = true;
}




function fn_teste_mostrar_data_entrada() {
  console.log("fn_teste_mostrar_data_entrada: " + filter_dialog_data_entrada_inicio_interno.value)
}

</script>

<style>

</style>