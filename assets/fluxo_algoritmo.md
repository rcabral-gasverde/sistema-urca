# Em Andamento

- para cada ação, atualizar as collections:

  - Carregamentos  
  
  - Mesas  
    - iniciar_carga
	- fazer_corte
	- finalizar_carga
  
  - Vagas  
    - entrada de carreta na base
	- realocar_carreta
	- sair_para_cliente

  - PlacasCarretas
    - entrada de carreta na base
	- iniciar_carga: status "carregando"
	- finalizar_carga: status "parcialmente_carregada"
	- finalizar_carregamento: status "totalmente_carregada"
	- sair_para_cliente: status "saiu_para_cliente"

# A fazer

## Correções a fazer  
### Módulo Declarações  
- Quando está para virar o mês, o meu programa gera um número errado para a declaração. Isto ocorre certamente por causa do fuso-horário. As declarações "GV-TERN-001/03-2024" e "UG-DALI-001/03-2024" não deveriam ser numeradas como "001", e sim com o maior número para aquele mês, pois são as últimas de seus respectivos clientes naquele mês.

### Módulo Carregamentos
- nome "carga" x "carregamento" no código e na base de dados: no código, me parece que há lugarem em que "status_carga" deveria ser substituído por "status_carregamento".

- quando um carregamento estiver como "totalmente_carregada" permitir que se inicie uma nova carga (atualmente não é permitido aperta no botão "Iniciar Carga" se o status do carregamento estiver como "totalmente_carregada").

## Tarefas  



- Entrada de Carreta: Na collection de carretas (atualmente chamada "PlacasCarretas") eu deveria adicionar um campo mostrando o local daquela carreta. Se ela estiver fora da base, permitir que ela seja escolhida para dar entrada na base. (A IMPLEMENTAR)

- implementar interligação entre vagas e mesas (na hora que escolher a vaga, habilitar opções de mesas etc). Dica: já tem pronto no formulário de entrada de carreta na base.

- no módulo de Declarações, impedir que o usuário registre declarações em datas futuras.

- collection Clientes: adicinoar coordenadas geográficas (que poderão ser usadas no mapa interativo).

- collection Clientes: adicionar os clientes NEOgás

# Concluído

- ação sair_para_cliente

- Adaptar todo o código para que um carregamento esteja com um número no campo "mesa" se e somente se o status for "carregando"

- Entrada de Carreta: impossibilitar escolha de carreta que já tenha entrado na base

- implementar Mesas collection: conterá cinco documents, cada um sendo uma mesa. Cada document terá as seguintes propriedades:
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

- implementar Vagas collection: conterá 13 documents, cada um correspondente a uma vaga
	- num: número da vaga (de 1 a 13).
	- status: status da vaga que será "ocupada" ou "disponivel"
	- placa_carreta: placa da carreta que está estacionada na vaga.
	- mesas_associadas: objeto contendo as mesas associadas à vaga. A maioria das vagas possuirá uma array de único elemento, com exceção das vagas 6 e 11: 
		vaga 6: mesas_associadas [2, 3], 
		vaga 11: mesas_associadas: [4, 5]

- Colocar placas de carretas em ordem alfabética.

- Trocando "registro_carga" por "registro_acao"
	fn_abrir_dialog_registro_carga --> fn_abrir_dialog_registro_acao

	Nova Carga --> Iniciar Carga
	btn_acoes_nova_carga_disabled --> btn_acoes_iniciar_carga_disabled
	nova_carga --> iniciar_carga

	registro_carga_dialog --> registro_acao_dialog
	registro_carga_dialog_title --> registro_acao_dialog_title

- implementar ação Realocar Carreta
	- a realocação de carreta somente será possível para os seguintes valores da propriedade "status" de um carregamento document:  
			- entrou_na_base  
			- parcialmente_carregada   
			- totalmente_carregada  
		e será proibida para os status de um carregamento document:  
			- carregando  
			- saiu_para_cliente  
	
	- a realocação de carreta pode ocorrer para:
		- uma outra vaga
			- se o "status" desta outra for "disponivel"
		- estoque
			- se a carreta/carregamento tiver o status "parcialmente_carregada" ou "totalmente_carregada". Caso contrário, desabilitar a opção "estoque" no menu
		- fora da vaga
	
	- implementar a possibilidade de realocação para:
		- fora da vaga
		- estoque

# Dados do programa

## status de carreta 
Propriedade "status" de um document da collection PlacasCarretas:
  - entrou_na_base
  - carregando
  - parcialmente_carregada
  - totalmente_carregada
  - saiu_para_cliente

## status de carregamentos 
Propriedade "status" de um document da collection Carregamentos:
  - entrou_na_base  
  - carregando  
  - parcialmente_carregada  
  - totalmente_carregada  
  - saiu_para_cliente  

## status de mesas  
  - carregando  
  - ociosa

## estágios de cargas
  - inicial  
  - parcial  
  - final  

## Collection Mesas
### Descrição
Esta collection Mesas
### Propriedades/Campos:
	num
	status: "ociosa" ou "carregando"
	tipo_gas: "veicular" ou "industrial"
	vazao
	encerrante_atual: número inteiro
	pressao_atual: número inteiro
	data_hora_registro_enc_pr: 1900-01-01T00:00:00.000+00:00
	vaga_carregando: 
	placa_carreta:

## Collection Carregamentos

## Collection PlacasCarretas

## Collection Vagas

## Ações
- realocar_carreta
- iniciar_carga
- fazer_corte
- finalizar_carga
- finalizar_carregamento
- sair_para_cliente


# Fluxo Algoritmo (intenção inicial deste documento)

- ação nova ENTRADA DE CARRETA na base:
	- collection Carregamentos: registrar um novo document
		- NÃO REGISTRAR MESA! Seria melhor apenas registrar a vaga de entrada (se for o caso).
	
	- collection Vagas: no document correspondente, registrar os seguintes valores para as seguintes propriedades:
		num: o número da vaga escolhida
		status: "ocupada"
		placa_carreta: a placa da carreta que tiver entrado na base
	
	- collection PlacasCarretas: no document correspondente, registrar
		status: "entrou_na_base"

- ação REALOCAR CARRETA:
	- collection Carregamentos
		1. para o carregamento selecionado, alterar as propriedades "vaga" e "mesa"

	- collection Vagas, 
		1. remover a placa do carregamento selecionado da propriedade "placa_carreta" do document referente à vaga de origem
		2. adicionar a placa do carregamento selecionado à propriedade "placa_carreta" do document referente à vaga de destino
	

- ação INICIAR CARGA:
	- se status_carregamento == "entrou_na_base"
		- fornecer opção de escolha da Mesa caso a vaga na qual a carreta se encontra seja 6 ou 11. 
			- vaga 6: Mesas  3 (padrão), 2 (opcional) 
			- vaga 11: Mesas 4 (padrão) e 5 (opcional)
		- mostrar no campo de encerrante o último encerrante para aquela mesa.
		- ao registrar a carga:
			- registrar na collection **Carregamentos**:  
				- registrar aquela carga no document correspondente (já feito)
				- status: "carregando" no documento correspondente
			- registrar na collection **Mesas**:  
				- status: "carregando";
				- encerrante_atual: o que estiver no campo de encerrante (que provavelmente será o mesmo valor de encerrante da última carga naquela mesa);
				- pressao_atual: o que estiver no campo de pressão;
				- vaga_carregando: vaga daquele carregamento ou o que estiver no campo correspondente;
				- placa_carreta: placa da carreta daquele carregamento ou o que estiver no campo correspondente;

- ação FAZER CORTE:


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


