import PDFWaybill from '../PDFSchemes/PDFWaybill';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

function PDFDownload(dataObject,fileName) {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  pdfMake.createPdf(PDFWaybill(dataObject)).download(fileName+'.pdf');
}

export default PDFDownload;