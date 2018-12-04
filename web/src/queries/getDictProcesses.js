import gql from "graphql-tag"

const getDictProcesses = gql`
{
  DictProcesy  {
    idDictProcesy
    nazwa
    opis
    dodatkowe
  }
}`;

export default getDictProcesses;
