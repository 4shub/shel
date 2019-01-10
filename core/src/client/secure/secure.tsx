import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Dashboard } from './dashboard/dashboard';

export interface SecureProps { match: string }

export class Secure extends React.Component<SecureProps, {}> {
    render() {
        const { match } = this.props;

        return (
            <div>
                <Route exact path="/" component={Dashboard} />
            </div>
        );
    }
}
