import gql from "graphql-tag"

const getWarehouses = gql`
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
}`;

export default getWarehouses;
