import React from 'react'
import { Button } from '@material-ui/core';

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import ExamplePDF from './PDFSchemes/ExamplePDF';

// const docDefinition = { content: 'This is an sample PDF printed with pdfMake' };


export class PDFViewer extends React.Component{
  constructor(props) {
    super(props);
  }

  showHTML = () => {
    // pdfMake.createPdf(docDefinition).open();

    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    console.log('21, <Ex jakub: ', ExamplePDF({text: 'text'}));
    // pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(ExamplePDF({text: 'text'})).download('optionalName.pdf');
  };


  render(){
    return(
      <Button onClick={()=>this.showHTML()}>
        PDF
      </Button>
    );
  }
}