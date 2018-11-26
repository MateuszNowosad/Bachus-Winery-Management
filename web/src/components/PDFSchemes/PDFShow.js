import PDFWaybill from './PDFWaybill';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

function PDFShow(dataObject) {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  pdfMake.createPdf(PDFWaybill(dataObject)).open();
}

export default PDFShow;