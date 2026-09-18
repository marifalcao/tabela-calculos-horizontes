import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import HorizonsTable from './components/HorizonsTable';
import { mockData } from './components/HorizonsTable/mockData';
import CapacityUtilizationChart from './components/CapacityUtilizationChart';
import { demoGroups } from './components/CapacityUtilizationChart/demoGroups';

const legacyTheme = createMuiTheme({
  palette: {
    primary: { main: '#A6193C' },
    secondary: { main: '#E65E04' },
  },
  typography: {
    fontFamily: '"Lato", Arial, sans-serif',
    caption: { fontSize: 12 },
    body2: { fontSize: 14 },
    subtitle1: { fontSize: 16 },
  },
});

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      margin: 0,
      backgroundColor: '#f4f6f9',
      fontFamily: theme.typography.fontFamily,
    },
  },
  root: {
    padding: '40px 32px',
    maxWidth: 1600,
    margin: '0 auto',
    '@media (max-width: 700px)': { padding: '20px 12px' },
  },
}));

function Demo() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <HorizonsTable data={mockData} />
      <CapacityUtilizationChart data={mockData} operationGroups={demoGroups} />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={legacyTheme}>
      <Demo />
    </ThemeProvider>
  );
}
