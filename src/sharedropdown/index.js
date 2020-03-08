import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

const style = {
  width: '30vw',
  position: 'relative',
  height: '30vh',
  background: 'white',
  zIndex: '100'
};

const MenuBiz = () => (
  <div>
    <Paper style={style}>
      <Menu>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help &amp; feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" />
      </Menu>
    </Paper>
  </div>
);

class ShareDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // handleRequestClose = () => {
  //   this.setState({
  //     open: false,
  //   });
  // };

  render() {
    return (
      <div>
        <Button onClick={this.props.shareToggle}>
          <i className="fas fa-share-alt"></i>
        </Button>
        
        {this.props.shareToggleShown && 
          <div style={style}>
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </div>
        }
        </div>
    );
  }
}

export default ShareDropdown;
