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
                  label="Carreta (Placa)"
                  :items="lista_placa_carreta"
                  item-value="placa_carreta"
                  item-title="placa_carreta"
                  variant="outlined"
                >
                  <template v-slot:item="{props, item}">
                    <v-list-item
                      v-bind="props"
                      :disabled="item.raw.disabled"
                    >
                    </v-list-item>
                  </template>
                </v-autocomplete>
                <!-- <v-autocomplete
                  v-model="placa_carreta_entrada"
                  :items="lista_placa_carreta"
                  label="Carreta (Placa)"
                  variant="outlined"
                  auto-select-first
                >
                </v-autocomplete> -->
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
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="2" md="2" lg="2">
                <v-select
                  v-model="vaga_entrada"
                  label="Vaga"
                  :items="vaga_entrada_lista"
                  item-value="num"
                  item-title="title"
                  variant="outlined"
                  v-on:update:model-value="fn_preenhcer_campo_mesa()"
                >
                  <template v-slot:item="{props, item}">
                    <v-list-item
                      v-bind="props"
                      :disabled="item.raw.disabled"
                    >

                    </v-list-item>
                  </template>
                </v-select>
                
                <!-- <v-autocomplete
                  v-model="vaga_entrada"
                  :items="vagas"
                  label="Vaga"
                  variant="outlined"
                  auto-select-first
                  v-on:update:model-value="fn_preenhcer_campo_mesa()"
                >
                </v-autocomplete> -->
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

const lista_clientes_apelido = ref([]);
const lista_placa_carreta = ref()
const lista_placa_cavalo = ref(["BEE 7H58", "KOZ 6G51", "KYN 3G27", "RJF 4B34", "RJI 5G88", "RJI 9F58", "RJI 9F60", "RJZ 4C22", "RJZ 4C28", "RKR 2E54"]);
const lista_motorista_entrada = ref(["Adriano Moreira Pereira", "Alexsandro Santos Gabriel", "Alessandro Vieira Fabrício", "Carlos Alberto Maia", "Carlos Antônio do Nascimento", "Carlos Henrique de Barros Conceição", "Celso Castro Gomes", "Claudio Cruz Farias ", "Daniel Junior ", "Dionil Monteiro", "Eduardo José de Lima Santos", "Eliandro dos Santos", "Janilton Ferreira", "Fernando Carmo Monteiro", "Geovane FS", "Geovane Leite Costa", "Gerailton da Costa Chaves", "Geraldo Santos da Silva", "Herval Ferreira Moraes", "Izaias Silva de Oliveira Júnior", "Jailson Gomes dos Santos", "João Guilherme Barbosa Gama", "Leandro Osório", "Leandro Reis Pinto ", "Marcos Pereira dos Santos", "Zequias Gonçalves", "Marinel Conceição", "Mazinho FS", "Michael Orion da Rosa", "Reginaldo Barbosa de Souza", "Rodrigo Ferreira da Conceição", "Celso Marques da Silva", "Samuel Ramos Soares", "Sandro Nogueira", "Sandro Osório", "Valdeci de Souza", "Wagner Luiz Alves Ranquine", "Wallace Matos dos Santos", "Wallace Ribeiro", "Willians José Borges Ribeiro"]);

const cliente_retorno = ref();

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

const vaga_entrada_lista = ref();

const vagas_e_mesas = [
  {
    vaga: "fora_da_vaga",
    mesa: "fora_da_vaga"
  },
  {
    vaga: "1",
    mesa: "1",
  },
  {
    vaga: "2",
    mesa: "1",
  },
  {
    vaga: "3",
    mesa: "1",
  },
  {
    vaga: "4",
    mesa: "2",
  },
  {
    vaga: "5",
    mesa: "2",
  },
  {
    vaga: "6",
    mesa: "3"
    // mesa: {
    //   array: [2, 3],
    //   padrao: 3,
    //   opcional: 2
    // }
  },
  {
    vaga: "7",
    mesa: "3",
  },
  {
    vaga: "8",
    mesa: "3",
  },
  {
    vaga: "9",
    mesa: "4",
  },
  {
    vaga: "10",
    mesa: "4",
  },
  {
    vaga: "11",
    mesa: "4"
    // mesa: {
    //   array: [4, 5],
    //   padrao: 4,
    //   opcional: 5
    // } 
  },
  {
    vaga: "12",
    mesa: "5",
  },
  {
    vaga: "13",
    mesa: "5",
  },
]
const vagas = vagas_e_mesas.map(e => e.vaga)

const dados_vagas = ref();

async function getVagas() {
  const vagasResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Vagas/get');
  dados_vagas.value = vagasResponse.data;
}

const mesas = ref([]);
  
function fn_preenhcer_campo_mesa() {
  if(vaga_entrada.value != undefined) {
    // if(vaga_entrada.value == 6 || vaga_entrada.value == 11) {
    //   mesas.value = vagas_e_mesas.find(e => e.vaga == vaga_entrada.value).mesa.array
    //   mesa_entrada.value = vagas_e_mesas.find(e => e.vaga == vaga_entrada.value).mesa.padrao
      
    //   menuIconMesa.value = "mdi-menu-down";
    //   campoMesaReadOnly.value = false
    // } else {
      mesas.value = []
      mesa_entrada.value = vagas_e_mesas.find(e => e.vaga == vaga_entrada.value).mesa
      
      menuIconMesa.value = "";
      campoMesaReadOnly.value = true
    // }
  } else {
    mesa_entrada.value = null
  }
}

onMounted(async () => {
  await fetchClientes();
  fn_preencher_lista_clientes_apelido();

  await fetchPlacasCarretas();
  // lista_placa_carreta.value = dados_placas_carretas_mongodb.value.map(e => e.placa_carreta)
  lista_placa_carreta.value = dados_placas_carretas_mongodb.value.map((e, index) => {
    return {
      ...e,
      disabled: 
        e.status == "entrou_na_base" || 
        e.status == "carregando" ||
        e.status == "parcialmente_carregada" || 
        e.status == "totalmente_carregada"
        ? true : false
    }
  })
  lista_placa_carreta.value.sort((a, b) => {
    return (a.placa_carreta < b.placa_carreta) ? -1 : (a.placa_carreta > b.placa_carreta) ? 1 : 0;
  })
  

  // await fetchLastDeclaracao();
  // console.log("lastDeclaracao.value: " + lastDeclaracao.value)
  // declaracao_num.value = (parseInt(lastDeclaracao.value) + 1).toString().padStart(6, '0')

  // ano + "-" + mes + "-" + dia + "T" + hora + ":" + minuto + ":00-03:00"
  // 2016-05-01T03:24:00-02:00

  await getVagas();

  vaga_entrada_lista.value = dados_vagas.value.map((e, index) => {
    return {
      ...e,
      title: e.num,
      disabled: e.status == "ocupada" ? true : false
    }
  })

  vaga_entrada_lista.value.sort((a,b) => a.num - b.num);

  vaga_entrada_lista.value.unshift(
    // {
    //   num: 'estoque',
    //   title: 'Estoque'
    // },
    {
      num: 'fora_da_vaga',
      title: 'Fora da Vaga'
    }
  );

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

async function fn_registrar_entrada() {

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
    'status': 'entrou_na_base',
    'meta': {
      'data_reg_entrada': {'$date': new Date()},
      'usuario_reg_entrada': 'rcabral@gasverde.com.br'
    }
  }
  await fn_post_entrada(dados_para_post.value);
  await navigateTo('/ucb/carregamentos')
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

async function fn_post_entrada(dados_para_post) {
  // adicionar document à collection Carregamentos
  await axios.post(
    'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/create', 
    dados_para_post
  ).then(async res => {
    if(res.status == 200) {
      console.log(res)
    }
  }).catch(error => console.log(error))

  // atualizar collection PlacasCarretas para que aquela placa de carreta que entrou na base tenha o status
  // entrou_na_base
  await axios.put(
    'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/placas_carretas/update?placa_carreta=' + dados_para_post.placa_carreta,
    {
      status: 'entrou_na_base'
    }
  ).then(async res => {
    if(res.status == 200) {
      console.log(res)
    }
  }).catch(error => console.log(error))

  // atualizar collection Vagas (se a vaga for diferente de estoque ou fora_da_vaga)
  if(dados_para_post.vaga != 'estoque' && dados_para_post.vaga != 'fora_da_vaga') {
    await axios.put(
      'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Vagas/update?num=' + dados_para_post.vaga,
      {
        status: 'ocupada',
        placa_carreta: dados_para_post.placa_carreta
      }
    ).then(async res => {
      if(res.status == 200) {
        console.log(res)
      }
    }).catch(error => console.log(error))
  }

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

</script>

<style>

</style>