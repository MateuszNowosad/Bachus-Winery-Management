import React from 'react';
import { Button } from '@material-ui/core';

import PDFFromDataSet from './PDFFromDataSet';
import data from '../../variables/PDFTestData/ListPrzewozowyTest';
import PDFShow from './PDFShow';


export class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button onClick={() => PDFShow(PDFFromDataSet(data.data.ListPrzewozowy,data.data.labels))}>
        PDF
      </Button>
    );
  }
}