import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ShareDropdown from '../sharedropdown/index.js';

const styles = {
  root: {
    display: 'flex',
    background: 'linear-gradient(#3d3c38 80%, #605e59)',
    height: '50px',
    width: '100%',
    alignItems: 'space-evenly',
  },
  tools: {
    minHeight: '50px',
  },
  siteActionButtons: {
    margin: 'auto',
    color: '#fff',
    background: '#318FC2',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#1f5e80',
      boxShadow: 'inset 3px 3px rgba(31,93,128,0.5)'
    }
  },
  shareButton: {
    color: 'white',
  },
  title: {
    fontSize: '1em',
  },
  menuButton: {
    marginLeft: 'auto',
    height: '30px',
    width: '30px',
    marginRight: '0',
    '&:hover': {
      height: '30px',
      width: '30px',
      borderRadius: '6px',  
      backgroundColor: '#202120',
      boxShadow: '3px 3px rgba(32,32,32,0.5)'
    }
  },
};

const Header = (props) => {
  const { classes } = props;
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
          <ShareDropdown className={classes.shareButton} />
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
