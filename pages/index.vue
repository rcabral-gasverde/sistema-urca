<template>

<v-breadcrumbs class="bg-grey-lighten-3 mb-6">
  <v-breadcrumbs-item>
    <NuxtLink to="/">Início</NuxtLink>
  </v-breadcrumbs-item>
</v-breadcrumbs>

  <!-- <v-row class="mb-6">
    <v-col>
      <p>Seja bem-vindo ao Sistema Urca!</p>
    </v-col>
  </v-row> -->

  <!-- <span class="text-h4 text-grey-darken-2">Bem-vindo ao Sistema Urca</span> -->
  <div class="text-h4 mt-6 text-grey-darken-2 pa-3 bg-grey-lighten-2 rounded-lg border">Sistema Urca</div>

  <div class="mb-4 mt-3">Acesse as principais funcionalidades no menu à esquerda.</div>
  <div>
    Funcionalidades disponíveis no momento:
  </div>
  <ul class="ml-8 mb-4">
    <li>Declarações de Viagens</li>
    <li>Mapa Interativo</li>
  </ul>
  <div>
    Funcionalidades em desenvolvimento:
  </div>
  <ul class="ml-8">
    <li>Carregamentos na UCB</li>
  </ul>

  <!-- <v-divider class="mb-6" thickness="2"></v-divider> -->

  <div class="text-h4 mt-8 text-grey-darken-2 pa-3 bg-grey-lighten-2 rounded-lg border">Novidades</div>
  
  <div class="text-h5 mt-4 mb-3 text-grey-darken-2">02/05/2024 - Mapa Interativo</div>
  Neste mapa é possível visualizar todos os clientes (postos e indústrias), bases de compressão e plantas. Acesse no menu à esquerda em Relatórios > Mapa Interativo ou clicando <NuxtLink to="/relatorios/mapa_interativo">neste link</NuxtLink>.
  
  <br><br>

  <div class="text-h5 mt-4 mb-3 text-grey-darken-2">19/03/2024 - Declarações de Viagens</div>
  Agora é possível que os operadores logísticos da Central de Operação na Barra da Tijuca gerem e visualizem declarações de viagens.
  <!-- <v-divider class="mb-6" thickness="2"></v-divider> -->

  <!-- <v-row justify="start" no-gutters>
    <v-col cols="3" v-for="i in cartoes_principais"  class="mr-6 mb-6">
      <v-card
        variant="elevated"
        class="elevation-1 d-flex flex-column"
        min-height="200"
      >
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">
              {{ i.titulo }}
            </div>
            <div >{{ i.descricao }}</div>
          </div>
        </v-card-item>
        <v-spacer></v-spacer>
        <v-card-actions>
          <NuxtLink :to="i.href">
            <v-btn>
              Acessar
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row> -->

  <!-- <v-divider class="mb-6" thickness="2"></v-divider> -->

  <!-- <v-row justify="start" no-gutters>
    <v-col cols="3" v-for="i in cartoes"  class="mr-6 mb-6">
      <v-card
        variant="elevated"
        class="elevation-1 d-flex flex-column"
        min-height="200"
      >
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">
              {{ i.titulo }}
            </div>
            <div >{{ i.descricao }}</div>
            <div class="text-caption">{{ i.descricao }}</div>
          </div>
        </v-card-item>
        <v-spacer></v-spacer>
        <v-card-actions>
          <NuxtLink :to="i.href">
            <v-btn>
              Acessar
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row> -->

    
</template>

<script setup>
import { ref } from 'vue';
const cartoes = ref()
const cartoes_principais = ref()

cartoes_principais.value = [
  {
    titulo: "Central de Operações",
    descricao: "Ver e gerar declarações, ver clientes e suas pressões, entre outras funções.",
    href: "/central_operacoes/",
  },
  {
    titulo: "UCB",
    descricao: "Ver e adicionar carregamentos.",
    href: "/ucb/",
  },
]
cartoes.value = [
  {
    titulo: "Declarações",
    descricao: "Ver e gerar declarações de saída para clientes.",
    href: "/central_operacoes/declaracoes",
  },
  {
    titulo: "Gerar Declarações",
    descricao: "Gerar declarações de saída para clientes.",
    href: "/central_operacoes/declaracoes/gerar_declaracao",
  },
  {
    titulo: "Clientes",
    descricao: "Ver listagem de clientes, suas pressões e outros parâmetros",
    href: "/central_operacoes/clientes_dashboard",
  },
  {
    titulo: "Carregamentos",
    descricao: "Ver listagem de carregamentos, adicionar novos carregamentos etc.",
    href: "/ucb/carregamentos/",
  },
]
</script>

<style scoped>

</style>