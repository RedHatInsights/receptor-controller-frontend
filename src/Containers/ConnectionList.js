// Pretend this calls an API to fetch this data

import React from 'react';
import { Link } from 'react-router-dom';

import {
    Table,
    TableHeader,
    TableBody
} from '@patternfly/react-table';

const columns = [
    'id',
    'Name'
];

// For some reason if you want to use a tag inside of PF's table, you use "title"
const rows = [
    {
        cells: [
            { title: <Link to={ '/connections/sample-id' }> this is a sample id </Link> },
            'Sample Title'
        ]
    },
    {
        cells: [
            { title: <Link to={ '/connections/foo-bar' }> this is a foobar </Link> },
            'Foo bar'
        ]
    }
];

export const ConnectionList = () => {

    return (
        <Table aria-label='Connections table' cells={ columns } rows={ rows }>
            <TableHeader />
            <TableBody />
        </Table>
    );
};
