import { Theme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { getContrastRatio } from '@material-ui/core/styles/colorManipulator';
import { ChartData, GROUPS, percentageText } from './data';

export const getGroupColors = (theme: Theme) => [theme.palette.primary.main, theme.palette.secondary.main, blue[900]];
export function createChartOptions(data: ChartData, theme: Theme) {
  const groupColors = getGroupColors(theme);
  const peak = Math.max(1, ...data.years.map(year => GROUPS.reduce((sum, group) => sum + (year.groups[group.id].percentage || 0), 0)));
  const upper = Math.ceil(peak * 1.2 / 5) * 5;
  // Adapted from https://echarts.apache.org/examples/en/editor.html?c=bar-stack-normalization
  // Keep mapped bar series and the common stack. data.ts replaces d / totalData
  // with group principal / annual payment capacity * 100, without normalization.
  const series = GROUPS.map((group, index) => ({
    name: group.label, type: 'bar', stack: 'total', barWidth: '60%', barMaxWidth: 76,
    itemStyle: { color: groupColors[index] },
    data: data.years.map(year => year.groups[group.id].percentage),
    label: { show: true, position: 'inside', fontSize: 12, color: getContrastRatio(groupColors[index], theme.palette.common.white) >= 4.5 ? theme.palette.common.white : theme.palette.common.black,
      formatter: ({ value }: { value: number | null }) => value !== null && value > 0 && value / upper * 260 >= 18 ? percentageText(value) : '' },
    ...(index === 0 ? {
      markLine: { silent: true, symbol: ['none', 'none'], lineStyle: { type: 'dashed', width: 2, color: theme.palette.text.primary, opacity: 0.4 }, label: { show: false },
        data: data.average === null ? [] : [{ yAxis: data.average, name: 'Média do período: ' + percentageText(data.average) }] },
      markPoint: { silent: true, symbol: 'circle', symbolSize: 0,
        label: { show: true, position: 'top', distance: 7, color: theme.palette.text.primary, fontSize: 12, fontWeight: 700, formatter: ({ value }: { value: number }) => percentageText(value) },
        data: data.years.filter(year => year.total !== null).map(year => ({ coord: ['Ano ' + year.year, year.total], value: year.total })) },
    } : {}),
  }));
  return {
    animation: false,
    textStyle: { fontFamily: theme.typography.fontFamily, fontSize: 12, color: theme.palette.text.primary },
    grid: { left: 64, right: 24, top: 48, height: 260 },
    xAxis: { type: 'category', data: data.years.map(year => 'Ano ' + year.year), axisTick: { show: false }, axisLine: { lineStyle: { color: theme.palette.divider } }, axisLabel: { interval: 0, color: theme.palette.text.primary } },
    yAxis: { type: 'value', min: 0, max: upper, name: 'Utilização da capacidade de pagamento (%)', nameTextStyle: { align: 'left', color: theme.palette.text.secondary },
      axisLabel: { color: theme.palette.text.secondary, formatter: (value: number) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value) + '%' }, splitLine: { lineStyle: { color: theme.palette.divider } } },
    tooltip: { show: false },
    series,
  };
}
