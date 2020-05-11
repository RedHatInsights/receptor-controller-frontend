import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';
import './connections.scss';

import { Section, Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';

import { Button } from '@patternfly/react-core';

const ConnectionsComponent = asyncComponent(() => import('../../PresentationalComponents/ConnectionsComponent/connections-component'));
// const PageHeader2 = asyncComponent(() => import('../../PresentationalComponents/PageHeader/page-header'));
// const PageHeaderTitle2 = asyncComponent(() => import('../../PresentationalComponents/PageHeader/page-header-title'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class Connections extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Receptor Controller Active Connections'/>
                    <p> This is page header text </p>
                </PageHeader>
                <Main>
                    <h1> Connections Component </h1>
                    <ConnectionsComponent> Connections Component </ConnectionsComponent>
                    <h1> Cards </h1>
                    <h1> Buttons </h1>
                    <Section type='button-group'>
                        <Button variant='primary'> PF-Next Primary Button </Button>
                        <Button variant='secondary'> PF-Next Secondary Button </Button>
                        <Button variant='tertiary'> PF-Next Tertiary Button </Button>
                        <Button variant='danger'> PF-Next Danger Button </Button>
                    </Section>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(Connections);
