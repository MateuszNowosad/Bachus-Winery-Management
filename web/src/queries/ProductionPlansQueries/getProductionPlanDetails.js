import gql from 'graphql-tag'

export const getProductionPlanDetails = gql`
query getProductionPlanDetails($id: ID!){
Partie(idPartie: $id){
    idPartie
    ilosc
    dataUtworzenia
    operacje {
      idOperacja
      iloscPrzed
      iloscPo     
    }
    partie{
      idPartie
      ilosc
      operacje{
        idOperacja
        iloscPrzed
        iloscPo
      }
        partie {
          idPartie
          ilosc
        }
    }
  }
  }
`;