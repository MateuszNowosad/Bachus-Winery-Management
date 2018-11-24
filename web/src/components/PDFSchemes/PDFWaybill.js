import React from 'react';


const generateRows = (rows) => {
  const data = [[{ text: 'Ilość', fontSize: 11, bold: true }, { text: 'Nazwa', fontSize: 11, bold: true }]];
  for (let i = 0; i < rows; i++)
    data.push([{ text: i }, { text: i }]);
  return data;
};

const formatAddress = (data) => {
  return data.street + ' ' + data.buildingNumber + ' ' + data.apartmentNumber + ', ' +
    data.city + ' ' + data.postalCode;
};

const formatSender = (data) => {
  return { text: data.companyName + ' ' + formatAddress(data.address) };
};

const formatDriver = (data) => {
  return { text: data.driverName+' '+data.driverSurname}
};

const PDFWaybill = (data) => {
  return (
    {
      pageSize: 'A4',

      content: [
        {
          table: {
            widths: ['*', '*', '30%'],
            heights: (row) => {
              switch (row) {
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
              [{
                text: [{ text: 'Nazwa odbiorcy:\n' }, formatSender(data.recipent)],
                colSpan: 2
              }, {}, { text: [{ text: 'Nazwa przewoźnika:\n' }, formatSender(data.carrier)], rowSpan: 2 }],
              [{
                text: [{ text: 'Miejsce przeznaczenia:\n' }, { text: formatAddress(data.pickupAddress) }],
                colSpan: 2
              }, {}, {}],
              [{
                text: [{ text: 'Nazwa nadawcy:\n' }, formatSender(data.sender)],
                colSpan: 2
              }, {}, { text: [{ text: 'Imię i nazwisko kierowcy:\n' }, formatDriver(data)], rowSpan: 2 }],
              [{
                text: [{ text: 'Miejsce nadania:\n' }, { text: formatAddress(data.mailingAddress) }],
                colSpan: 2
              }, {}, {}],
              [{ text: [{ text: 'Nazwa przesyłki:\n' }, { text: data.parcel.packageName }] }, { text: [{ text: 'Waga:\n' }, { text: data.parcel.weight }] }, {
                text: 'Kwituję odbiór przesyłki (podpis kierowcy):',
                rowSpan: 5
              }],
              [
                {
                  stack: [
                    {
                      table: {
                        widths: ['10%', '*'],
                        body: generateRows(2)
                      },
                      margin: [-5, -3, -5, -3],
                      fontSize: 8
                    }
                  ], colSpan: 2
                }, {}, {}],
              [{ text: [{ text: 'Data załadunku:\n' }, {text: data.parcel.date}], colSpan: 2 }, {}, {}],
              [{
                text: 'Nadawca(podpis/pieczątka):',
                colSpan: 2
              }, {}, {}],
              [{ text: 'ROZŁADUNEK', style: 'centeredBold', colSpan: 2 }, {}, {}],
              [{
                text: [{ text: 'Zastrzeżenia i uwagi odbiorcy:\n' }, {text: data.comments}],
                colSpan: 2
              }, {}, { text: [{ text: 'Zastrzeżenia i uwagi przewoźnika:\n' }, {text: data.reservations}], rowSpan: 2 }],
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
              }
                , {}, {}]

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