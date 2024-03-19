// import fs from 'fs';

import gas_verde_imagem_64 from './assets/gv_logo_64.json';
import urca_gas_imagem_64 from './assets/urca_gas_logo_64.json';
import json_empresa from './assets/dados_empresa_atende.json';

export default function criarPDF(dados) {
  const { $pdfMake } = useNuxtApp();
  // const dados = dados_para_pdf.elements;

  var imagem_64 = "";
  var logo_width = 0;
  var logo_height = 0;
  var urca_cor = '#006fc0';
  var gv_cor = '#007662';
  var cor_num_decl;

  var dados_empresa_atende;

  // if(dados['meta_empresa_atende'].value == 'gas_verde') {
  if(dados.cliente.meta.empresa_atende == 'gas_verde') {
    imagem_64 = gas_verde_imagem_64.img_string;
    logo_width = 153;
    logo_height = 50;
    cor_num_decl = gv_cor;

  // } else if(dados['meta_empresa_atende'].value == 'urca_gas') {
  } else if(dados.cliente.meta.empresa_atende == 'urca_gas') {
    imagem_64 = urca_gas_imagem_64.img_string;
    logo_width = 120;
    logo_height = 50;
    cor_num_decl = urca_cor;
  }

  // dados empresa atende
  dados_empresa_atende = json_empresa.find((emp) => {
    // return emp.meta.cod == dados['meta_empresa_atende'].value
    return emp.meta.cod == dados.cliente.meta.empresa_atende
  })

  var docDefinition = {
    pageSize: 'A4',
    // pageMargins: [0,0,0,0],
    content: [
      {
        style: 'tableExample',
        layout: 'noBorders',
        table: {
          style: 'defaultStyle',
          widths: ['*','*'],
          body: [
            // [{image: './gas_verde_logo.png', width: 153, height: 50}, {text:[{text: "Declaração Número:" },{text: "\n" + dadosDeclaracao.numero, bold: true, color: '#006fc0', fontSize:15, }], alignment:'right'}],
            // [{image: 'data:image/png;base64,' + imagem_64, width: logo_width, height: logo_height}, {text:[{text: "Declaração Número:" },{text: "\n" + dados['declaracao_numero'].value, bold: true, color: cor_num_decl, fontSize:15, }], alignment:'right'}],
            [{image: 'data:image/png;base64,' + imagem_64, width: logo_width, height: logo_height}, {text:[{text: "Declaração Número:" },{text: "\n" + dados.declaracao.num, bold: true, color: cor_num_decl, fontSize:15, }], alignment:'right'}],
            [{text: dados_empresa_atende.endereco, fontSize: 10, bold: true, margin: [0,20,0,0]},{}],
            // [{text: 'Est. Santa Rosa, S/N, Piranema', fontSize: 10, bold: true, margin: [0,20,0,0]},{}],
            [{text: dados_empresa_atende.municipio + " - " + dados_empresa_atende.uf, fontSize: 10, bold: true},{}],
            // [{text: 'Seropédica - Rio de Janeiro', fontSize: 10, bold: true},{}],
            [{text: 'CEP: ' + dados_empresa_atende.cep, fontSize: 10, bold: true,},{}],					
            // [{text: 'CEP: 23.898-772', fontSize: 10, bold: true,},{}],					
            [{text: 'Inscr. Estadual: ' + dados_empresa_atende.insc_estadual, fontSize: 10, bold: true,},{}],					
            // [{text: 'Inscr. Estadual: 11086535', fontSize: 10, bold: true,},{}],					
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: [85,'*'],
          body: [
            [{text: 'Destinatário', style: 'tableHeader', colSpan: 2, alignment: 'center', fillColor: '#f1f1f1'},{}],
            // [{text: 'Razão Social:', bold: true}, dados['destinatario_nome_razao_social'].value ],
            [{text: 'Razão Social:', bold: true}, dados.cliente.razao_social ],
            // [{text: 'Endereço:', bold: true}, dados['destinatario_endereco_logradouro'].value],
            [{text: 'Endereço:', bold: true}, dados.cliente.endereco],
            // [{text: 'Bairro:', bold: true}, dados['destinatario_endereco_bairro'].value],
            [{text: 'Bairro:', bold: true}, dados.cliente.bairro],
            // [{text: 'Cidade:', bold: true}, dados['destinatario_endereco_municipio'].value],
            [{text: 'Cidade:', bold: true}, dados.cliente.municipio],
            // [{text: 'Estado:', bold: true}, dados['destinatario_endereco_uf'].value],
            [{text: 'Estado:', bold: true}, dados.cliente.uf],
            // [{text: 'CNPJ:', bold: true}, dados['destinatario_cnpj'].value],
            [{text: 'CNPJ:', bold: true}, dados.cliente.cnpj],
            // [{text: 'Insc Estadual:', bold: true}, dados['destinatario_insc_est'].value],
            [{text: 'Insc Estadual:', bold: true}, dados.cliente.insc_est],
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: [85,'*'],
          body: [
          // [{text: 'Data de Saída:', bold: true},{text: dados['declaracao_data_saida'].value}],
          [{text: 'Data de Saída:', bold: true},{
            text: 
              new Date(dados.declaracao.data_saida).getDate().toString().padStart(2,'0') + '/' + (new Date(dados.declaracao.data_saida).getMonth() + 1).toString().padStart(2,'0') + '/' + new Date(dados.declaracao.data_saida).getFullYear().toString()
          }],
          // [{text: 'Placa da Carreta:', bold: true},{text: dados['declaracao_placa_carreta'].value}],
          [{text: 'Placa da Carreta:', bold: true},{text: dados.declaracao.placa_carreta}],
        ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: [85,'*',75],
          heights: ['auto', 200],
          body: [
            [
              {text: 'NCM/SH', style: 'tableHeader', alignment: 'left', fillColor: '#f1f1f1'},
              {text: 'Descrição', style: 'tableHeader', alignment: 'left', fillColor: '#f1f1f1'},
              {text: 'Quantidade (m³)', style: 'tableHeader', alignment: 'left', fillColor: '#f1f1f1'},
            ],
            [		
              // {text: dados['declaracao_produto_codigo'].value, margin: [0, 10, 0, 0], alignment: 'left'}, 
              {text: dados.declaracao.produto.codigo, margin: [0, 10, 0, 0], alignment: 'left'}, 
              // {text: dados['declaracao_produto_descricao'].value, margin: [0, 10, 0, 0]}, 
              {text: dados.declaracao.produto.descricao, margin: [0, 10, 0, 0]}, 
              // {text: dados['declaracao_produto_quantidade'].value.toLocaleString('pt-BR'), margin: [0, 10, 0, 0], alignment: 'right'}
              {text: dados.declaracao.produto.quantidade.toLocaleString('pt-BR'), margin: [0, 10, 0, 0], alignment: 'right'}
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          heights: ['*','*'],
          body: [
            [{text: "Observações:", bold: true, border: [true, true, true, false], margin: [5,10,0,0]}],
            [{margin: [5,5,5,10],
              border: [true, false, true, true],
              alignment: 'justify',
              text: "Emitente dispensado de emissão de nota fiscal a cada operação de saída, conforme \"Regime Especial - Processo nº SEI - 04/079/000648/2019\". A SEFAZ-RJ autorizou a emissão de apenas uma nota fiscal ao final do período de apuração.",
              lineHeight: 1.25
            }]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*'],
          heights: ['*'],
          body: [
            
            [{
              margin: [5,10,5,10],
              text: "A " + dados.cliente.razao_social + ", CNPJ nº " + dados.cliente.cnpj + " e Inscrição Estadual nº " + dados.cliente.insc_est + " declara que recebeu a quantidade de _____________ m³, na data de ______/______/______.",
              lineHeight: 1.25,
            }
            ],
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 0, 0, 10]
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: 'blue',
        fillOpacity: 0.3
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: 'black'
      }
    },
    defaultStyle: {
      fontSize: 10,
      // alignment: 'justify'
    },
    patterns: {
      stripe45d: {
        boundingBox: [1, 1, 4, 4],
        xStep: 3,
        yStep: 3,
        pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
      }
    }
  };

  // pdfMake.createPdf(docDefinition).open();
  // const stringParaFileName = "decl_" + dados.declaracao.num + " - " + dados.cliente.meta.apelido
  const stringParaFileName = "declaracao_" + dados.declaracao.num + "_" + dados.cliente.meta.cliente_cod
  // $pdfMake.createPdf(docDefinition).download(stringParaFileName);
  $pdfMake.createPdf(docDefinition).open();
}
// export default function criarPDF_backup(dados_para_pdf) {
//   const dados = dados_para_pdf.elements;

//   var imagem_64 = "";
//   var logo_width = 0;
//   var logo_height = 0;
//   var urca_cor = '#006fc0';
//   var gv_cor = '#007662';
//   var cor_num_decl;

//   var dados_empresa_atende;

//   if(dados['meta_empresa_atende'].value == 'gas_verde') {
//     imagem_64 = gas_verde_imagem_64.img_string;
//     logo_width = 153;
//     logo_height = 50;
//     cor_num_decl = gv_cor;

//   } else if(dados['meta_empresa_atende'].value == 'urca_gas') {
//     imagem_64 = urca_gas_imagem_64.img_string;
//     logo_width = 120;
//     logo_height = 50;
//     cor_num_decl = urca_cor;
//   }

//   // dados empresa atende
//   dados_empresa_atende = json_empresa.find((emp) => {
//     return emp.meta.cod == dados['meta_empresa_atende'].value
//   })

//   var docDefinition = {
//     pageSize: 'A4',
//     // pageMargins: [0,0,0,0],
//     content: [
//       {
//         style: 'tableExample',
//         layout: 'noBorders',
//         table: {
//           style: 'defaultStyle',
//           widths: ['*','*'],
//           body: [
//             // [{image: './gas_verde_logo.png', width: 153, height: 50}, {text:[{text: "Declaração Número:" },{text: "\n" + dadosDeclaracao.numero, bold: true, color: '#006fc0', fontSize:15, }], alignment:'right'}],
//             [{image: 'data:image/png;base64,' + imagem_64, width: logo_width, height: logo_height}, {text:[{text: "Declaração Número:" },{text: "\n" + dados['declaracao_numero'].value, bold: true, color: cor_num_decl, fontSize:15, }], alignment:'right'}],
//             [{text: dados_empresa_atende.endereco, fontSize: 10, bold: true, margin: [0,20,0,0]},{}],
//             // [{text: 'Est. Santa Rosa, S/N, Piranema', fontSize: 10, bold: true, margin: [0,20,0,0]},{}],
//             [{text: dados_empresa_atende.municipio + " - " + dados_empresa_atende.uf, fontSize: 10, bold: true},{}],
//             // [{text: 'Seropédica - Rio de Janeiro', fontSize: 10, bold: true},{}],
//             [{text: 'CEP: ' + dados_empresa_atende.cep, fontSize: 10, bold: true,},{}],					
//             // [{text: 'CEP: 23.898-772', fontSize: 10, bold: true,},{}],					
//             [{text: 'Inscr. Estadual: ' + dados_empresa_atende.insc_estadual, fontSize: 10, bold: true,},{}],					
//             // [{text: 'Inscr. Estadual: 11086535', fontSize: 10, bold: true,},{}],					
//           ]
//         }
//       },
//       {
//         style: 'tableExample',
//         table: {
//           widths: [85,'*'],
//           body: [
//             // ['Column 1', 'Column 2', 'Column 3'],
//             [{text: 'Destinatário', style: 'tableHeader', colSpan: 2, alignment: 'center', fillColor: '#f1f1f1'},{}],
//             [{text: 'Razão Social:', bold: true}, dados['destinatario_nome_razao_social'].value ],
//             [{text: 'Endereço:', bold: true}, dados['destinatario_endereco_logradouro'].value],
//             [{text: 'Bairro:', bold: true}, dados['destinatario_endereco_bairro'].value],
//             [{text: 'Cidade:', bold: true}, dados['destinatario_endereco_municipio'].value],
//             [{text: 'Estado:', bold: true}, dados['destinatario_endereco_uf'].value],
//             [{text: 'CNPJ:', bold: true}, dados['destinatario_cnpj'].value],
//             [{text: 'Insc Estadual:', bold: true}, dados['destinatario_insc_est'].value],
//           ]
//         }
//       },
//       {
//         style: 'tableExample',
//         table: {
//           widths: [85,'*'],
//           body: [
//           [{text: 'Data de Saída:', bold: true},{text: dados['declaracao_data_saida'].value}],
//           [{text: 'Placa da Carreta:', bold: true},{text: dados['declaracao_placa_carreta'].value}],
//         ]
//         }
//       },
//       {
//         style: 'tableExample',
//         table: {
//           widths: [85,'*',75],
//           heights: ['auto', 200],
//           body: [
//             [
//               {text: 'Código', style: 'tableHeader', alignment: 'left', fillColor: '#f1f1f1'},
//               {text: 'Descrição', style: 'tableHeader', alignment: 'left', fillColor: '#f1f1f1'},
//               {text: 'Quantidade (m³)', style: 'tableHeader', alignment: 'left', fillColor: '#f1f1f1'},
//             ],
//             [		
//               {text: dados['declaracao_produto_codigo'].value, margin: [0, 10, 0, 0], alignment: 'left'}, 
//               {text: dados['declaracao_produto_descricao'].value, margin: [0, 10, 0, 0]}, 
//               {text: dados['declaracao_produto_quantidade'].value.toLocaleString('pt-BR'), margin: [0, 10, 0, 0], alignment: 'right'}
//             ]
//           ]
//         }
//       },
//       {
//         style: 'tableExample',
//         table: {
//           widths: ['*'],
//           heights: ['*','*'],
//           body: [
//             [{text: "Observações:", bold: true, border: [true, true, true, false], margin: [5,10,0,0]}],
//             [{margin: [5,5,5,10],
//               border: [true, false, true, true],
//               alignment: 'justify',
//               text: "Emitente dispensado de emissão de nota fiscal a cada operação de saída, conforme \"Regime Especial - Processo nº SEI - 04/079/000648/2019\". A SEFAZ-RJ autorizou a emissão de apenas uma nota fiscal ao final do período de apuração.",
//               lineHeight: 1.25
//             }]
//           ]
//         }
//       },
//       {
//         style: 'tableExample',
//         table: {
//           widths: ['*'],
//           heights: ['*'],
//           body: [
            
//             [{
//               margin: [5,10,5,10],
//               text: "A " + dados['destinatario_nome_razao_social'].value + ", CNPJ nº " + dados['destinatario_cnpj'].value + " e Inscrição Estadual nº " + dados['destinatario_insc_est'].value + " declara que recebeu a quantidade de _____________ m³, na data de ______/______/______.",
//               lineHeight: 1.25,
//             }
//             ],
//           ]
//         }
//       }
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10]
//       },
//       subheader: {
//         fontSize: 16,
//         bold: true,
//         margin: [0, 10, 0, 5]
//       },
//       tableExample: {
//         margin: [0, 0, 0, 10]
//       },
//       tableOpacityExample: {
//         margin: [0, 5, 0, 15],
//         fillColor: 'blue',
//         fillOpacity: 0.3
//       },
//       tableHeader: {
//         bold: true,
//         fontSize: 10,
//         color: 'black'
//       }
//     },
//     defaultStyle: {
//       fontSize: 10,
//       // alignment: 'justify'
//     },
//     patterns: {
//       stripe45d: {
//         boundingBox: [1, 1, 4, 4],
//         xStep: 3,
//         yStep: 3,
//         pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
//       }
//     }
//   };

//   pdfMake.createPdf(docDefinition).open();
// }