import gql from "graphql-tag"

const getBatches = gql`
{
  Partie {
    idPartie
    ilosc
    opis
    dataUtworzenia
  }
}`;

export default getBatches;
