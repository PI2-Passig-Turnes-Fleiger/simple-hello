---
layout: default
---

# Descrição geral
 
A visão geral do projeto é o desenvolvimento de um sistema simples de cadastro para pessoas, em que a pessoa física cadastra seus dados e cria um código QR que demarca quais dados são dados permitidos por ela. A pessoa jurídica ou estabelecimento, ao ler o código QR, terá uma referência à pessoa física e os dados permitidos quardados localmente. Ao clicar nesta referência, faz-se uma busca a estes dados em nosso servidor. Nesta requisição, a pessoa jurídica terá os dados que foram alterados recentemente (desde a última consulta, caso haja) marcados em vermelho na tela, para agilizar o processo de cadastro e/ou atualização de dados. Além disso, durante a requisição pelos dados, o servidor checa se o usuário ainda está permitindo a disponibilidade dos dados e, caso não esteja, não entrega as informações e envia uma flag ao sistema para remover a referência salva.