import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Table,
    TableHeader,
    TableBody
} from '@patternfly/react-table';

export const ConnectionList = () => {
    const [ activeConnections, setActiveConnections ] = useState([{
        account: '',
        connections: []
    }]);

    const fetchData = () => {
        fetch(`http://localhost:8010/proxy/connection`)
        .then(res => res.json())
        .then(response => {
            setActiveConnections(Object.values(response.connections));
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table
            aria-label='Connections table'
            cells={ [ 'Account', 'Number of Connections' ] }
            rows={ activeConnections.map(conn => ({
                cells: [
                    { title: <Link to={ `connections/${conn.account}` }> { conn.account } </Link> },
                    conn.connections.length
                ]
            })) }>
            <TableHeader />
            <TableBody />
        </Table>
    );
};
