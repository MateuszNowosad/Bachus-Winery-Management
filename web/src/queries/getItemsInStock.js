import gql from "graphql-tag"

const getItemsInStock = gql`
{
  PozycjaWMagazynie {
  idPozycja
  nazwa
  opis
  ilosc
  stanAktualny
}
}`;

export default getItemsInStock;
