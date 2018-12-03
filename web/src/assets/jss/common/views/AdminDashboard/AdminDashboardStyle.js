const AdminDashboardStyle = theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  flexForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  top: {
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit * 3
  },
  bottom: {
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  },
  flexSidewaysContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    alignItems: 'center',
    overflowX: 'auto',
    alignContent: 'space-between'
  },
  combo: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default AdminDashboardStyle;
