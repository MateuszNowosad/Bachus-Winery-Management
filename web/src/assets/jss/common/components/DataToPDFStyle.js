import red from '@material-ui/core/colors/red';

const DataToPDFStyle = theme => ({
  list: {
    maxHeight: 400,
    overflow: 'auto'
  },
  nestedList: {
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: '#d1d1d1'
  },
  menu: {
    maxHeight: 400
  },
  form: {
    margin: '0% 25%'
  },
  error: {
    color: red[300],
    borderStyle: 'solid',
    borderColor: red[300],
    borderRadius: '5px',
    borderWidth: '1px'
  }
});

export default DataToPDFStyle;
