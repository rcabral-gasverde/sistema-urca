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
    
    <v-breadcrumbs-item disabled>
      <NuxtLink to="/central_operacoes/clientes_dashboard">Clientes</NuxtLink>
    </v-breadcrumbs-item>
    
  </v-breadcrumbs>

  <!-- <TituloPagina texto="Clientes" /> -->
  <v-row justify="start" no-gutters>
    <v-col cols="3" v-for="i in cartoes"  class="mr-6 mb-6">
      <v-card
        variant="elevated"
        class="elevation-2 d-flex flex-column"
        min-height="150"
        :hover="true"
      >
        <v-card-item>
          <div>
            <div class="mb-0 font-weight-bold">
              {{ i.titulo }}
            </div>
            <div class="text-subtitle-2">
              {{ i.localidade }}
            </div>
            <v-divider class="mb-6"></v-divider>
            <div class="mb-1"><span class="font-weight-bold">Pressão:</span> 150 bar</div>
            <div ><span class="font-weight-bold">Tempo Est.:</span> 3:30 h</div>
          </div>
        </v-card-item>
        <v-spacer></v-spacer>
        <v-card-actions>
          <NuxtLink :to="i.href">
            <v-btn v-slot="bottomSlot">
              Ver Mais
            </v-btn>
          </NuxtLink>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <!-- {{ clientes }} -->
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const clientes = ref();
const cartoes = ref();

onMounted(async () => {
  clientes.value = await axios.get('https://sa-east-1.aws.data.mongodb-api.com/app/application-0-bqxve/endpoint/Clientes/getAll')
  cartoes.value = clientes.value.data.map(cliente => {
    return { 
      titulo: cliente.meta.apelido.split(" - ")[0], 
      localidade: cliente.municipio,
      descricao: "", 
      href: "" 
    }
  })
})




// cartoes.value = [
//   {
//     titulo: "Santa Dalila",
//     descricao: "Ver e gerar declarações de saída para clientes.",
//     href: "/central_operacoes/declaracoes",
//   },
//   {
//     titulo: "Guaratiba",
//     descricao: "Gerar declarações de saída para clientes.",
//     href: "/central_operacoes/declaracoes/gerar_declaracao",
//   },
//   {
//     titulo: "Shekinah",
//     descricao: "Ver listagem de clientes, suas pressões e outros parâmetros",
//     href: "/central_operacoes/clientes_dashboard",
//   },
// ]
</script>

<style>

</style>