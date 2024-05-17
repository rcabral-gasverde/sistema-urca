<template>
    <v-breadcrumbs class="bg-grey-lighten-3 mb-6">
        <v-breadcrumbs-item >
            <NuxtLink to="/">Início</NuxtLink>
        </v-breadcrumbs-item>
        <v-breadcrumbs-divider/>
        <v-breadcrumbs-item>
            <NuxtLink to="/relatorios">Relatórios</NuxtLink>
        </v-breadcrumbs-item>
        <v-breadcrumbs-divider/>
        <v-breadcrumbs-item disabled>
            <NuxtLink to="/relatorios/mapa_interativo">Mapa Interativo</NuxtLink>
        </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- <div style="height:50vh; width:80vw;"> -->
    
    
	<div style="height:50vh; max-width:1200px;">

      

		<LMap
			ref="map"
			:zoom="zoom"
			:max-zoom="18"
			:center="[-22.6444,-43.1625]"
			@ready="mapInitialized"
		>
			<LTileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
				layer-type="base"
				name="OpenStreetMap"
			/>

			<LTileLayer
				url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				attribution="© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France"
				layer-type="base"
				name="OpenStreetMap.HOT"
			/>
			
			<LTileLayer
				url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
				attribution=''
				layer-type="base"
				name="Satélite"
			/>

			<LTileLayer
				url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
				attribution="Google"
				layer-type="base"
				name="Google Híbrido"
			/>

			<LLayerGroup
				name="Bases"
				layer-type="overlay"
			>
				<LCircle v-for="coord in coords.filter(e => e.tipo == 'Base')"
					:lat-lng=coord.latlng
					:radius="750"
					color="purple"
					name="Bases"
				>
					<LPopup>
						<span style="font-weight: bold; font-size:medium">{{coord.nome}}</span> <br/>
						{{ coord.municipio }} - {{ coord.uf }} <br/> <br/>
						{{ coord.endereco }} <br/>
						{{ coord.bairro }}
					</LPopup>
				</LCircle>
			</LLayerGroup>
			<LLayerGroup
				name="Postos"
				layer-type="overlay"
			>
				<LCircle v-for="coord in coords.filter(e => e.tipo == 'Posto')"
					:lat-lng=coord.latlng 
					:radius="750" 
					color="blue"
				>
					<LPopup>
						<span style="font-weight: bold; font-size: medium">{{coord.nome}}</span> <br/>
						{{ coord.municipio }} - {{ coord.uf }} <br/> <br/>
						{{ coord.endereco }} <br/>
						{{ coord.bairro }}
					</LPopup>
				</LCircle>
			</LLayerGroup>
			<LLayerGroup
				name="Indústrias"
				layer-type="overlay"
			>
				<LCircle v-for="coord in coords.filter(e => e.tipo == 'Indústria')"
					:lat-lng=coord.latlng 
					:radius="750" 
					color="orange"
				>
					<LPopup>
						<span style="font-weight: bold; font-size: medium">{{coord.nome}}</span> <br/>
						{{ coord.municipio }} - {{ coord.uf }} <br/> <br/>
						{{ coord.endereco }} <br/>
						{{ coord.bairro }}
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

	<div class="mt-1"> 
        <span class="dot purple"></span> <span style="color: #7f007f; font-weight: bold;">Bases</span> &nbsp;
        <span class="dot blue"></span> <span style="color: #0000ff; font-weight: bold">Postos</span> &nbsp;
        <span class="dot orange"></span> <span style="color: #ffa500; font-weight: bold">Indústrias</span>
    </div>

    <!-- <v-table class="mt-3">
        <thead>
            <tr>
                <th class="text-left">
                    Nome
                </th>
                <th class="text-left">
                    Tipo
                </th>
                <th class="text-left">
                    Coordenadas (lat. long.)
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="coord in coords">
                <td>
                    {{ coord.nome }}
                </td>
                <td>
                    {{ coord.tipo }}
                </td>
                <td>
                    {{ coord.latlng }}
                </td>
            </tr>
        </tbody>
    </v-table> -->

    <div style="max-width: 1200px">
        
        <v-data-table class="mt-1"
            :items="coords"
            :fixed-header="true"
            :headers="headers"
            :height= 200
            items-per-page="100"
            item-value="latlng"
            return-object
            @click:row="fn_zoom_local"
            hover
            >
        </v-data-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const zoom = ref(9)
  const map = ref(null);

  const mapLink = ref('<a href="http://www.esri.com/">Esri</a>');
  const whoLink = ref('i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community');

  const attributionSatellite = ref();
  attributionSatellite.value = mapLink.value + ", " + whoLink.value

  const mapInitialized = () => {
    console.log("Map is ready!");
    console.log(map.value.maxZoom);
  }

  const headers = ref();
  headers.value = [
    {title: 'Nome', align: 'start', key: 'nome', sortable: true},
    {title: 'Tipo', align: 'start', key: 'tipo', sortable: true},
    {title: 'Município', align: 'start', key: 'municipio', sortable: true},
    {title: 'UF', align: 'start', key: 'uf', sortable: true},
    // {title: 'Coordenadas', align: 'start', key: 'latlng', sortable: false},
  ]

  function fn_zoom_local(event, row) {
    // console.log(row.item.latlng)
    map.value.leafletObject.flyTo([
        row.item.latlng[0], row.item.latlng[1]
    ], 13)
    // console.log(map.value.flyTo([0,0], 10))
    // map.flyTo([0,0], 10)
  }

  let coords = [
        {
            latlng: [-22.787494, -43.755474],
            nome: 'Gás Verde',
            tipo: 'Base',
            municipio: "Seropédica",
            uf: "RJ",
            bairro: "Piranema",
            endereco: "Estrada Santa Rosa, S/N",
        },
        {
            latlng: [-23.614751666044537, -46.470869471703665],
            nome: 'Metagás SP',
            tipo: 'Base',
            municipio: "São Paulo",
            uf: "SP",
            bairro: "Jardim Adutora",
            endereco: "Av. Sapopemba, 22.254 - setor EQB",
        },
        {
            latlng: [-22.899766, -43.731771],
            nome: 'Ternium',
            tipo: 'Indústria',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Santa Cruz",
            endereco: "Avenida João XXIII, S/N",
        },
        {
            latlng: [-22.518994, -42.700714],
            nome: 'Ambev',
            tipo: 'Indústria',
            municipio: "Cachoeiras de Macacu",
            uf: "RJ",
            bairro: "Porto de Tabuado",
            endereco: "Rod. RJ-122, 35.000, KM 35",
        }, {
            latlng: [-22.972328149217013, -43.41691696802752],
            nome: 'Haleon',
            tipo: 'Indústria',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Jacarepaguá",
            endereco: "R. Godofredo Marques, 274",
        }, {
            latlng: [-22.678050, -43.741839],
            nome: 'Escadas Botafogo',
            tipo: 'Indústria',
            municipio: "Paracambi",
            uf: "RJ",
            bairro: "Lages",
            endereco: "Estrada RJ 127, S/N, Lt 08 Parte Lot. Industrial"
        }, {
            latlng: [-22.73657072396785, -43.618044186334856],
            nome: 'Saint-Gobain',
            tipo: 'Indústria',
            municipio: "Queimados",
            uf: "RJ",
            bairro: "Distrito Industrial",
            endereco: "Rua E, SN, Lt 12 e 13"
        }, {
            latlng: [-23.043346668010745, -46.70726126637143],
            nome: 'L\'Oréal',
            tipo: 'Indústria',
            municipio: "Jarinu",
            uf: "SP",
            bairro: "Pinhal",
            endereco: "Estr. Mun. Alberto Tófani"
        }, {
            latlng: [-22.999635, -43.643534],
            nome: 'Aladim',
            tipo: 'Posto',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Pedra de Guaratiba",
            endereco: "Rua Belchior da Fonseca, 30"
        }, {
            latlng: [-22.693107915990677, -43.287332879778255],
            nome: 'Ale Caxias',
            tipo: 'Posto',
            municipio: "Duque de Caxias",
            uf: "RJ",
            bairro: "Vila Actura",
            endereco: "Rod. Washington Luiz, S/N, Lt 00013 0002"
        }, {
            latlng: [-22.473104434280824, -44.06080922482786],
            nome: 'AP Jet',
            tipo: 'Posto',
            municipio: "Volta Redonda",
            uf: "RJ",
            bairro: "Dom Bosco",
            endereco: "Rod. Lúcio Meira, KM 14, BR 393"
        }, {
            latlng: [-22.887160, -42.988111],
            nome: 'Barretão',
            tipo: 'Posto',
            municipio: "São Gonçalo",
            uf: "RJ",
            bairro: "Tribobó",
            endereco: "Av. Doutor Eugênio Borges, 9651"
        }, {
            latlng: [-22.7046943929337, -43.28115835754154],
            nome: 'Campos Elíseos',
            tipo: 'Posto',
            municipio: "Duque de Caxias",
            uf: "RJ",
            bairro: "Parque Campos Elíseos",
            endereco: "Rua Antônio de Carvalho Lage Filho, 133"
        }, {
            latlng: [-22.867040, -43.287749],
            nome: 'Expresso',
            tipo: 'Posto',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Inhaúma",
            endereco: "Estrada Adhemar Bebiano, 3385"
        }, {
            latlng: [-22.968157, -43.638081],
            nome: 'Guaratiba',
            tipo: 'Posto',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Guaratiba",
            endereco: "Av. das Américas, 000, Av. Dom João VI, 14001"
        }, {
            latlng: [-22.713609, -42.636036],
            nome: 'Mangueirinha',
            tipo: 'Posto',
            municipio: "Rio Bonito",
            uf: "RJ",
            bairro: "Mangueirinha",
            endereco: "Av. Theonas Martins Gomes, S/N, Lt 11 Qd H"
        }, {
            latlng: [-22.83128027905014, -43.4068396646164],
            nome: 'Miguel',
            tipo: 'Posto',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Parque Anchieta",
            endereco: "Est. do Engenho Novo, 1466, Lj. A"
        }, {
            latlng: [-22.650989, -43.283473],
            nome: 'Pitico',
            tipo: 'Posto',
            municipio: "Duque de Caxias",
            uf: "RJ",
            bairro: "Chácaras Arcampo",
            endereco: "Rod. Washington Luiz, SN, Qd 01 A Lt 01 E"
        }, {
            latlng: [-22.653331, -43.147809],
            nome: 'Santa Dalila',
            tipo: 'Posto',
            municipio: "Magé",
            uf: "RJ",
            bairro: "Santa Dalila",
            endereco: "Rod. Rio-Teresópolis, 16.886"
        }, {
            latlng: [-22.622298, -43.180600],
            nome: 'Santos Dumont',
            tipo: 'Posto',
            municipio: "Magé",
            uf: "RJ",
            bairro: "Piabetá",
            endereco: "Av. Santos Dumont, 1.513"
        }, {
            latlng: [-22.891643, -43.593917],
            nome: 'Shekinah',
            tipo: 'Posto',
            municipio: "Rio de Janeiro",
            uf: "RJ",
            bairro: "Campo Grande",
            endereco: "Estrada do Campinho, 3.229"
        }, {
            latlng: [-22.25422675662085, -43.71387326887804],
            nome: 'Valença (Universitário)',
            tipo: 'Posto',
            municipio: "Valença",
            uf: "RJ",
            bairro: "Aparecida",
            endereco: "Rua Aparecida, 593"
        }, {
            latlng: [-22.739488456942627, -43.34927073681116],
            nome: 'Viena',
            tipo: 'Posto',
            municipio: "Belford Roxo",
            uf: "RJ",
            bairro: "São José",
            endereco: "Avenida Automóvel Clube, 2.530"
        }, {
            latlng: [-22.674883976854993, -43.25568111280019],
            nome: 'Saracuruna',
            tipo: 'Posto',
            municipio: "Duque de Caxias",
            uf: "RJ",
            bairro: "Saracuruna",
            endereco: "Av. Presidente Roosevelt, 842, Lt. 18 ao 20"
        }
    ]
  </script>
  
  <style>
  body {
    margin: 0;
  }

  .dot {
  height: 15px;
  width: 15px;
  /* background-color: #bbb; */
  border-radius: 50%;
  border-style:solid;
  border-width:medium;
  display: inline-block;
  
}

.purple {
    border-color: #7f007f;
    background-color: #7f007f6f
}
.blue {
    border-color: #0000ff;
    background-color: #0000ff6f
}
.orange {
    border-color: #ffa500;
    background-color: #ffa5006f
}

  </style>
  