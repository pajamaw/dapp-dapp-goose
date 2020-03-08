import React, { Component } from 'react';
import Iframe from 'react-iframe';
import './App.css';

import Header from './header/index.js'
import HomePage from './homepage/index.js'

const stateOfTheDappsSheetsUrl = "https://sheets.googleapis.com/v4/spreadsheets/1VdRMFENPzjL2V-vZhcc_aa5-ysf243t5vXlxC2b054g/values/A2:D?key=AIzaSyCEHwUcYchfR6-hMtdxYx5GQGFXi4LGFx4"
const likedDappsString = 'ddgLikedDapps';
const dislikedDappsString = 'ddgDislikedDapps';

const style = {
  width:"100%",
  height:"100%",
}

class App extends Component {
  constructor() {
    super();
    let likedDapps;
    let dislikedDapps;
    try {
      likedDapps = localStorage.getItem(likedDappsString) && localStorage.getItem(likedDappsString) !== "undefined" ? JSON.parse(localStorage.getItem(likedDappsString)) : [];
      dislikedDapps = localStorage.getItem(likedDappsString) && localStorage.getItem(dislikedDappsString) !== "undefined" ? JSON.parse(localStorage.getItem(dislikedDappsString)) : [];
    } catch (err) {
      localStorage.setItem(likedDappsString, null);
      likedDapps = [];
      localStorage.setItem(dislikedDappsString, null);
      dislikedDapps = [];
    }
    this.state = {
      stateOfTheDapps: [],
      currentDapp: {
        name: "Entry",
        description: "It's dapp dapp goose!",
        teaser: "tease ya",
        url: "https://www.youtube.com/embed/xDMP3i36naA",
      },
      likedDapps: likedDapps,
      dislikedDapps: dislikedDapps,
      currentDappIndex: null,
      shareToggleShown: false,
      homePageShown: true,
    }
    this.fetchDappUrl = this.fetchDappUrl.bind(this);
    this.setCurrentDapp = this.setCurrentDapp.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.fetchSotd = this.fetchSotd.bind(this);
    this.addToLikedDapps = this.addToLikedDapps.bind(this);
    this.shareToggle = this.shareToggle.bind(this);
    this.dislike = this.dislike.bind(this);
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
          currentDapp: currentDapp,
          shareToggleShown: false,
          homePageShown: false,
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
      localStorage.setItem(likedDappsString, JSON.stringify(currentLikedDapps));
    });
  }

  dislike() {
    let currentDisikedDapps;
    this.setState(prevState => {
      currentDisikedDapps = [...prevState.dislikedDapps, prevState.currentDapp];
      return { dislikedDapps: currentDisikedDapps }
    }, () => {
      localStorage.setItem(dislikedDappsString, JSON.stringify(currentDisikedDapps));
    });
  }

  setCurrentDapp(max) {
    let random = this.getRandomInt(max);
    // if (this.state.stateOfTheDapps[random] && this.state.stateOfTheDapps[random].url) {
    //   this.state.dislikedDapps.forEach(dapp => {
    //     if (dapp && dapp.url && dapp.url == )
    //   })
    // }
    this.setState(() => {
      return { currentDappIndex: random }
    })
    return this.state.stateOfTheDapps[random];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  shareToggle() {
    this.setState(prevState => {
      return {shareToggleShown: !prevState.shareToggleShown}
    });
  }

  render() {
    return (
      <div className="App">
        <Header 
          shareToggleShown={this.state.shareToggleShown} 
          shareToggle={this.shareToggle} 
          likeFunction={this.addToLikedDapps} 
          clickFunction={this.fetchDappUrl}
          dislikeFunction={this.dislike}
        />
        {this.state.homePageShown ?  <HomePage /> : 
          <Iframe url={this.state.currentDapp.url} 
            style={style}
            id="dapp-container"
            width="100vw"
            height="100vh"
            display="initial"
            allowFullScreen
          />
        }
      </div>
    );
  }
}

export default App;
