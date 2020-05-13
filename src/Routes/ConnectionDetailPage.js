import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';

import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

import './ConnectionDetailPage.scss';
import { ConnectionDetails } from '../Containers/ConnectionDetails';

const ConnectionDetailPage = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <PageHeader>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to={ `/` }>Connections</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isActive> { props.match.params.id }</BreadcrumbItem>
                </Breadcrumb>
                <PageHeaderTitle title={ `Active connections for account ${props.match.params.id}` }/>
            </PageHeader>
            <Main>
                <ConnectionDetails id={ props.match.params.id } />
            </Main>
        </React.Fragment>
    );
};

ConnectionDetailPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

export default withRouter(ConnectionDetailPage);
