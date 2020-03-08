import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ShareDropdown from '../sharedropdown/index.js';

const styles = {
  root: {
    display: 'flex !important',
    background: 'linear-gradient(#3d3c38 80%, #605e59) !important',
    height: '50px !important',
    minHeight: '50px !important',
    width: '100% !important',
    alignItems: 'space-evenly !important',
  },
  tools: {
    minHeight: '50px !important',
    height: '50px !important',
  },
  siteActionButtons: {
    margin: 'auto !important',
    color: '#fff !important',
    background: '#318FC2 !important',
    borderRadius: '6px !important',
    '&:hover': {
      backgroundColor: '#1f5e80 !important',
      boxShadow: 'inset 3px 3px rgba(31,93,128,0.5) !important'
    }
  },
  shareButton: {
    color: 'white !important',
  },
  title: {
    fontSize: '1em !important',
  },
  menuButton: {
    marginLeft: 'auto !important',
    height: '30px !important',
    width: '30px !important',
    marginRight: '0 !important',
    '&:hover': {
      height: '30px !important',
      width: '30px !important',
      borderRadius: '6px !important',  
      backgroundColor: '#202120 !important',
      boxShadow: '3px 3px rgba(32,32,32,0.5) !important'
    }
  },
};

const Header = (props) => {
  const { classes, shareToggleShown, shareToggle } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.tools}>
          <Typography variant="title" color="inherit" className={classes.title}>
            Dapp Dapp Goose
          </Typography>
          <Button onClick={() => props.clickFunction()} className={classes.siteActionButtons}>Next</Button>
          <Button onClick={() => props.likeFunction()} className={classes.siteActionButtons}>
            <i className="fas fa-thumbs-up"></i>
          </Button>
          <Button onClick={() => props.dislikeFunction()} className={classes.siteActionButtons}>
            <i className="fas fa-thumbs-down"></i>
          </Button>
          <ShareDropdown shareToggleShown={shareToggleShown} shareToggle={shareToggle} className={classes.shareButton} />
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Header);
