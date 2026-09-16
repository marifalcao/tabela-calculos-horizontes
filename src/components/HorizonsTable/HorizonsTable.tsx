import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonBase from '@material-ui/core/ButtonBase';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { HorizonsTableProps } from './types';
import { buildRows } from './rows';
import { getAverageUtilization, getCapacityLabel, getCapacityState } from './capacity';
import { formatCurrency, formatPercentage } from './formatters';
import useStyles from './styles';

export default function HorizonsTable({ data }: HorizonsTableProps) {
  const classes = useStyles();
  const rows = buildRows(data);
  const capacityRow = rows.find(row => row.id === 'capacity');
  const averageUtilization = getAverageUtilization(capacityRow ? capacityRow.values : []);
  const [expandedSections, setExpandedSections] = React.useState({
    charges: false,
    principal: false,
  });

  const toggleSection = (section: 'charges' | 'principal') => {
    setExpandedSections(current => ({
      ...current,
      [section]: !current[section],
    }));
  };

  return (
    <Paper className={classes.card} elevation={1}>
      <div className={classes.intro}>
        <Typography component="h2" variant="subtitle1" color="textPrimary" className={classes.title}>
          Cálculo dos horizontes
        </Typography>
        <Typography component="p" variant="body2" color="textSecondary" className={classes.subtitle}>
          Projeção anual de receitas, custos, encargos, aportes e principal das operações,
          com o percentual de utilização da capacidade de pagamento.
        </Typography>

      </div>

      <div className={classes.scroll} tabIndex={0} role="region"
        aria-label="Projeção anual dos horizontes. Use as setas ou role horizontalmente para consultar todos os anos.">
        <Table className={classes.table} aria-label="Projeção anual do cálculo dos horizontes"
          style={{ minWidth: `calc(var(--item-width) + ${data.years.length} * var(--year-width))` }}>
          <colgroup>
            <col style={{ width: 'var(--item-width)' }} />
            {data.years.map(year => <col key={year} style={{ width: 'var(--year-width)' }} />)}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell scope="col" className={[classes.cell, classes.firstColumn, classes.header, classes.corner].join(' ')}>
                <Typography component="span" variant="caption" color="textPrimary" className={classes.headerText}>
                  Item do fluxo anual
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
            {rows.map(row => {
              const isChargesContent = row.kind === 'charge';
              const isPrincipalContent = row.kind === 'operation';
              if ((isChargesContent && !expandedSections.charges) ||
                (isPrincipalContent && !expandedSections.principal)) {
                return null;
              }

              const section = row.id === 'charges-section' ? 'charges' :
                row.id === 'principal-section' ? 'principal' : null;
              const isExpanded = section ? expandedSections[section] : false;

              return (
              <TableRow key={row.id} className={[classes.row, classes[row.kind], row.id === 'income' ? classes.income : ''].join(' ')}>
                <TableCell component="th" scope="row"
                  className={[classes.cell, classes.firstColumn, section ? classes.sectionCell : ''].join(' ')}>
                  {section ? (
                    <ButtonBase className={classes.sectionControl}
                      onClick={() => toggleSection(section)} aria-expanded={isExpanded}
                      aria-label={(isExpanded ? 'Recolher ' : 'Expandir ') + row.label}>
                      {isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                      <Typography component="div" variant="body2" color="textPrimary" className={classes.label}>
                        {row.label}
                      </Typography>
                      <Typography component="span" variant="caption" color="textSecondary" className={classes.sectionCount}>
                        ({data.operations.length})
                      </Typography>
                    </ButtonBase>
                  ) : (
                    <Typography component="div" variant="body2" color="textPrimary" className={classes.label}>
                      {row.id === 'revenue' || row.id === 'costs' ? (
                        <Typography component="span" variant="body2" color="textSecondary"
                          className={[classes.flowMarker, row.id === 'revenue' ? classes.revenueMarker : ''].join(' ')}
                          aria-hidden="true">
                          {row.id === 'revenue' ? '(+)' : '(−)'}
                        </Typography>
                      ) : null}
                      {row.label}
                    </Typography>
                  )}
                  {row.description ? (
                    <Typography component="div" variant="caption" color="textSecondary" className={classes.description}>
                      {row.description}
                    </Typography>
                  ) : null}
                </TableCell>
                {row.kind === 'section' ? (
                  <TableCell colSpan={data.years.length} className={classes.cell} />
                ) : row.values.map((value, index) => (
                  <TableCell key={data.years[index]} align="right"
                    className={[classes.cell, classes.money, row.kind === 'capacity' ? classes[getCapacityState(value)] : ''].join(' ')}>
                    {row.kind === 'capacity' ? (() => {
                      const capacityLabel = getCapacityLabel(value);
                      return (
                        <React.Fragment>
                          <div className={classes.capacitySummary}>
                            <Typography component="span" variant="body2" color={value === 0 ? 'textSecondary' : 'textPrimary'}
                              className={classes.percentage}>
                              {formatPercentage(value)}
                            </Typography>
                            <Typography component="span" variant="caption" color="textSecondary" className={classes.capacityStatus}>
                              {capacityLabel}
                            </Typography>
                          </div>
                          <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, value))}
                            classes={{ root: classes.progress, bar: classes.progressBar }}
                            aria-label={'Utilização da capacidade no ano ' + data.years[index]}
                            aria-valuetext={formatPercentage(value) + ' — ' + capacityLabel} />
                        </React.Fragment>
                      );
                    })() : (
                      <Typography component="span" variant="body2" color="textPrimary" className={classes.value}>
                        {formatCurrency(value)}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className={classes.footer}>
        <div className={classes.averageSummary}>
          <div>
            <Typography component="div" variant="body2" color="textPrimary" className={classes.label}>
              Média da utilização da capacidade de pagamento
            </Typography>
            <Typography component="div" variant="caption" color="textSecondary">
              Média dos percentuais dos {data.years.length} anos, incluindo anos com 0%.
            </Typography>
          </div>
          <div className={averageUtilization === null ? undefined : classes[getCapacityState(averageUtilization)]}>
            <Typography component="div" variant="subtitle1"
              color={averageUtilization === null || averageUtilization === 0 ? 'textSecondary' : 'textPrimary'}
              className={classes.percentage}>
              {averageUtilization === null ? '—' : formatPercentage(averageUtilization)}
            </Typography>
            <Typography component="div" variant="caption" color="textSecondary">
              {averageUtilization === null ? 'Sem dados' : getCapacityLabel(averageUtilization)}
            </Typography>
          </div>
        </div>
        <Typography component="p" variant="caption" color="textSecondary" className={classes.hint}>
          Projeção de {data.years.length} anos · role horizontalmente para ver todos
        </Typography>
      </div>
    </Paper>
  );
}
