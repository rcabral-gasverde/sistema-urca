UCB -> CARREGAMENTOS

# Em Andamento
Carregamentos -> Iniciar Carga

# Correções a fazer
## Módulo Declarações
Quando está para virar o mês, o meu programa gera um número errado para a declaração. Isto ocorre certamente por causa do fuso-horário. As declarações "GV-TERN-001/03-2024" e "UG-DALI-001/03-2024" não deveriam ser numeradas como "001", e sim com o maior número para aquele mês, pois são as últimas de seus respectivos clientes naquele mês.

Colocar placas de carretas em ordem alfabética.

# A fazer

- Entrada de Carreta: impossibilitar escolha de carreta que já tenha entrado na base (CONCLUÍDO)
	- Na collection de carretas (atualmente chamada "PlacasCarretas") eu deveria adicionar um campo mostrando o local daquela carreta. Se ela estiver fora da base, permitir que ela seja escolhida para dar entrada na base. (A IMPLEMENTAR)

- implementar ação Realocar Carreta (CONCLUÍDO)
	- a realocação de carreta somente será possível para os seguintes valores da propriedade "status" de um carregamento document: 
			entrou_na_base 
			parcialmente_carregada 
			totalmente_carregada
		e será proibida para os status de um carregamento document:
			carregando
			saiu_para_cliente
	- a realocação de carreta só pode ocorrer se aquela vaga estiver disponível (uma vaga está disponível quando, na collection Vagas, aquele document correspondente àquela vaga possui a propriedade status igual a "disponivel")
	- a realocação de carreta pode ocorrer para:
		- uma outra vaga
			- se o "status" desta outra for "disponivel"
		- estoque
			- se a carreta/carregamento tiver o status "parcialmente_carregada" ou "totalmente_carregada". Caso contrário, desabilitar a opção "estoque" no menu
		- fora da vaga
	- implementar a possibilidade de realocação para (CONCLUÍDO)
		- fora da vaga
		- estoque


- implementar interligação entre vagas e mesas (na hora que escolher a vaga, habilitar opções de mesas etc). Dica: já tem pronto no formulário de entrada de carreta na base
	
- implementar Mesas collection (CONCLUÍDO): conterá cinco documents, cada um sendo uma mesa. Cada document terá as seguintes propriedades:
	- num: número da mesa (que será de 1 a 5).
	- status: status da mesa, que será "ociosa" ou "carregando". 
	- tipo_gas: tipo de gás fornecido por aquela mesa.
	- vazao: vazão informada em m³/h (não será calculada pelas cargas, mas sim informada manualmente por operadores. Pensar melhor).
	- encerrante_atual: encerante mais recente registrado para aquela mesa.
	- data_hora_registro_encerrante_atual: data e hora de último registro de encerrante.
	- pressao_atual: pressão mais recente registrada para aquela mesa.
	- data_hora_registro_pressao_atual: data e hora de último registro de pressão.
	- vaga_carregando: vaga sendo atendida/atrelada (se a mesa estiver com o status "carregando", necessariamente haverá uma vaga atendida por aquela/atrelada àquela mesa).
	- placa_carreta: placa da carreta que está em carregamento naquela mesa.

- implementar Vagas collection (CONCLUÍDO): conterá 13 documents, cada um correspondente a uma vaga
	- num: número da vaga (de 1 a 13).
	- status: status da vaga que será "ocupada" ou "disponivel"
	- placa_carreta: placa da carreta que está estacionada na vaga.
	- mesas_associadas: objeto contendo as mesas associadas à vaga. A maioria das vagas possuirá uma array de único elemento, com exceção das vagas 6 e 11: 
		vaga 6: mesas_associadas [2, 3], 
		vaga 11: mesas_associadas: [4, 5]

# Dados do programa

status de carreta (propriedade "status" de um document da collection PlacasCarretas):
  entrou_na_base
  carregando
  parcialmente_carregada
  totalmente_carregada
  saiu_para_cliente

status de carregamentos (propriedade "status" de um document da collection Carregamentos)
  entrou_na_base
  carregando
  parcialmente_carregada
  totalmente_carregada
  saiu_para_cliente

-----------------------------

estágios de cargas
  inicial
  parcial
  final

-----------------------------

Collection Mesas
  num
  status: "ociosa" ou "carregando"
  tipo_gas: "veicular" ou "industrial"
  vazao
  encerrante_atual: número inteiro
  pressao_atual: número inteiro
  data_hora_registro_enc_pr: 1900-01-01T00:00:00.000+00:00
  vaga_carregando: 
  placa_carreta:

## Ações
- realocar_carreta
- iniciar_carga
- fazer_corte
- finalizar_carga
- finalizar_carregamento
- sair_para_cliente


# Fluxo Algoritmo (intenção inicial deste documento)

- nova ENTRADA DE CARRETA na base:
	- registrar um novo document na collection Carregamentos (já feito)
	- se durante a entrada tiver sido escolhida uma vaga:
		- registrar na collection Vagas, no document correspondente, os seguintes valores para as seguintes propriedades:
			num: o número da vaga escolhi
			status: ocupada
			placa_carreta: a placa da carreta que tiver entrado na base

- REALOCAR CARRETA:
	- na collection Vagas, 
		1. remover a placa do carregamento selecionado da propriedade "placa_carreta" do document referente à vaga de origem
		2.  adicionar a placa do carregamento selecionado à propriedade "placa_carreta" do document referente à vaga de destino
	- na collection Carregamentos
		1. para o carregamento selecionado, alterar as propriedades "vaga" e "mesa"

- nova CARGA:
	- se status_carregamento == "entrou_na_base"
		- puxar o encerrante anterior, que será puxado de acordo com a mesa escolhida.
		- ao registrar a carga:
			- registrar na collection Carregamentos aquela carga no document correspondente (já feito)
			- registrar na collection Mesas


- Clique num carregamento na tabela de carregamentos
  	@click:row="mostrar_detalhes_carregamento"

- Aparece diálogo de ações, cargas e detalhes
  mostrar_detalhes_carregamento (function):
	id_carregamento_clicado <-- id do carregamento que foi clicado na tabela de carregamentos
	detalhes_carregamento <-- dados de dados_carregamentos
    detalhes_carregamento_dialog.value = true
    cargas_carregamento (array) <-- dados de detalhes_carregamento
	status_carregamento <-- obtém de detalhes_carregamento
	habilitar_acoes(status_carregamento) (function)
	<!-- fn_atualizar_campos_carga() (function chamada) -->

habilitar_acoes(status_carregamento) (function)
	Esta function habilita as ações possíveis para o carregamento selecionado.



# Trocando "registro_carga" por "registro_acao" (CONCLUÍDO)
fn_abrir_dialog_registro_carga --> fn_abrir_dialog_registro_acao (OK)

Nova Carga --> Iniciar Carga  (OK)
btn_acoes_nova_carga_disabled --> btn_acoes_iniciar_carga_disabled (OK)
nova_carga --> iniciar_carga (OK)

registro_carga_dialog --> registro_acao_dialog (OK)
registro_carga_dialog_title --> registro_acao_dialog_title (OK)