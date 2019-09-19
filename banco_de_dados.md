---
layout: default
---

# Banco de dados

Nosso banco de dados em MongoDB consiste em quatro _schemas_:
- User: usado para armazenar os dados dos usuários, como nome, sobrenome, email, senha, e todas as informações que ele disponibiliza;
- QRCode: usado para armazenar as permissões que um usuário libera, juntamente com uma data de criação e data de validade (caso o usuário queira);
- LogEdit: usado para armazenar os campos que um usuário editou e a data desta edição;
- AccessClient: usado para armazenar quando um cliente acessou os dados de um usuário, para acomparação da fidelidade das informações.

- Voltar para [home](..)