import React, { Component } from 'react';
import Iframe from 'react-iframe';
import logo from './logo.svg';
import './App.css';
import Header from './Header';

const stateOfTheDappsSheetsUrl = "https://sheets.googleapis.com/v4/spreadsheets/1VdRMFENPzjL2V-vZhcc_aa5-ysf243t5vXlxC2b054g/values/A2:D?key=AIzaSyCEHwUcYchfR6-hMtdxYx5GQGFXi4LGFx4"
const lsGetItem = 'ddgLikedDapps';

class App extends Component {
  constructor() {
    super();
    let likedDapps;
    try {
      likedDapps = localStorage.getItem(lsGetItem) && localStorage.getItem(lsGetItem) !== "undefined" ? JSON.parse(localStorage.getItem(lsGetItem)) : [];
    } catch (err) {
      localStorage.setItem(lsGetItem, null);
      likedDapps = [];
    }
    this.state = {
      stateOfTheDapps: [],
      currentDapp: {
        name: "Entry",
        description: "It's dapp dapp goose!",
        teaser: "tease ya",
        url: "http://www.youtube.com/embed/xDMP3i36naA",
      },
      likedDapps: likedDapps,
      currentDappIndex: null,
    }
    this.fetchDappUrl = this.fetchDappUrl.bind(this);
    this.setCurrentDapp = this.setCurrentDapp.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.fetchSotd = this.fetchSotd.bind(this);
    this.addToLikedDapps = this.addToLikedDapps.bind(this);
  }

  componentDidMount() {
    this.fetchSotd();
  }

  parseUrl(url) {
    return url.replace('http:', 'https:');
  }

  fetchDappUrl() {
    if (this.state.stateOfTheDapps.length == 0){
      this.fetchSotd();
    } else {
      let currentDapp = this.setCurrentDapp(this.state.stateOfTheDapps.length);
      this.setState(() => {
        return {
          currentDapp: currentDapp
        }
      });
    }
  }

  fetchSotd() {
    fetch(`${stateOfTheDappsSheetsUrl}`).then(resp => {
      return resp.json()
    }).then( data => {
      let stateOfTheDapps = [];
      data.values.forEach(x => {
        if (x[3]) {
          let dappObject = {
            name: x[0],
            description: x[1],
            teaser: x[2],
            url: this.parseUrl(x[3]),
          };
          stateOfTheDapps.push(dappObject);
        }
      })
      this.setState(() => {
        return {
          stateOfTheDapps: stateOfTheDapps
        }
      });
    })
  }

  addToLikedDapps() {
    let currentLikedDapps;
    this.setState(prevState => {
      currentLikedDapps = [...prevState.likedDapps, prevState.currentDapp];
      return { likedDapps: currentLikedDapps }
    }, () => {
      localStorage.setItem(lsGetItem, JSON.stringify(currentLikedDapps));
    });
  }

  setCurrentDapp(max) {
    let random = this.getRandomInt(max);
    this.setState(() => {
      return { currentDappIndex: random }
    })
    return this.state.stateOfTheDapps[random]
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    return (
      <div className="App">
        <Header likeFunction={this.addToLikedDapps} clickFunction={this.fetchDappUrl}/>
        <Iframe url={this.state.currentDapp.url}
          width="100vh"
          height="100vh"
          id="dapp-container"
          display="initial"
          position="relative"
          allowFullScreen/>
      </div>
    );
  }
}

export default App;
