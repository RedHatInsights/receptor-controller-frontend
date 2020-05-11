import './connections-component.scss';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */
const ConnectionsComponent = (props) => {
    return (
        <span className='connections-component'> { props.children } </span>
    );
};

ConnectionsComponent.displayName = 'ConnectionsComponent';

ConnectionsComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ConnectionsComponent;
