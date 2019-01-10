import * as React from 'react';
import { connect } from 'react-redux';

import { DashboardHeader } from './dashboard-header/dashboard-header';
import { DashboardContent } from './dashboard-content/dashboard-content';

import './dashboard.scss';
import { AppReducerState } from '../../app.reducer';
import * as actions from '../secure.actions';

export interface DashboardProps { }

class DashboardComponent extends React.Component<DashboardProps, {}> {
    placeholder() {

    }

    render() {
        return (
            <div className="dashboard" >
                <DashboardHeader />
                <DashboardContent />
            </div>
        );
    }
}

const mapPropsToDispatch = ({ secure: { trackers }}: AppReducerState) => ({
    trackers,
});

const mapDispatchToProps = (dispatch: Function) => ({
    openEditor: () => dispatch(actions.InitializeEditorAction()),
});

export const Dashboard = connect(mapPropsToDispatch, mapDispatchToProps)(DashboardComponent);
