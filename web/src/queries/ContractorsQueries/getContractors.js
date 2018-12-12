import gql from 'graphql-tag';

const getContractors = gql`
  {
    Kontrahenci {
      idKontrahenci
      NIP
      nazwaSpolki
      telefon
      eMail
      stronaWww
      KRS
      nrKonta
      fax
    }
  }
`;

export default getContractors;
