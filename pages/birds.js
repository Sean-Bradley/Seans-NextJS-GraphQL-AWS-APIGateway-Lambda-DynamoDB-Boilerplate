import React, { Component } from 'react';
import Link from 'next/link'

class Birds extends Component {
    render() {
        return (
            <div className="container">
                <h1>Birds</h1>
                <p>Nothing to see here, go and see {<Link href='/cats'><a>Cats</a></Link>} instead.</p>
            </div>
        );
    }
}
export default Birds;