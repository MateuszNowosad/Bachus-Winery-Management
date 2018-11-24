import React from 'react'
import { Button } from '@material-ui/core';

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import PDFWaybill from './PDFSchemes/PDFWaybill';


// const dataObject = {
//
// }


export class PDFViewer extends React.Component{
  constructor(props) {
    super(props);
  }

  showHTML = () => {

    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    pdfMake.createPdf(PDFWaybill({text: 'text'})).download('optionalName.pdf');
  };


  render(){
    return(
      <Button onClick={()=>this.showHTML()}>
        PDF
      </Button>
    );
  }
}