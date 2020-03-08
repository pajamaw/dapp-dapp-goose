import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  minWidth: '160px',
  minHeight: '160px',
  top: '0',
  color: 'white',
  left: '150',
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
      open: false,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState(prevState => ({
      open: !prevState.open,
      anchorEl: event.currentTarget,
    }));
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
        >
          <i className="fas fa-share-alt"></i>
        </Button>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <MenuBiz />
        </Popover>
      </div>
    );
  }
}

export default ShareDropdown;
