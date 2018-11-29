const nestedWidthsType = '*';

const formatLabels = (dataLabels) => {
    let labels = [];
    for (let i = 0; i < dataLabels.length; i++) {
        if (dataLabels[i] instanceof Array) {
            let widths = [];
            let body = formatLabels(dataLabels[i]);
            for (let j = 0; j < body.length; j++) {
                widths.push(nestedWidthsType);
            }
            labels.push({
                table:
                    {
                        widths: widths,
                        body: [body]
                    }, margin: [-5, -3, -5, -3]
            });
        } else {
            labels.push({text: dataLabels[i], bold: true});
        }
    }
    return labels;
};

const formatData = (dataObject, dataLabels) => {
    let data = [];

    dataLabels !== undefined ?
        data.push(formatLabels(dataLabels)) : null;


    dataObject.length !== 0 ?
        dataObject.map(currElement => {
            let values = Object.values(currElement);
            let cells = [];
            for (let value in values) {
                if (value < values.length - 1) {
                    if (values[value] instanceof Object) {
                        if (values[value] instanceof Array) {
                            let arrayValue = Object.values(values[value]);
                            if (arrayValue.length === 0) {
                                cells.push({text: ''});
                            } else {
                                let body = [];
                                let widths = [];
                                for (let i = 0; i < arrayValue.length; i++) {
                                    let bodyCells = formatData([Object.values(arrayValue[i])])[0];
                                    let bodyRow = [];
                                    let tmpWidths = [];
                                    for (let j = 0; j < bodyCells.length; j++) {
                                        tmpWidths.push(nestedWidthsType);
                                        bodyRow.push(bodyCells[j]);
                                    }
                                    body.push(bodyRow);
                                    widths = tmpWidths;
                                }
                                cells.push({
                                    table: {
                                        widths: widths,
                                        body: body
                                    }
                                    , margin: [-5, -3, -5, -3]
                                });
                            }
                        } else {
                            let bodyCells = formatData([[values[value]][0]])[0];
                            let body = [];
                            let widths = [];
                            for (let j = 0; j < bodyCells.length; j++) {
                                body.push(bodyCells[j]);
                                widths.push(nestedWidthsType);
                            }
                            cells.push({
                                table: {
                                    widths: widths,
                                    body: [body]
                                }
                                , margin: [-5, -3, -5, -3]
                            });
                        }
                    } else
                        cells.push({text: values[value]});
                }

            }
            data.push(cells);
        })
        : data.push(['']);
    return data;
};

const PDFFromDataSet = (dataObject, dataLabels,pageSize, pageOrientation, fontSize) => {
    return ({
        pageSize: pageSize,
        pageOrientation: pageOrientation,
        content: [
            {
                table: {
                    dontBreakRows: true,
                    headerRows: 1,
                    widths: 'auto',
                    body: formatData(dataObject, dataLabels)
                }, fontSize: fontSize
            }
        ]
    });
};

export default PDFFromDataSet;