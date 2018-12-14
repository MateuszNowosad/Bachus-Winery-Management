import React from 'react';

import PDFFromDataSet from './PDFFromDataSet';
import PDFShow from './PDFShow';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

const qr = gql`
  {
    Uzytkownicy {
      imie
      nazwisko
    }
  }
`;

export class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  adresQ = () => (
    <ApolloConsumer>
      {client => (
        <div>
          <button
            onClick={async () => {
              const { data } = await client.query({
                query: qr
              });
              PDFShow(PDFFromDataSet(data.Uzytkownicy, lbl));
            }}
          >
            Click me!
          </button>
        </div>
      )}
    </ApolloConsumer>
  );

  render() {
    return <div>{this.adresQ()}</div>;
  }
}
