const generateContent = (content) => {

  const data = [[{ text: 'Ilość', fontSize: 11, bold: true }, { text: 'Nazwa', fontSize: 11, bold: true }]];
  for (let i = 0; i < content.length; i++)
    data.push([{ text: content[i].amount }, { text: content[i].selectedItem.nazwa}]);
  return data;
};

const formatAddress = (data) => {
  return data.street + ' ' + data.buildingNumber + ' ' + data.apartmentNumber + ', ' +
    data.city + ' ' + data.postalCode+ ' ' + data.country;
};

const formatContractor = (data) => {
  return { text: data.nazwaSpolki /*+ ' ' + formatAddress(data.adres)*/, style: 'data' };
};

const formatDriver = (data) => {
  return { text: data.driverName+' '+data.driverSurname, style: 'data'}
};

const formatDate = (data) => {
  return { text: data.replace('T',' '), style: 'data'}
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
                text: [{ text: 'Nazwa odbiorcy:\n', bold: true }, formatContractor(data.recipent)],
                colSpan: 2
              }, {}, { text: [{ text: 'Nazwa przewoźnika:\n', bold: true }, formatContractor(data.carrier)], rowSpan: 2 }],
              [{
                text: [{ text: 'Miejsce przeznaczenia:\n', bold: true }, { text: formatAddress(data.pickupAddress), style: 'data' }],
                colSpan: 2
              }, {}, {}],
              [{
                text: [{ text: 'Nazwa nadawcy:\n', bold: true }, formatContractor(data.sender)],
                colSpan: 2
              }, {}, { text: [{ text: 'Imię i nazwisko kierowcy:\n', bold: true }, formatDriver(data)], rowSpan: 2 }],
              [{
                text: [{ text: 'Miejsce nadania:\n', bold: true }, { text: formatAddress(data.mailingAddress), style: 'data' }],
                colSpan: 2
              }, {}, {}],
              [{ text: [{ text: 'Nazwa przesyłki:\n', bold: true }, { text: data.parcel.packageName , style: 'data'}] }, { text: [{ text: 'Waga:\n' , bold: true}, { text: data.parcel.weight, style: 'data' }] }, {
                text: 'Kwituję odbiór przesyłki (podpis kierowcy):', bold: true,
                rowSpan: 5
              }],
              [
                {
                  stack: [
                    {
                      table: {
                        widths: ['10%', '*'],
                        body: generateContent(data.parcel.content)
                      },
                      margin: [-5, -3, -5, -3],
                      fontSize: 8
                    }
                  ], colSpan: 2
                }, {}, {}],
              [{ text: [{ text: 'Data załadunku:\t' , bold: true}, formatDate(data.parcel.date)], colSpan: 2 }, {}, {}],
              [{
                text: 'Nadawca(podpis/pieczątka):', bold: true,
                colSpan: 2
              }, {}, {}],
              [{ text: 'ROZŁADUNEK', style: 'centeredBold', colSpan: 2 }, {}, {}],
              [{
                text: [{ text: 'Zastrzeżenia i uwagi odbiorcy:\n', bold: true }, {text: data.comments, style: 'data'}],
                colSpan: 2
              }, {}, { text: [{ text: 'Zastrzeżenia i uwagi przewoźnika:\n', bold: true }, {text: data.reservations, style: 'data'}], rowSpan: 2 }],
              [{

                stack:
                  [
                    { text: 'Przesyłkę otrzymano:\n\n\n\n', bold: true },
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
        },
        data: {
          fontSize: 10,
        }
      }
    }
  );
};

export default PDFWaybill;