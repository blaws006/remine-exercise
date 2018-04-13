import React, {
    Component
} from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API'

class Test extends Component {
    componentDidMount() {
        this.getLocations();
        this.getBuildingTypes();
    }

    state = {
        property: [],
        buildingTypes: [],
        maxbeds: 0,
        minbeds: 0,
        maxbaths: 0,
        minbaths: 0,
        buildingTypeSelected: 'All',
        list: []
    }

    getLocations = () => {
        API.getLocations()
            .then(res => {
                this.setState({
                    property: res.data,
                    list: res.data
                });

            })
            .catch(err => console.log(err));
    };

    getBuildingTypes = () => {
        API.getBuildingTypes()
            .then(res => {
                this.setState({
                    buildingTypes: res.data
                });
            })
    };
    render() {
        return ( <div className = "testContainer">
            <div className = "filterContainer" >
            <h3 >Beds </h3> <input name = "maxbeds"
            placeholder = "Max" /> <br /> <br />
            <input name = "minbeds"
            placeholder = "Min" />
            <h3 >Baths </h3>  
            < input name = "maxbaths"
            placeholder = "Max" /> <br /> <br />
            <input name = "minbaths"
            placeholder = "Min" /> <br /> <br />
            <button>Submit</button> 
            </div> 
            <RemineTable properties = { [] } /> 
            </div>
        );
    }
}

export default Test;