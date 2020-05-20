import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications';
//import { Link } from 'react-router-dom';

import {
    Table,
    TableHeader,
    TableBody,
    cellWidth
} from '@patternfly/react-table';

export const ConnectionDetails = (id) => {
    console.log(id);
    const [ accountConnections, setAccountConnections ] = useState([]);
    const [ accountsLoaded, setAccountsLoaded ] = useState(false);
    const [ nodeStatus, setNodeStatus ] = useState({});
    const [ loadTable, setLoadTable ] = useState(false);

    const dispatch = useDispatch();

    const ping = (data) => {
        dispatch(
            addNotification({
                variant: 'info',
                title: `Sending Ping to ${data.node_id}`
            })
        );

        fetch(`http://localhost:9001/connection/ping`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if (response.status === 400) {
                dispatch(
                    addNotification({
                        variant: 'danger',
                        title: `${response.title} for ${data.node_id}`,
                        description: `${response.detail}`
                    })
                );
            }
            else {
                dispatch(
                    addNotification({
                        variant: 'success',
                        title: `Ping sent to ${data.node_id}` // will add description once ping is updated in receptor
                    })
                );
            }
        })
        .catch(error => console.log(error));

    };

    const disconnect = (data) => {
        dispatch(
            addNotification({
                variant: 'info',
                title: `Sending disconnect request to ${data.node_id}`
            })
        );

        fetch(`http://localhost:9001/connection/disconnect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if (response.status === 400) {
                dispatch(
                    addNotification({
                        variant: 'danger',
                        title: `${response.title} for ${data.node_id}`,
                        description: `${response.detail}`
                    })
                );
            }
            else {
                dispatch(
                    addNotification({
                        variant: 'success',
                        title: `${data.node_id} disconnected`
                    })
                );
            }
        })
        .catch(error => console.log(error));
    };

    async function getStatus(conn) {
        let response = await fetch(`http://localhost:9001/connection/status`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account: id.id, node_id: conn }) /*eslint-disable-line*/
        });
        let returnData = await response.json();
        return returnData;
    }

    const fetchData = () => {
        fetch(`http://localhost:9001/connection/${id.id}`)
        .then(res => res.json())
        .then(response => {
            setAccountConnections(Object.values(response.connections));
            setAccountsLoaded(true);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        accountConnections.map(conn => {
            getStatus(conn).then(data =>
                setNodeStatus((nodeStatus) => ({ ...nodeStatus, [conn]: data }))
            );
        });
    }, [ accountsLoaded ]);

    useEffect(() => {
        if (Object.keys(nodeStatus).length >= accountConnections.length && accountConnections.length >= 1) {
            setLoadTable(true);
        }
    }, [ Object.keys(nodeStatus).length ]);

    return (
        <React.Fragment >
            { loadTable
                ? <Table
                    aria-label='Connection details table'
                    cells={ [
                        { title: 'Node-ID', transforms: [ cellWidth(25) ]},
                        { title: 'Status', transforms: [ cellWidth(25) ]},
                        { title: 'Capabilities', transforms: [ cellWidth(25) ]}] }
                    rows={ accountConnections.map(conn => ({
                        cells: [
                            conn,
                            nodeStatus[conn].status,
                            'max work threads: ' + nodeStatus[conn].capabilities.max_work_threads
                        ],
                        type: conn
                    })) }
                    actions={ [
                        {
                            title: 'Ping node',
                            onClick: (event, rowId, rowData) => { {/*eslint-disable-line*/}
                                ping({ account: id.id, node_id: rowData.type }) /*eslint-disable-line*/
                            }
                        },
                        { isSeparator: true },
                        {
                            title: 'Disconnect node',
                            onClick: (event, rowId, rowData) => { {/*eslint-disable-line*/}
                                disconnect({ account: id.id, node_id: rowData.type }) /*eslint-disable-line*/
                            }
                        }
                    ] }>
                    <TableHeader />
                    <TableBody />
                </Table>
                : <div>loading...</div>
            }
        </React.Fragment>
    );
};
