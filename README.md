# Mercado Livre - Entrega Compartilhada

Este projeto foi criado como parte da competição [Mega Hack](https://www.megahack.com.br/) realizada em 2020.

Para ver o projeto em produção acesse o link: https://entregacompartilhada.netlify.app/

## Configuração

Para rodar o projeto é necessária a instalação do **Node 10.16.0** ou superior.

### Instalação de dependências

`npm instal` ou `yarn`

### Ambiente

As váriaveis de ambiente devem ser definidas através de um arquivo `.env.local`.

Também é possível criar configurações específicas para cada ambiente: `.env.development.local`, 
`.env.test.local` ou `.env.production.local`.

Para que o projeto funcione corretamente é necessario definir a variável `REACT_APP_GOOGLE_MAPS_API_KEY` com uma chave de API do Google Cloud Platform.

A chave deve conter os seguintes recursos habilitados: Maps, Places e Directions.

## Scripts
  - **start** - Inicia o projeto em modo de desenvolvimento.
  - **build** - Gera uma build de produção.
  - **test** - Executa os testes.
  - **eject** - Permite "ejetar" o projeto do create-react-app para realizar configurações mais avançada (para mais informações, [clique aqui](https://github.com/facebook/create-react-app)).
  - **lint** - Realiza a verificação do ESLint para garantir que o código esteja padronizado.

## Principais Tecnologias Utilizadas
  - [React](https://reactjs.org/)
  - [Create React App](https://create-react-app.dev/)
  - [ESLint](https://eslint.org/)
  - [Material UI](https://material-ui.com/)
  - [Google Map React](https://github.com/google-map-react/google-map-react)

