<template>
  <v-breadcrumbs class="bg-grey-lighten-3 mb-6">
    
    <v-breadcrumbs-item>
      <NuxtLink to="/">Início</NuxtLink>
    </v-breadcrumbs-item>
    
    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item>
      <NuxtLink to="/ucb">UCB</NuxtLink>
    </v-breadcrumbs-item>

    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item>
      <NuxtLink to="/ucb/carregamentos">Carregamentos</NuxtLink>
    </v-breadcrumbs-item>
    
    <v-breadcrumbs-divider/>

    <v-breadcrumbs-item disabled>
      <NuxtLink to="/ucb/carregamentos/entrar_carreta">Entrada de Carreta</NuxtLink>
    </v-breadcrumbs-item>
    
  </v-breadcrumbs>

    <!-- <TituloPagina texto="Gerar Declaração" /> -->
    
    <!-- <v-row>
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
    </v-row> -->

    <v-alert 
      border="start"
      border-color="white"
      
      color="red"
      class="mb-3"
      
      >
      <span class="text-overline font-weight-bold">Atenção:</span> <span class="text-body-2">O formulário abaixo é apenas para fins de demonstração e desenvolvimento!</span>
      <!-- <v-chip v-for="i in filtrosAtivos">
        {{i.nome}}
      </v-chip> -->
    </v-alert>

    <v-row>
      <v-col cols="12" sm="12" md="12" lg="8">
        <v-expansion-panels multiple variant="accordion" v-model="paineis">
          <v-expansion-panel value="panel_dados_entrada" readonly hide-actions>
            <v-expansion-panel-title>Dados de Entrada da Carreta</v-expansion-panel-title>
            <v-expansion-panel-text class="pt-1">
              <v-row>
                <v-col cols="12" sm="2" md="2" lg="3">
                  <v-autocomplete
                    v-model="placa_carreta_entrada"
                    :items="lista_placa_carreta"
                    label="Carreta (Placa)"
                    variant="outlined"
                    auto-select-first
                  >
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" sm="3" md="3" lg="4">
                  <v-text-field label="Data de Entrada na Base" variant="outlined" v-model="data_entrada" type="datetime-local"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4" lg="5">
                  <v-autocomplete 
                    v-model="cliente_retorno"
                    :items="lista_clientes_apelido" 
                    label="Cliente (Retorno)"
                    variant="outlined"
                    auto-select-first
                    v-on:update:model-value="fn_preencher_campos()"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="2" md="2" lg="2">
                  <v-autocomplete
                    v-model="vaga_entrada"
                    :items="vagas"
                    label="Vaga"
                    variant="outlined"
                    auto-select-first
                    v-on:update:model-value="fn_preenhcer_campo_mesa()"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="2" md="2" lg="2">
                  <v-autocomplete
                    v-model="mesa_entrada"
                    :items="mesas"
                    label="Mesa"
                    variant="outlined"
                    auto-select-first
                    :disabled="campoMesaReadOnly"
                    :menu-icon = "menuIconMesa"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="2" md="2" lg="3">
                  <v-autocomplete
                    v-model="placa_cavalo_entrada"
                    :items="lista_placa_cavalo"
                    label="Cavalo (Placa)"
                    variant="outlined"
                    auto-select-first
                  >
                  </v-autocomplete>
                </v-col>
                
                <v-col cols="12" sm="3" md="3" lg="5">
                  <v-autocomplete
                    v-model="motorista_entrada"
                    :items="lista_motorista_entrada"
                    label="Motorista (Entr. na Base)"
                    variant="outlined"
                    auto-select-first
                  />
                </v-col>
                
                
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10" lg="8">
                  <v-textarea v-model="observacoes_entrada" label="Observações de Entrada" variant="outlined" no-resize rows="3"></v-textarea>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="10" md="10" lg="8" class="d-flex justify-end">
        <v-btn size="large" variant="text" class="mr-4" @click="fn_resetar_entrada()">Resetar</v-btn>
        <v-btn size="large" variant="elevated" @click="fn_registrar_entrada()">Registrar Entrada</v-btn>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const dados_clientes_mongodb = ref();
const dados_placas_carretas_mongodb = ref();
// dados_clientes_mongodb.value = await useFetch('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/clientes');

const lista_clientes_apelido = ref([]);
// const lista_produto_descricao = ref(['Biometano']);
const lista_placa_carreta = ref()
const lista_placa_cavalo = ref(["BEE 7H58", "KOZ 6G51", "KYN 3G27", "RJF 4B34", "RJI 5G88", "RJI 9F58", "RJI 9F60", "RJZ 4C22", "RJZ 4C28", "RKR 2E54"]);
const lista_motorista_entrada = ref(["Adriano Moreira Pereira", "Alexsandro Santos Gabriel", "Alessandro Vieira Fabrício", "Carlos Alberto Maia", "Carlos Antônio do Nascimento", "Carlos Henrique de Barros Conceição", "Celso Castro Gomes", "Claudio Cruz Farias ", "Daniel Junior ", "Dionil Monteiro", "Eduardo José de Lima Santos", "Eliandro dos Santos", "Janilton Ferreira", "Fernando Carmo Monteiro", "Geovane FS", "Geovane Leite Costa", "Gerailton da Costa Chaves", "Geraldo Santos da Silva", "Herval Ferreira Moraes", "Izaias Silva de Oliveira Júnior", "Jailson Gomes dos Santos", "João Guilherme Barbosa Gama", "Leandro Osório", "Leandro Reis Pinto ", "Marcos Pereira dos Santos", "Zequias Gonçalves", "Marinel Conceição", "Mazinho FS", "Michael Orion da Rosa", "Reginaldo Barbosa de Souza", "Rodrigo Ferreira da Conceição", "Celso Marques da Silva", "Samuel Ramos Soares", "Sandro Nogueira", "Sandro Osório", "Valdeci de Souza", "Wagner Luiz Alves Ranquine", "Wallace Matos dos Santos", "Wallace Ribeiro", "Willians José Borges Ribeiro"]);

const cliente_retorno = ref();

// const razao_social = ref('');
// const endereco = ref('');
// const bairro = ref('');
// const municipio = ref('');
// const uf = ref('');
// const cnpj = ref('');
// const insc_est = ref('');
// const declaracao_num = ref();
// const declaracao_num_seq = ref();

const data_entrada = ref();
const placa_carreta_entrada = ref();
const placa_cavalo_entrada = ref();
const motorista_entrada = ref();

// const lastDecCli = ref()
// const empr_atende_sigla = ref();

const paineis = ref(['panel_dados_entrada'])
// ----------------------------------------------------

function fn_preencher_produto_cod() {  
  console.log("fn_preencher_produto_cod()")
}

const produto_descricao = ref('Biometano');
const produto_quantidade = ref('');

const meta = ref();
const dados_cliente = ref();

const dados_para_pdf = ref();
const dados_para_post = ref();

const dados_produto = ref([
  {
    'produto_cod': '61020007',
    'produto_descricao': 'biometano' 
  }
])


const vaga_entrada = ref();
const mesa_entrada = ref();
const campoMesaReadOnly = ref(true);
const menuIconMesa = ref();
const observacoes_entrada = ref();

const vagas_e_mesas = [
  {
    vaga: "Fora da Vaga",
    mesa: "Fora da Mesa"
  },
  {
    vaga: 1,
    mesa: 1,
  },
  {
    vaga: 2,
    mesa: 1,
  },
  {
    vaga: 3,
    mesa: 1,
  },
  {
    vaga: 4,
    mesa: 2,
  },
  {
    vaga: 5,
    mesa: 2,
  },
  {
    vaga: 6,
    mesa: {
      array: [2, 3],
      padrao: 3,
      opcional: 2
    }
  },
  {
    vaga: 7,
    mesa: 3,
  },
  {
    vaga: 8,
    mesa: 3,
  },
  {
    vaga: 9,
    mesa: 4,
  },
  {
    vaga: 10,
    mesa: 4,
  },
  {
    vaga: 11,
    mesa: {
      array: [4, 5],
      padrao: 4,
      opcional: 5
    } 
  },
  {
    vaga: 12,
    mesa: 5,
  },
  {
    vaga: 13,
    mesa: 5,
  },
]
const vagas = vagas_e_mesas.map(e => e.vaga)

const mesas_e_tipo_gas = [
  {
    mesa: 1,
    tipo_gas: 'veicular'
  },
  {
    mesa: 2,
    tipo_gas: 'veicular'
  },
  {
    mesa: 3,
    tipo_gas: 'veicular'
  },
  {
    mesa: 4,
    tipo_gas: 'veicular'
  },
  {
    mesa: 5,
    tipo_gas: 'industrial'
  }
]
// const mesas = mesas_e_tipo_gas.map(e => e.mesa)
// const mesas = computed(() => {
//   if(vaga_entrada.value != undefined) {
//     // let arrayMesas;
//     return vagas_e_mesas.map(e => {
//       if(e.vaga == vaga_entrada.value) {
//         return e.mesa
//       }
//     })
//     // return arrayMesas
//   } else {
//     return []
//   }
// })
const mesas = ref([]);
  
function fn_preenhcer_campo_mesa() {
  if(vaga_entrada.value != undefined) {
    if(vaga_entrada.value == 6 || vaga_entrada.value == 11) {
      // mesas.value = [2, 3]
      mesas.value = vagas_e_mesas.find(e => e.vaga == vaga_entrada.value).mesa.array
      mesa_entrada.value = vagas_e_mesas.find(e => e.vaga == vaga_entrada.value).mesa.padrao
      
      menuIconMesa.value = "mdi-menu-down";
      campoMesaReadOnly.value = false
    } else {
      mesas.value = []
      mesa_entrada.value = vagas_e_mesas.find(e => e.vaga == vaga_entrada.value).mesa
      
      menuIconMesa.value = "";
      campoMesaReadOnly.value = true
    }
  } else {
    mesa_entrada.value = null
  }
}

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
  data_entrada.value = data_para_string();
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

// async function fetchLastDeclaracaoCliente(codigo) {
//   const lastDecClienteResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/getLastClienteMesAno?cliente_codigo=' + codigo + '&mes=' + (new Date(data_entrada.value).getMonth() + 1).toString() + '&ano=' + new Date(data_entrada.value).getFullYear().toString())
//   console.log('~fetch: ' + lastDecClienteResponse.data[0])
//   // const lastDecClienteResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Declaracoes/getLastCliente?cliente_codigo=' + codigo)
//   // console.log("lastDecClienteResponse.data[0]: " + lastDecClienteResponse.data[0])
//   // console.log(lastResponse.data);
//   // lastDeclaracaoCliente.value = lastDecClienteResponse.data[0];
//   // return JSON.stringify(lastDecClienteResponse.data[0]);
//   if(lastDecClienteResponse.data[0] != undefined){
//     return lastDecClienteResponse.data[0];
//   } else {
//     return null
//   }
// }

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


async function fn_preencher_campos() {
  // if(cliente.value != undefined) {
  //   console.log("cliente.value: " + cliente.value)
  //   lastDecCli.value = await fetchLastDeclaracaoCliente(cliente.value)
  //   // console.log("fetchLastDeclaracaoCliente(cliente.value): " + ldc.num)
    
  //   dados_cliente.value = dados_clientes_mongodb.value.find((e) => {
  //     return e.meta.cliente_cod == cliente.value
  //   })

  //   razao_social.value = dados_cliente.value.nome_razao_social;
  //   endereco.value = dados_cliente.value.endereco;
  //   bairro.value = dados_cliente.value.bairro;
  //   municipio.value = dados_cliente.value.municipio;
  //   uf.value = dados_cliente.value.uf;
  //   cnpj.value = dados_cliente.value.cnpj;
  //   insc_est.value = dados_cliente.value.insc_estadual;
    
  //   meta.value = dados_cliente.value.meta

  //   fn_preencher_declaracao_num();
  // }
}

// async function fn_preencher_declaracao_num() {
//   lastDecCli.value = await fetchLastDeclaracaoCliente(cliente.value)
//   // console.log(lastDecCli.value)
//   if(dados_cliente.value != undefined) {

//     if(dados_cliente.value.meta.empresa_atende == "urca_gas") {
//       empr_atende_sigla.value = "UG";
//     } else if(dados_cliente.value.meta.empresa_atende == "gas_verde") {
//       empr_atende_sigla.value = "GV";
//     }

//     if(lastDecCli.value != null && lastDecCli.value.num.mes == new Date(data_entrada.value).getMonth() + 1) {
//       declaracao_num_seq.value = lastDecCli.value.num.seq + 1;
//       declaracao_num.value = empr_atende_sigla.value + "-" + dados_cliente.value.meta.cliente_sigla + "-" + declaracao_num_seq.value.toString().padStart(3, '0') + "/" + (new Date(data_entrada.value).getMonth() + 1).toString().padStart(2,'0') + "-" +  new Date(data_entrada.value).getFullYear().toString().padStart(4, '0')
//     } else {
//       declaracao_num_seq.value = 1;
//       declaracao_num.value = empr_atende_sigla.value + "-" + dados_cliente.value.meta.cliente_sigla + "-" + declaracao_num_seq.value.toString().padStart(3, '0') + "/" + (new Date(data_entrada.value).getMonth() + 1).toString().padStart(2,'0') + "-" +  new Date(data_entrada.value).getFullYear().toString().padStart(4, '0')
//     }
//   }

// }

function fn_registrar_entrada() {
  // dados_para_pdf.value = {
  //   'cliente': {
  //     'razao_social': razao_social.value,
  //     'endereco': endereco.value,
  //     'bairro': bairro.value,
  //     'municipio': municipio.value,
  //     'uf': uf.value,
  //     'cnpj': cnpj.value,
  //     'insc_est': insc_est.value,
  //     'meta': meta.value
  //   },
  //   'declaracao': {
  //     'num': declaracao_num.value,
  //     'data_saida': data_entrada.value,
  //     'placa_carreta': declaracao_placa_carreta.value,
  //     'produto': {
  //       'codigo': produto_codigo.value,
  //       'descricao': produto_descricao.value,
  //       'quantidade': produto_quantidade.value
  //     }
  //   }
  // }

  dados_para_post.value = {
    'placa_carreta': placa_carreta_entrada.value,
    'data_entrada': {'$date': data_entrada.value},
    'cliente_retorno': cliente_retorno.value,
    'vaga_entrada': vaga_entrada.value,
    'mesa_entrada': mesa_entrada.value,
    'vaga': vaga_entrada.value,
    'mesa': mesa_entrada.value,
    'placa_cavalo_entrada': placa_cavalo_entrada.value,
    'motorista_entrada': motorista_entrada.value,
    'observacoes_entrada': observacoes_entrada.value,
    'status': 'Entrou na Base',
    'meta': {
      'data_reg_entrada': {'$date': new Date()},
      'usuario_reg_entrada': 'rcabral@gasverde.com.br'
    }

    // 'num': {
    //   'empresa_atende': dados_cliente.value.meta.empresa_atende,
    //   'cliente_sigla': dados_cliente.value.meta.cliente_sigla,
    //   'seq': declaracao_num_seq.value,
    //   'mes': new Date(data_entrada.value).getMonth() + 1,
    //   'ano': new Date(data_entrada.value).getFullYear()
    // },
    // 'cliente_cod': cliente.value,
    // 'data_saida': {'$date': data_entrada.value},
    // 'placa_carreta': declaracao_placa_carreta.value,
    // 'produto_codigo': produto_codigo.value,
    // 'produto_quantidade': produto_quantidade.value,
    // 'meta': {
    //   'data_reg_declaracao': {'$date': new Date(data_para_string())},
    //   'usuario_reg_declaracao': 'rcabral@gasverde.com.br'
    // }
  }
  
  // criarPDF(dados_para_pdf.value);
  fn_post_entrada(dados_para_post.value);
}

function fn_resetar_entrada() {
  placa_carreta_entrada.value = null;
  data_entrada.value = data_para_string();
  cliente_retorno.value = null;
  placa_cavalo_entrada.value = null;
  motorista_entrada.value = null;
  vaga_entrada.value = null;
  mesa_entrada.value = null;
  observacoes_entrada.value = null;
}

function fn_post_entrada(dados_para_post) {
  axios.post(
    'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/create', 
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

// const produto_codigo = computed(() => {
//   if(produto_descricao.value == '') {
//     console.log("EITA")
//     // if(produto_codigo.value != '') {
//       // return ''
//     // }
//   } else {
//     return dados_produto.value.find(e => {
//       return e.produto_descricao == produto_descricao.value.toLowerCase()
//     }).produto_cod
//   }
  
//   // console.log('produto_descricao.value: ' + produto_descricao.value)
//   // if(produto_descricao.value != undefined || produto_descricao.value != null) {
//   //   return dados_produto.value.find(e => {
//   //     return e.produto_descricao == produto_descricao.value.toLowerCase()
//   //   }).produto_cod
//   // } else {
//   //   return null
//   // }
// });

</script>

<style>

</style>