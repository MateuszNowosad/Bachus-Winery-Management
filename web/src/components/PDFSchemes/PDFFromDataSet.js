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
  console.log('17, labels jakub: ', labels);
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
              let tmp4 = [];
              for (let i = 0; i < arrayValue.length; i++) {
                let tmp = formatData([Object.values(arrayValue[i])])[0];
                let tmp3 = [];
                for (let j = 0; j < tmp.length; j++) {
                  tmp3.push(tmp[j]);
                }
                tmp4.push(tmp3);
              }
              cells.push({
                table: {
                  body: tmp4
                }
                , margin: [-5, -3, -5, -3]
              });
            }
          } else {
            let tmp = formatData([[Object.values(values[value])][0]])[0];
            let tmp2 = [];
            for (let j = 0; j < tmp.length; j++)
              tmp2.push(tmp[j]);
            cells.push({
              table: {
                body: [tmp2]
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