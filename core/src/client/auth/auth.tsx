import * as React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Secure } from '../secure/secure';
import history from '../app.history';

export class Auth extends React.Component{
    componentDidMount() {

    }

    render() {
        return (
            <Router history={history}>
                {/* TODO: Update to insecure route in future with login system*/}
                <Route path="/" component={Secure} />
            </Router>
        );
    }
}

