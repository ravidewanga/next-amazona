import React, { useContext } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { Badge, AppBar, Container, createTheme, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart } = state;

    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            body1: {
                fontWeight: 'normal'
            },
        },
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000'
            },
            secondary: {
                main: '#208080'
            },
        }
    });
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
    }

    return (
        <div>
            <Head>
                <title>{title ? `${title} - Next Amazona ` : 'Next Amazona'}</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position='static' className={classes.navbar}>
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link><Typography className={classes.brand}>amazona</Typography></Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div>
                            <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    {cart.cartItems.length > 0 ? (
                                        <Badge
                                            color="secondary"
                                            badgeContent={cart.cartItems.length}
                                        >
                                            Cart
                                        </Badge>
                                    ) : (
                                        'Cart'
                                    )}
                                </Link>
                            </NextLink>
                            <NextLink href="/login">
                                <Link>Login</Link>
                            </NextLink>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>All right reserved next amazona.</Typography>
                </footer>
            </ThemeProvider>

        </div>
    )
}
