import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

function PDFDownload(pdfScheme,fileName) {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  pdfMake.createPdf(pdfScheme).download(fileName+'.pdf');
}

export default PDFDownload;