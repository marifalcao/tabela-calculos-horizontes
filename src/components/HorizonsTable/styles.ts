import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const ITEM_WIDTH = 250;
export const YEAR_WIDTH = 125;
const MOBILE_ITEM_WIDTH = 210;
const MOBILE_YEAR_WIDTH = 112;

export default makeStyles(theme => {
  return ({
  card: {
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.fontFamily,
    overflow: 'hidden',
  },
  intro: { padding: '26px 28px 24px' },
  averageSummary: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24,
    fontVariantNumeric: 'tabular-nums',
  },
  title: {
    fontFamily: 'inherit',
    fontWeight: 600,
    lineHeight: 1.4,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'inherit',
    lineHeight: 1.7,
    maxWidth: 930,
  },
  scroll: {
    width: '100%',
    maxHeight: 'calc(100vh - 250px)',
    overflow: 'auto',
    position: 'relative',
    isolation: 'isolate',
    borderTop: '1px solid ' + theme.palette.divider,
    overscrollBehavior: 'contain',
    scrollbarColor: theme.palette.grey[400] + ' ' + theme.palette.grey[100],
    scrollbarWidth: 'auto',
    '&:focus': { outline: '2px solid ' + theme.palette.primary.main, outlineOffset: -2 },
    '&::-webkit-scrollbar': { width: 10, height: 10 },
    '&::-webkit-scrollbar-track': { backgroundColor: theme.palette.grey[100] },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400], border: '2px solid ' + theme.palette.grey[100], borderRadius: 8,
    },
  },
  table: {
    '--item-width': ITEM_WIDTH + 'px',
    '--year-width': YEAR_WIDTH + 'px',
    tableLayout: 'fixed',
    borderCollapse: 'separate',
    borderSpacing: 0,
    '& th, & td': { fontFamily: 'inherit' },
    '& tr > th:not(:first-child), & tr > td:not(:first-child)': {
      borderRight: '1px solid ' + theme.palette.divider,
    },
  },
  cell: {
    padding: '16px 16px',
    borderBottom: '1px solid ' + theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    lineHeight: 1.5,
    verticalAlign: 'middle',
  },
  row: {
    '&:hover > th, &:hover > td': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  money: { whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' },
  value: { fontFamily: 'inherit', fontWeight: 'inherit' },
  // Layers: body (auto), row headers (1), column headers (2), corner (3).
  firstColumn: {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    boxShadow: '1px 0 0 ' + theme.palette.divider,
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    fontWeight: 700,
    paddingTop: 16,
    paddingBottom: 16,
    boxShadow: '0 1px 0 ' + theme.palette.divider,
  },
  headerText: {
    display: 'inline', fontFamily: 'inherit',
    fontWeight: 'inherit',
  },
  corner: { zIndex: 3, boxShadow: '1px 1px 0 ' + theme.palette.divider },
  label: { fontFamily: 'inherit', fontWeight: 600, lineHeight: 1.5 },
  description: {
    fontFamily: 'inherit', lineHeight: 1.5,
    fontWeight: 400, marginTop: 4,
  },
  normal: {},
  flowMarker: {
    display: 'inline-block',
    marginRight: 8,
    fontFamily: 'inherit',
    fontWeight: 600,
  },
  revenueMarker: { color: green[800] },
  income: {
    '& > th, & > td': {
      borderTop: '2px solid ' + theme.palette.divider,
      fontWeight: 700,
    },
    '& $label': { fontWeight: 700 },
  },
  operation: {
    '& > th': { paddingLeft: 26 },
    '& > th, & > td': { paddingTop: 13, paddingBottom: 13 },
  },
  chargeGroup: {
    '& > th': { paddingLeft: 26 },
    '& > th, & > td': {
      paddingTop: 16, paddingBottom: 12, backgroundColor: theme.palette.grey[50],
    },
  },
  charge: {
    '& > th': { paddingLeft: 40 },
    '& > th, & > td': { paddingTop: 12, paddingBottom: 12 },
    '& $label': { fontWeight: 400 },
  },
  chargeSubtotal: {
    '& > th': { paddingLeft: 40 },
    '& > th, & > td': { paddingTop: 12, paddingBottom: 12, fontWeight: 600 },
    '& $label': { fontWeight: 600 },
  },
  section: {
    '& > th, & > td': {
      backgroundColor: theme.palette.grey[100],
      borderTop: '2px solid ' + theme.palette.divider,
    },
    '& $label': {
      fontWeight: 700,
    },
  },
  sectionCell: {
    padding: 0,
  },
  sectionControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: 48,
    padding: '10px 16px',
    gap: 8,
    color: theme.palette.text.primary,
    textAlign: 'left',
    '&:focus-visible': {
      outline: '2px solid ' + theme.palette.primary.main,
      outlineOffset: -2,
    },
  },
  sectionCount: {
    fontFamily: 'inherit',
    marginLeft: 2,
  },
  total: {
    '& > th, & > td': {
      backgroundColor: theme.palette.grey[100],
      borderBottom: '2px solid ' + theme.palette.divider,
      fontWeight: 700,
    },
    '& $label': { fontWeight: 700 },
  },
  result: {
    '& > th, & > td': { backgroundColor: theme.palette.background.paper, fontWeight: 700 },
    '& $label': { fontWeight: 700 },
  },
  capacity: {
    '& > th, & > td': {
      borderTop: '2px solid ' + theme.palette.divider, borderBottom: 0,
      backgroundColor: theme.palette.background.paper, paddingTop: 20, paddingBottom: 20,
    },
    '& $label': { fontWeight: 700 },
  },
  capacitySummary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 9,
  },
  percentage: { fontFamily: 'inherit', fontWeight: 600 },
  capacityStatus: { fontFamily: 'inherit', marginTop: 2 },
  // Darker MUI green provides readable contrast against the white surface.
  positive: { '& $percentage': { color: green[800] } },
  zero: {},
  error: {
    '& $percentage': { color: theme.palette.error.dark },
    '& $progressBar': { backgroundColor: theme.palette.error.dark },
  },
  progress: { height: 5, borderRadius: 4, backgroundColor: theme.palette.grey[200] },
  progressBar: { borderRadius: 4, backgroundColor: green[800] },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
    padding: '18px 28px', borderTop: '1px solid ' + theme.palette.divider,
  },
  hint: {
    fontFamily: 'inherit', lineHeight: 1.6,
    whiteSpace: 'nowrap', flexShrink: 0,
  },
  '@media (min-height: 870px)': {
    scroll: { maxHeight: 620 },
  },
  '@media (max-width: 700px)': {
    intro: { padding: '20px 18px' },
    footer: { padding: '16px 18px', flexDirection: 'column', alignItems: 'flex-start', gap: 10 },
    scroll: { maxHeight: 'calc(100vh - 220px)' },
    table: {
      '--item-width': MOBILE_ITEM_WIDTH + 'px',
      '--year-width': MOBILE_YEAR_WIDTH + 'px',
    },
  },
  });
});
