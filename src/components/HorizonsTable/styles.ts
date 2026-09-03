import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const ITEM_WIDTH = 250;
export const YEAR_WIDTH = 125;

export default makeStyles(theme => ({
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
    maxHeight: 620,
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
  operation: {
    '& > th': { paddingLeft: 26 },
    '& > th, & > td': { paddingTop: 13, paddingBottom: 13 },
  },
  section: {
    '& > th, & > td': {
      backgroundColor: theme.palette.grey[50], paddingTop: 14, paddingBottom: 14,
    },
    '& $label': {
      fontWeight: 700,
    },
  },
  total: {
    '& > th, & > td': { fontWeight: 700 },
    '& $label': { fontWeight: 700 },
  },
  result: {
    '& > th, & > td': { backgroundColor: theme.palette.grey[50], fontWeight: 700 },
    '& $label': { fontWeight: 700 },
  },
  capacity: {
    '& > th, & > td': {
      borderTop: '2px solid ' + theme.palette.divider, borderBottom: 0,
      backgroundColor: theme.palette.background.paper, paddingTop: 20, paddingBottom: 20,
    },
    '& $label': { fontWeight: 700 },
  },
  percentage: { fontFamily: 'inherit', marginBottom: 9, fontWeight: 600 },
  // Independent visual classes leave room for a future alert state.
  // Darker MUI green provides readable contrast against the white surface.
  positive: { color: green[800] },
  attention: { color: theme.palette.secondary.main },
  progress: { height: 5, borderRadius: 4, backgroundColor: theme.palette.grey[200] },
  progressBar: { borderRadius: 4, backgroundColor: green[800] },
  attentionProgressBar: { backgroundColor: theme.palette.secondary.main },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
    padding: '18px 28px', borderTop: '1px solid ' + theme.palette.divider,
  },
  footnote: {
    fontFamily: 'inherit', lineHeight: 1.7, maxWidth: 770,
  },
  hint: {
    fontFamily: 'inherit', lineHeight: 1.6,
    whiteSpace: 'nowrap', flexShrink: 0,
  },
  '@media (max-width: 700px)': {
    intro: { padding: '20px 18px' },
    footer: { padding: '16px 18px', flexDirection: 'column', alignItems: 'flex-start', gap: 10 },
    scroll: { maxHeight: 520 },
  },
}));
