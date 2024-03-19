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

  <v-row justify="start" no-gutters>
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
            <!-- <div class="text-caption">{{ i.descricao }}</div> -->
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
  </v-row>

  <v-divider class="mb-6" thickness="2"></v-divider>

  <v-row justify="start" no-gutters>
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
            <!-- <div class="text-caption">{{ i.descricao }}</div> -->
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
  </v-row>

    
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