import * as React from 'react';
import './dashboard-header.scss';

import { Logo } from '../../../shared/logo/logo';

export interface DashboardHeaderProps { }

export const DashboardHeader = () => (
    <header className="dashboard-header">
        <div className="center-content">
            <Logo />
            <nav>
                <div>My Account</div>
            </nav>
        </div>
    </header>
);
