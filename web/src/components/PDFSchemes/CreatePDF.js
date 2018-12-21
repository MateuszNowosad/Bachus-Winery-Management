import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

function CreatePDF(pdfScheme) {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  let data;
  let document = pdfMake.createPdf(pdfScheme);
  return new Promise(function(resolve, reject) {
    document.getBase64(function (pdfBase64) {
      resolve(pdfBase64);
    });
  });

}

export default CreatePDF;
