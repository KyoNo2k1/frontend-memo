import React, { useState,useEffect } from 'react'
import { AppBar,Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import memoriesLogo from '../../images/logoImage.jpg'
import memoriesText from '../../images/textImage.png'
import * as actionType from '../../constants/actionType'
import useStyles from './styles'
import Form from '../Form/Form'

function Navbar() {
    const classes = useStyles()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [currentId, setCurrentId] = useState(null)

    const logout = () => {
        const action = {
            type: actionType.LOGOUT,
        }
        dispatch(action)

        navigate('/');

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const handleSignIn = () => {
        navigate('/auth')
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.img} src={memoriesText} alt="icon" height="60" />
                <img className={classes.img} src={memoriesLogo} alt="text" height="70" />
            </Link>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button onClick={handleSignIn} variant="contained" color="primary" className={classes.btnSignIn}>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
