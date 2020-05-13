import React, { useState, useEffect } from 'react';
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

    const getStatus = (data) => {
        fetch(`http://localhost:9090/connection/status`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            setNodeStatus(response);
            console.log('RESPONSE: ', response);
        })
        .catch(error => console.log(error));
    };

    const fetchData = () => {
        fetch(`http://localhost:9090/connection/${id.id}`)
        .then(res => res.json())
        .then(response => {
            setAccountConnections(Object.values(response.connections));
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
        getStatus({ account: id.id, node_id: 'node-a' }); /*eslint-disable-line*/
    }, []);

    console.log('NODE STATUS: ', nodeStatus);

    return (
        <React.Fragment >
            <Table
                aria-label='Connection details table'
                cells={ [ 'Node-ID',
                    { title: 'Status', transforms: [ cellWidth(25) ]},
                    { title: 'Capabilities', transforms: [ cellWidth(25) ]}] }
                rows={ accountConnections.map(conn => ({
                    cells: [
                        conn,
                        'connected',
                        'max_work_threads: 12'
                    ]
                })) }
                actions={ [
                    { title: 'Ping node', onClick: console.log('ping') }] }> {/*eslint-disable-line*/}
                <TableHeader />
                <TableBody />
            </Table>
        </React.Fragment>
    );
};
