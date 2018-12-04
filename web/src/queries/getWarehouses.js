import gql from "graphql-tag"

const getWarehouses = gql`
{
  Magazyn {
    idMagazyn
    rodzaj
    pojemnosc
  }
}`;

export default getWarehouses;
