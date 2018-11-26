import React from 'react';


const formatLabels = (dataLabels) => {
  let labels = [];
  for (let i = 0; i < dataLabels.length; i++) {
    if (dataLabels[i] instanceof Array) {
      labels.push({
        table:
          {
            body: [formatLabels(dataLabels[i])]
          }, margin: [-5, -3, -5, -3]
      });
    } else {
      labels.push({ text: dataLabels[i], bold: true });
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
        if (values[value] instanceof Object) {
          if (values[value] instanceof Array) {
            let arrayValue = Object.values(values[value]);
            if (arrayValue.length === 0) {
              cells.push({ text: '' });
            } else {
              let body = [];
              for (let i = 0; i < arrayValue.length; i++) {
                let bodyCells= formatData([Object.values(arrayValue[i])])[0];
                let bodyRow = [];
                for (let j = 0; j < bodyCells.length; j++) {
                  bodyRow.push(bodyCells[j]);
                }
                body.push(bodyRow);
              }
              cells.push({
                table: {
                  body: body
                }
                , margin: [-5, -3, -5, -3]
              });
            }
          } else {
            let bodyCells= formatData([[Object.values(values[value])][0]])[0];
            let body = [];
            for (let j = 0; j < bodyCells.length; j++)
              body.push(bodyCells[j]);
            cells.push({
              table: {
                body: [body]
              }
              , margin: [-5, -3, -5, -3]
            });
          }
        } else
          cells.push({ text: values[value] });

      }
      data.push(cells);
    })
    : data.push(['']);

  return data;
};

const PDFFromDataSet = (dataObject, dataLabels) => {
  return ({
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [
      {
        table: {
          dontBreakRows: true,
          headerRows: 1,
          widths: 'auto',
          body: formatData(dataObject, dataLabels)
        }, fontSize: 5
      }
    ]
  });
};

export default PDFFromDataSet;