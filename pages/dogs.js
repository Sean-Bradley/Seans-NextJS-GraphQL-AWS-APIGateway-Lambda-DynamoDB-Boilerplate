import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'

class Dogs extends Component {
    // getDefaultProps() {
    //     used for function style components. for classes, use defaultProps
    // }
    // getInitialState() {
    //     used for function style componanet. for classes, use propTypes
    // }
    componentWillMount() {
        console.log("in dogs componentWillMount")
    }
    componentDidMount() {
        console.log("in dogs componentDidMount")
    }
    componentWillUnmount() {
        console.log("in dogs componentWillUnmount")
    }
    shouldComponentUpdate() {
        console.log("in dogs shouldComponentUpdate")
    }
    render() {
        return (
            <div className="container">
                <h1>Dogs</h1>
                <p>Nothing to see here, go and see {<Link href='/cats'><a>Cats</a></Link>} instead.</p>
            </div>
        );
    }
}

Dogs.propTypes = { testDefaultInt: PropTypes.number };
Dogs.defaultProps = { testDefaultInt: 0 };

export default Dogs;