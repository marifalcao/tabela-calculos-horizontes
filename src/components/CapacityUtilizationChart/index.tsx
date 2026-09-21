import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { HorizonsData } from "../HorizonsTable/types";
import {
  GROUPS,
  OperationGroups,
  prepareChartData,
  moneyText,
  percentageText,
  differenceText,
} from "./data";
import { createChartOptions, getGroupColors } from "./options";

echarts.use([
  BarChart,
  GridComponent,
  MarkLineComponent,
  MarkPointComponent,
  SVGRenderer,
]);
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: 2,
    fontFamily: theme.typography.fontFamily,
    minWidth: 0,
  },
  title: { fontWeight: 700 },
  note: { marginTop: theme.spacing(1) },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  legendItem: { display: "flex", alignItems: "center", gap: theme.spacing(1) },
  swatch: { width: 16, height: 12, display: "inline-block", flexShrink: 0 },
  mean: {
    width: 24,
    borderTop: "2px dashed " + theme.palette.text.primary,
    opacity: 0.4,
  },
  scroll: {
    overflowX: "auto",
    "&:focus": {
      outline: "2px solid " + theme.palette.primary.main,
      outlineOffset: 2,
    },
  },
  chart: { width: "100%", minWidth: 1000, height: 350 },
  details: { marginTop: theme.spacing(2) },
  yearSelect: { minWidth: 180, marginTop: theme.spacing(2) },
  panel: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    border: "1px solid " + theme.palette.divider,
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  panelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  group: {
    borderTop: "1px solid " + theme.palette.divider,
    paddingTop: theme.spacing(2),
  },
  detailRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontVariantNumeric: "tabular-nums",
  },
  summary: {
    cursor: "pointer",
    padding: theme.spacing(1, 0),
    "&:focus": { outline: "2px solid " + theme.palette.primary.main },
  },
  table: {
    minWidth: 1450,
    "& td, & th": { borderBottom: "1px solid " + theme.palette.divider },
    "& td": { fontVariantNumeric: "tabular-nums" },
  },
  "@media (max-width: 700px)": { root: { padding: theme.spacing(2) } },
}));

type Props = { data: HorizonsData; operationGroups: OperationGroups };
export default function CapacityUtilizationChart({
  data,
  operationGroups,
}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const groupColors = getGroupColors(theme);
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const result = useMemo(() => {
    try {
      return { data: prepareChartData(data, operationGroups), error: null };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível preparar os dados.",
      };
    }
  }, [data, operationGroups]);
  const chartData = result.data;
  const selected =
    chartData && chartData.years.find((year) => year.year === selectedYear);
  useEffect(() => {
    if (!chartRef.current || !chartData || !chartData.years.length) return;
    const chart = echarts.init(chartRef.current, undefined, {
      renderer: "svg",
    });
    chart.setOption(createChartOptions(chartData, theme));
    const selectBar = (event: {
      componentType: string;
      seriesType?: string;
      dataIndex: number;
    }) => {
      if (event.componentType === "series" && event.seriesType === "bar") {
        const year = chartData.years[event.dataIndex];
        if (year) setSelectedYear(year.year);
      }
    };
    chart.on("click", selectBar);
    const resize = () => chart.resize();
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (observer) observer.observe(chartRef.current);
    window.addEventListener("resize", resize);
    return () => {
      chart.off("click", selectBar);
      observer && observer.disconnect();
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [chartData, theme]);

  return (
    <Paper
      component="section"
      elevation={1}
      className={classes.root}
      aria-label="Utilização da capacidade de pagamento por ano"
    >
      <Typography
        component="h2"
        variant="subtitle1"
        color="textPrimary"
        className={classes.title}
      >
        Utilização da capacidade de pagamento por ano
      </Typography>
      {result.error && (
        <Typography
          component="p"
          variant="body2"
          color="textSecondary"
          role="alert"
        >
          {result.error}
        </Typography>
      )}
      {chartData && !chartData.years.length && (
        <Typography component="p" variant="body2" color="textSecondary">
          Não há dados para o período.
        </Typography>
      )}
      {chartData && chartData.years.length > 0 && (
        <React.Fragment>
          <div className={classes.legend} aria-label="Legenda do gráfico">
            {GROUPS.map((group, index) => (
              <div className={classes.legendItem} key={group.id}>
                <span
                  aria-hidden="true"
                  className={classes.swatch}
                  style={{ backgroundColor: groupColors[index] }}
                />
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {group.label}
                </Typography>
              </div>
            ))}
            <div className={classes.legendItem}>
              <span aria-hidden="true" className={classes.mean} />
              <Typography component="span" variant="body2" color="textPrimary">
                Média do período: {percentageText(chartData.average)}
              </Typography>
            </div>
          </div>
          <div
            className={classes.scroll}
            tabIndex={0}
            role="region"
            aria-label="Gráfico de utilização com rolagem horizontal. Os detalhes também estão disponíveis na tabela abaixo."
          >
            <div ref={chartRef} className={classes.chart} aria-hidden="true" />
          </div>
          <Typography component="p" variant="body2" color="textSecondary">
            Clique em uma barra ou selecione um ano para consultar os detalhes.
          </Typography>
          <TextField
            select
            variant="outlined"
            className={classes.yearSelect}
            label={
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                Ano para detalhamento
              </Typography>
            }
            value={selected ? selected.year : ""}
            onChange={(event) => setSelectedYear(Number(event.target.value))}
            style={{ minWidth: 200 }}
          >
            {chartData.years.map((year) => (
              <MenuItem key={year.year} value={year.year}>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  Ano {year.year}
                </Typography>
              </MenuItem>
            ))}
          </TextField>
          {selected && (
            <section
              className={classes.panel}
              aria-label={"Detalhes financeiros do ano " + selected.year}
              aria-live="polite"
            >
              <div className={classes.panelHeader}>
                <Typography
                  component="h3"
                  variant="subtitle1"
                  color="textPrimary"
                  className={classes.title}
                >
                  Detalhes do Ano {selected.year}
                </Typography>
                <Button onClick={() => setSelectedYear(null)} size="small">
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Fechar detalhes
                  </Typography>
                </Button>
              </div>
              <div className={classes.panelGrid}>
                {[
                  [
                    "Capacidade de pagamento",
                    moneyText(selected.paymentCapacity),
                  ],
                  ["Total do principal", moneyText(selected.totalPrincipal)],
                  ["Utilização total", percentageText(selected.total)],
                  ["Média do período", percentageText(chartData.average)],
                  ["Desvio da média", differenceText(selected.difference)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <Typography
                      component="div"
                      variant="body2"
                      color="textSecondary"
                    >
                      {label}
                    </Typography>
                    <Typography
                      component="div"
                      variant="subtitle1"
                      color="textPrimary"
                      className={classes.title}
                    >
                      {value}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className={classes.panelGrid}>
                {GROUPS.map((group, index) => (
                  <div key={group.id} className={classes.group}>
                    <div className={classes.legendItem}>
                      <span
                        aria-hidden="true"
                        className={classes.swatch}
                        style={{ backgroundColor: groupColors[index] }}
                      />
                      <Typography
                        component="h4"
                        variant="body2"
                        color="textPrimary"
                        className={classes.title}
                      >
                        {group.label}
                      </Typography>
                    </div>
                    <div className={classes.detailRow}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Principal do grupo
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className={classes.title}
                      >
                        {moneyText(selected.groups[group.id].principal)}
                      </Typography>
                    </div>
                    <div className={classes.detailRow}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Contribuição
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className={classes.title}
                      >
                        {percentageText(selected.groups[group.id].percentage)}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          <Typography
            component="p"
            variant="caption"
            color="textSecondary"
            className={classes.note}
          >
            Média simples dos percentuais anuais, incluindo os anos com
            utilização zero. Estar acima da média não indica inadimplência ou
            inadequação. A ordem dos segmentos não atribui responsabilidade pelo
            excesso.
          </Typography>
          {chartData.average === null && (
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
              className={classes.note}
            >
              Há dados indisponíveis. Os valores conhecidos foram preservados; a
              média completa não pode ser calculada.
            </Typography>
          )}
          {chartData.years.some(
            (year) =>
              year.paymentCapacity !== null && year.paymentCapacity <= 0,
          ) && (
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
              className={classes.note}
            >
              Para capacidade de pagamento zero ou negativa, foi preservada a
              regra atual da tabela: utilização de 0%, sem efetuar divisão.
            </Typography>
          )}
        </React.Fragment>
      )}
    </Paper>
  );
}
