<template>
  <v-breadcrumbs class="bg-grey-lighten-3 mb-6">
    
    <v-breadcrumbs-item>
      <NuxtLink to="/">Início</NuxtLink>
    </v-breadcrumbs-item>
    
    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item>
      <NuxtLink to="/relatorios">Relatórios</NuxtLink>
    </v-breadcrumbs-item>

    <v-breadcrumbs-divider/>
    
    <v-breadcrumbs-item disabled>
      <NuxtLink to="/relatorios/volumes_injetados">Volumes Injetados</NuxtLink>
    </v-breadcrumbs-item>
    
  </v-breadcrumbs>

  <!-- <div style="background-color: #f5f5f5; width: 100%; z-index: 999" id="divDatasConsumo"> -->
  <div style="z-index: 1" id="divDatasConsumo" >
    <v-row class="py-0 my-0">
      <v-col cols="12" sm="4" md="2" lg="2" class="my-0 py-0">
        <v-text-field
          v-model="consumo_data_inicio"
          label="Data de Consumo (Início)"
          type="date"
          variant="solo"
          v-on:update:model-value=""
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="2" lg="2" class="my-0 py-0">
          <v-text-field
          v-model="consumo_data_fim"
          label="Data de Consumo (Fim)"
          type="date"
          variant="solo"
          v-on:update:model-value=""
        ></v-text-field>
      </v-col>
      <v-col class="my-0 py-0">
        <v-btn text="Atualizar" size="x-large" style="" @click="getVolumes()"></v-btn>
      </v-col>
    </v-row>
  </div>

  <div style="display: flex; justify-content: space-between;">
    <ClientOnly>

      <div style="background-color: white; border-radius: 10px; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 40%; height: 400px; margin-left: 0px;">
        <nuxt-plotly
          :data="data_lines_industrias"
          :layout="layout_lines_industrias"
          :config="config_lines_industrias"
          style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white"
          @on-ready="myChartOnReady"
        ></nuxt-plotly>
      </div>

      <div style="background-color: white; border-radius: 10px; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 40%; height: 400px; margin-left: 15px;">
        <nuxt-plotly
          :data="data_lines_postos"
          :layout="layout_lines_postos"
          :config="config_lines_postos"
          style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white"
          @on-ready="myChartOnReady"
        ></nuxt-plotly>
      </div>

      <div style="background-color: white; border-radius: 10px; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 10%; flex-grow: 1; height: 400px; margin-left: 15px;">
        
        <nuxt-plotly
          :data="data_ranking_postos"
          :layout="layout_ranking_postos"
          :config="config_ranking_postos"
          style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white"
          >
        </nuxt-plotly>
      </div>

      

    </ClientOnly>
  </div>


  <div style="display: flex; justify-content: space-between">
    <ClientOnly>
      
        <div style="background-color: white; border-radius: 10px; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 30%; height: 400px; margin-right: 15px; margin-top: 15px;">
          <nuxt-plotly
            :data="data_pie_totais"
            :layout="layout_pie_totais"
            :config="config_pie_totais"
            style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white"
            @on-ready=""
          ></nuxt-plotly>
        </div>
      
        <div style="display: flex; flex-direction: column; flex-grow: 1; width: 200px; justify-content: start;">
      
          <!-- INDÚSTRIAS -->

          <div style="user-select: none; display: flex; flex-direction: row; justify-content:space-between; background-color: white; border-radius: 10px; border-left: 10px solid #ed7d31; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #ed7d31; font-weight: bold; font-size:large;  line-height: normal;">Indústrias</div>
                <div style="color: #ed7d31; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format(volumesTotaisPeriodo_industrias_TOTAL.toFixed(0))}} m³</div>
                <div style="color: #ed7d31; font-weight: bold; font-size:large;  line-height: normal;">{{Intl.NumberFormat('pt-BR').format(Math.round( ((100 * volumesTotaisPeriodo_industrias_TOTAL)/(volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL)) * 100) / 100)}} %</div>
              </div>
            </div>
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #ed7d31; font-weight: bold; font-size:large;  line-height: normal;">Projeção Fim Mês</div>
                <div style="color: #ed7d31; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_industrias_TOTAL * razao_para_projecao).toFixed(0))}} m³</div>
              </div>
            </div>

          </div>

          <!-- POSTOS -->

          <div style="user-select: none; display: flex; flex-direction: row; justify-content:space-between; background-color: white; border-radius: 10px; border-left: 10px solid #4472C4; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #4472C4; font-weight: bold; font-size:large;  line-height: normal;">Postos</div>
                <div style="color: #4472C4; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format(volumesTotaisPeriodo_postos_TOTAL.toFixed(0))}} m³</div>
                <div style="color: #4472C4; font-weight: bold; font-size:large;  line-height: normal;">{{Intl.NumberFormat('pt-BR').format(Math.round( ((100 * volumesTotaisPeriodo_postos_TOTAL)/(volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL)) * 100) / 100)}} %</div>
              </div>
            </div>
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #4472C4; font-weight: bold; font-size:large;  line-height: normal;">Projeção Fim Mês</div>
                <div style="color: #4472C4; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_postos_TOTAL * razao_para_projecao).toFixed(0))}} m³</div>
              </div>
            </div>

          </div>

          <!-- NEOGÁS -->

          <div style="user-select: none; display: flex; flex-direction: row; justify-content:space-between; background-color: white; border-radius: 10px; border-left: 10px solid #1a9448; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #1a9448; font-weight: bold; font-size:large;  line-height: normal;">NEOgás</div>
                <div style="color: #1a9448; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format(volumesTotaisPeriodo_neogas_TOTAL.toFixed(0))}} m³</div>
                <div style="color: #1a9448; font-weight: bold; font-size:large;  line-height: normal;">{{Intl.NumberFormat('pt-BR').format(Math.round( ((100 * volumesTotaisPeriodo_neogas_TOTAL)/(volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL)) * 100) / 100)}} %</div>
              </div>
            </div>
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #1a9448; font-weight: bold; font-size:large;  line-height: normal;">Projeção Fim Mês</div>
                <div style="color: #1a9448; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_neogas_TOTAL * razao_para_projecao).toFixed(0))}} m³</div>
              </div>
            </div>

          </div>

          <!-- TOTAL -->

          <div style="user-select: none; display: flex; flex-direction: row; justify-content:space-between; background-color: white; border-radius: 10px; border-left: 10px solid #121212; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #121212; font-weight: bold; font-size:large;  line-height: normal;">Total</div>
                <div style="color: #121212; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL).toFixed(0))}} m³</div>
              </div>
            </div>
            
            <div style="background-color: transparent; flex-grow: 1">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background-color: transparent;">
                <div style="color: #121212; font-weight: bold; font-size:large;  line-height: normal;">Projeção Fim Mês</div>
                <div style="color: #121212; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format(((volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL) * razao_para_projecao).toFixed(0))}} m³</div>
              </div>
            </div>

          </div>

















          <!-- <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #4472C4; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #4472C4; font-weight: bold; font-size:large;  line-height: normal">Postos</div>
              <div style="color: #4472C4; font-weight: bold; font-size:x-large;  line-height: normal">{{Intl.NumberFormat('pt-BR').format(volumesTotaisPeriodo_postos_TOTAL.toFixed(0))}} m³</div>
              <div style="color: #4472C4; font-weight: bold; font-size:large;  line-height: normal">{{Intl.NumberFormat('pt-BR').format(Math.round( ((100 * volumesTotaisPeriodo_postos_TOTAL)/(volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL)) * 100) / 100)}} %</div>
            </div>
          </div>
          <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #1a9448; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #1a9448; font-weight: bold; font-size:large;  line-height: normal">NEOgás</div>
              <div style="color: #1a9448; font-weight: bold; font-size:x-large;  line-height: normal">{{Intl.NumberFormat('pt-BR').format(volumesTotaisPeriodo_neogas_TOTAL.toFixed(0))}} m³</div>
              <div style="color: #1a9448; font-weight: bold; font-size:large;  line-height: normal">{{Intl.NumberFormat('pt-BR').format(Math.round( ((100 * volumesTotaisPeriodo_neogas_TOTAL)/(volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL)) * 100) / 100)}} %</div>
            </div>
          </div>
      
          <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #121212; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center;width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #121212; font-weight: bold; font-size:x-large">TOTAL</div>
              <div style="color: #121212; font-weight: bold; font-size:x-large">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL).toFixed(0))}} m³</div>
            </div>
          </div> -->
      
        </div>

        <!-- <div style="display: flex; flex-direction: column; width: 200px; justify-content: start; margin-left: 15px;">
      
          <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #ed7d31; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center; background-color: transparent; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #ed7d31; font-weight: bold; font-size:large;  line-height: normal">Projeção</div>
              <div style="color: #ed7d31; font-weight: bold; font-size:x-large; line-height: normal; text-align: center;">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_industrias_TOTAL * razao_para_projecao).toFixed(0))}} m³</div>
            </div>
          </div>
          <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #4472C4; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #4472C4; font-weight: bold; font-size:large;  line-height: normal">Postos</div>
              <div style="color: #4472C4; font-weight: bold; font-size:x-large;  line-height: normal">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_postos_TOTAL * razao_para_projecao).toFixed(0))}} m³</div>
            </div>
          </div>
          <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #1a9448; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #1a9448; font-weight: bold; font-size:large;  line-height: normal">NEOgás</div>
              <div style="color: #1a9448; font-weight: bold; font-size:x-large;  line-height: normal">{{Intl.NumberFormat('pt-BR').format((volumesTotaisPeriodo_neogas_TOTAL * razao_para_projecao).toFixed(0))}} m³</div>
            </div>
          </div>
      
          <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #121212; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15);  position: relative; width: 100%; height: 33%; margin-right: 15px; margin-top: 15px;">
            <div style="display: flex; flex-direction: column; align-items: center;width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="color: #121212; font-weight: bold; font-size:x-large">TOTAL</div>
              <div style="color: #121212; font-weight: bold; font-size:x-large">{{Intl.NumberFormat('pt-BR').format(((volumesTotaisPeriodo_postos_e_industrias_TOTAL + volumesTotaisPeriodo_neogas_TOTAL) * razao_para_projecao).toFixed(0))}} m³</div>
            </div>
          </div>
      
        </div> -->
        <div style="background-color: white; border-radius: 10px; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15); position: relative; width: 40%; height: 400px; margin-left: 15px; margin-top: 15px;">
          <nuxt-plotly
            :data="data_lines_neogas"
            :layout="layout_lines_neogas"
            :config="config_lines_neogas"
            style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white"
            @on-ready=""
          ></nuxt-plotly>
        </div>
    </ClientOnly>
  </div>

  <hr style="margin: 30px 0 30px 0;" />

  <v-row style="width: 100%;">
    <v-col cols="12" sm="12" md="4" lg="4">
      <v-autocomplete
          v-model="cliente"
          :items="cliente_cod_lista.map(e => {return {value: e.cliente_cod, title: e.apelido}})"
          label="Cliente"
          variant="solo"
          auto-select-first
          v-on:update:model-value="updateDataLinesClienteSelecionado(cliente)"

        >
      </v-autocomplete>
    </v-col>
  </v-row>

  <div style="display: flex; justify-content: start; background-color: transparent">
    <div style="background-color: white; border-radius: 10px; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15); position: relative; width: 40%; height: 400px; margin-left: 0px;">
      <ClientOnly>
        <nuxt-plotly
          :data="data_lines_cliente_selecionado"
          :layout="layout_lines_cliente_selecionado"
          :config="config_lines_cliente_selecionado"
          style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white"
          @on-ready=""
        >
        </nuxt-plotly>
      </ClientOnly>
    </div>
      
    <div style="display: flex; flex-direction: column; margin-left: 15px; width: 300px;">
      <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #4472C4; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15); position: relative; height: 25%;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <div style="color: #4472C4; font-weight: bold; font-size:x-large">Total Cliente</div>
          <div style="color: #4472C4; font-weight: bold; font-size:x-large">{{Intl.NumberFormat('pt-BR').format(((total_cliente_selecionado)).toFixed(0))}} m³</div>
        </div>
      </div>
      
      <div style="user-select: none; background-color: white; border-radius: 10px; border-left: 10px solid #4472C4; box-sizing: border-box; box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.15); position: relative; height: 25%; margin-top: 15px">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); ">
          <div style="color: #4472C4; font-weight: bold; font-size:x-large">Projeção Fim Mês</div>
          <div style="color: #4472C4; font-weight: bold; font-size:x-large">{{Intl.NumberFormat('pt-BR').format(((total_cliente_selecionado) * razao_para_projecao).toFixed(0))}} m³</div>
        </div>
      </div>
    </div>
      
  </div>
</template>

<script setup lang="ts">

import type {
  NuxtPlotlyConfig,
  NuxtPlotlyData,
  NuxtPlotlyLayout,
  NuxtPlotlyHTMLElement,
} from 'nuxt-plotly';

import axios from 'axios';

import type {Ref} from 'vue'

const consumo_data_inicio = ref();
const consumo_data_fim = ref();

const cliente = ref("guaratiba_riodejaneiro");
const cliente_cod_lista = ref([]);

const volumesTotaisPorDia = ref({
  postos: [],
  industrias: [],
  postos_e_industrias: [],
  neogas: []
})

// let volumesTotaisPorDia = {
//   postos: [],
//   industrias: [],
//   postos_e_industrias: [],
//   neogas: []
// }


// ------------------------------------------
// POSTOS LINES
// ------------------------------------------

const data_lines_postos: Ref<NuxtPlotlyData> = ref()
data_lines_postos.value = [
  { 
    // x: x.value, 
    // y: y.value,
    name: 'Postos',
    // type: 'bar', 
    // mode: '', 
    type: 'scatter', 
    mode: 'markers+text+lines', 
    marker: {
      size: 10,
      color: '#4472C4'
    },
    textposition: 'top center',
      line: {
      width: 4, 
      color: '#4472C4'
    } 
  },
];

const layout_lines_postos: NuxtPlotlyLayout = {
  title: 'Vol. Injetado por Dia - Postos',
  margin: {
    t: 50, l: 40, r: 10, b:90
  },
  xaxis: {
    tickangle: 90,
  },
  yaxis: {
    range: [20000, 45000],
  },
  font: {
      size: 10,
    },

};

const config_lines_postos: NuxtPlotlyConfig = { scrollZoom: false, displayModeBar: false, locale: 'fr' };

function myChartOnReady(plotlyHTMLElement: NuxtPlotlyHTMLElement) {
  const { $plotly } = useNuxtApp();
  // console.log({ $plotly });
  // console.log({ plotlyHTMLElement });

  plotlyHTMLElement.on?.('plotly_afterplot', function () {
    // console.log('done plotting');
  });

  // plotlyHTMLElement.on?.('plotly_click', function () {
  //   alert('You clicked this Plotly chart!');

  //   // use plotly function via `$plotly` to download chart image
  //   $plotly.downloadImage(plotlyHTMLElement as HTMLElement, {
  //     format: 'png',
  //     width: 800,
  //     height: 600,
  //     filename: 'newplot',
  //   });
  // });
}


// ------------------------------------------
// INDÚSTRIAS LINES
// ------------------------------------------

const data_lines_industrias: Ref<NuxtPlotlyData> = ref()
data_lines_industrias.value = [
  { 
    // x: x.value, 
    // y: y.value,
    name: 'Indústrias',
    type: 'scatter', 
    mode: 'markers+text+lines', 
    marker: {
      size: 10,
      color: '#ed7d31'
    },
    textposition: 'top center', 
    font: {
      color: '#ff0000'
    },
    line: {
      width: 4, 
      color: '#ed7d31'
    } 
  },
];

const layout_lines_industrias: NuxtPlotlyLayout = {
  title: 'Vol. Injetado por Dia - Indústrias',
  margin: {
    t: 50, l: 40, r: 10, b:90
  },
  xaxis: {
    tickangle: 90,
  },
  yaxis: {
    range: [20000, 80000],
  },
  font: {
      size: 10,
    },
};

const config_lines_industrias: NuxtPlotlyConfig = { scrollZoom: false, displayModeBar: false, locale: 'fr' };


// ------------------------------------------
// RANKING POSTOS
// ------------------------------------------

const data_ranking_postos: Ref<NuxtPlotlyData> = ref()
data_ranking_postos.value = [
  { 
    // x: [], 
    // y: [],
    
    orientation: 'h', 
    type: 'bar', 
    marker: {
      color: '#4472C4',
      width: 1,
      // pattern: {
      //   shape: 'x',
      //   size: '5'
      // }
    } 
  },
];

const layout_ranking_postos: NuxtPlotlyLayout = {
  title: 'Ranking dos Postos',
  margin: {
    t: 50, l: 100, r: 10, b:30
  },
  yaxis: {
    // side: 'left',
    standoff: 300
  }
};

const config_ranking_postos: NuxtPlotlyConfig = { scrollZoom: false, displayModeBar: false, locale: 'fr' };


// ------------------------------------------------------------------
// PIE TOTAIS
// ------------------------------------------------------------------


const data_pie_totais: Ref<NuxtPlotlyData> = ref()
data_pie_totais.value = [
  { 
    values: [], 
    textinfo: "label+percent+value",
    labels: ['Postos','Indústrias','NEOgás'],
    type: 'pie', 
    marker: {
      colors: ['#4472C4','#ed7d31','#1a9448']
    }
    // mode: 'markers+text+lines', 
    // marker: {
    //   size: 10,
    //   color: '#4472C4'
    // },
    // textposition: 'top center', 
    // font: {
    //   color: '#ff0000'
    // },
    // line: {
    //   width: 4, 
    //   color: '#4472C4'
    // } 
  },
];

const layout_pie_totais: NuxtPlotlyLayout = {
  title: 'Volumes Injetados Totais',
  margin: {
    t: 50, l: 40, r: 10, b:30
  },
  // yaxis: {
  //   // range: [20000, 45000]
  // },
};

const config_pie_totais: NuxtPlotlyConfig = { scrollZoom: false, displayModeBar: false, locale: 'pt-BR' };


// ------------------------------------------
// NEOGÁS LINES
// ------------------------------------------

const data_lines_neogas: Ref<NuxtPlotlyData> = ref()
data_lines_neogas.value = [
  { 
    // x: x.value, 
    // y: y.value,
    name: 'NEOgás',
    type: 'scatter', 
    mode: 'markers+text+lines', 
    marker: {
      size: 10,
      color: '#1a9448'
    },
    textposition: 'top center', 
    font: {
      color: '#ff0000'
    },
    line: {
      width: 4, 
      color: '#1a9448'
    } 
  },
];

const layout_lines_neogas: NuxtPlotlyLayout = {
  title: 'Vol. Injetado por Dia - NEOgás',
  margin: {
    t: 50, l: 40, r: 10, b:90
  },
  xaxis: {
    tickangle: 90,
  },
  yaxis: {
    range: [0, 35000],
  },
  font: {
      size: 10,
    },
};

const config_lines_neogas: NuxtPlotlyConfig = { scrollZoom: false, displayModeBar: false, locale: 'fr' };


// ------------------------------------------
// CLIENTE SELECIONADO LINES
// ------------------------------------------

const data_lines_cliente_selecionado: Ref<NuxtPlotlyData> = ref()
data_lines_cliente_selecionado.value = [
  { 
    // x: x.value, 
    // y: y.value,
    name: 'Cliente Selecionado',
    type: 'scatter', 
    mode: 'markers+text+lines', 
    marker: {
      size: 10,
      color: '#4472C4'
    },
    textposition: 'top center', 
    font: {
      color: '#ff0000'
    },
    line: {
      width: 4, 
      color: '#4472C4'
    } 
  },
];

const min_yaxis_cliente_selecionado = ref()
const max_yaxis_cliente_selecionado = ref()

const layout_lines_cliente_selecionado: NuxtPlotlyLayout = {
  // const layout_lines_cliente_selecionado: Ref<NuxtPlotlyLayout> = ref()
  // layout_lines_cliente_selecionado.value = {
  title: 'Vol. Injetado por Dia - Cliente',
  margin: {
    t: 50, l: 40, r: 10, b:90
  },
  xaxis: {
    tickangle: 90,
  },
  yaxis: {
    range: [min_yaxis_cliente_selecionado.value, max_yaxis_cliente_selecionado.value],
  },
  font: {
      size: 10,
    },
  };

const config_lines_cliente_selecionado: NuxtPlotlyConfig = { scrollZoom: false, displayModeBar: false, locale: 'fr' };

// ------------------------------------------

const volumesResponse = ref();
const url_params = ref();
const consumo_datas = ref([]);
const volumes = ref([]);

const dados_clientes = ref();

async function getClientes() {
  const clientesResponse = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Clientes/getAll');
  dados_clientes.value = clientesResponse.data;
  clientesResponse.data.forEach(c => cliente_cod_lista.value.push({
    cliente_cod: c.meta.cliente_cod,
    apelido: c.meta.apelido
  }))
}

async function getVolumesInjetados() {
  volumesResponse.value = null;
  volumesResponse.value = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/VolumesInjetados/get' + url_params.value)
    .then(async res => {
      if(res.status == 200) {
        console.log("Volumes obtidos com sucesso!");
        console.log(res);
        return res;
      } else {
        console.log("Algum erro ocorreu na hora de obter os volumes.")
        reloadNuxtApp();
      }
    })
}

const datas_lista = ref([]);

// Date.prototype.addHours = function(h) {
//   this.setTime(this.getTime() + (h*60*60*1000));
//   return this;
// }

function popular_datas_lista() {
  let data_i, data_f;
  // data_i = new Date(consumo_data_inicio.value).addHours(new Date(consumo_data_inicio.value).getTimezoneOffset()/60);
  data_i = new Date(new Date(consumo_data_inicio.value).getTime() + (new Date(consumo_data_inicio.value).getTimezoneOffset()/60)*60*60*1000);
  // data_f = new Date(consumo_data_fim.value).addHours(new Date(consumo_data_fim.value).getTimezoneOffset()/60);
  data_f = new Date(new Date(consumo_data_fim.value).getTime() + (new Date(consumo_data_fim.value).getTimezoneOffset()/60)*60*60*1000);

  // console.log(new Date(data_i));
  // console.log(new Date(data_f));

  // console.log((data_f.getTime() - data_i.getTime())/(1000*60*60))

  let num_dias = (((data_f.getTime() - data_i.getTime())/(1000*60*60)) / 24) + 1;
  // console.log("num_dias: " + num_dias) 
  // console.log("num_dias: " + typeof num_dias)

  for(let i = 0; i < num_dias; i++) {
    // console.log(new Date(data_i.getTime() + (i*24*60*60*1000)))
    datas_lista.value.push(new Date(data_i.getTime() + (i*24*60*60*1000)));
  }

  // console.log(datas_lista.value)
}

const volumesTotaisPeriodo_postos= ref([])
const volumesTotaisPeriodo_postos_TOTAL = ref(0)

const volumesTotaisPeriodo_industrias= ref([])
const volumesTotaisPeriodo_industrias_TOTAL= ref(0)

const volumesTotaisPeriodo_neogas= ref([])
const volumesTotaisPeriodo_neogas_TOTAL= ref(0)

const volumesTotaisPeriodo_postos_e_industrias = ref([])
const volumesTotaisPeriodo_postos_e_industrias_TOTAL = ref(0)

const dadosClienteSelecionado = ref([]);
const clienteSelecionado = ref("guaratiba_riodejaneiro");

const DdS_list = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]


// const data_consumo_fim_MAIOR_DO_RES = ref(new Date(consumo_data_inicio.value));
const data_consumo_fim_MAIOR_DO_RES = ref();
const data_consumo_fim_fimmes = ref();
const razao_para_projecao = ref(1);


onMounted(async () => {
  // consumo_data_inicio.value = "2024-05-01";
  consumo_data_inicio.value = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString().padStart(2,0) + "-" + (1).toString().padStart(2,0);
  // consumo_data_fim.value = "2024-05-16";
  consumo_data_fim.value = new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString().padStart(2,0) + "-" + new Date().getDate().toString().padStart(2,0);
  
  data_consumo_fim_MAIOR_DO_RES.value = new Date(consumo_data_inicio.value)

  await main();

  var divDatasConsumo = document.getElementById("divDatasConsumo");
  var sticky = divDatasConsumo.offsetTop;
  // console.log("sticky: " + sticky)

  // console.log("divDatasConsumo.offsetLeft: " + divDatasConsumo.offsetLeft)
  console.log("divDatasConsumo.offsetWidth: " + divDatasConsumo.offsetWidth)

  window.onscroll = () => {
    // console.log("divDatasConsumo.offsetTop")
    // console.log(divDatasConsumo.offsetTop)
    // console.log("divDatasConsumo.offsetLeft: " + divDatasConsumo.offsetLeft)
    console.log("divDatasConsumo.offsetWidth: " + divDatasConsumo.offsetWidth)
    if(window.pageYOffset > sticky) {
      // console.log("maior")
      divDatasConsumo.classList.add("sticky")
      
    } else {
      divDatasConsumo.classList.remove("sticky")
    }
    
  }
}) // onMounted FIM



async function main() {

  console.log("MAIN =================================================")
  // console.log("")
  // console.log("----------------------------------------")
  // console.log("volumesTotaisPeriodo_postos.value");
  // console.log(volumesTotaisPeriodo_postos.value);
  // console.log("volumesTotaisPeriodo_postos_TOTAL.value");
  // console.log(volumesTotaisPeriodo_postos_TOTAL.value);
  // console.log("----------------------------------------")
  volumesTotaisPeriodo_postos.value = [];
  volumesTotaisPeriodo_postos_TOTAL.value = 0;
  // console.log("----------------------------------------")
  // console.log("volumesTotaisPeriodo_postos.value");
  // console.log(volumesTotaisPeriodo_postos.value);
  // console.log("volumesTotaisPeriodo_postos_TOTAL.value");
  // console.log(volumesTotaisPeriodo_postos_TOTAL.value);
  // console.log("----------------------------------------")
  
  volumesTotaisPeriodo_industrias.value = [];
  volumesTotaisPeriodo_industrias_TOTAL.value = 0;

  volumesTotaisPeriodo_neogas.value = [];
  volumesTotaisPeriodo_neogas_TOTAL.value = 0;

  volumesTotaisPeriodo_postos_e_industrias.value = [];
  volumesTotaisPeriodo_postos_e_industrias_TOTAL.value = 0;

  console.log(volumesTotaisPorDia.value.postos)
  // while(volumesTotaisPorDia.value.postos.length > 0) {
  //   volumesTotaisPorDia.value.postos.pop()
  // }
  volumesTotaisPorDia.value.postos = []
  console.log(volumesTotaisPorDia.value.postos)
  
  volumesTotaisPorDia.value.industrias = []
  volumesTotaisPorDia.value.postos_e_industrias = []
  volumesTotaisPorDia.value.neogas = []

  datas_lista.value = [];
  popular_datas_lista();
  url_params.value = '?consumo_data_inicio=' + consumo_data_inicio.value + '&consumo_data_fim=' + consumo_data_fim.value;
  await getVolumesInjetados();

 

  volumesResponse.value.data.forEach((e) => {
    if(new Date(e.consumo_data) > data_consumo_fim_MAIOR_DO_RES.value) {
      data_consumo_fim_MAIOR_DO_RES.value = new Date(e.consumo_data);
    }
  })
  console.log("data_consumo_fim_MAIOR_DO_RES.value: " + data_consumo_fim_MAIOR_DO_RES.value);
  consumo_data_fim.value = data_consumo_fim_MAIOR_DO_RES.value.getFullYear().toString() + "-" + (data_consumo_fim_MAIOR_DO_RES.value.getMonth() + 1).toString().padStart(2,0) + "-" + data_consumo_fim_MAIOR_DO_RES.value.getDate().toString().padStart(2,0);

  data_consumo_fim_fimmes.value = new Date(data_consumo_fim_MAIOR_DO_RES.value.getFullYear(), data_consumo_fim_MAIOR_DO_RES.value.getMonth() + 1, 0)
  console.log("data_consumo_fim_fimmes: " + data_consumo_fim_fimmes.value);

  razao_para_projecao.value = data_consumo_fim_fimmes.value.getDate() / data_consumo_fim_MAIOR_DO_RES.value.getDate();
  console.log(typeof razao_para_projecao.value);




  dadosClienteSelecionado.value = volumesResponse.value.data.filter(e => e.cliente_cod == clienteSelecionado.value);
  dados_clientes.value = [];
  cliente_cod_lista.value = [];
  await getClientes();
  let obj_temp;
  volumesResponse.value.data.forEach(volResp => {
    datas_lista.value.forEach((dl, ndx) => {
      // if(new Date(volResp.consumo_data).addHours(3) >= dl && new Date(volResp.consumo_data).addHours(3) < new Date(dl.getTime() + 24*60*60*1000)) {
      if(new Date(new Date(volResp.consumo_data).getTime() + 3*60*60*1000) >= dl && new Date(new Date(volResp.consumo_data).getTime() + 3*60*60*1000) < new Date(dl.getTime() + 24*60*60*1000)) {
        
        // cliente_cod == 'posto'
        if(volResp.consumo_volume != undefined && getTipoCliente(volResp.cliente_cod) == 'posto') {
          if(volumesTotaisPorDia.value.postos[ndx] == undefined) {
            volumesTotaisPorDia.value.postos.push(0);
          }
          volumesTotaisPorDia.value.postos[ndx] = volumesTotaisPorDia.value.postos[ndx] + volResp.consumo_volume

          if(volumesTotaisPeriodo_postos.value.find(dl => dl.cliente_cod == volResp.cliente_cod) == undefined) {
            obj_temp = {cliente_cod: volResp.cliente_cod, vol_total: 0}
            volumesTotaisPeriodo_postos.value.push(obj_temp)
          }
          volumesTotaisPeriodo_postos.value.find(dl => dl.cliente_cod == volResp.cliente_cod).vol_total += volResp.consumo_volume
        }

        // cliente_cod == 'industria'
        if(volResp.consumo_volume != undefined && getTipoCliente(volResp.cliente_cod) == 'industria') {
          if(volumesTotaisPorDia.value.industrias[ndx] == undefined) {
            volumesTotaisPorDia.value.industrias.push(0);
          }
          volumesTotaisPorDia.value.industrias[ndx] = volumesTotaisPorDia.value.industrias[ndx] + volResp.consumo_volume

          if(volumesTotaisPeriodo_industrias.value.find(dl => dl.cliente_cod == volResp.cliente_cod) == undefined) {
            obj_temp = {cliente_cod: volResp.cliente_cod, vol_total: 0}
            volumesTotaisPeriodo_industrias.value.push(obj_temp)
          }
          volumesTotaisPeriodo_industrias.value.find(dl => dl.cliente_cod == volResp.cliente_cod).vol_total += volResp.consumo_volume

        }

      }
    })
  })


  // console.log("----------------------------------------")
  // console.log("volumesTotaisPeriodo_postos.value");
  // console.log(volumesTotaisPeriodo_postos.value);
  // console.log("----------------------------------------")
  volumesTotaisPeriodo_postos_TOTAL.value = volumesTotaisPeriodo_postos.value.reduce((accumulator, currentValue) => accumulator + currentValue.vol_total, 0) //
  
  volumesTotaisPeriodo_industrias_TOTAL.value = volumesTotaisPeriodo_industrias.value.reduce((accumulator, currentValue) => accumulator + currentValue.vol_total, 0) //
  
  volumesTotaisPeriodo_postos_e_industrias_TOTAL.value = volumesTotaisPeriodo_postos_TOTAL.value + volumesTotaisPeriodo_industrias_TOTAL.value
  
  volumesTotaisPeriodo_neogas_TOTAL.value = volumesResponse.value.data.filter(e => e.cliente_cod == 'neogas').map(e => e.consumo_volume).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // POSTOS
  
  data_lines_postos.value[0].x = []
  data_lines_postos.value[0].x = datas_lista.value.map(data => {
    return new Date(data).getDate().toString().padStart(2,0) + "/" + (new Date(data).getMonth() + 1).toString().padStart(2,0) + " (" + DdS_list[new Date(data).getDay()] + ")"
  });

  data_lines_postos.value[0].y = []
  data_lines_postos.value[0].y = volumesTotaisPorDia.value.postos
  
  data_lines_postos.value[0].text = []
  data_lines_postos.value[0].text = volumesTotaisPorDia.value.postos.map(e => {
    return new Intl.NumberFormat('pt-BR').format(e.toFixed(0));
  })
  

  // INDÚSTRIAS

  data_lines_industrias.value[0].x = []
  data_lines_industrias.value[0].x = datas_lista.value.map(data => {
    return new Date(data).getDate().toString().padStart(2,0) + "/" + (new Date(data).getMonth() + 1).toString().padStart(2,0) + " (" + DdS_list[new Date(data).getDay()] + ")"
  });

  data_lines_industrias.value[0].y = []
  data_lines_industrias.value[0].y = volumesTotaisPorDia.value.industrias
  
  data_lines_industrias.value[0].text = []
  data_lines_industrias.value[0].text = volumesTotaisPorDia.value.industrias.map(e => {
    return new Intl.NumberFormat('pt-BR').format(e.toFixed(0));
  })

  // NEOGÁS
  
  data_lines_neogas.value[0].x = []
  data_lines_neogas.value[0].x = datas_lista.value.map(data => {
    return new Date(data).getDate().toString().padStart(2,0) + "/" + (new Date(data).getMonth() + 1).toString().padStart(2,0) + " (" + DdS_list[new Date(data).getDay()] + ")"
  });

  data_lines_neogas.value[0].y = []
  data_lines_neogas.value[0].y = volumesResponse.value.data.filter(e => e.cliente_cod == 'neogas').map(e => e.consumo_volume);
  
  data_lines_neogas.value[0].text = []
  data_lines_neogas.value[0].text = volumesResponse.value.data.filter(e => e.cliente_cod == 'neogas').map(e => new Intl.NumberFormat('pt-BR').format(e.consumo_volume.toFixed(0)));
  
  // CLIENTE SELECIONADO
  updateDataLinesClienteSelecionado(cliente.value);

  // RANKING POSTOS

  data_ranking_postos.value[0].x = []
  data_ranking_postos.value[0].x = volumesTotaisPeriodo_postos.value.sort((a,b) => a.vol_total - b.vol_total).map(e => e.vol_total)
  data_ranking_postos.value[0].y = []
  data_ranking_postos.value[0].y = volumesTotaisPeriodo_postos.value.sort((a,b) => a.vol_total - b.vol_total).map(e => {
    let apelido = dados_clientes.value.find(d => {
      return d.meta.cliente_cod == e.cliente_cod
    }).meta.apelido.split(" - ")[0]
    
    if(apelido == "Santa Dalila (Renaza)") {
      return "Sta Dalila"
    } else if (apelido == "Cantagalo (Universitário)") {
      return "Cantagalo"
    } else if (apelido == "Saracuruna (Renaza)") {
      return "Saracuruna"
    } else {
      return apelido
    }
    
  })
  
  data_ranking_postos.value[0].text = volumesTotaisPeriodo_postos.value.map(e => {
    return new Intl.NumberFormat('pt-BR').format(e.vol_total.toFixed(0))
  })


  // PIE TOTAIS

  data_pie_totais.value[0].values = [volumesTotaisPeriodo_postos_TOTAL.value, volumesTotaisPeriodo_industrias_TOTAL.value, volumesTotaisPeriodo_neogas_TOTAL.value]
  
} // main FIM


const total_cliente_selecionado = ref(0)

function updateDataLinesClienteSelecionado(cliente_cod) {
  dadosClienteSelecionado.value = volumesResponse.value.data.filter(e => e.cliente_cod == cliente_cod);

  // CLIENTE SELECIONADO
  
  data_lines_cliente_selecionado.value[0].x = []
  data_lines_cliente_selecionado.value[0].x = datas_lista.value.map(data => {
    return new Date(data).getDate().toString().padStart(2,0) + "/" + (new Date(data).getMonth() + 1).toString().padStart(2,0) + " (" + DdS_list[new Date(data).getDay()] + ")"
  });

  data_lines_cliente_selecionado.value[0].y = []
  data_lines_cliente_selecionado.value[0].y = dadosClienteSelecionado.value.map(e => e.consumo_volume);

  let menor_vol = dadosClienteSelecionado.value.map(e => e.consumo_volume)[0];
  // console.log("menor: " + menor_vol)
  // min_yaxis_cliente_selecionado.value = dadosClienteSelecionado.value.map(e => e.consumo_volume).forEach(vol => {
  //   if(vol < menor_vol) {
  //     menor_vol = vol
  //   }
  // })

  dadosClienteSelecionado.value.map(e => e.consumo_volume).forEach(vol => {
    // console.log("vol: " + vol)
    if(vol < menor_vol) {
      menor_vol = vol
    }
  })

  min_yaxis_cliente_selecionado.value = Math.floor(menor_vol / 1000) * 1000;

  total_cliente_selecionado.value = dadosClienteSelecionado.value.map(e => e.consumo_volume).reduce((accumulator, currentValue) => accumulator = accumulator + currentValue)
  // min_yaxis_cliente_selecionado.value = 0;

  // console.log("menor_vol: " + menor_vol)
  // console.log("min_yaxis_cliente_selecionado.value: " + min_yaxis_cliente_selecionado.value)
  // console.log("valor eixo min: " + Math.floor(min_yaxis_cliente_selecionado.value / 1000) * 1000)
  
  // console.log(dadosClienteSelecionado.value.map(e => e.consumo_volume))

  data_lines_cliente_selecionado.value[0].text = []
  data_lines_cliente_selecionado.value[0].text = dadosClienteSelecionado.value.map(e => {
    if(e.consumo_volume != undefined) {
      return new Intl.NumberFormat('pt-BR').format(e.consumo_volume.toFixed(0))
    }
  });

  // console.log(data_lines_cliente_selecionado.value);
}


var data_foo = [data_lines_postos.value[0], data_lines_industrias.value[0]]

let foo;
function getTipoCliente(cliente_cod) {
  foo = dados_clientes.value.find(e => {
    if(e.meta.cliente_cod == cliente_cod) {
      return e
    }  
  })
  if(foo != undefined) {
    return foo.meta.tipo
  } else {
    return undefined
  }
}

async function getVolumes() {
  // console.log(consumo_data_fim.value)
  // await getVolumesInjetados();
  await main();
}

</script>

<style>

.sticky {
  width: 100%;
  position: fixed;
  top: 0;
  box-sizing:border-box;
  padding-top: 15px;
  padding-left: 15px;
  /* padding: 15px; */
  /* background-color: #f5f5f5; */
  background-color: rgba(245, 245, 245, 0.85);
  z-index: 999;
  border: 1px solid gray;
  box-shadow: 0 5px 5px 0px rgba(102, 102, 102, 0.5);
}

</style>

