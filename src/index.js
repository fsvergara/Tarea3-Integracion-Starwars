import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core'

import Film from './Film';
import Planet from './Planet';
import Person from './Person';
import Starship from './Starship';

const routes = <Router>
                    <AppBar position="static" color="default">
                    <Toolbar>
                    <div style = {{marginLeft: '1%'}}>
                    <Typography variant="h6" color="primary">
                    <Button>
                    <a href={"/"}>
                        Home
                    </a>
                    </Button>
                    </Typography>
                    </div>
                    <div style = {{marginLeft: '39%'}}>
                    <Typography variant="h6" color="primary" align='center'>
                    Tarea III IIC3103 - Francisco Vergara M.
                    </Typography>
                    </div>
                    </Toolbar>
                    </AppBar>
                    <Route path="/" exact component={App} />
                    <Route path="/films/:id" component={Film} />
                    <Route path="/planet/:id" component={Planet} />
                    <Route path="/person/:id" component={Person} />
                    <Route path="/starship/:id" component={Starship} />

                </Router>



ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
