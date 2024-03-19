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
      <NuxtLink to="/central_operacoes">Central de Operações</NuxtLink>
    </v-breadcrumbs-item>

    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item disabled>
      <NuxtLink to="/central_operacoes/declaracoes">Declarações</NuxtLink>
    </v-breadcrumbs-item>
    
  </v-breadcrumbs>

  <!-- <TituloPagina texto="Declarações" /> -->
  <v-row class="mb-1">
    <v-col cols="12" lg="4" md="4">
      <NuxtLink to="/central_operacoes/declaracoes/gerar_declaracao">
        <v-btn prepend-icon="mdi-plus" text="Gerar Declaração"></v-btn>
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
      <!-- <v-btn icon="mdi-filter" @click="getDeclaracoes('ambev_cachoeiras')"></v-btn> -->
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

  <v-snackbar v-model="dadosParaCancelarSnackbar" color="green-lighten-1" :timeout="2250">
    Dados da declaração copiados para a área de transferência.

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="dadosParaCancelarSnackbar = false"
        prepend-icon="mdi-close"
      >
        
      </v-btn>
    </template>
  </v-snackbar>

  <v-dialog v-model="detalhes_declaracao_dialog" max-width="540">
      
    <v-card title="Detalhes da Declaração" class="text-body-2">
      <v-card-text>
        
        <!-- <v-row >
          <v-col cols="12" sm="2" md="2" lg="2">
            ID:
          </v-col>
          <v-col>
            {{ id_declaracao_clicada }}
          </v-col>
        </v-row> -->
        <v-row class="mt-2">
          <v-col cols="12" sm="2" md="4" lg="4" class="font-weight-bold">
            Número
          </v-col>
          <v-col>
            {{ detalhes_declaracao.num }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2" md="4" lg="4" class="font-weight-bold">
            Cliente
          </v-col>
          <v-col>
            {{ detalhes_declaracao.cliente }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2" md="4" lg="4" class="font-weight-bold">
            Data de Saída
          </v-col>
          <v-col>
            {{ detalhes_declaracao.data_saida }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2" md="4" lg="4" class="font-weight-bold">
            Placa
          </v-col>
          <v-col>
            {{ detalhes_declaracao.placa_carreta }}
          </v-col>
        </v-row>
        
        <v-row v-if="detalhes_declaracao.status">
          <v-col cols="12" sm="2" md="4" lg="4" class="font-weight-bold">
            Volume (m³)
          </v-col>
          <v-col>
            {{ detalhes_declaracao.produto_quantidade }}
          </v-col>
        </v-row>
        
        <v-row class="mb-2">
          <v-col  cols="12" sm="2" md="4" lg="4" class="font-weight-bold">
            Status
          </v-col>
          <v-col>
            {{ detalhes_declaracao.status }}
          </v-col>
        </v-row>
        
        <v-btn 
          append-icon="mdi-file-pdf-box"
          text="PDF"
          color="red"
          variant="outlined"
          class="mb-1"
          @click="gerar_pdf()">
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- <v-btn text="Limpar Filtros" variant="plain" @click="limparFiltros()"></v-btn> -->
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="detalhes_declaracao_dialog = false"></v-btn>
        <v-btn v-if="detalhes_declaracao.status != 'Cancelada'" text="Cancelar Declaração" color="red" variant="tonal" @click="cancelar_declaracao(id_declaracao_clicada)"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="filter_dialog" max-width="640">
    <v-card
        
        title="Filtros de Declarações"
    >
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="11" md="11" lg="11">
            <v-autocomplete 
              v-model="filter_dialog_cliente_interno"
              :items="lista_clientes_apelido" 
              label="Cliente"
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
              v-model="filter_dialog_data_saida_inicio_interno"
              label="Data de Saída (Início)"
              type="date"
              variant="outlined"
              v-on:update:model-value="fn_teste_mostrar_data_saida()"
              clearable
            ></v-text-field>
          </v-col>
          <v-card class="mt-n6 mx-4" elevation="0">até</v-card>
          <v-col cols="12" sm="5" md="4" lg="4">
            <v-text-field 
              v-model="filter_dialog_data_saida_fim_interno"
              label="Data de Saída (Fim)"
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
              label="Placa"
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
        <v-btn text="Aplicar Filtros" color="primary" variant="tonal" @click="getDeclaracoes()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <v-dialog v-model="cancelarDeclaracaoDialog" max-width="640">
    <v-card title="Cancelar Declaração">
      <v-card-text class="pb-6">
        Para cancelar esta declaração, entre em contato com: <br/><v-divider class="mb-3"></v-divider><span class="font-weight-bold">Roberto Cabral</span> <br/> rcabral@gasverde.com.br <br/> (21) 9 7581 8889
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn align="right" variant="plain" text="Fechar" @click="cancelarDeclaracaoDialog = !cancelarDeclaracaoDialog"></v-btn>
        <v-btn prepend-icon="mdi-content-copy" variant="tonal" text="Copiar Dados" @click="copiarDadosDeclaracaoMemoria()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- <v-data-table-virtual 
    height="480"
    fixed-header
    class="mt-6 elevation-1"
    :items="dados_declaracoes"
    :headers="headers"
    hover
    sticky
    >
  </v-data-table-virtual> -->

  <v-data-table
    :items="dados_declaracoes"
    :fixed-header="true"
    :headers="headers"
    :height="existe_filtro ? 383 : 460"
    items-per-page="10"
    item-value="_id"
    return-object
    @click:row="fn_mostrar_detalhes_declaracao"
    items-per-page-text="Itens por pág."
    :items-per-page-options="ippo"
    :show-current-page="true"
    hover
    no-data-text="Não existem registros."
  ></v-data-table>

</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import criarPDF from '~/assets/criar_pdf';

const cancelarDeclaracaoDialog = ref(false);

function copiarDadosDeclaracaoMemoria() {
  let foo = dados_clientes.value.find(e => {
    return e.meta.cliente_cod == detalhes_declaracao.value.cliente_cod
  });
  

  let dados_para_roberto;
  dados_para_roberto = {
    'cliente': {
      'razao_social': foo.nome_razao_social,
      'endereco': foo.endereco,
      'bairro': foo.bairro,
      'municipio': foo.municipio,
      'uf': foo.uf,
      'cnpj': foo.cnpj,
      'insc_est': foo.insc_estadual,
      'meta': foo.meta
    },
    'declaracao': {
      // 'num': gerarNumDeclaracao(detalhes_declaracao.value.num),
      'num': detalhes_declaracao.value.num,
      'data_saida': 
        detalhes_declaracao.value.data_saida.split(" ")[0].split("/")[2] + "-" +
        detalhes_declaracao.value.data_saida.split(" ")[0].split("/")[1] + "-" +
        detalhes_declaracao.value.data_saida.split(" ")[0].split("/")[0] + "T" +
        detalhes_declaracao.value.data_saida.split(" ")[1].split(":")[0] + ":" + 
        detalhes_declaracao.value.data_saida.split(" ")[1].split(":")[1],
      'placa_carreta': detalhes_declaracao.value.placa_carreta,
      'produto': {
        'codigo': detalhes_declaracao.value.produto_codigo,
        'descricao': detalhes_declaracao.value.produto_descricao,
        'quantidade': detalhes_declaracao.value.produto_quantidade
      }
    }
  }
  navigator.clipboard.writeText(JSON.stringify(dados_para_roberto))
  dadosParaCancelarSnackbar.value = true
  // console.log("dados_para_roberto: \n" + JSON.stringify(dados_para_roberto))
}

function gerar_pdf() {
  // console.log(detalhes_declaracao.value);
  // console.log(detalhes_declaracao.value.cliente)
  // console.log(dados_clientes_mongodb.value);
  // console.log("dados_clientes: " + dados_clientes.value[0].insc_est)
  // dados_clientes.value.forEach(e => console.log(e.meta.cliente_cod))
  // dados_clientes.value.forEach(e => console.log(e.nome_razao_social))
  
  let foo = dados_clientes.value.find(e => {
        return e.meta.cliente_cod == detalhes_declaracao.value.cliente_cod
      });
  // console.log(foo.nome_razao_social);
  
  // console.log("detalhes_declaracao.value: " + JSON.stringify(detalhes_declaracao.value))

  let dados_para_pdf;
  dados_para_pdf = {
    'cliente': {
      'razao_social': foo.nome_razao_social,
      'endereco': foo.endereco,
      'bairro': foo.bairro,
      'municipio': foo.municipio,
      'uf': foo.uf,
      'cnpj': foo.cnpj,
      'insc_est': foo.insc_estadual,
      'meta': foo.meta
    },
    'declaracao': {
      // 'num': gerarNumDeclaracao(detalhes_declaracao.value.num),
      'num': detalhes_declaracao.value.num,
      'data_saida': 
        detalhes_declaracao.value.data_saida.split(" ")[0].split("/")[2] + "-" +
        detalhes_declaracao.value.data_saida.split(" ")[0].split("/")[1] + "-" +
        detalhes_declaracao.value.data_saida.split(" ")[0].split("/")[0] + "T" +
        detalhes_declaracao.value.data_saida.split(" ")[1].split(":")[0] + ":" + 
        detalhes_declaracao.value.data_saida.split(" ")[1].split(":")[1],
      'placa_carreta': detalhes_declaracao.value.placa_carreta,
      'produto': {
        'codigo': detalhes_declaracao.value.produto_codigo,
        'descricao': detalhes_declaracao.value.produto_descricao,
        'quantidade': detalhes_declaracao.value.produto_quantidade
      }
    }
  }
  // console.log("dados_para_pdf: \n" + JSON.stringify(dados_para_pdf))
  criarPDF(dados_para_pdf);
}

function gerarNumDeclaracao(num) {
  let empresa_sigla;
  if(num.empresa_atende == "urca_gas") {
    empresa_sigla = "UG"
  } else if(num.empresa_atende == "gas_verde") {
    empresa_sigla = "GV"
  }
  // console.log(num)
  return empresa_sigla + "-" + num.cliente_sigla + "-" + num.seq.toString().padStart("0", 3) + "/" + num.mes.toString().padStart("0", 2) + num.ano.toString().padStart("0", 4)
}

async function cancelar_declaracao(id) {
  // alert(id)
  // const cancelarDeclaracaoResponse = axios.patch('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/update?id=' + id + '&status=Cancelada')

  // const cancelarDeclaracaoResponse = await $fetch('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/update', {
  //   method: 'PATCH',
  //   query: {'id': id, status: 'Cancelada'},
  // })
  cancelarDeclaracaoDialog.value = true
}

function fn_mostrar_detalhes_declaracao(event, row) {
  // alert(aTesteID.value)
  // this.highlightClickedRow(valor)
  // alert(row.item._id);
  detalhes_declaracao_dialog.value = true
  id_declaracao_clicada.value = row.item._id
  detalhes_declaracao.value = dados_declaracoes.value.find(e => {return e._id == id_declaracao_clicada.value})
}

const ippo = [
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: 'Todos'}
]

const dados_placas_carretas_mongodb = ref();

const dados_declaracoes = ref();
const dados_clientes = ref()
const headers = ref();
const dados_clientes_mongodb = ref();
const lista_clientes_apelido = ref([]);
const lista_placa_carreta = ref();

const detalhes_declaracao = ref();
const detalhes_declaracao_dialog = ref(false);
const id_declaracao_clicada = ref('');

const filter_dialog = ref(false);
const filter_dialog_cliente = ref();
const filter_dialog_cliente_interno = ref();
const filter_dialog_data_saida_inicio = ref();
const filter_dialog_data_saida_inicio_interno = ref();
const filter_dialog_data_saida_fim = ref();
const filter_dialog_data_saida_fim_interno = ref();
const filter_dialog_placa_carreta = ref();
const filter_dialog_placa_carreta_interno = ref();
const existe_filtro = computed(() => {
  if(
    filter_dialog_cliente.value != undefined || 
    filter_dialog_data_saida_inicio.value != undefined || 
    filter_dialog_placa_carreta.value != undefined) 
    {
    return true
  }
})

const limparFiltrosSnackbar = ref(false);
const ativarFiltrosSnackbar = ref(false);
const dadosParaCancelarSnackbar = ref(false);

const filtrosAtivos = ref();
// const filtrosAtivos = computed(() => {
//   // const array = [filter_dialog_cliente, filter_dialog_data_saida_inicio, filter_dialog_placa_carreta];
//   const array = [
//     {
//       nome: 'Cliente',
//       filtro: filter_dialog_cliente.value
//     },
//     {
//       nome: 'Data de Sáida',
//       filtro: filter_dialog_data_saida_inicio.value
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
    'produto_cod': '27112100',
    'produto_descricao': 'Biometano, ONU 1971, METANO COMPRIMIDO, 2.1' 
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
  await getDeclaracoes();
  // console.log(dados_declaracoes.value);
  await fetchClientes();
  fn_preencher_lista_clientes_apelido();

  await fetchPlacasCarretas();
  lista_placa_carreta.value = dados_placas_carretas_mongodb.value.map(e => e.placa_carreta)
})

headers.value = [
  // {title: 'Data Saída', align: 'start', key: 'data_saida', sortable: false},
  // {title: 'Data Reg.', align: 'start', key: 'meta_data_reg_declaracao', sortable: false},
  {title: 'Data Saída', align: 'start', key: 'data_saida', sortable: false},
  {title: 'Placa Carreta', align: 'start', key: 'placa_carreta', sortable: false},
  {title: 'Núm.', align: 'start', key: 'num', sortable: false},
  {title: 'Cliente', align: 'start', key: 'cliente', sortable: false},
  // {title: 'Produto', align: 'start', key: 'produto_descricao', sortable: false},
  {title: 'Volume (m³)', align: 'end', key: 'produto_quantidade', sortable: false},
  {title: 'Status', align: 'end', key: 'status', sortable: false},
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

async function getDeclaracoes() {
  if(
    filter_dialog_cliente_interno.value != undefined || 
    filter_dialog_data_saida_inicio_interno.value != undefined ||
    filter_dialog_placa_carreta_interno.value != undefined
    ) {
      ativarFiltrosSnackbar.value = true;
    } else {
      ativarFiltrosSnackbar.value = false;
    }

  // console.log("filter_dialog_cliente_interno.value: " + filter_dialog_cliente_interno.value)
  let declaracoesResponse;
  let url_params = '';
  
  if(
    filter_dialog_cliente_interno.value != undefined || 
    filter_dialog_data_saida_inicio_interno.value != undefined || 
    filter_dialog_data_saida_fim_interno.value != undefined || 
    filter_dialog_placa_carreta_interno.value != undefined
  ) {
    url_params += '?';
  }

  if(
    filter_dialog_cliente_interno.value != undefined && 
    filter_dialog_cliente_interno.value != null
    ) {
    // A
    filter_dialog_cliente.value = filter_dialog_cliente_interno.value
    url_params += '&cliente_cod=' + filter_dialog_cliente.value;
  }
  if (
    filter_dialog_data_saida_inicio_interno.value != undefined && 
    filter_dialog_data_saida_inicio_interno.value != null &&
    filter_dialog_data_saida_inicio_interno.value != '' && 
    filter_dialog_data_saida_fim_interno.value != undefined && 
    filter_dialog_data_saida_fim_interno.value != null && 
    filter_dialog_data_saida_fim_interno.value != '' 
  ) {
    // B
    filter_dialog_data_saida_inicio.value = filter_dialog_data_saida_inicio_interno.value
    filter_dialog_data_saida_fim.value = filter_dialog_data_saida_fim_interno.value
    url_params += '&data_saida_inicio=' + filter_dialog_data_saida_inicio.value + '&data_saida_fim=' + filter_dialog_data_saida_fim.value;
  }
  if (
    filter_dialog_placa_carreta_interno.value != undefined && 
    filter_dialog_placa_carreta_interno.value != null
  ) {
    // C
    filter_dialog_placa_carreta.value = filter_dialog_placa_carreta_interno.value;
    url_params += '&placa_carreta=' + filter_dialog_placa_carreta.value
  } 

  declaracoesResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/get' + url_params);
  // declaracoesResponse.data.forEach(e => console.log(e))
  dados_declaracoes.value = declaracoesResponse.data;
  
  dados_declaracoes.value = dados_declaracoes.value.map((e) => {
    return {
      ...e,
      data_saida: DateToString(new Date(e.data_saida.$date)),
      meta_data_reg_declaracao: DateToString(new Date(e.meta.data_reg_declaracao.$date)),
      num: siglaEmprAtende(e.num.empresa_atende) + "-" + e.num.cliente_sigla + "-" + e.num.seq.toString().padStart(3,'0') + "/" + e.num.mes.toString().padStart(2, '0') + "-" + e.num.ano.toString().padStart(4, '0'),
      produto_descricao: string_capitalize(dados_produto.value.find(b => {
        return (b.produto_cod == e.produto_codigo) || e.produto_codigo != undefined
      }).produto_descricao),
      cliente: dados_clientes.value.find(cliente => {
        return cliente.meta.cliente_cod == e.cliente_cod
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
  arrayTemp = arrayTemp.sort((a, b) => {
    if(a.title < b.title) {return -1};
    if(a.title > b.title) {return 1};
  });

  lista_clientes_apelido.value = arrayTemp;
}

function limparFiltros() {
  filter_dialog.value = false
  filter_dialog_cliente.value = null
  filter_dialog_cliente_interno.value = null
  filter_dialog_data_saida_inicio.value = null
  filter_dialog_data_saida_inicio_interno.value = null
  filter_dialog_data_saida_fim.value = null
  filter_dialog_data_saida_fim_interno.value = null
  filter_dialog_placa_carreta.value = null
  filter_dialog_placa_carreta_interno.value = null

  getDeclaracoes();

  limparFiltrosSnackbar.value = true;
}




function fn_teste_mostrar_data_saida() {
  console.log("fn_teste_mostrar_data_saida: " + filter_dialog_data_saida_inicio_interno.value)
}

</script>

<style>

</style>