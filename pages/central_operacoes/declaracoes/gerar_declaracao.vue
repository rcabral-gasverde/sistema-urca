<template>
  <v-breadcrumbs class="bg-grey-lighten-3 mb-6">
    
    <v-breadcrumbs-item>
      <NuxtLink to="/">Início</NuxtLink>
    </v-breadcrumbs-item>
    
    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item>
      <NuxtLink to="/central_operacoes">Central de Operações</NuxtLink>
    </v-breadcrumbs-item>

    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item>
      <NuxtLink to="/central_operacoes/declaracoes">Declarações</NuxtLink>
    </v-breadcrumbs-item>
    
    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item disabled>
      <NuxtLink to="/central_operacoes/declaracoes/gerar_declaracao">Gerar Declaração</NuxtLink>
    </v-breadcrumbs-item>
    
  </v-breadcrumbs>

    <!-- <TituloPagina texto="Gerar Declaração" /> -->
    
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <v-autocomplete 
          v-model="cliente"
          :items="lista_clientes_apelido" 
          label="Cliente"
          variant="solo"
          auto-select-first
          v-on:update:model-value="fn_preencher_campos()"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" md="10" lg="9">
        <v-expansion-panels multiple variant="accordion" v-model="paineis" >
          <v-expansion-panel value="panel_dados_destinatario">
            <v-expansion-panel-title>Dados do Destinatário</v-expansion-panel-title>
            <v-expansion-panel-text class="py-6">
              <v-row class="my-0 pa-0">
                <v-col cols="12" lg="6" md="6" sm="6">
                  <v-text-field  class="my-0 pa-0" label="Razão Social" variant="outlined" readonly v-model="razao_social">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row   class="my-0 pa-0">
                <v-col cols="12" md="8" sm="8" lg="8">
                  <v-text-field  class="my-0 pa-0" label="Endereço" variant="outlined" readonly v-model="endereco">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row   class="my-0 pa-0">
                <v-col cols="12" sm="5" md="5" lg="5">
                  <v-text-field  label="Bairro" variant="outlined" readonly v-model="bairro"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field  label="Município" variant="outlined" readonly v-model="municipio"></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2" lg="2">
                  <v-text-field  label="UF" variant="outlined" readonly v-model="uf"></v-text-field>
                </v-col>
              </v-row>
              <v-row   class="my-0 pa-0">
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field  label="CNPJ" variant="outlined" readonly v-model="cnpj"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field  label="Inscrição Estadual" variant="outlined" readonly v-model="insc_est"></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel value="panel_dados_declaracao">
            <v-expansion-panel-title>Dados da Declaração</v-expansion-panel-title>
            <v-expansion-panel-text  class="py-6">
              <v-row>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field label="Declaração Núm." variant="outlined" v-model="declaracao_num" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field label="Data de Saída" variant="outlined" v-model="declaracao_data_saida" type="datetime-local" v-on:update:model-value="fn_preencher_declaracao_num()"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <!-- <v-text-field label="Placa da Carreta" variant="outlined" v-model="declaracao_placa_carreta"></v-text-field> -->
                  <v-autocomplete
                    v-model="declaracao_placa_carreta"
                    :items="lista_placa_carreta"
                    label="Placa da Carreta"
                    variant="outlined"
                    auto-select-first
                  >
            </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <!-- <v-text-field label="Descrição do Produto" variant="outlined" v-model="produto_descricao"></v-text-field> -->
                  <v-autocomplete
                    v-model="produto_descricao"
                    :items="lista_produto_descricao"
                    label="Descrição do Produto"
                    variant="outlined"
                    auto-select-first
                    v-on:update:model-value="fn_preencher_produto_cod()"
                  />
                </v-col>
                <v-col cols="12" sm="2" md="2" lg="2">
                  <v-text-field label="Cód. do Produto (NCM/SH)" variant="outlined" v-model="produto_codigo" readonly></v-text-field>
                </v-col>
        
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field label="Quantidade (m³)" variant="outlined" v-model="produto_quantidade"></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="10" md="10" lg="9" class="d-flex justify-end">
        <v-btn size="large" variant="text" class="mr-4" @click="fn_resetar_declaracao()">Resetar</v-btn>
        <v-btn size="large" variant="elevated" @click="fn_registrar_declaracao()">Gerar PDF da Declaração</v-btn>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import criarPDF from '~/assets/criar_pdf';

const dados_clientes_mongodb = ref();
const dados_placas_carretas_mongodb = ref();
const lastDeclaracao = ref();
// dados_clientes_mongodb.value = await useFetch('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/clientes');

const lista_clientes_apelido = ref([]);
const lista_produto_descricao = ref(['Biometano, ONU 1971, METANO COMPRIMIDO, 2.1']);
const lista_placa_carreta = ref()

const cliente = ref();

const razao_social = ref('');
const endereco = ref('');
const bairro = ref('');
const municipio = ref('');
const uf = ref('');
const cnpj = ref('');
const insc_est = ref('');
const declaracao_num = ref();
const declaracao_num_seq = ref();
const declaracao_data_saida = ref();
const declaracao_placa_carreta = ref('');

const lastDecCli = ref()
const empr_atende_sigla = ref();

const paineis = ref(['panel_dados_declaracao'])

const produto_descricao = ref('Biometano, ONU 1971, METANO COMPRIMIDO, 2.1');
const produto_quantidade = ref('');

const meta = ref();
const dados_cliente = ref();

const dados_para_pdf = ref();
const dados_para_post = ref();

const dados_produto = ref([
  {
    'produto_cod': '27112100',
    'produto_descricao': 'Biometano, ONU 1971, METANO COMPRIMIDO, 2.1' 
  }
])

onMounted(async () => {
  await fetchClientes();
  fn_preencher_lista_clientes_apelido();

  await fetchPlacasCarretas();
  lista_placa_carreta.value = dados_placas_carretas_mongodb.value.map(e => e.placa_carreta)
  
  // await fetchLastDeclaracao();
  // console.log("lastDeclaracao.value: " + lastDeclaracao.value)
  // declaracao_num.value = (parseInt(lastDeclaracao.value) + 1).toString().padStart(6, '0')

  // ano + "-" + mes + "-" + dia + "T" + hora + ":" + minuto + ":00-03:00"
  // 2016-05-01T03:24:00-02:00
  declaracao_data_saida.value = data_para_string();
})

async function fetchClientes() {
  const clientesResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Clientes/getAll');
  dados_clientes_mongodb.value = clientesResponse.data;
}

async function fetchPlacasCarretas() {
  const placasResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/placas_carretas')
  dados_placas_carretas_mongodb.value = placasResponse.data;
}

// async function fetchLastDeclaracao() {
//   const lastResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/getLast')
//   // console.log(lastResponse.data);
//   lastDeclaracao.value = lastResponse.data[0].num;
// }

async function fetchLastDeclaracaoCliente(codigo) {
  // const lastDecClienteResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/getLastClienteMesAno?cliente_codigo=' + codigo + '&mes=' + (new Date(declaracao_data_saida.value).getMonth() + 1).toString() + '&ano=' + new Date(declaracao_data_saida.value).getFullYear().toString())
  const lastDecClienteResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/getLast?cliente_cod=' + codigo + '&data_saida=' + new Date(declaracao_data_saida.value).toString());
  console.log('~fetch: ' + lastDecClienteResponse.data[0])
  // const lastDecClienteResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/getLastCliente?cliente_codigo=' + codigo)
  // console.log("lastDecClienteResponse.data[0]: " + lastDecClienteResponse.data[0])
  // console.log(lastResponse.data);
  // lastDeclaracaoCliente.value = lastDecClienteResponse.data[0];
  // return JSON.stringify(lastDecClienteResponse.data[0]);
  if(lastDecClienteResponse.data[0] != undefined){
    return lastDecClienteResponse.data[0];
  } else {
    return null
  }
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

async function fn_preencher_campos() {
  if(cliente.value != undefined) {
    console.log("cliente.value: " + cliente.value)
    lastDecCli.value = await fetchLastDeclaracaoCliente(cliente.value)
    // console.log("fetchLastDeclaracaoCliente(cliente.value): " + ldc.num)
    
    dados_cliente.value = dados_clientes_mongodb.value.find((e) => {
      return e.meta.cliente_cod == cliente.value
    })

    razao_social.value = dados_cliente.value.nome_razao_social;
    endereco.value = dados_cliente.value.endereco;
    bairro.value = dados_cliente.value.bairro;
    municipio.value = dados_cliente.value.municipio;
    uf.value = dados_cliente.value.uf;
    cnpj.value = dados_cliente.value.cnpj;
    insc_est.value = dados_cliente.value.insc_estadual;
    
    meta.value = dados_cliente.value.meta

    fn_preencher_declaracao_num();
  }
}

async function fn_preencher_declaracao_num() {
  lastDecCli.value = await fetchLastDeclaracaoCliente(cliente.value)
  // console.log(lastDecCli.value)
  if(dados_cliente.value != undefined) {

    if(dados_cliente.value.meta.empresa_atende == "urca_gas") {
      empr_atende_sigla.value = "UG";
    } else if(dados_cliente.value.meta.empresa_atende == "gas_verde") {
      empr_atende_sigla.value = "GV";
    }

    if(lastDecCli.value != null && lastDecCli.value.num.mes == new Date(declaracao_data_saida.value).getMonth() + 1) {
      declaracao_num_seq.value = lastDecCli.value.num.seq + 1;
      declaracao_num.value = empr_atende_sigla.value + "-" + dados_cliente.value.meta.cliente_sigla + "-" + declaracao_num_seq.value.toString().padStart(3, '0') + "/" + (new Date(declaracao_data_saida.value).getMonth() + 1).toString().padStart(2,'0') + "-" +  new Date(declaracao_data_saida.value).getFullYear().toString().padStart(4, '0')
    } else {
      declaracao_num_seq.value = 1;
      declaracao_num.value = empr_atende_sigla.value + "-" + dados_cliente.value.meta.cliente_sigla + "-" + declaracao_num_seq.value.toString().padStart(3, '0') + "/" + (new Date(declaracao_data_saida.value).getMonth() + 1).toString().padStart(2,'0') + "-" +  new Date(declaracao_data_saida.value).getFullYear().toString().padStart(4, '0')
    }
  }

}

async function fn_registrar_declaracao() {
  dados_para_pdf.value = {
    'cliente': {
      'razao_social': razao_social.value,
      'endereco': endereco.value,
      'bairro': bairro.value,
      'municipio': municipio.value,
      'uf': uf.value,
      'cnpj': cnpj.value,
      'insc_est': insc_est.value,
      'meta': meta.value
    },
    'declaracao': {
      'num': declaracao_num.value,
      'data_saida': declaracao_data_saida.value,
      'placa_carreta': declaracao_placa_carreta.value,
      'produto': {
        'codigo': produto_codigo.value,
        'descricao': produto_descricao.value,
        'quantidade': produto_quantidade.value
      }
    }
  }

  dados_para_post.value = {
    // 'num': declaracao_num.value,
    // 'num_empresa_atende': dados_cliente.value.meta.empresa_atende,
    // 'num_cliente_sigla': dados_cliente.value.meta.cliente_sigla,
    // 'num_seq': declaracao_num_seq.value,
    // 'num_mes': new Date(declaracao_data_saida.value).getMonth() + 1,
    // 'num_ano': new Date(declaracao_data_saida.value).getFullYear(),
    'num': {
      'empresa_atende': dados_cliente.value.meta.empresa_atende,
      'cliente_sigla': dados_cliente.value.meta.cliente_sigla,
      'seq': declaracao_num_seq.value,
      'mes': new Date(declaracao_data_saida.value).getMonth() + 1,
      'ano': new Date(declaracao_data_saida.value).getFullYear()
    },
    'cliente_cod': cliente.value,
    'data_saida': {'$date': declaracao_data_saida.value},
    'placa_carreta': declaracao_placa_carreta.value,
    'produto_codigo': produto_codigo.value,
    'produto_quantidade': produto_quantidade.value,
    'status': 'Gerada',
    'meta': {
      'data_reg_declaracao': {'$date': new Date(data_para_string())},
      'usuario_reg_declaracao': 'rcabral@gasverde.com.br'
    }
  }
  
  await navigateTo('/central_operacoes/declaracoes')
  criarPDF(dados_para_pdf.value);
  fn_post_declaracao(dados_para_post.value);
}

function fn_resetar_declaracao() {
  cliente.value = '';

  razao_social.value = '';
  endereco.value = '';
  bairro.value = '';
  municipio.value = '';
  uf.value = '';
  cnpj.value = '';
  insc_est.value = '';
    

  // declaracao_num.value = '';
  declaracao_data_saida.value = data_para_string();
  declaracao_placa_carreta.value = '';
  produto_descricao.value = '';
  produto_codigo.value = '';
  produto_quantidade.value = '';

  meta.value = ''
}

function fn_post_declaracao(dados_para_post) {
  axios.post(
    'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/create', 
    dados_para_post
  );
}

function data_para_string() {
  // 2024-02-26T08:48
  // YYYY-MM-DDTHH:MM
  var dataAtual = new Date();
  var dia = dataAtual.getDate().toString().padStart(2, '0');
  var mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  var ano = dataAtual.getFullYear().toString().padStart(4, '0');
  var hora = dataAtual.getHours().toString().padStart(2, '0');
  var minuto = dataAtual.getMinutes().toString().padStart(2, '0');
  var segundo = dataAtual.getSeconds().toString().padStart(2, '0');

  return ano + "-" + mes + "-" + dia + "T" + hora + ":" + minuto + ":" + segundo
}

const produto_codigo = computed(() => {
  if(produto_descricao.value == '') {
    // if(produto_codigo.value != '') {
      // return ''
    // }
  } else {
    return dados_produto.value.find(e => {
      return e.produto_descricao == produto_descricao.value
    }).produto_cod
  }
});

</script>

<style>

</style>