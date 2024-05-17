<template>
  <v-breadcrumbs class="bg-grey-lighten-3 mb-6">
  <v-breadcrumbs-item >
    <NuxtLink to="/">Início</NuxtLink>
  </v-breadcrumbs-item>
  <v-breadcrumbs-divider/>
  <v-breadcrumbs-item disabled>
    <NuxtLink to="/relatorios">Relatórios</NuxtLink>
  </v-breadcrumbs-item>
</v-breadcrumbs>

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
const cartoes = ref();

cartoes.value = [
  {
    titulo: "Mapa Interativo",
    descricao: "Mapa interativo mostrando todos os clientes, plantas e bases de compressão.",
    href: "/relatorios/mapa_interativo",
  },
  {
    titulo: "Volumes Injetados",
    descricao: "Ver volumes injetados por cliente, baixar relatórios consolidados de todos os clientes etc.",
    href: "/relatorios/volumes_injetados",
  },
  {
    titulo: "Cromatografias",
    descricao: "Ver cromatografias de indústrias, gerar gráficos etc.",
    href: "",
  },
]
</script>

<style>

</style>