# mediagenda

# Quiz Java - Prova de Conceito

## Questão 1 (Fundamentos)
A principal diferença entre um ArrayList e um array em Java é que o ArrayList tem tamanho dinâmico e métodos prontos, enquanto o array tem tamanho fixo e pode armazenar tipos primitivos diretamente, sendo mais rápido para acesso direto. Hoje em dia, eu usaria um vetor simples se eu conhecesse o tamanho da coleção e buscasse maior desempenho.

## Questão 2 (Arquitetura & Spring)
No Spring Boot, @Autowired (ou injeção via construtor) permite injetar dependências automaticamente, sem criar instâncias manualmente, funcionando com classes anotadas como @Service ou @Component. Em NestJS, @Injectable() e os providers cumprem o mesmo papel.

## Questão 3 (Leitura de Código)
O trecho tem um método processarPagamento que imprime "Pagamento exato" se o valor for igual a 100, ou "Valor diferente" caso contrário. E o potencial bug que esse trecho pode ter é que comparar double com == pode falhar por conta da imprecisão do ponto flutuante.

## Questão 4 (Tratamento de Erros):
Checked Exceptions são obrigatórias de tratar e indicam erros previstos; Unchecked Exceptions não precisam ser tratadas e indicam erros inesperados. Em uma API, eu usaria as Checked Exceptions para fornecer respostas claras ao cliente sobre erros esperados, enquanto as Unchecked Exceptions poderiam ser capturadas por um handler global para evitar que a aplicação quebre.