const DataToPDFStyle = theme => ({
    list: {
        maxHeight: 200,
        overflow: 'auto',
    },
    nestedList: {
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: '#d1d1d1'
    },
    menu: {
        maxHeight: 200
    },
    form: {
        margin: '0% 25%'
    }
});

export default DataToPDFStyle;