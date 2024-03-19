<template>
    <v-app>
        <v-layout>
            <!-- <v-app-bar
                style="position:fixed"
            >
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title></v-toolbar-title>
                <v-btn icon="mdi-theme-light-dark" variant="text" @click="fn_change_theme()"></v-btn>
            </v-app-bar> -->

            <v-navigation-drawer
              v-model="drawer"
              location="left"
              :rail="rail"
              permanent
              @click="rail = false"
              class="bg-grey-darken-3"
              rail-width="64"
              elevation="2"
              style="position: fixed"
            >      
            <v-list nav>
              <v-list-item class="pa-0 mb-4">
                <template v-slot:append>
                  <v-btn
                    :icon="icon_drawer_rail"
                    variant="text"
                    @click.stop="rail = !rail"
                  ></v-btn>
                </template>
              </v-list-item>
                  <NuxtLink v-for="i in items_drawer" :to="i.route" class="item-menu">
                    <!-- <v-sheet class="mx-2 my-1 item-menu-sheet"> -->
                        <v-list-item 
                          :prepend-icon="i.icon" 
                          :title="i.text" 
                          base-color="black" 
                          elevation="3" 
                          class="bg-grey-lighten-2 mb-3 pl-2 text-h6 class-teste"
                        >
                        </v-list-item>
                    <!-- </v-sheet> -->
                  </NuxtLink>
              </v-list>
            </v-navigation-drawer>

            <v-main class="bg-grey-lighten-4">
              <!-- <v-container > -->
                  <!-- <slot /> -->
                <div class="pa-6">
                  <NuxtPage />
                </div>
                <!-- </v-container> -->

            </v-main>
        </v-layout>
        <!-- <NuxtLink to="/">Home</NuxtLink> -->
        <!-- <NuxtLink to="/about">About</NuxtLink> -->
        <!-- <div> -->
        <!-- </div> -->
    </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
const drawer = ref(true);
const rail = ref(true);
const items_breadcrumbs = ref();
const items_drawer = ref();

function fn_teste_over() {
  // alert("OI")
}

const icon_drawer_rail = computed(() => {
  if(rail.value == true) {
    return 'mdi-chevron-double-right'
  } else {
    return 'mdi-chevron-double-left'
  }
})


items_drawer.value = [
  {
    text: 'Início',
    icon: 'mdi-home',
    route: '/'
  },
  {
    text: 'Central de Operações',
    icon: 'mdi-access-point',
    route: '/central_operacoes/'
  },
  
  {
    text: 'UCB',
    icon: 'mdi-train-car-container',
    route: '/ucb/'
  },
  {
    text: 'Relatórios',
    icon: 'mdi-chart-bar',
    route: '/relatorios/'
  },
]

items_breadcrumbs.value = [
  {
    title: 'Início',
    disabled: false,
    route: '/'
  },
  {
    title: 'Central de Operações',
    disabled: false,
    route: '/central_operacoes/'
  },
  {
    title: 'Declarações',
    disabled: false,
    route: '/central_operacoes/declaracoes'
  },
  {
    title: 'Gerar Declaração',
    disabled: true,
    route: '/central_operacoes/declaracoes/gerar_declaracao'
  }
]

function fn_change_theme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>

<style scoped>

.router-link-exact-active {
  color: #12b488
}

.item-menu {
  text-decoration: none;
}
</style>