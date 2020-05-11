import React from 'react';
import { withRouter } from 'react-router-dom';

import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';

// import ConnectionList from '../Containers/ConnectionList';

import './ConnectionsPage.scss';
import { ConnectionList } from '../Containers/ConnectionList';

const ConnectionsPage = () => {

    return (
        <React.Fragment>
            <PageHeader>
                <PageHeaderTitle title='Receptor Controller Active Connections'/>
            </PageHeader>
            <Main>
                <ConnectionList/>
            </Main>
        </React.Fragment>
    );
};

export default withRouter(ConnectionsPage);
