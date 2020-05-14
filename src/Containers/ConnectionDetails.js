import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';

import {
    Table,
    TableHeader,
    TableBody,
    cellWidth
} from '@patternfly/react-table';
import { red } from 'color-name';

export const ConnectionDetails = (id) => {
    console.log(id);
    const [ accountConnections, setAccountConnections ] = useState([]);
    const [ nodeStatus, setNodeStatus ] = useState({
        status: '',
        capabilities: {}
    });

    // const ping = (data) => {
    //     fetch(`http://localhost:9090/connection/ping`, {
    //         method: 'POST',
    //         mode: 'no-cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     });
    // };

    const getStatusPlaceholder = () => {
        setNodeStatus({ status: 'connected', capabilities: 'max_work_threads:12' });
    };

    const getStatus = (data) => {
        fetch(`http://localhost:8010/connection/status`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            setNodeStatus(response);
            console.log('NODE STATUS: ', nodeStatus);
        })
        .catch(error => console.log(error));
    };

    const fetchData = () => {
        fetch(`http://localhost:8010/proxy/connection/${id.id}`)
        .then(res => res.json())
        .then(response => {
            setAccountConnections(Object.values(response.connections));
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
        getStatusPlaceholder();
        getStatus({ account: id.id, node_id: 'node-a' }); /*eslint-disable-line*/
    }, []);

    return (
        <React.Fragment >
            <Table
                aria-label='Connection details table'
                cells={ [
                    { title: 'Node-ID', transforms: [ cellWidth(25) ]},
                    { title: 'Status', transforms: [ cellWidth(25) ]},
                    { title: 'Capabilities', transforms: [ cellWidth(25) ]}] }
                rows={ accountConnections.map(conn => ({
                    cells: [
                        conn,
                        nodeStatus.status,
                        nodeStatus.capabilities
                    ]
                })) }
                actions={ [
                    { title: 'Ping node', onClick: console.log('ping') },
                    { isSeparator: true },
                    { title: 'Disconnect node', color: red, onClick: console.log('disconnect')}] }> {/*eslint-disable-line*/}
                <TableHeader />
                <TableBody />
            </Table>
        </React.Fragment>
    );
};
