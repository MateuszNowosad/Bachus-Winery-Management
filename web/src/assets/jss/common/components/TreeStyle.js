const TreeStyle = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  wrapperInner: {
    marginLeft: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexBasis: 'auto'
  }
});

export default TreeStyle;
