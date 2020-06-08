## Enunciado

O aluno deverá criar um projeto Node.js para realizar a criação de alguns métodos e processamento de arquivos JSON.

## Atividades

O aluno deverá baixar os arquivos Cidades.json e Estados.json do link a seguir (https://github.com/felipefdl/cidades-estados-brasil-json (Links para um site externo.)) e colocá-los dentro do seu projeto. O arquivo Estados.json possui uma listagem com todos os estados do Brasil, cada um representado por um ID. No arquivo Cidades.json estão listadas todas as cidades do Brasil, com seu respectivo estado representando pelo ID fazendo referência ao arquivo Estados.json.

O aluno deverá desempenhar as seguintes atividades:

- [x] Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
- [x] Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
- [x] Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente.
- [x] Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
- [x] Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.
- [x] Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro.
- [x] Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.
- [x] Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro.
