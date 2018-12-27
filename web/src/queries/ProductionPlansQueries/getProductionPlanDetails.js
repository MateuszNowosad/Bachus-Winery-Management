import gql from 'graphql-tag';

export const getProductionPlanDetails = gql`
  query getProductionPlanDetails($id: ID!) {
    Partie(idPartie: $id) {
      idPartie
      ilosc
      dataUtworzenia
    	opis
    	typPartii{
        nazwa,
        jednostka
      }
      operacje {
        idOperacja
        iloscPrzed
        iloscPo
        dictProcesy{
          nazwa,
          opis
        }
      }
      partie{
      idPartie
      ilosc
      dataUtworzenia
    	opis
    	typPartii{
        nazwa,
        jednostka
      }
      operacje {
        idOperacja
        iloscPrzed
        iloscPo
        dictProcesy{
          nazwa,
          opis
        }
      }
      }
    }
  }
`;
