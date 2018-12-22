import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

function PDFShow(pdfScheme) {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  let data = null;
  let document = pdfMake.createPdf(pdfScheme);
  document.getBase64(function(encodedString) {
    console.log('10, encodedString jakub: ', encodedString);
    data = encodedString;
  });

  console.log('12, data jakub: ', data);
  document.open();
  return data;
}

export default PDFShow;
