import React, { Component } from 'react';

const style = {
  minWidth: '100vw',
  minHeight: '100vh',
}

class HomePage extends Component {
  constructor(props) {
    super();

    this.state = {
      // open: false,
    };
  }

  render() {
    return (
      <div>
          <div style={style}>
        {/* two situations
          first if it's going to be a returning user then 
          let's not show them teh top

          if it's a new user then we do this 
          top piece that's like an introduction

        */}
        <div class="left">
          <h1>leftside </h1>
            {/* 
            basically i'm thinking like left 
            50% of the page is going to be about 
            an introduction to the app

            big print and what not 

            // 
            */}
        </div>

        <div class="right">
          <h1>rightside </h1>
          {/*
            This side will be small print and 
            will talk about the larger details
          */}
        </div>
      </div>
    </div>
    );
  }
}

export default HomePage;
