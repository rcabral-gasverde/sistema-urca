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


  <v-dialog v-model="detalhes_carregamento_dialog" max-width="840">
    <v-card class="text-body-2">

      <v-tabs v-model="tab_detalhes_carregamento" slider-color="blue">
        <v-tab value="detalhes">Detalhes</v-tab>
        <!-- <v-tab value="cargas">Cargas</v-tab> -->
        <!-- <v-tab value="cargas_2">Cargas 2</v-tab> -->
        <!-- <v-tab value="cargas_3">Cargas 3</v-tab> -->
        <v-tab value="cargas_4">Cargas</v-tab>
        <v-tab value="reg_carga">Reg Carga</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab_detalhes_carregamento">
          
          <v-window-item value="detalhes">  
            <v-row class="mt-2">
              <v-col cols="12" lg="3">
                Placa da Carreta:
              </v-col>
              <v-col cols="12" lg="3">
                {{ detalhes_carregamento.placa_carreta }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="3">
                Data de Entrada na Base:
              </v-col>
              <v-col cols="12" lg="3">
                {{detalhes_carregamento.data_entrada}}
              </v-col>
              <!-- <v-col cols="12" lg="3">
                Data de Saída da Base:
              </v-col>
              <v-col cols="12" lg="3">
                {{ DateToString(new Date(detalhes_carregamento.data_entrada.$date)) }}
              </v-col> -->
            </v-row>
            <v-row>
              <v-col cols="12" lg="3">
                Status:
              </v-col>
              <v-col cols="12" lg="3">
                {{ detalhes_carregamento.status }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="3">
                Vaga e Mesa (Atual):
              </v-col>
              <v-col cols="12" lg="3">
                Vaga: {{ detalhes_carregamento.vaga }} &nbsp;
                Mesa: {{ detalhes_carregamento.mesa }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="3">
                Volume do Carregamento:
              </v-col>
              <v-col cols="12" lg="3">
                {{ detalhes_carregamento.volume_carregamento }}
              </v-col>
              <!-- <v-col cols="12" lg="2">
                Tipo do gás:
              </v-col> -->
              <!-- <v-col cols="12" lg="4" class="text-red font-weight-bold">
                Blend (58% Ind / 42% Veic) <br/>
                Blend (3500 Ind / 2500 Veic) <br/>
              </v-col> -->
            </v-row>
          </v-window-item>
          
          <!-- <v-window-item value="cargas">
            <v-table>
              <thead>
                <tr>
                  <th>Carga Núm #</th>
                  <th>Encerrante Inicial</th>
                  <th>Parciais</th>
                  <th>Encerrante Final</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="carga in cargas_carregamento" :key="carga.num">
                  <td>
                    {{ carga.num }}
                  </td>
                  <td>
                    {{ carga.encerrante_inicial }}
                  </td>
                  <td>
                    {{ carga.parciais }}
                  </td>
                  <td>
                    {{ carga.encerrante_final }}
                  </td>
                  <td>
                    {{ carga.volume_carga }}
                  </td>
                  
                </tr>
              </tbody>
            </v-table>
          </v-window-item> -->

          <!-- <v-window-item value="cargas_2">
            <ul v-for="carga in cargas_carregamento">
              <li>
                Carga: {{ carga.num }}
                <ul>
                  <li>Tipo do gás: {{ carga.tipo_gas }}</li>
                  <li>Encerrante Inicial: {{ carga.encerrante_inicial }}</li>
                  <li>
                    Parciais:
                    <ul>
                      <li v-for="parcial in carga.parciais">
                        {{ parcial }}
                      </li>
                    </ul>
                  </li>
                  <li>Encerrante Final: {{ carga.encerrante_final }}</li>
                </ul>
              </li>
            </ul>
          </v-window-item> -->

          <!-- <v-window-item value="cargas_3">
            <v-data-table
              :headers="cargasHeaders"
              :items="cargas_carregamento"
              item-value="num"
              show-expand
              density="compact"
              expand-on-click
              class="text-body-2 bg-grey-lighten-3"
              hover
              hide-default-header
              hide-default-footer
            >
              <template v-slot:expanded-row="{columns, item}" >
                  <tr class="text-grey-darken-1 bg-white">
                    <td class="text-right" >
                      Enc. Inicial
                    </td>
                    <td></td>
                    <td>
                      {{item.encerrante_inicial}}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                  </tr>
                  <tr v-for="parcial in item.parciais" class=" text-grey-darken-1 bg-white">
                    <td class="text-right" >
                      Parcial
                    </td>
                    <td></td>
                    <td>
                      {{ parcial }}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr class=" text-grey-darken-1 bg-white">
                    <td class="text-right">
                      Enc. Final
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      {{item.encerrante_final}}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
              </template>
            </v-data-table>
          </v-window-item> -->

          <v-window-item value="cargas_4">
            <table class="table-cargas">
              <thead>
                <tr>
                  <th style="border-bottom: 4px solid #999">Carga</th>
                  <th style="border-bottom: 4px solid #999">Tipo de Gás</th>
                  <th style="border-bottom: 4px solid #999">Volume</th>
                  <th style="border-bottom: 4px solid #999">Estágio</th>
                  <th style="border-bottom: 4px solid #999">Encerrante</th>
                  <th style="border-bottom: 4px solid #999">Pressão</th>
                  <th style="border-bottom: 4px solid #999">Data</th>
                </tr>
              </thead>
              <tbody v-for="carga in cargas_carregamento">
                <tr v-if="carga.parciais">
                  <td :rowspan="carga.parciais.length + 3" style="text-align: center; border-bottom: 3px solid #999" class="font-weight-bold">Carga {{ carga.num }}</td>
                  <td :rowspan="carga.parciais.length + 3" style="text-align: center; border-bottom: 3px solid #999">{{ carga.tipo_gas }}</td>
                  <td :rowspan="carga.parciais.length + 3" style="text-align: center; border-bottom: 3px solid #999">{{ carga.volume_carga }}</td>
                </tr>
                <tr v-else>
                  <td :rowspan="3" style="text-align: center; border-bottom: 3px solid #999" class="font-weight-bold">Carga {{ carga.num }}</td>
                  <td :rowspan="3" style="text-align: center; border-bottom: 3px solid #999">{{ carga.tipo_gas }}</td>
                  <td :rowspan="3" style="text-align: center; border-bottom: 3px solid #999">{{ carga.volume_carga }}</td>
                </tr>
                <tr>
                  <td style="text-align: right">Inicial</td>
                  <td>{{ carga.encerrante_inicial.encerrante }}</td>
                  <td>{{ carga.encerrante_inicial.pressao }}</td>
                  <td style="text-align: center">{{ DateToString(new Date(carga.encerrante_inicial.data.$date)) }}</td>
                </tr>

                <tr v-for="parcial in carga.parciais">
                  <!-- <td style="padding-left: 1.5rem; font-style: italic; font-size: small">Parcial</td> -->
                  <td style="text-align: right">Parcial</td>
                  <td >{{ parcial.encerrante }}</td>
                  <td >{{ parcial.pressao }}</td>
                  <td style="text-align: center">{{ DateToString(new Date(parcial.data.$date)) }}</td>
                </tr>

                <tr v-if="carga.encerrante_final">
                  <td style="text-align: right; border-bottom: 3px solid #999">Final</td>
                  <td v-if="carga.encerrante_final" style="border-bottom: 3px solid #999">{{ carga.encerrante_final.encerrante }}</td>
                  <td v-if="carga.encerrante_final" style="border-bottom: 3px solid #999">{{ carga.encerrante_final.pressao }}</td>
                  <td v-else style="text-align: center; border-bottom: 3px solid #999">-</td>
                  <td v-else style="text-align: center; border-bottom: 3px solid #999">-</td>
                  <td v-if="carga.encerrante_final" style="text-align: center; border-bottom: 3px solid #999">{{ DateToString(new Date(carga.encerrante_final.data.$date)) }}</td>
                  <td v-else style="text-align: center; border-bottom: 3px solid #999">-</td>
                </tr>
                
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td style="text-align: right">TOTAL</td>
                  <td style="text-align: center">{{ detalhes_carregamento.volume_carregamento }}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
              
            </table>
          </v-window-item>

          <v-window-item value="reg_carga" class="py-3">
            <v-row>
              <v-col cols="12" lg="2">
                <v-select
                  v-model="estagio_carga"
                  label="Estágio"
                  :items="lista_estagio_carga"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :disabled="estagio_carga_disabled"
                  v-on:update:model-value="fn_atualizar_campos_carga"
                >
                  <template v-slot:item="{props, item}">
                    <v-list-item
                      v-bind="props"
                      :disabled="item.raw.disabled"
                    ></v-list-item>
                  </template>
                </v-select>

              </v-col>
              <v-col cols="12" lg="2">
                <v-text-field
                  v-model="num_carga"
                  :disabled="num_carga_disabled"
                  label="Carga Núm."
                  variant="outlined"
                  density="compact"
                  hide-details
                  type="number"
                >
                </v-text-field>

              </v-col>
              <v-col cols="12" lg="4">
                <v-text-field
                  v-model="data_carga"
                  label="Data e Hora"
                  type="datetime-local"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :disabled="data_carga_disabled"
                >
                </v-text-field>

              </v-col>
            </v-row>
            
            <v-row v-if="estagio_carga == 'inicial'">
              <v-col cols="12" lg="2">
                <v-select
                  v-model="vaga_carga"
                  label="Vaga"
                  :items="[1,2,3,4,5,6,7,8,9,10,11,12,13]"
                  variant="outlined"
                  density="compact"
                  hide-details
                >
                </v-select>
              </v-col>
              <v-col cols="12" lg="2">
                <v-select
                  v-model="mesa_carga"
                  label="Mesa"
                  :items="[1,2,3,4,5]"
                  variant="outlined"
                  density="compact"
                  hide-details
                >
                </v-select>
              </v-col>
              <v-col cols="12" lg="3">
                <v-select
                  v-model="tipo_gas_carga"
                  label="Tipo do Gás"
                  :items="lista_tipo_gas"
                  variant="outlined"
                  density="compact"
                  hide-details
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              
              <v-col cols="12" lg="3">
                <v-text-field
                  v-model="encerrante_carga"
                  label="Encerrante"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :disabled="encerrante_carga_disabled"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="3">
                <v-text-field
                  v-model="pressao_carga"
                  label="Pressão"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :disabled="pressao_carga_disabled"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="3">
                <v-select
                  v-model="status_carga"
                  :items="lista_status_carga"
                  label="Staus"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :disabled="status_carga_disabled"
                >
                  <template v-slot:item="{props, item}">
                    <v-list-item
                      v-bind="props"
                      :disabled="item.raw.disabled"
                    ></v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="right">
                <v-btn @click="fn_reg_carga()">Reg Carga</v-btn>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="detalhes_carregamento_dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- FILTROS -->
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

  <!-- <v-alert 
    border="start"
    border-color="white"
    
    color="red"
    class="mb-3"
    
    >
    <span class="text-overline font-weight-bold">Atenção:</span> <span class="text-body-2">Os dados abaixo são dados falsos (ou "dummy") usados apenas para fins de demonstração e desenvolvimento!</span>
  </v-alert> -->

  <v-data-table
    density="compact"
    :items="dados_carregamentos"
    fixed-header
    :headers="headers"
    :height="existe_filtro ? 383 : 460"
    items-per-page="10"
    item-value="_id"
    return-object
    @click:row="mostrar_detalhes_carregamento"
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

// ===================================================================
const lista_estagio_carga = ref([
    {
      title: 'Inicial',
      value: 'inicial',
      disabled: false
    },
    {
      title: 'Parcial',
      value: 'parcial',
      disabled: false
    },
    {
      title: 'Final',
      value: 'final',
      disabled: false
    }
  ]);

const lista_tipo_gas = [
  {
    title: 'Veicular',
    value: 'veicular'
  },
  {
    title: 'Industrial',
    value: 'industrial'
  }
]

const lista_status_carga = ref([
  {
    title: 'Carregando',
    value: 'carregando',
    disabled: false
  },
  {
    title: 'Parcialmente Carregada',
    value: 'parcialmente_carregada',
    disabled: false
  },
  {
    title: 'Totalmente Carregada',
    value: 'totalmente_carregada',
    disabled: false
  }, 
])

const dados_reg_carga = ref();
const num_carga = ref();
const estagio_carga = ref();
const data_carga = ref();
const vaga_carga = ref();
const mesa_carga = ref();
const tipo_gas_carga = ref();
const encerrante_carga = ref();
const pressao_carga = ref();
const status_carga = ref();

const estagio_carga_disabled = ref(false);
const num_carga_disabled = ref(false);
const data_carga_disabled = ref(false);
const encerrante_carga_disabled = ref(false);
const pressao_carga_disabled = ref(false);
const status_carga_disabled = ref(false);

async function fn_reg_carga() {
  let carga = {
    num: num_carga.value,
    estagio: estagio_carga.value,
    data: data_carga.value,
    vaga: vaga_carga.value,
    mesa: mesa_carga.value,
    tipo_gas: tipo_gas_carga.value,
    encerrante: encerrante_carga.value,
    pressao: pressao_carga.value,
    status: status_carga.value
  }
  console.log(id_carregamento_clicado.value)
  console.log(JSON.stringify(carga,null,2));
  await axios.put(
    // 'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/update?id=' + id_carregamento_clicado.value, JSON.stringify(carga)
    'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/update?id=' + id_carregamento_clicado.value, carga
  ).then(async res => {
    if(res.status == 200) {
      console.log(res)
    }
  }).catch(error => console.log(error))
}

function fn_popular_campos_carga() {
  // Esta function é chamada quando o diálogo de detalhes detalhes_carregamento_dialog é aberto.

  estagio_carga_disabled.value = false;
    num_carga_disabled.value = false;
    data_carga_disabled.value = false;
    encerrante_carga_disabled.value = false;
    pressao_carga_disabled.value = false;
    status_carga_disabled.value = false;

  // data_carga.value = "2024-01-01T00:00";
  // data_carga.value = new Date(new Date().toISOString().slice(0,19)+"+03:00").toISOString().slice(0,19);
  data_carga.value = data_atual_para_string();
  console.log(data_carga.value.slice(0,19))

  // Pegar status do carregamento. 
  const status_carregamento = detalhes_carregamento.value.status;
  console.log("status_carregamento: " + status_carregamento)
  
  // if(status_carregamento != "entrou_na_base") {
  // console.log(JSON.stringify(detalhes_carregamento.value.cargas))
  // detalhes_carregamento.value.cargas.forEach(carga => console.log(JSON.stringify(carga, null, 2)))

  let ult_carregamento;
  // Pegar o número do último carregamento
  if(detalhes_carregamento.value.cargas != undefined){
    ult_carregamento = detalhes_carregamento.value.cargas[detalhes_carregamento.value.cargas.length - 1].num
    console.log("ult_carregamento: " + ult_carregamento)
  }

  let indice_inicial = lista_estagio_carga.value.findIndex(e => e.value == 'inicial')

  if(status_carregamento == "entrou_na_base") {
    estagio_carga.value = 'inicial';
    estagio_carga_disabled.value = true;
    num_carga.value = 1;
    num_carga_disabled.value = true;
    status_carga.value = 'carregando';
    status_carga_disabled.value = true;
    lista_estagio_carga.value = lista_estagio_carga.value.map((e, index) => {
      return {
        ...e,
        disabled: index != indice_inicial ? true : false 
      }
    })
  }

  if(status_carregamento == "carregando") {
    estagio_carga.value = "parcial";
    estagio_carga_disabled.value = false;
    status_carga.value = 'carregando';
    status_carga_disabled.value = true;
    num_carga.value = ult_carregamento;
    num_carga_disabled.value = true;
    lista_estagio_carga.value = lista_estagio_carga.value.map((e, index) => {
      return {
        ...e,
        disabled: index == indice_inicial ? true : false 
      }
    })
  }
  
  if(status_carregamento == "parcialmente_carregada") {
    estagio_carga.value = "inicial";
    estagio_carga_disabled.value = true;
    num_carga.value = ult_carregamento + 1;
    num_carga_disabled.value = true;
    status_carga.value = 'carregando';
    status_carga_disabled.value = true;
    lista_estagio_carga.value = lista_estagio_carga.value.map((e, index) => {
      return {
        ...e,
        disabled: index != indice_inicial ? true : false 
      }
    })
  }

  if(status_carregamento == "totalmente_carregada" || status_carregamento == "saiu_para_cliente") {
    estagio_carga_disabled.value = true;
    num_carga_disabled.value = true;
    data_carga_disabled.value = true;
    encerrante_carga_disabled.value = true;
    pressao_carga_disabled.value = true;
    status_carga_disabled.value = true;
    
  }
    // let indice_inicial = lista_estagio_carga.value.findIndex(e => e.value == 'inicial')
    // lista_estagio_carga.value = lista_estagio_carga.value.map((e, index) => {
    //   return {
    //     ...e,
    //     disabled: index == indice_inicial ? true : false 
    //   }
    // })
    // estagio_carga_disabled.value = false;

    // if(estagio_carga.value == 'inicial') {
    //   num_carga.value = parseInt(ult_carregamento) + 1;
    // } else if( estagio_carga.value == 'parcial' || estagio_carga.value == 'final') {
    //   num_carga.value = parseInt(ult_carregamento);
    // }

    // if(estagio_carga.value == 'inicial' || estagio_carga.value == 'parcial') {
    //   status_carga.value = 'carregando'
    //   status_carga_disabled.value = true
    // } else if (estagio_carga.value == 'final') {
    //   status_carga.value = undefined
    //   status_carga_disabled.value = false
    // }

    // if(estagio_carga.value == 'final') {
    //   status_carga_disabled.value = false;
    // } else if(estagio_carga.value == 'parcial') {
    //   status_carga_disabled.value = false;
    //   status_carga.value = 'carregando'
    // }
  
} // Fim da function fn_popular_campos_carga

function fn_atualizar_campos_carga() {
  // Esta function é chamada quando o campo de estágio da carga é modificado.
  // estagio_carga
  let indice_carregando = lista_status_carga.value.findIndex(e => e.value == 'carregando')
  if(estagio_carga.value == 'parcial') {
    status_carga.value = 'carregando';
    status_carga_disabled.value = true;
  }
  if(estagio_carga.value == 'final') {
    // status_carga.value = 'carregando';
    lista_status_carga.value = lista_status_carga.value.map((e, index) => {
      return {
        ...e,
        disabled: index == indice_carregando ? true : false 
      }
    })
    status_carga.value = 'parcialmente_carregada';
    status_carga_disabled.value = false;
  }
}

// ===================================================================
const tab_detalhes_carregamento = ref('detalhes');

const cargas_carregamento = ref([]);

function mostrar_detalhes_carregamento(event, row) {
  

  tab_detalhes_carregamento.value = "detalhes";
  cargas_carregamento.value = []
  // alert(aTesteID.value)
  // this.highlightClickedRow(valor)
  // alert(row.item._id);
  detalhes_carregamento_dialog.value = true;
  id_carregamento_clicado.value = row.item._id;
  detalhes_carregamento.value = dados_carregamentos.value.find(e => e._id == id_carregamento_clicado.value);
  console.log("detalhes_carregamento: \n" + JSON.stringify(detalhes_carregamento.value, null, 2))
  // console.log("detalhes_carregamento.cargas: \n" + detalhes_carregamento.value.cargas[0])
  // console.log(typeof detalhes_carregamento.value.cargas)
  // console.log(typeof detalhes_carregamento.value['cargas'])
  // console.log(detalhes_carregamento.value['cargas'])
  // console.log(detalhes_carregamento.value['cargas'].length)
  // detalhes_carregamento.value.cargas.length
  // cargas_carregamento.value = detalhes_carregamento.value['cargas']; 
  // detalhes_carregamento.value['cargas'].forEach(e => console.log('cargas: \n' + JSON.stringify(e, null, 2)))
  // cargas_carregamento.value.forEach(e => console.table(e))
  
  if(detalhes_carregamento.value['cargas'] != undefined) {
    detalhes_carregamento.value['cargas'].forEach(carga => {
    cargas_carregamento.value.push(
      {
        num: carga.num,
        tipo_gas: carga.tipo_gas
      }
    );

    // console.log("num: " + carga.num);
    
    if(carga.encerrante_inicial != undefined) {
      // console.log("encerrante_inicial: " + carga.encerrante_inicial + " " + typeof carga.encerrante_inicial);
      // cargas_carregamento.value[cargas_carregamento.value.length - 1].encerrante_inicial = carga.encerrante_inicial
      cargas_carregamento.value[cargas_carregamento.value.length - 1].encerrante_inicial = {
        encerrante: carga.encerrante_inicial,
        pressao: carga.pressao_inicial,
        data: carga.data_inicial
      }
    }
    
    if(carga.parciais != undefined) {
      // console.log("parciais: \n ");
      carga.parciais.forEach(parcial => {
        // console.log("  encerrante_parcial: " + parcial.encerrante_parcial)
        if(cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais == undefined) {
          cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais = [];
        }
        // cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais.push(parcial.encerrante_parcial)
        cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais.push(
          {
            encerrante: parcial.encerrante_parcial,
            pressao: parcial.pressao_parcial,
            data: parcial.data_parcial
          }
        )
      })
    }
    
    if(carga.encerrante_final != undefined) {
      // console.log("encerrante_final: " + carga.encerrante_final + " " + typeof carga.encerrante_final);
      // cargas_carregamento.value[cargas_carregamento.value.length - 1].encerrante_final = carga.encerrante_final
      cargas_carregamento.value[cargas_carregamento.value.length - 1].encerrante_final = {
        encerrante: carga.encerrante_final,
        pressao: carga.pressao_final,
        data: carga.data_final
      }
    }

    
    // Cálculo do volume da carga
    let volume_carga;
    
    if(carga.encerrante_final != undefined) {
      volume_carga = carga.encerrante_final - carga.encerrante_inicial
    } else if (carga.parciais != undefined) {
      // Último encerrante parcial menos o encerrante inicial
      volume_carga = carga.parciais[carga.parciais.length - 1].encerrante_parcial - carga.encerrante_inicial 
    } else {
      volume_carga = 0;
    }
    cargas_carregamento.value[cargas_carregamento.value.length - 1].volume_carga = volume_carga
    // console.log("volume da carga: " + cargas_carregamento.value[cargas_carregamento.value.length - 1].volume_carga)

    })
  }
  
  // console.log("cargas_carregamento: \n")
  // console.log(cargas_carregamento.value)
  detalhes_carregamento.value.volume_carregamento = 0;
  cargas_carregamento.value.forEach(carga => {
    // console.log("carga.volume_carga: " + carga.volume_carga + " " + typeof carga.volume_carga)
    detalhes_carregamento.value.volume_carregamento += carga.volume_carga
  })

  fn_popular_campos_carga();
} // Fim da function mostrar_detalhes_carregamento

const cargasHeaders = ref([
  {
    title: 'Carga #',
    key: 'num',
    sortable: false
  },
  {
    title: 'Tipo do Gás',
    key: 'tipo_gas',
    sortable: false
  },
  {
    title: "Enc. Inicial",
    key: "encerrante_inicial",
    sortable: false
  },
  {
    title: "Enc Final",
    key: "encerrante_final",
    sortable: false
  },
  {
    title: "Volume",
    key: "volume_carga",
    sortable: false
  }
])

// ===================================================================

const dados_carregamentos = ref();

const dados_placas_carretas_mongodb = ref();
const lista_placa_carreta = ref();
const dados_clientes = ref()
const lista_clientes_apelido = ref([]);

// Detalhes carregamento
const detalhes_carregamento = ref();
const detalhes_carregamento_dialog = ref(false);
const id_carregamento_clicado = ref('');

// Filtros
const filter_dialog = ref(false);
const filter_dialog_cliente = ref();
const filter_dialog_cliente_retorno_interno = ref();
const filter_dialog_data_entrada_inicio = ref();
const filter_dialog_data_entrada_inicio_interno = ref();
const filter_dialog_data_entrada_fim = ref();
const filter_dialog_data_entrada_fim_interno = ref();
const filter_dialog_placa_carreta = ref();
const filter_dialog_placa_carreta_interno = ref();

const limparFiltrosSnackbar = ref(false);
const ativarFiltrosSnackbar = ref(false);

const existe_filtro = computed(() => {
  if(
    filter_dialog_cliente.value != undefined || 
    filter_dialog_data_entrada_inicio.value != undefined || 
    filter_dialog_placa_carreta.value != undefined) 
    {
    return true
  }
})

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

const ippo = [
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: 'Todos'}
]

const headers = ref();
headers.value = [
  // {title: 'Data Reg.', align: 'start', key: 'meta_data_reg_entrada', sortable: false},
  {title: 'Placa Carreta', align: 'start', key: 'placa_carreta', sortable: false},
  {title: 'Data Entrada', align: 'start', key: 'data_entrada', sortable: false},
  {title: 'Status', align: 'start', key: 'status', sortable: false},
  {title: 'Vaga', align: 'start', key: 'vaga', sortable: false},
  {title: 'Mesa', align: 'start', key: 'mesa', sortable: false},
  {title: 'Cliente Retorno', align: 'start', key: 'cliente_retorno', sortable: false},
  {title: 'Volume', align: 'start', key: 'volume_carregamento', sortable: false},
  // {title: 'Motorista', align: 'end', key: 'motorista', sortable: false},
]

// function get_descricao_produto(cod) {
//   console.log("cod: " + cod)
//   return dados_produto.value.find(b => {
//     return b.produto_cod == cod
//   }).produto_descricao
// }

// =================================================================================

onMounted(async () => {
  await getClientes();
  await getCarregamentos();
  fn_preencher_lista_clientes_apelido();

  await fetchPlacasCarretas();
  lista_placa_carreta.value = dados_placas_carretas_mongodb.value.map(e => e.placa_carreta)
})

// =================================================================================

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
      url_params += '&cliente_retorno=' + filter_dialog_cliente.value;
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

  carregamentosResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/get' + url_params);
  dados_carregamentos.value = carregamentosResponse.data;
  
  dados_carregamentos.value = dados_carregamentos.value.map(carregamento => {
    return {
      ...carregamento,
      data_entrada: DateToString(new Date(carregamento.data_entrada.$date)),
      // meta_data_reg_entrada: DateToString(new Date(e.meta.data_reg_entrada.$date)),
      // num: siglaEmprAtende(e.num.empresa_atende) + "-" + e.num.cliente_sigla + "-" + e.num.seq.toString().padStart(3,'0') + "/" + e.num.mes.toString().padStart(2, '0') + "-" + e.num.ano.toString().padStart(4, '0'),
      // produto_descricao: string_capitalize(dados_produto.value.find(b => {
      //   return (b.produto_cod == e.produto_codigo) || e.produto_codigo != undefined
      // }).produto_descricao),
      cliente_retorno: dados_clientes.value.find(cliente => {
        return cliente.meta.cliente_cod == carregamento.cliente_retorno
      }).meta.apelido,
      volume_carregamento: carregamento.cargas != undefined ? calcularVolumeCarregamento(carregamento) : 0
    }
  })

  if(filter_dialog.value = true) {
    filter_dialog.value = false
  }
} // Fim da função getCarregamentos

function calcularVolumeCarregamento(carregamento) {

  let cargas = []

  carregamento['cargas'].forEach(carga => {
    cargas.push(
      {
        num: carga.num,
        tipo_gas: carga.tipo_gas
      }
    );
    
    if(carga.encerrante_inicial != undefined) {
      cargas[cargas.length - 1].encerrante_inicial = carga.encerrante_inicial
    }
    
    if(carga.parciais != undefined) {
      carga.parciais.forEach(parcial => {
        if(cargas[cargas.length - 1].parciais == undefined) {
          cargas[cargas.length - 1].parciais = [];
        }
        cargas[cargas.length - 1].parciais.push(parcial.encerrante_parcial)
      })
    }
    
    if(carga.encerrante_final != undefined) {
      cargas[cargas.length - 1].encerrante_final = carga.encerrante_final
    }

    let volume_carga;
    
    if(carga.encerrante_final != undefined) {
      volume_carga = carga.encerrante_final - carga.encerrante_inicial
    } else if (carga.parciais != undefined) {
      volume_carga = carga.parciais[carga.parciais.length - 1].encerrante_parcial - carga.encerrante_inicial 
    } else {
      volume_carga = 0;
    }
    cargas[cargas.length - 1].volume_carga = volume_carga

  })
  
  let volumeCarregamento = 0;
  cargas.forEach(carga => {
    volumeCarregamento += carga.volume_carga
  })
  return volumeCarregamento
} // Fim da function calcularVolumeCarregamento

async function getClientes() {
  const clientesResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Clientes/getAll');
  dados_clientes.value = clientesResponse.data;
}

async function fetchPlacasCarretas() {
  const placasResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/placas_carretas')
  dados_placas_carretas_mongodb.value = placasResponse.data;
}

function fn_preencher_lista_clientes_apelido() {
  var arrayTemp = [];
  dados_clientes.value.forEach(obj => {
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

function siglaEmprAtende(emp_at) {
  if(emp_at == "urca_gas") {
    return "UG";
  } else if(emp_at == "gas_verde") {
    return "GV";
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

function data_atual_para_string() {
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

function fn_teste_mostrar_data_entrada() {
  console.log("fn_teste_mostrar_data_entrada: " + filter_dialog_data_entrada_inicio_interno.value)
}

</script>

<style>
.table-cargas {
  width: 100%;
  border-collapse: collapse;
}

.table-cargas th, .table-cargas td {
  border: 1px solid #ccc;
}

.table-cargas td {
  padding: 5px;
}

.table-cargas tfoot {
  font-weight: bold;
}

.table-cargas tfoot td, .table-cargas thead th {
  border: 0
}

.table-cargas tbody tr:first-child{
  /* color: red; */
  /* border-bottom: 2px solid blue */
}

.table-cargas tr:first-child{
  /* color: red; */
  /* border-top: 3px solid black */
}

/* .table-cargas>tbody>tr:nth-child(even) {
  background-color: lightgrey;
} */

/* .table-cargas>tfoot>tr>td {
  border-top: 1px solid black
} */
</style>