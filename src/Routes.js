import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import ConnectionsPage from './Routes/ConnectionsPage';
import ConnectionDetailPage from './Routes/ConnectionDetailPage';

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
    root.setAttribute('role', 'main');

    return (<Route { ...rest } component={ Component } />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

export const routes = {
    connections: '/connections',
    connectionDetails: '/connections/:id'
};

export const Routes = () => (
    <Switch>
        <InsightsRoute exact path={ routes.connections } component={ ConnectionsPage } rootClass='connections' />
        <InsightsRoute exact path={ routes.connectionDetails } component={ ConnectionDetailPage } rootClass='connection-details' />
        <Redirect path='*' to={ routes.connections } push />
    </Switch>
);

Routes.propTypes = {
    childProps: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func
        })
    })
};
