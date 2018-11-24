import React from 'react';


const ExamplePDF = () => {
  return (
    {
      pageSize: 'A4',

      content: [
        { text: 'List przewozowy', style: 'title' },
        '\n',
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
              }
            },
            body: [
              [{ text: 'LIST PRZEWOZOWY', style: 'centeredBold', colSpan: 3 }, {}, {}],
              [{ text: 'ZAŁADUNEK', style: 'centeredBold', colSpan: 2 }, {}, {
                text: 'PRZEWOŹNIK',
                style: 'centeredBold'
              }],
              [{ text: 'Nazwa odbiorcy:', colSpan: 2 }, {}, { text: 'Nazwa przewoźnika:', rowSpan: 2 }],
              [{ text: 'Miejsce przeznaczenia:', colSpan: 2 }, {}, {}],
              [{ text: 'Nazwa nadawcy:', colSpan: 2 }, {}, { text: 'Imię i nazwisko kierowcy:', rowSpan: 2 }],
              [{ text: 'Miejsce nadania:', colSpan: 2 }, {}, {}],
              [{ text: 'Nazwa przesyłki:' }, { text: 'Waga:' }, {
                text: 'Zastrzeżenia i uwagi przewoźnika:',
                rowSpan: 2
              }],
              [
                {
                  stack: [
                    {
                      table: {
                        widths: ['10%', '*'],
                        body: [
                          [{ text: 'Ilość' }, { text: 'Nazwa' }]

                        ]
                      },
                      margin: [-5, -3, -5, -3]
                    }
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

export default ExamplePDF;