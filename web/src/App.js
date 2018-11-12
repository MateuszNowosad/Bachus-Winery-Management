import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import apolloClient from "./apolloClient";

// const getAdresyQuery = gql`
//   query Adresy {
//     Adresy {
//       idAdres
//       miasto
//       ulica
//       kodPocztowy
//     }
//   }
// `;

apolloClient
  .query({
    query: gql`
      {
        Adresy {
          idAdres
          miasto
          kodPocztowy
          kraj
        }
      }
    `
  })
  .then(result => console.log(result));

const adresyQuery = () => (
  <Query
    query={gql`
      {
        Adresy {
          idAdres
          miasto
          kodPocztowy
          kraj
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.Adresy.map(args => (
        <div>
          {console.log("52, props filip: ", args)}
          <div key={args.idAdres}>
            <p>{`${args.idAdres}: ${args.miasto}`}</p>
          </div>
        </div>
      ));
    }}
  </Query>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {adresyQuery()}
      </div>
    );
  }
}

export default App;
