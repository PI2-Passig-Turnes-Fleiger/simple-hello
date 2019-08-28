| Termos de abertura do projeto |
|-------------------------------|
|         Simple Hello          |
 
 1. **Objetivos do projeto**
 
	Simplificar, facilitar e agilizar o cadastro de clientes ou pessoas em sistemas de estabelecimentos comerciais.
  
 2. **Situação atual e justificativa**
 
	Atualmente, na primeira visita a alguns estabelecimentos, demanda-se tempo do cliente e da recepção para a realização do cadastro de dados pessoais, como documentos, contatos, etc, o que pode gerar filas, atrasos e impaciência inclusive para terceiros.
	
 3. **Descrição geral**
 
	A visão geral do projeto é o desenvolvimento de um sistema simples de cadastro para pessoas,
	em que a pessoa física cadastra seus dados e cria um código QR que demarca quais dados são dados permitidos
	por ela. A pessoa jurídica ou estabelecimento, ao ler o código QR, terá uma referência à
	pessoa física e os dados permitidos quardados localmente. Ao clicar nesta referência, faz-se
	uma busca a estes dados em nosso servidor. Nesta requisição, a pessoa jurídica terá os dados que
	foram alterados recentemente (desde a última consulta, caso haja) marcados em vermelho na tela,
	para agilizar o processo de cadastro e/ou atualização de dados. Além disso, durante a requisição
	pelos dados, o servidor checa se o usuário ainda está permitindo a disponibilidade dos dados e,
	caso não esteja, não entrega as informações e envia uma flag ao sistema para remover a referência salva.

 4. **Equipe do projeto**
 
	- Ederson Torresini - Product Owner;
	- Eduarda Passig e Silva - Grupo de Desenvolvimento;
	- Gabriel Farias Turnes - Grupo de Desenvolvimento;
	- Guilherme Fleiger Felipe - Grupo de Desenvolvimento e Scrum Master.

5. **Partes interessadas do projeto**

	| Instituição |   Participantes   |          Função          |
	|-------------|-------------------|--------------------------|
	|   IFSC-SJ   | Equipe do Projeto | Implementação do Projeto |
	|   IFSC-SJ   | Ederson Torresini |         Cliente          |

6. **Restrições**

	- Alocação de tempo exclusivo da equipe (sem ajuda externa);
	- Dificuldade no uso de ferramentas (IDEs, por exemplo) que não estão disponíveis no campus do IFSC.
	
7. **Premissas**

	- Estudar desenvolvimento web para a implementação do produto final;
	- Reunião diária de, no mínimo, 10 minutos com o grupo local ou remotamente.

8. **Riscos**

	- Grau de complexidade inesperado do projeto de banco de dados;
	- Estabilidade questionável do serviço.

9. **Orçamento do projeto**

	- Máquina virtual rodando em nuvem, com custo previsto entre R$30,00 e R$50,00 por mês
