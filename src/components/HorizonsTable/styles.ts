import { makeStyles } from '@material-ui/core/styles';

export const ITEM_WIDTH = 250;
export const YEAR_WIDTH = 125;

export default makeStyles(theme => ({
  card: {
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    border: '1px solid #dfe5ec',
    borderTop: '3px solid ' + theme.palette.primary.main,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontFamily: theme.typography.fontFamily,
    overflow: 'hidden',
  },
  intro: { padding: '26px 28px 24px' },
  title: {
    fontFamily: 'inherit',
    fontWeight: 600,
    letterSpacing: '-0.5px',
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
    borderTop: '1px solid #e1e7ee',
    overscrollBehavior: 'contain',
    scrollbarColor: '#b6c2ce #f3f5f8',
    scrollbarWidth: 'auto',
    '&:focus': { outline: '2px solid ' + theme.palette.primary.main, outlineOffset: -2 },
    '&::-webkit-scrollbar': { width: 10, height: 10 },
    '&::-webkit-scrollbar-track': { backgroundColor: '#f3f5f8' },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#b6c2ce', border: '2px solid #f3f5f8', borderRadius: 8,
    },
  },
  table: {
    tableLayout: 'fixed',
    borderCollapse: 'separate',
    borderSpacing: 0,
    '& th, & td': { fontFamily: 'inherit' },
  },
  cell: {
    padding: '16px 16px',
    borderBottom: '1px solid #e7ecf1',
    borderRight: '1px solid #edf0f4',
    backgroundColor: '#fff',
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
    boxShadow: '2px 0 0 rgba(216, 224, 234, 0.45)',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#f4f6f9',
    fontWeight: 600,
    letterSpacing: '0.65px',
    textTransform: 'uppercase',
    paddingTop: 16,
    paddingBottom: 16,
    boxShadow: '0 1px 0 #dfe5ec',
  },
  headerText: {
    display: 'inline', fontFamily: 'inherit',
    fontWeight: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit',
  },
  corner: { zIndex: 3, boxShadow: '2px 1px 0 #dfe5ec' },
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
      backgroundColor: '#f3f6fa', paddingTop: 11, paddingBottom: 11,
      borderBottomColor: '#e2e8f0',
    },
    '& $label': {
      letterSpacing: '0.65px',
      textTransform: 'uppercase', color: theme.palette.text.primary,
    },
  },
  total: {
    '& > th, & > td': { backgroundColor: '#f7f9fb', fontWeight: 700 },
    '& $label': { fontWeight: 700 },
  },
  result: {
    '& > th, & > td': { backgroundColor: '#f7eef1', fontWeight: 700 },
    '& $label': { fontWeight: 700 },
  },
  capacity: {
    '& > th, & > td': {
      borderTop: '2px solid ' + theme.palette.primary.main, borderBottom: 0,
      backgroundColor: '#fff', paddingTop: 20, paddingBottom: 20,
    },
  },
  percentage: { fontFamily: 'inherit', marginBottom: 9, fontWeight: 600 },
  // Independent visual classes leave room for a future alert state.
  positive: { color: '#2f7b61' },
  attention: { color: theme.palette.secondary.main },
  progress: { height: 5, borderRadius: 4, backgroundColor: '#e9edf1' },
  progressBar: { borderRadius: 4, backgroundColor: '#518e76' },
  attentionProgressBar: { backgroundColor: theme.palette.secondary.main },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
    padding: '18px 28px', borderTop: '1px solid #dfe5ec',
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
