import React from 'react';


const generateRows = (rows) => {
  const data = [[{ text: 'Ilość' }, { text: 'Nazwa' }]];
  for (let i = 0; i < rows; i++)
    data.push([{ text: i }, { text: i }]);
  return data;
};

const PDFWaybill = () => {

  return (
    {
      pageSize: 'A4',

      content: [
        {
          table: {
            widths: ['*', '*', '30%'],
            heights: (row) => {
              switch (row) {
                case 2:
                  return 40;
                case 3:
                  return 80;
                case 4:
                  return 40;
                case 5:
                  return 80;
                case 9:
                  return 80;
              }
            },
            body: [
              [{ text: 'LIST PRZEWOZOWY', style: 'centeredBold', fontSize: 15, colSpan: 3 }, {}, {}],
              [{ text: 'ZAŁADUNEK', style: 'centeredBold', colSpan: 2 }, {}, {
                text: 'PRZEWOŹNIK',
                style: 'centeredBold'
              }],
              [{ text: 'Nazwa odbiorcy:', colSpan: 2 }, {}, { text: 'Nazwa przewoźnika:', rowSpan: 2 }],
              [{ text: 'Miejsce przeznaczenia:', colSpan: 2 }, {}, {}],
              [{ text: 'Nazwa nadawcy:', colSpan: 2 }, {}, { text: 'Imię i nazwisko kierowcy:', rowSpan: 5 }],
              [{ text: 'Miejsce nadania:', colSpan: 2 }, {}, {}],
              [{ text: 'Nazwa przesyłki:' }, { text: 'Waga:' }, {}],
              [{
                stack: [
                  {
                    table: {
                      widths: ['10%', '*'],
                      body: generateRows(2)
                    },
                    margin: [-5, -3, -5, -3]
                  }
                ], colSpan: 2
              }, {}, {}],
              [{ text: 'Data załadunku', colSpan: 2 }, {}, {}],
              [{
                text: 'Nadawca(podpis/pieczątka):',
                colSpan: 2
              }, {}, { text: 'Kwituję odbiór przesyłki (podpis kierowcy):', rowSpan: 2 }],
              [{ text: 'ROZŁADUNEK', style: 'centeredBold', colSpan: 2 }, {}, {}],
              [{ text: 'Zastrzeżenia i uwagi odbiorcy:', colSpan: 2 }, {}, {
                text: 'Zastrzeżenia i uwagi przewoźnika:',
                rowSpan: 2
              }],
              [{
                stack:
                  [
                    { text: 'Przesyłkę otrzymano:\n\n\n\n' },
                    {
                      columns: [
                        {
                          width: '50%',
                          text: 'miejscowość'
                        },
                        {
                          width: '5%',
                          text: 'data'
                        }
                      ], alignment: 'center', fontSize: 8
                    },
                    { text: '\n\n\n\n\npodpis pieczątka odbiorcy', alignment: 'center', fontSize: 8 }
                  ], colSpan: 2
              }, {}, {}]
            ]
          }
        }
      ],
      styles: {
        title: {
          fontSize: 22,
          bold: true,
          alignment: 'center'
        },
        centeredBold: {
          bold: true,
          alignment: 'center'
        }

      }
    }
  );
};

export default PDFWaybill;