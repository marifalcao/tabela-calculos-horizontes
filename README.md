# Cálculos Horizontes

Ambiente local para a tabela **Cálculo dos horizontes** e o gráfico de utilização da capacidade de pagamento por grupo de operações, destinados a um sistema legado. Os dados e a classificação das operações utilizados na demonstração são fictícios; não há integração com endpoints.

## Executar localmente

Use Node.js 22 ou superior e npm.

```sh
npm ci --legacy-peer-deps
npm run dev
```

Abra o endereço local exibido no terminal. Para gerar o build, execute `npm run build`. Para visualizar o build, execute `npm run preview`.

## Compatibilidade obrigatória

- React e React DOM: **16.10.2**.
- Material-UI Core: **4.5.1**.
- Material-UI Icons: **4.4.1**.
- mui-datatables: **2.10.2**.
- Apache ECharts: **6.1.0**, utilizado no gráfico sem wrapper React.
- Utilize somente APIs, componentes e propriedades disponíveis nessas versões.
- Para estilos, utilize APIs do Material-UI 4.5.1, como `makeStyles` de `@material-ui/core/styles`.
- Não adicione React 17+, MUI 5+, `@mui/material`, DataGrid, Tailwind, styled-components ou outras bibliotecas externas de tabela além de `mui-datatables@2.10.2`.

`mui-datatables@2.10.2` declara peers `@material-ui/core@^3.2.0` e `@material-ui/icons@^3.0.1`, diferentes das versões exigidas neste projeto. A instalação utiliza `--legacy-peer-deps` para preservar as versões do ambiente legado. Essa opção ignora a validação de peers; não garante compatibilidade dessa biblioteca. Ela está instalada, mas não é importada nem utilizada pelo componente, que usa exclusivamente a Table nativa do Material-UI.

`src/App.jsx` contém apenas a demonstração. `src/main.jsx` monta a aplicação usando `ReactDOM.render`. O JSX utiliza a transformação clássica com `React.createElement`, compatível com React 16.10.2.

## Usar o componente no legado

Copie a pasta `src/components/HorizonsTable` para um projeto com suporte a TypeScript/TSX e as versões de React e Material-UI listadas acima. Nenhum provider, fonte externa ou estilo global é necessário para o componente.

```jsx
import HorizonsTable from './components/HorizonsTable';
import { mockData } from './components/HorizonsTable/mockData';

<HorizonsTable data={mockData} />
```

Substitua `mockData` pelos dados reais seguindo `HorizonsData`, definido em `types.ts`:

- `years`: anos únicos na ordem das colunas.
- `revenue`: faturamento anual, em reais.
- `costRate`: fração da receita destinada a custos (por exemplo, `0.62`).
- `contributions`: aportes anuais, em reais, somados ao lucro líquido para calcular a capacidade de pagamento.
- `operations`: operações com código único, descrição, lista de encargos (`charges`, cada um com `name` e valores anuais em `values`) e valores anuais de principal (`principal`). A seção de encargos exibe uma linha por operação com a soma anual dos seus encargos, sem detalhar comissão, seguro ou outros tipos. O total de encargos soma todas as operações.

Todos os arrays anuais devem conter um número finito por ano, na mesma ordem de `years`; informe `0` nos anos sem valor. A lista de operações pode ser vazia. Os totais, custos, rédito, lucro líquido, capacidade de pagamento e percentual de utilização são derivados em `rows.ts`. A utilização corresponde a `Total do principal ÷ Capacidade de pagamento × 100`; quando a capacidade de pagamento é zero ou negativa, o resultado exibido é 0%.

O mock assume faturamento constante de R$ 1.514.400,00 por ano e custos de 62%; os demais dados são simulados. `formatters.ts` centraliza a formatação pt-BR com duas casas decimais e vírgula como separador decimal. Valores monetários iguais a zero são exibidos como `—` para reduzir o ruído visual, enquanto os cálculos continuam usando zero. `styles.ts` reúne os estilos e as camadas sticky, incluindo classes para os estados de utilização adequada e inadequada.

A região da tabela tem rolagem horizontal e vertical, é acessível por Tab e permite navegar com as setas. O título e o rodapé ficam fora da rolagem. A altura acompanha a janela até o limite definido e as colunas ficam mais compactas em telas pequenas, preservando a estrutura tabular. As seções Encargos por operação e Principal por operação começam recolhidas, mantendo seus totalizadores visíveis. A média da utilização aparece abaixo da tabela.

Os cálculos anuais seguem esta sequência:

| Indicador | Cálculo |
| --- | --- |
| Custos | Receita × parâmetro de custos, arredondado para centavos |
| Rédito | Receitas − custos |
| Total de encargos | Soma dos encargos de todas as operações |
| Lucro líquido | Rédito − total de encargos |
| Capacidade de pagamento | Lucro líquido + aportes |
| Total do principal | Soma do principal de todas as operações |
| Utilização da capacidade | Total do principal ÷ capacidade de pagamento × 100 |

A média do período é a média aritmética simples dos percentuais anuais, incluindo zeros, calculada antes do arredondamento de apresentação.

O Vite transpila TS/TSX para execução e build; não foi adicionada dependência para checagem estática de tipos.

## Tema da demonstração

O `ThemeProvider` existe somente em `src/App.jsx` e reproduz o tema do sistema legado: primária `#A6193C`, secundária `#E65E04` e fonte `"Lato", Arial, sans-serif`. O componente não cria um tema próprio; ele consome `theme.palette` e `theme.typography`, portanto usará o tema da aplicação ao ser copiado.

A demonstração carrega Lato pelo Google Fonts em `index.html`, sem pacote adicional. Esse carregamento depende de acesso à internet; Arial/sans-serif permanece como fallback. No sistema legado, o componente utiliza a fonte já fornecida pela aplicação.

A utilização de 0% é classificada como Sem utilização e usa textSecondary. Acima de 0% até 90%, inclusive, é classificada como Adequada e usa verde semântico do Material-UI. Acima de 90%, é classificada como Inadequada e usa theme.palette.error.dark. Texto e barra seguem essas faixas, sem estado intermediário laranja. A classificação é exibida abaixo de cada percentual.

Vite é apenas a ferramenta local de desenvolvimento e build. Ao copiar os componentes, leve seu código e os arquivos de que dependem; a configuração do Vite e o ponto de montagem local não são necessários no sistema legado.

As dependências diretas usam versões exatas e o `package-lock.json` registra as dependências instaladas. O cache do npm fica na pasta local `.npm-cache`, ignorada pelo Git.

## Gráfico de utilização por grupo

`src/components/CapacityUtilizationChart` utiliza Apache ECharts 6.1.0, sem wrapper React, em um Paper com 24 px de espaço abaixo da tabela. Substitui as duas visualizações anteriores e recebe exatamente o mesmo objeto `data` da tabela. Não cria ThemeProvider nem altera suas regras financeiras.

A configuração adapta as séries mapeadas, `type: 'bar'` e `stack: 'total'` do exemplo oficial [bar-stack-normalization](https://echarts.apache.org/examples/en/editor.html?c=bar-stack-normalization). A normalização pelo total foi substituída, em `data.ts`, por soma do principal do grupo no ano / capacidade de pagamento do ano × 100. Há um único eixo percentual, com escala acima de 100% quando necessário. Os totais aparecem acima das colunas, os percentuais dentro dos segmentos quando há espaço e a média em uma referência tracejada. Não há série de linha de utilização total.

A classificação explícita em `demoGroups.ts` segue a ordem de empilhamento, da base para o topo:

| Grupo | Operações demonstrativas | Cor |
| --- | --- | --- |
| Em renegociação | 004829-7 e 004815-2 | `theme.palette.primary.main` (`#A6193C` na demonstração) |
| Fora de renegociação | 004901-3 | `theme.palette.secondary.main` (`#E65E04` na demonstração) |
| SCR | 004930-8 | `cyan[900]` do Material-UI |

As cores são compartilhadas pelas barras, legenda e detalhamento. Os rótulos internos usam branco ou preto conforme o contraste com o segmento. A referência tracejada da média tem opacidade de 40%. As cores dos grupos identificam categorias e não representam as faixas de adequação da tabela.

Cada operação deve ser classificada em exatamente um grupo. Códigos duplicados ou operações sem classificação válida geram erro; não se infere classificação pela descrição. Os anos são ordenados cronologicamente no gráfico.

A capacidade, o principal total e a utilização são obtidos de `buildRows`. A média reutiliza `getAverageUtilization`, com os percentuais originais, incluindo anos com zero. No cenário atual, os totais são 22,50%, 10,77% e 3,90% nos três primeiros anos, seguidos de sete zeros; a média é 3,72%. Alterações no objeto de dados atualizam o gráfico.

Dados ausentes permanecem indisponíveis, com lacunas e sem média completa. Para capacidade zero ou negativa, a regra já existente em `rows.ts` retorna 0%; o gráfico preserva essa regra sem efetuar divisão inválida e apresenta uma nota quando ela se aplica. Isso não deve ser confundido com a ausência de dados. Antes de alterar essa regra, confirmar seu significado no sistema legado.

O tooltip está desativado. Clique em uma barra ou use o seletor **Ano para detalhamento**, acessível pelo teclado, para abrir o painel abaixo do gráfico. O seletor também permite consultar anos com utilização zero, sem barra visível. O botão **Fechar detalhes** recolhe o painel.

O painel apresenta capacidade de pagamento e total do principal em reais, utilização total, média do período e desvio da média em pontos percentuais. Para cada grupo, exibe o principal em reais e sua contribuição percentual. Não há listagem individual de operações nem tabela complementar no gráfico. Os componentes usam Typography e os textos desenhados pelo ECharts usam a fonte e as cores do tema.

Cada segmento representa a contribuição do grupo para a utilização da capacidade de pagamento: o cálculo utiliza valores financeiros de principal, não a quantidade de operações. As colunas não são normalizadas para 100%.

### Usar o gráfico no legado

Copie `src/components/CapacityUtilizationChart` junto com `src/components/HorizonsTable`: o gráfico depende dos tipos, cálculos e helper de média da tabela. O projeto de destino também precisa de `echarts@6.1.0` e suporte a TypeScript/TSX.

```jsx
import CapacityUtilizationChart from './components/CapacityUtilizationChart';
import { mockData } from './components/HorizonsTable/mockData';
import { demoGroups } from './components/CapacityUtilizationChart/demoGroups';

<CapacityUtilizationChart data={mockData} operationGroups={demoGroups} />
```

Substitua os dados demonstrativos e forneça `operationGroups` como um mapa entre o código da operação e um dos valores `renegotiation`, `outsideRenegotiation` ou `scr`. Confirme na integração que as categorias não geram dupla contagem, especialmente para operações SCR. Os dois componentes devem receber os mesmos dados financeiros e consumir o tema existente da aplicação.

### Organização dos arquivos

- `src/App.jsx`: tema e composição da demonstração.
- `src/components/HorizonsTable/rows.ts`: cálculos e linhas da tabela.
- `src/components/HorizonsTable/capacity.ts`: média e classificação da utilização.
- `src/components/HorizonsTable/mockData.ts`: dados financeiros demonstrativos.
- `src/components/CapacityUtilizationChart/index.tsx`: ciclo de vida do ECharts, legenda, seleção de ano e painel de detalhes.
- `src/components/CapacityUtilizationChart/data.ts`: validação, agrupamento financeiro e formatação dos dados do gráfico.
- `src/components/CapacityUtilizationChart/options.tsx`: séries empilhadas, cores, rótulos, eixos e referência da média.
- `src/components/CapacityUtilizationChart/demoGroups.ts`: classificação demonstrativa das operações.
