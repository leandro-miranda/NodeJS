# Orientações

<details>
  <summary><strong>:whale: Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  > Execute a aplicação com `npm start` ou `npm run dev`


  :eyes: **De olho na dica:** 

  A extensão `Remote - Containers` do VS Code (que estará na seção de extensões recomendadas do programa) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

<img src="images/remote-container.png" width="800px" >

  ---
  
  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`

  :eyes: **De olho nas dicas:** 
  1. Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  2. O avaliador espera que a versão do `node` utilizada seja a 16.

</details>

  ### Executando todos os testes

  Para poder executar os testes, inicie sua aplicação com `npm run dev`, em seguida, basta executar o comando `npm test` e **todos** os seus testes serão executados.

  ### Executando um teste específico

  Para executar um teste expecífico, inicie sua aplicação com `npm run dev`, em seguida, basta executar o comando `npm test nome-do-teste`.

  > Colocamos o número do requisito como pré-fixo para facilitar, veja abaixo. 

  Ex: Para executar o teste referente ao **01-getAllTalkers**, basta digitar `npm test 01`.

  :warning: **Importante:** os comandos de testes podem ser executados tanto no terminal do seu computador quanto do **_Docker_**.
</details>

# Requisitos

<details>
  <summary><strong>⚠️ Observações importantes!</strong></summary><br />

  1. Com exceção do requisito 3, todos os outros requisitos deverão ser feitos utilizando o módulo `fs`.

  2. O arquivo `src/talker.json` será utilizado como base para fazer as requisições da API. As operações de leitura e escrita dos requisitos devem ser feitas nesse arquivo usando os métodos da biblioteca `fs`.

  3. Há um arquivo `src/index.js` no repositório. Não remova, nele, o seguinte trecho de código:
  

  ```javascript
      app.get('/', (_request, response) => {
        response.status(HTTP_OK_STATUS).send();
      });
  ```

  Isso está configurado para o avaliador funcionar. 😅

  4. Você pode usar o comando `npm run restore` para restaurar o arquivo `src/talker.json` para seu estado inicial.

  5. Ao se deparar com o erro de que a porta já está em uso: `EADDRINUSE: address already in use 0.0.0.0:3000`, execute em seu terminal `killall -9 node` isso finalizá todas as execuções do node.

</details>

---

## 1 - Crie o endpoint GET `/talker`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e um array com todas as pessoas palestrantes cadastradas. Exemplo: </summary><br />

```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```
  
</details>

<details>
  <summary>Caso não exista nenhuma pessoa palestrante cadastrada a requisição deve retornar o <code>status 200</code> e um array vazio. Exemplo:</summary><br />

  ```json
  []
  ```
</details>


## 2 - Crie o endpoint GET `/talker/:id`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e uma pessoa palestrante com base no <code>id</code> da rota. Por exemplo, ao fazer uma requisição <code>/talker/1</code>, a resposta deve ser:</summary><br />

  ```json
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
  ```
</details>


<details>
  <summary>Caso não seja encontrada uma pessoa palestrante com base no <code>id</code> da rota, a requisição deve retornar o <code>status 404</code> com o seguinte corpo:</summary><br />
  
  ```json
  {
    "message": "Pessoa palestrante não encontrada"
  }
  ```
</details>

## 3 - Crie o endpoint POST `/login`

O endpoint deverá receber no corpo da requisição os campos `email` e `password` e retornar um token aleatório de 16 caracteres. Este token será utilizado pelas requisições dos próximos requisitos do projeto.

<details>
  <summary>O <strong>corpo da requisição</strong> deverá ter seguinte formato:</summary><br />

  ```json
  {
    "email": "email@email.com",
    "password": "123456"
  }
  ```
</details>
  
<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />
  
  - O endpoint deverá retornar um código de `status 200` com o token gerado e o seguinte corpo:

  ```json
  {
    "token": "7mqaVRXJSp886CGr"
  }
  ```

  - O endpoint deve retornar um token aleatório a cada vez que for acessado.
  
</details>


## 4 - Adicione as validações para o endpoint `/login`

Os campos recebidos pela requisição devem ser validados e, caso os valores sejam inválidos, o endpoint deve retornar o código de `status 400` com a respectiva mensagem de erro ao invés do token.

<details>
  <summary>As regras de validação são:</summary><br />

  - o campo `email` é obrigatório;
  - o campo `email` deve ter um email válido;
  - o campo `password` é obrigatório;
  - o campo `password` deve ter pelo menos 6 caracteres.

</details>
  
<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - Caso o campo `email` não seja passado ou esteja vazio, retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O campo \"email\" é obrigatório"
  }
  ```

  - Caso o email passado não seja válido, retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O \"email\" deve ter o formato \"email@email.com\""
  }
  ```

  - Caso o campo `password` não seja passado ou esteja vazio retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O campo \"password\" é obrigatório"
  }
  ```

  - Caso a senha não tenha pelo menos 6 caracteres retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O \"password\" deve ter pelo menos 6 caracteres"
  }
  ```

</details>


## 5 - Crie o endpoint POST `/talker`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

- O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

  - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"name\" é obrigatório"
    }
    ```

  - Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"name\" deve ter pelo menos 3 caracteres"
    }
    ```

- O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"age\" é obrigatório"
    }
    ```

  - Caso a pessoa palestrante não tenha pelo menos 18 anos retorne `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "A pessoa palestrante deve ser maior de idade"
    }
    ```

  - O campo `talk` deverá ser um objeto com as chaves `watchedAt` e `rate`:

  - O campo `talk` é obrigatório.

      - Caso o campo não seja informado retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"talk\" é obrigatório"
        }
        ```
      
  - A chave `watchedAt` é obrigatória.  

    - Caso a chave não seja informada ou esteja vazia retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" é obrigatório"
      }
      ```

  - A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.

    - Caso a data não respeite o formato `dd/mm/aaaa` retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
      }
      ```

  - O campo `rate` é obrigatório.  

    - Caso o campo não seja informado ou esteja vazio retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" é obrigatório"
      }
      ```

  - A chave `rate` deve ser um inteiro de 1 à 5.

    - Caso a nota não seja um inteiro de 1 à 5 retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
      }
      ```  
  
- Caso esteja tudo certo, retorne o `status 201`  e a pessoa cadastrada.
  
- O endpoint deve retornar o `status 201` e a pessoa palestrante que foi cadastrada, da seguinte forma:

  ```json
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```

</details>


## 6 - Crie o endpoint PUT `/talker/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.

  - O corpo da requisição deverá ter o seguinte formato:

    ```json
    {
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

  - A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

    - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token não encontrado"
      }
      ```

    - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token inválido"
      }
      ```

  - O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.

    - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"name\" é obrigatório"
      }
      ```

    - Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O \"name\" ter pelo menos 3 caracteres"
      }
      ```

  - O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.

    - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"age\" é obrigatório"
      }
      ```

    - Caso a pessoa palestrante não tenha pelo menos 18 anos retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "A pessoa palestrante deve ser maior de idade"
      }
      ```

  - O campo `talk` deverá ser um objeto com as chaves `watchedAt` e `rate`:

    - O campo `talk` é obrigatório.

        - Caso o campo não seja informado retorne `status 400`, com o seguinte corpo:

          ```json
          {
            "message": "O campo \"talk\" é obrigatório"
          }
          ```
        
    - A chave `watchedAt` é obrigatória.  

      - Caso a chave não seja informada ou esteja vazia retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"watchedAt\" é obrigatório"
        }
        ```

    - A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.

      - Caso a data não respeite o formato `dd/mm/aaaa` retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
        }
        ```

    - O campo `rate` é obrigatório.  

      - Caso o campo não seja informado ou esteja vazio retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"rate\" é obrigatório"
        }
        ```

    - A chave `rate` deve ser um inteiro de 1 à 5.

      - Caso a nota não seja um inteiro de 1 à 5 retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
        }
        ```
        
  - Caso esteja tudo certo, retorne o `status 200` e a pessoa editada.
  - O endpoint deve retornar o `status 200` e a pessoa palestrante que foi editada, da seguinte forma:

    ```json
    {
      "id": 1,
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 4
      }
    }
    ```

</details>


## 7 - Crie o endpoint DELETE `/talker/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

    - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token não encontrado"
      }
      ```

    - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token inválido"
      }
      ```

  - O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o `status 204`, sem conteúdo na resposta.

</details>
  
## 8 - Crie o endpoint GET `/talker/search?q=searchTerm`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o `status 200`, com o seguinte corpo:

    ```
    /search?q=Da
    ```

    ```json
    [
      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5,
        },
      }
    ]
    ```

  - A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

    - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token não encontrado"
      }
      ```

    - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token inválido"
      }
      ```

  - Caso `searchTerm` não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, assim como no endpoint GET `/talker`, com um `status 200`.

  - Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o `status 200` e um array vazio.

  **Dica** é importante ter atenção se essa rota não entra em conflito com as outras, já que a ordem das rotas faz diferença na interpretação da aplicação

</details>
