import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import LinearProgress from '@material-ui/core/LinearProgress';
import { HorizonsTableProps } from './types';
import { buildRows } from './rows';
import { formatCurrency, formatPercentage, formatCostRate } from './formatters';
import useStyles, { ITEM_WIDTH, YEAR_WIDTH } from './styles';

export default function HorizonsTable({ data }: HorizonsTableProps) {
  const classes = useStyles();
  const rows = buildRows(data);

  return (
    <Paper className={classes.card} elevation={1}>
      <div className={classes.intro}>
        <Typography component="h2" variant="subtitle1" color="textPrimary" className={classes.title}>
          Cálculo dos horizontes
        </Typography>
        <Typography component="p" variant="body2" color="textSecondary" className={classes.subtitle}>
          Projeção do fluxo anual: receitas, custos, encargos e principal das operações,
          culminando no percentual de utilização da capacidade de pagamento.
        </Typography>
      </div>

      <div className={classes.scroll} tabIndex={0} role="region"
        aria-label="Projeção anual dos horizontes. Use as setas para rolar a tabela.">
        <Table className={classes.table} aria-label="Cálculo dos horizontes: fluxo anual"
          style={{ minWidth: ITEM_WIDTH + data.years.length * YEAR_WIDTH }}>
          <colgroup>
            <col style={{ width: ITEM_WIDTH }} />
            {data.years.map(year => <col key={year} style={{ width: YEAR_WIDTH }} />)}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell scope="col" className={[classes.cell, classes.firstColumn, classes.header, classes.corner].join(' ')}>
                <Typography component="span" variant="caption" color="textPrimary" className={classes.headerText}>
                  Item do fluxo (anual)
                </Typography>
              </TableCell>
              {data.years.map(year => (
                <TableCell key={year} scope="col" align="right" className={[classes.cell, classes.header].join(' ')}>
                  <Typography component="span" variant="caption" color="textPrimary" className={classes.headerText}>
                    Ano {year}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} className={classes[row.kind]}>
                <TableCell component="th" scope="row" className={[classes.cell, classes.firstColumn].join(' ')}>
                  <Typography component="div" variant="body2"
                    color="textPrimary" className={classes.label}>
                    {row.label}
                  </Typography>
                  {row.description ? (
                    <Typography component="div" variant="caption" color="textSecondary" className={classes.description}>
                      {row.description}
                    </Typography>
                  ) : null}
                </TableCell>
                {row.kind === 'section' ? (
                  <TableCell colSpan={data.years.length} className={classes.cell} />
                ) : row.values.map((value, index) => (
                  <TableCell key={data.years[index]} align="right" className={[classes.cell, classes.money].join(' ')}>
                    {row.kind === 'capacity' ? (
                      <React.Fragment>
                        <Typography component="div" variant="body2" color={value > 0 ? 'textPrimary' : 'textSecondary'}
                          className={[classes.percentage, value > 0 ? classes.positive : ''].join(' ')}>
                          {formatPercentage(value)}
                        </Typography>
                        <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, value))}
                          classes={{ root: classes.progress, bar: classes.progressBar }}
                          aria-label={'Utilização da capacidade no ano ' + data.years[index]}
                          aria-valuetext={formatPercentage(value)} />
                      </React.Fragment>
                    ) : (
                      <Typography component="span" variant="body2" color="textPrimary" className={classes.value}>
                        {formatCurrency(value)}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className={classes.footer}>
        <Typography component="p" variant="caption" color="textSecondary" className={classes.footnote}>
          Custos calculados pelo parâmetro de porte e atividade ({formatCostRate(data.costRate)}) sobre a receita.
          {' '}Encargos e principal amortizados por operação ao longo do prazo considerado.
          {' '}Utilização acima de 35% sinaliza atenção.
        </Typography>
        <Typography component="p" variant="caption" color="textSecondary" className={classes.hint}>
          Projeção de {data.years.length} anos → role para ver todos
        </Typography>
      </div>
    </Paper>
  );
}
