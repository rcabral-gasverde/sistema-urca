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
    Os filtros foram desativados

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
    Os filtros foram ativados

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

  <!-- DETALHES CARREGAMENTO DIALOG -->
  <v-dialog v-model="detalhes_carregamento_dialog" max-width="840" scrollable>
    <!-- <v-card style="z-index: 1; position: fixed; top: 0; right: 0; margin: 30px" max-width="300">
      <v-card-text>
        omasdfoimasdofimasdofimasodifmaosdmfaosdmfoasdmfoasidmfoaisdmfoasmdfoaisdmfoaismdfoaismdfoiamsdfoim
      </v-card-text>
    </v-card> -->
    <v-card class="text-body-2">

      <v-tabs v-model="tab_detalhes_carregamento" slider-color="blue">
        <v-tab value="acoes">Ações</v-tab>
        <v-tab value="cargas_4">Cargas</v-tab>
        <v-tab value="detalhes">Detalhes</v-tab>
        <!-- <v-tab value="cargas">Cargas</v-tab> -->
        <!-- <v-tab value="cargas_2">Cargas 2</v-tab> -->
        <!-- <v-tab value="cargas_3">Cargas 3</v-tab> -->
        <!-- <v-tab value="reg_carga">Reg Carga</v-tab> -->
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab_detalhes_carregamento">
          
          <v-window-item value="acoes" class="pa-3">
            <v-row align="center">
              <v-col cols="12" lg="3">
                <v-btn 
                  width="100%" 
                  @click="fn_abrir_dialog_registro_acao('realocar_carreta')"
                  :disabled="btn_acoes_realocar_carreta_disabled"
                  >
                  Realocar Carreta
                </v-btn>
              </v-col>
              <v-col cols="12" lg="8">
                Realoca a carreta para uma outra vaga, para fora do vaga, ou para o estoque.
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="12" lg="3">
                <!-- <v-btn width="100%" @click="registro_acao_dialog = !registro_acao_dialog"> -->
                <v-btn 
                  width="100%" 
                  @click="fn_abrir_dialog_registro_acao('iniciar_carga')"
                  :disabled="btn_acoes_iniciar_carga_disabled"
                  >
                  Iniciar Carga
                </v-btn>
              </v-col>
              <v-col cols="12" lg="8">
                Inicia uma nova carga para este carregamento.
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="12" lg="3">
                <v-btn 
                  width="100%" 
                  @click="fn_abrir_dialog_registro_acao('fazer_corte')"
                  :disabled="btn_acoes_fazer_corte_disabled"
                  >
                  Fazer Corte
                </v-btn>
              </v-col>
              <v-col cols="12" lg="8">
                Registra um encerrante de corte (isto é, um <i>encerrante parcial</i>) para a carga em andamento.
              </v-col>
            </v-row>
            
            <v-row align="center">
              <v-col cols="12" lg="3">
                <v-btn 
                  width="100%" 
                  @click="fn_abrir_dialog_registro_acao('finalizar_carga')"
                  :disabled="btn_acoes_finalizar_carga_disabled">
                  Finalizar Carga
                </v-btn>
              </v-col>
              <v-col cols="12" lg="8">
                Finaliza a carga em andamento.
              </v-col>
            </v-row>
            
            <v-row align="center">
              <v-col cols="12" lg="3">
                <v-btn 
                width="100%" 
                @click="fn_abrir_dialog_registro_acao('finalizar_carregamento')"
                :disabled="btn_acoes_finalizar_carregamento_disabled"
                
                >
                  Finalizar <br/> Carregamento
                </v-btn>
              </v-col>
              <v-col cols="12" lg="8">
                Finaliza o carregamento.
              </v-col>
            </v-row>
            
            <v-row align="center">
              <v-col cols="12" lg="3">
                <v-btn 
                  width="100%" 
                  @click="fn_abrir_dialog_registro_acao('sair_para_cliente')"
                  :disabled="btn_acoes_sair_para_cliente_disabled"
                  
                  >
                  Sair para Cliente
                </v-btn>
              </v-col>
              <v-col cols="12" lg="8">
                Registra a saída da carreta para um cliente.
              </v-col>
            </v-row>
            
          </v-window-item>

          <v-window-item value="cargas_4">
            <table class="table-cargas mt-6">
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

          <!-- <v-window-item value="reg_carga" class="py-3">
            <v-row>
              <v-col cols="12" lg="3">
                <v-select
                  v-model="estagio_carga"
                  label="Estágio da Carga"
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
            </v-row>

            <v-row>
              <v-col>
                <v-alert
                  color="blue"
                  density="compact"
                  border="start"
                  variant="outlined"
                  :text="textHelperRegistroCarga"
                  icon="mdi-information"
                  v-html="textHelperRegistroCarga"
                >
                </v-alert>
              </v-col>
            </v-row>

            <v-row>
              <v-col align="right">
                <v-btn @click="fn_registrar_acao()">Reg Carga</v-btn>
              </v-col>
            </v-row> 
          </v-window-item> -->
        </v-window>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="detalhes_carregamento_dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> <!-- Fim do detalhes_carregamento_dialog -->

  <!-- REGISTRO ACAO DIALOG -->
  <v-dialog v-model="registro_acao_dialog" max-width="840" >
    <v-card :title="registro_acao_dialog_title">
      <v-card-text class="pt-6">
        
        <!-- <v-row>
          <v-col cols="12" lg="3">
            <v-select
              v-model="vaga_origem"
              label="Vaga Origem"
              :items="['Fora da Vaga','Estoque',1,2,3,4,5,6,7,8,9,10,11,12,13]"
              variant="outlined"
            >

            </v-select>
          </v-col>
        
          <v-col cols="12" lg="3">
            <v-select
              v-model="vaga_destino"
              label="Vaga Destino"
              :items="['Fora da Vaga','Estoque',1,2,3,4,5,6,7,8,9,10,11,12,13]"
              variant="outlined"
            >

            </v-select>
          </v-col>
        </v-row> -->
        
        <v-row>
          <v-col cols="12" lg="3">
            <v-select
              v-model="estagio_carga"
              label="Estágio da Carga"
              :items="lista_estagio_carga"
              variant="outlined"
              
              :disabled="estagio_carga_disabled"
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
              
              :disabled="data_carga_disabled"
            >
            </v-text-field>
          </v-col>
        </v-row>
        
        <!-- <v-row v-if="estagio_carga == 'inicial'"> -->
        <v-row>
          <v-col cols="12" lg="2">
            <v-select
              v-model="detalhes_carregamento.vaga"
              label="Vaga"
              variant="outlined"
              disabled
            >
            </v-select>
            <!-- <v-select
              v-model="vaga_carga"
              label="Vaga"
              :items="[1,2,3,4,5,6,7,8,9,10,11,12,13]"
              variant="outlined"
              
            >
            </v-select> -->
          </v-col>
          <v-col cols="12" lg="2">
            <v-select
              v-model="mesa_carga"
              label="Mesa"
              :items="[1,2,3,4,5]"
              variant="outlined"
              
            >
            </v-select>
          </v-col>
          <v-col cols="12" lg="3">
            <v-select
              v-model="tipo_gas_carga"
              label="Tipo do Gás"
              :items="lista_tipo_gas"
              variant="outlined"
              
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
              
              :disabled="encerrante_carga_disabled"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="pressao_carga"
              label="Pressão"
              variant="outlined"
              
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

        <v-row v-if="mostrarTextHelpersAlerts">
          <v-col>
            <v-alert
              color="blue"
              density="compact"
              border="start"
              variant="outlined"
              :text="textHelperRegistroCarga"
              icon="mdi-information"
            >
            </v-alert>
          </v-col>
        </v-row>
        
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="registro_acao_dialog = false"></v-btn>
        <v-btn @click="fn_registrar_acao()" color="primary" variant="tonal">Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> <!-- Fim do registro_acao_dialog-->

  <!-- REALOCAR CARRETA DIALOG -->
  <v-dialog v-model="realocar_carreta_dialog" max-width="640">
    <v-card title="Realocar Carreta">
      <v-card-text class="pt-6">
        <v-row>
          <v-col cols="12" lg="3">
            <v-select
              v-model="vaga_origem"
              label="Vaga Origem"
              variant="outlined"
              disabled
            >

            </v-select>
          </v-col>
        
          <v-col cols="12" lg="3">
            <v-select
              v-model="vaga_destino"
              label="Vaga Destino"
              :items="vaga_destino_lista"
              item-value="num"
              item-title="title"
              variant="outlined"
            >
              <template v-slot:item="{props, item}">
                <v-list-item
                  v-bind="props"
                  :disabled="item.raw.disabled"
                >

                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="realocar_carreta_dialog = false"></v-btn>
        <v-btn @click="fn_realocar_carreta()" color="primary" variant="tonal">Realocar Carreta</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

  <v-snackbar v-model="realocarCarretaSnackbar" color="green-lighten-1" :timeout="2500">
    A carreta foi realocada entre vagas

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="realocarCarretaSnackbar = false"
        prepend-icon="mdi-close"
      >
        
      </v-btn>
    </template>
  </v-snackbar>

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

  <!-- <v-data-table
    density="compact"
    :items="dados_carregamentos"
    fixed-header
    :headers="headers"
    :height="existe_filtro ? 383 : 460"
    items-per-page="10"
    item-value="_id"
    return-object
    items-per-page-text="Itens por pág."
    :items-per-page-options="ippo"
    :show-current-page="true"
    hover
    no-data-text="Não existem registros."
    loading-text="Carregando registros..."
  >
    <template v-slot:item="{item}">
      <tr :elevation="24" @click="mostrar_detalhes_carregamento(item)">
        <td>{{item.placa_carreta}}</td>
        <td>{{item.data_entrada}}</td>
        <td>{{item.status}}</td>
        <td>{{item.vaga}}</td>
        <td>{{item.mesa}}</td>
        <td>{{item.cliente_retorno}}</td>
        <td>{{item.volume_carregamento}}</td>
      </tr>
    </template>
  </v-data-table> -->

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
    loading-text="Carregando registros..."
  ></v-data-table>

  
</template>
















<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const mostrarTextHelpersAlerts = ref(false); // textos informativos presentes nas ações

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

const vaga_origem = ref(); // apenas para ação realocar_carreta
const vaga_destino = ref(); // apenas para ação realocar_carreta
const vaga_destino_lista = ref([]); // apenas para ação realocar_carreta
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

const textHelperRegistroCarga = ref('');

const registro_acao_dialog = ref(false);
const registro_acao_dialog_title = ref('');

const realocar_carreta_dialog = ref(false);

// TAB AÇÕES
//
const btn_acoes_realocar_carreta_disabled = ref(true);
const btn_acoes_iniciar_carga_disabled = ref(true);
const btn_acoes_fazer_corte_disabled = ref(true);
const btn_acoes_finalizar_carga_disabled = ref(true);
const btn_acoes_finalizar_carregamento_disabled = ref(true);
const btn_acoes_sair_para_cliente_disabled = ref(true);

// FUNÇÃO fn_registrar_acao
// 
async function fn_registrar_acao() {
  let carga = {
    num: num_carga.value,
    estagio: estagio_carga.value,
    data: data_carga.value,
    vaga: detalhes_carregamento.value.vaga,
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

  // A collection Mesas também precisa ser atualizada
  let status_mesa, placa_carreta;
  if(estagio_carga.value == 'inicial' || estagio_carga.value == 'parcial') {
    status_mesa = 'carregando'
    placa_carreta = detalhes_carregamento.value.placa_carreta
  } else if (estagio_carga.value == 'final') {
    status_mesa = 'ociosa'
    placa_carreta = ""
  }

  let dados_para_mesa = {
    status: status_mesa,
    encerrante_atual: encerrante_carga.value,
    pressao_atual: pressao_carga.value,
    data_hora_registro_enc_pr: data_carga.value,
    vaga_carregando: detalhes_carregamento.value.vaga,
    placa_carreta: placa_carreta
  }

  await axios.put(
    'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Mesas/update?num=' + mesa_carga.value, dados_para_mesa
  ).then(async res => {
    if(res.status == 200) {
      console.log(res)
    }
  }).catch(error => console.log(error))
} // Fim da function fn_registrar_acao

const realocarCarretaSnackbar = ref(false);

async function fn_realocar_carreta() {

  if(vaga_origem.value != 'estoque' && vaga_origem.value != 'fora_da_vaga') {

    // Primeiro, faz a vaga de origem ficar disponível e sem placa (collection Vagas)...
    await axios.put(
      'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Vagas/update?num=' + vaga_origem.value,
      {
        status: 'disponivel',
        placa_carreta: ''
      }
    ).then(async res => {
      if(res.status == 200) {
        console.log(res)
      }
    }).catch(error => console.log(error))
  
  }

  if(vaga_destino.value != 'estoque' && vaga_destino.value != 'fora_da_vaga') {

    // Em seguida, faz a vaga de destino ficar ocupada e com a placa da carreta (collection Vagas)...
    await axios.put(
      'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Vagas/update?num=' + vaga_destino.value,
      {
        status: 'ocupada',
        placa_carreta: detalhes_carregamento.value.placa_carreta
      }
    ).then(async res => {
      if(res.status == 200) {
        console.log(res)
      }
    }).catch(error => console.log(error))

    // Por último atualiza a vaga do carregamento (collection Carregamentos)
    await axios.put(
      'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/vaga/update?id=' + id_carregamento_clicado.value,
      {
        vaga: vaga_destino.value,
        mesa: dados_vagas.value.find(e => {
          return e.num == vaga_destino.value
        }).mesas_associadas.padrao.toString()
      }
    ).then(async res => {
      if(res.status == 200) {
        console.log(res)
      }
    }).catch(error => console.log(error))

  } else if(vaga_destino.value == 'estoque' || vaga_destino.value == 'fora_da_vaga') {
    // Por último atualiza a vaga do carregamento (collection Carregamentos)
    await axios.put(
      'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Carregamentos/vaga/update?id=' + id_carregamento_clicado.value,
      {
        vaga: vaga_destino.value,
        mesa: vaga_destino.value
      }
    ).then(async res => {
      if(res.status == 200) {
        console.log(res)
      }
    }).catch(error => console.log(error))
  }



  await getCarregamentos(); // Atualiza a tabela de carregamentos, pois a vaga do carregamento mudou.
  realocar_carreta_dialog.value = false;
  detalhes_carregamento_dialog.value = false;
  realocarCarretaSnackbar.value = true;
  vaga_destino.value = null;

  // console.log("refreshNuxtData");
  // await refreshNuxtData();
  // alert("navigateTo pfv :)")
  // await navigateTo('/ucb/carregamentos');
} // Fim da function fn_realocar_carreta

function habilitar_acoes(status_carregamento) {
  // Esta function habilita e desabilita os botões
  // do dialog que se abre quando se clica em um carregamento.
  // detalhes_carregamento_dialog
  
  btn_acoes_realocar_carreta_disabled.value = true;
  btn_acoes_iniciar_carga_disabled.value = true;
  btn_acoes_fazer_corte_disabled.value = true;
  btn_acoes_finalizar_carga_disabled.value = true;
  btn_acoes_finalizar_carregamento_disabled.value = true;
  btn_acoes_sair_para_cliente_disabled.value = true;

  // Pegar status do carregamento. 
  // const status_carregamento = detalhes_carregamento.value.status;

  if(status_carregamento == "entrou_na_base") {
    btn_acoes_realocar_carreta_disabled.value = false;
    btn_acoes_iniciar_carga_disabled.value = false
  } else if (status_carregamento == "carregando") {
    btn_acoes_fazer_corte_disabled.value = false;
    btn_acoes_finalizar_carga_disabled.value = false;
    btn_acoes_finalizar_carregamento_disabled.value = false;
  } else if (status_carregamento == "parcialmente_carregada") {
    btn_acoes_realocar_carreta_disabled.value = false;
    btn_acoes_iniciar_carga_disabled.value = false;
    btn_acoes_finalizar_carregamento_disabled.value = false;
    // btn_acoes_sair_para_cliente_disabled.value = false; // O usuário apenas poderá enviar uma carreta para o cliente se, e somente se, o status do carregamento for totalmente_carregada.
  } else if (status_carregamento == "totalmente_carregada") {
    btn_acoes_realocar_carreta_disabled.value = false;
    btn_acoes_sair_para_cliente_disabled.value = false;
  }
}

async function fn_abrir_dialog_registro_acao(acao) {
  // registro_acao_dialog.value = true;

  estagio_carga_disabled.value = true;
  num_carga_disabled.value = true;
  data_carga_disabled.value = false;
  encerrante_carga_disabled.value = false;
  pressao_carga_disabled.value = false;
  status_carga_disabled.value = true;

  textHelperRegistroCarga.value = '';

  data_carga.value = data_atual_para_string();
  
  if(acao == 'realocar_carreta') {
    realocar_carreta_dialog.value = true;
    // registro_acao_dialog_title.value = 'Realocar Carreta';
    // estagio_carga.value = "inicial";
    // status_carga.value = 'carregando';
    vaga_origem.value = detalhes_carregamento.value.vaga
    await getVagas();
    vaga_destino_lista.value = dados_vagas.value.map((e, index) => {
      return {
        ...e,
        title: e.num,
        disabled: e.status == "ocupada" ? true : false
      }
    })
    vaga_destino_lista.value.sort((a,b) => a.num - b.num);
    vaga_destino_lista.value.unshift(
      {
        num: 'estoque',
        title: 'Estoque'
      },
      {
        num: 'fora_da_vaga',
        title: 'Fora da Vaga'
      }
    );
    // console.log(vaga_destino_lista.value);
    // vaga_destino_lista.value = [
    //   {
    //     num: 1,
    //     disabled: true
    //   },
    //   {
    //     num: 2,
    //     disabled: false
    //   }
    // ];
    textHelperRegistroCarga.value = "A carreta será realocada da vaga de origem para a vaga de destino."
  
  } else if(acao == 'iniciar_carga') {
    registro_acao_dialog.value = true;
    registro_acao_dialog_title.value = 'Iniciar Carga';
    estagio_carga.value = "inicial";
    status_carga.value = 'carregando';
    textHelperRegistroCarga.value = "Será registrado o estágio inicial desta carga."
  
  } else if(acao == 'fazer_corte') {
    registro_acao_dialog.value = true;
    registro_acao_dialog_title.value = 'Fazer Corte';
    estagio_carga.value = "parcial";
    status_carga.value = "carregando"
    textHelperRegistroCarga.value = "Será registrado um corte (ou \"parcial\") para esta carga."
  
  } else if(acao == 'finalizar_carga') {
    registro_acao_dialog.value = true;
    registro_acao_dialog_title.value = 'Finalizar Carga';
    estagio_carga.value = "final";
    status_carga.value = "parcialmente_carregada"
    textHelperRegistroCarga.value = "Será registrado o estágio final desta carga atribuindo à carreta o status de \"Parcialmente Carregada\"."
  
  } else if(acao == 'finalizar_carregamento') {
    registro_acao_dialog.value = true;
    registro_acao_dialog_title.value = 'Finalizar Carregamento';
    estagio_carga.value = "final";
    status_carga.value = "totalmente_carregada"
    textHelperRegistroCarga.value = "Será registrado o final deste carregamento, atribuindo à carreta o status de \"Totalmente Carregada\" deixando-a pronta para seguir viagem para o cliente."
  
  } else if(acao == 'sair_para_cliente') {
    registro_acao_dialog_title.value = 'Sair para Cliente';
  }

  let ult_carregamento;
  // Pegar o número do último carregamento
  if(detalhes_carregamento.value.cargas != undefined){
    ult_carregamento = detalhes_carregamento.value.cargas[detalhes_carregamento.value.cargas.length - 1].num
  }

  const status_carregamento = detalhes_carregamento.value.status;
  if(status_carregamento == "entrou_na_base"){
    num_carga.value = 1;
  } else if (status_carregamento == "carregando") {
    num_carga.value = ult_carregamento;
  } else if (status_carregamento == "parcialmente_carregada") {
    num_carga.value = ult_carregamento + 1;
  }

} // Fim da function fn_abrir_dialog_registro_acao(acao)

// function fn_atualizar_campos_carga() {
  // Esta function é chamada quando o campo de estágio da carga é modificado.
  // estagio_carga
  // let indice_carregando = lista_status_carga.value.findIndex(e => e.value == 'carregando')
  
  // if(estagio_carga.value == 'inicial') {
    // textHelperRegistroCarga.value = "Serão registrados dados para o estágio inicial desta carga."
  // }

  // if(estagio_carga.value == 'parcial') {
    // estagio_carga_disabled.value = false;
    // status_carga.value = 'carregando';
    // status_carga_disabled.value = true;
    
    // textHelperRegistroCarga.value = "Serão registrados dados para o corte."
  // }
  // if(estagio_carga.value == 'final') {
    // status_carga.value = 'carregando';
    // lista_status_carga.value = lista_status_carga.value.map((e, index) => {
      // return {
        // ...e,
        // disabled: index == indice_carregando ? true : false 
      // }
    // })
    // status_carga.value = 'parcialmente_carregada';
    // status_carga_disabled.value = false;

  //   if(status_carga.value == 'carregando') {
  //     status_carga.value = 'parcialmente_carregada'
  //   }
    
  //   if(status_carga.value == 'parcialmente_carregada') {
  //     textHelperRegistroCarga.value = "Estágio da carga como Final e status Parcialmente Carregada significa que a carreta terminou esta carga e poderá começar uma nova carga posteriormente."
  //   } else if (status_carga.value == 'totalmente_carregada') {
  //     textHelperRegistroCarga.value = "Estágio da carga como 'Final' e status Totalmente Carregada significa que a carreta não fará novas cargas."
  //   }
  // }
// } // Fim da function fn_atualizar_campos_carga

// ===================================================================
const tab_detalhes_carregamento = ref('detalhes');

const cargas_carregamento = ref([]);

let volume_carga; // Será usada dentro de mostrar_detalhes_carregamento


// FUNÇÃO mostrar_detalhes_carregamento
//
function mostrar_detalhes_carregamento(event, row) {
  // Registra o id do carregamento clicado
  id_carregamento_clicado.value = row.item._id;
  
  // Obtém os dados de carregamento do id clicado e armazena em detalhes_carregamento  
  detalhes_carregamento.value = dados_carregamentos.value.find(e => e._id == id_carregamento_clicado.value);
  console.log("detalhes_carregamento: \n" + JSON.stringify(detalhes_carregamento.value, null, 2))

  // Mostra o dialog
  detalhes_carregamento_dialog.value = true;

  // Seleciona o tab de ações  
  tab_detalhes_carregamento.value = "acoes";
  
  // Inicializa a array em cargas_carregamento
  cargas_carregamento.value = []
  
  // O bloco if abaixo popula a array cargas_carregamento a partir de detalhes_carregamento,
  // calcula o volume de cada carga e atribui o volume de cada carga à própria array cargas_carregamento.
  if(detalhes_carregamento.value['cargas'] != undefined) {
    
    // Início do forEach dentro de detalhes_carregamento.cargas
    detalhes_carregamento.value['cargas'].forEach(carga => {
      cargas_carregamento.value.push(
        {
          num: carga.num,
          tipo_gas: carga.tipo_gas
        }
      );

      // REGISTRO DO ENCERRANTE INICIAL NA cargas_carregamento
      // 
      if(carga.encerrante_inicial != undefined) {
        cargas_carregamento.value[cargas_carregamento.value.length - 1].encerrante_inicial = {
          encerrante: carga.encerrante_inicial,
          pressao: carga.pressao_inicial,
          data: carga.data_inicial
        }
      }
      
      // REGISTRO DE PARCIAIS NA cargas_carregamento
      //
      // O bloco abaixo primeiro verifica se carga.parciais existe.
      // Se existir carga.parciais (parciais é uma array que está dentro de detalhes_carregamento.cargas),
      // vai percorrer cada item parcial de parciais e registrar dentro de cargas_carregamento
      if(carga.parciais != undefined) {
        carga.parciais.forEach(parcial => {
          
          // Se não existir a array parciais dentro de cargas_carregamento, cria.
          if(cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais == undefined) {
            cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais = [];
          }

          // Na array parciais detro de cargas_carregamento, inserir um objeto com dados.  
          cargas_carregamento.value[cargas_carregamento.value.length - 1].parciais.push(
            {
              encerrante: parcial.encerrante_parcial,
              pressao: parcial.pressao_parcial,
              data: parcial.data_parcial
            }
          )

        })
      }
      
      // REGISTRO DO ENCERRANTE FINAL NA cargas_carregamento
      // 
      if(carga.encerrante_final != undefined) {
        cargas_carregamento.value[cargas_carregamento.value.length - 1].encerrante_final = {
          encerrante: carga.encerrante_final,
          pressao: carga.pressao_final,
          data: carga.data_final
        }
      }

      // CÁLCULO DO VOLUME DA CARGA
      //  
      if(carga.encerrante_final != undefined) {
        volume_carga = carga.encerrante_final - carga.encerrante_inicial
      } else if (carga.parciais != undefined) {
        // Último encerrante parcial menos o encerrante inicial
        volume_carga = carga.parciais[carga.parciais.length - 1].encerrante_parcial - carga.encerrante_inicial 
      } else {
        volume_carga = 0;
      }
      cargas_carregamento.value[cargas_carregamento.value.length - 1].volume_carga = volume_carga

    }) // Fim do forEach detalhes_carregamento.value['cargas'].forEach(carga =>

    console.log("cargas_carregamento: \n")
    console.log(JSON.stringify(cargas_carregamento.value, null, 2))
  }
  
  
  // Obtém o volume do carregamento através da soma dos volumes de todas as cargas e atribui este volume
  // à propriedade detalhes_carregamento.volume_carregamento.
  detalhes_carregamento.value.volume_carregamento = 0;
  cargas_carregamento.value.forEach(carga => {
    // console.log("carga.volume_carga: " + carga.volume_carga + " " + typeof carga.volume_carga)
    detalhes_carregamento.value.volume_carregamento += carga.volume_carga
  })

  // Habilita as ações possíveis para o status_carregamento atual
  const status_carregamento = detalhes_carregamento.value.status;
  habilitar_acoes(status_carregamento);

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
const dados_clientes = ref();
const dados_vagas = ref();
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

  console.log(url_params);
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

async function getVagas() {
  const vagasResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Vagas/get');
  dados_vagas.value = vagasResponse.data;
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

/* .table-cargas>tbody>tr:nth-child(even) {
  background-color: lightgrey;
} */

/* .table-cargas>tfoot>tr>td {
  border-top: 1px solid black
} */
</style>