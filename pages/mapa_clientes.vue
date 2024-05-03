<template>
    <div style="height:70vh; width:80vw">
      <LMap
        ref="map"
        :zoom="zoom"
        :center="[-22.6444,-43.1625]"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />

        <LLayerGroup
            name="Bases"
            layer-type="overlay"
        >
            <LCircle v-for="coord in coords.filter(e => e.tipo == 'base')"
                :lat-lng=coord.latlng
                :radius="750"
                color="purple"
                name="Bases"
            >
                <LPopup>
                    {{coord.nome}}
                </LPopup>
            </LCircle>
        </LLayerGroup>
        <LLayerGroup
            name="Postos"
            layer-type="overlay"
        >
            <LCircle v-for="coord in coords.filter(e => e.tipo == 'posto')"
                :lat-lng=coord.latlng 
                :radius="750" 
                color="blue"
            >
                <LPopup>
                    {{coord.nome}}
                </LPopup>
            </LCircle>
        </LLayerGroup>
        <LLayerGroup
            name="Indústrias"
            layer-type="overlay"
        >
            <LCircle v-for="coord in coords.filter(e => e.tipo == 'industria')"
                :lat-lng=coord.latlng 
                :radius="750" 
                color="green"
            >
                <LPopup>
                    {{coord.nome}}
                </LPopup>
            </LCircle>
        </LLayerGroup>
        

        <!-- <div v-for="coord in coords">
            <LCircle
                :lat-lng=coord.latlng 
                :radius="750" 
                color="blue"
            />

        </div> -->

        <!-- <LCircle v-for="cord in coords">

        </LCircle> -->
        <LControlLayers />
      </LMap>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const zoom = ref(9)

  let coords = [
        {
            latlng: [-22.787494, -43.755474],
            nome: 'Gás Verde Seropédica',
            tipo: 'base'
        },
        {
            latlng: [-23.614751666044537, -46.470869471703665],
            nome: 'Metagás SP',
            tipo: 'base'
        },
        {
            latlng: [-22.899766, -43.731771],
            nome: 'Ternium',
            tipo: 'industria'
        },
        {
            latlng: [-22.518994, -42.700714],
            nome: 'Ambev',
            tipo: 'industria'
        }, {
            latlng: [-22.972328149217013, -43.41691696802752],
            nome: 'Haleon Jacarepaguá',
            tipo: 'industria'
        }, {
            latlng: [-22.678050, -43.741839],
            nome: 'Escadas Botafogo',
            tipo: 'industria'
        }, {
            latlng: [-22.73657072396785, -43.618044186334856],
            nome: 'Saint-Gobain',
            tipo: 'industria'
        }, {
            latlng: [-23.043346668010745, -46.70726126637143],
            nome: 'L\'Oréal Jarinu',
            tipo: 'industria'
        },
        // {
        //     latlng: [-22.999635, -43.643534],
        //     nome: 'Aladim',
        //     tipo: 'posto'
        // },
        // {
        //     latlng: [-22.693107, -43.287332],
        //     nome: 'Ale Caxias',
        //     tipo: 'posto'
        // },
        // This is just a sample script. Paste your real code (javascript or HTML) here.
        {
            latlng: [-22.999635, -43.643534],
            nome: 'Aladim',
            tipo: 'posto'
        }, {
            latlng: [-22.693107915990677, -43.287332879778255],
            nome: 'Ale Caxias',
            tipo: 'posto'
        }, {
            latlng: [-22.473104434280824, -44.06080922482786],
            nome: 'AP Jet',
            tipo: 'posto'
        }, {
            latlng: [-22.887160, -42.988111],
            nome: 'Barretão',
            tipo: 'posto'
        }, {
            latlng: [-22.7046943929337, -43.28115835754154],
            nome: 'Campos Elíseos',
            tipo: 'posto'
        }, {
            latlng: [-22.867040, -43.287749],
            nome: 'Expresso',
            tipo: 'posto'
        }, {
            latlng: [-22.968157, -43.638081],
            nome: 'Guaratiba',
            tipo: 'posto'
        }, {
            latlng: [-22.713609, -42.636036],
            nome: 'Mangueirinha',
            tipo: 'posto'
        }, {
            latlng: [-22.83128027905014, -43.4068396646164],
            nome: 'Miguel',
            tipo: 'posto'
        }, {
            latlng: [-22.650989, -43.283473],
            nome: 'Pitico',
            tipo: 'posto'
        }, {
            latlng: [-22.653331, -43.147809],
            nome: 'Santa Dalila',
            tipo: 'posto'
        }, {
            latlng: [-22.622298, -43.180600],
            nome: 'Santos Dumont',
            tipo: 'posto'
        }, {
            latlng: [-22.891643, -43.593917],
            nome: 'Shekinah',
            tipo: 'posto'
        }, {
            latlng: [-22.25422675662085, -43.71387326887804],
            nome: 'Valença (Universitário)',
            tipo: 'posto'
        }, {
            latlng: [-22.739488456942627, -43.34927073681116],
            nome: 'Viena',
            tipo: 'posto'
        }, {
            latlng: [-22.674883976854993, -43.25568111280019],
            nome: 'Saracuruna',
            tipo: 'posto'
        }
    ]
  </script>
  
  <style>
  body {
    margin: 0;
  }
  </style>
  