import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

function PDFShow(pdfScheme) {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  pdfMake.createPdf(pdfScheme).open();
}

export default PDFShow;
