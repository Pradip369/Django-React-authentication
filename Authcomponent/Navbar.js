import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <NavLink className='navbar__btn' to="/" exact activeClassName="mylink"><HomeIcon /></NavLink>
                    <Typography variant="h6" className={classes.title}>
                        Authentication
                    </Typography>

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;