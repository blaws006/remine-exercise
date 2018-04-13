import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API'

class Test extends Component {
    render() {
        return (
            <div className="testContainer">
                <div className="filterContainer">
                   <h3>Beds</h3>
                   <input name="maxbeds" placeholder="Max"/><br /><br />
                   <input name = "minbeds"  placeholder = "Min" />
                   <h3>Baths</h3> 
                   <input name = "maxbeds" placeholder = "Max"/><br/><br/>
                    <input name = "minbeds" placeholder = "Min" /><br /><br />
                    <button>Submit</button>
                </div>
                <RemineTable properties={[]} />
            </div>
        );
    }
}

export default Test;
