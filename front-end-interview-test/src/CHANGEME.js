import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API'

// Helps set initial values
let bedmin = 0; 
let bedmax = 0;
let bathmax = 0;
let bathmin = 0;

class Test extends Component {

    // This sets the initial state
    state = {
        property: [],
        buildings: [],
        bedmax: 0,
        bedmin: 0,
        bathmax: 0,
        bathmin: 0,
        buildingTypeSelected: "All",
        list: []
    };

    // This executes our API functions
    componentDidMount() {
        this.getLocations();
        this.getBuildingTypes();
    }

 
// API function that grabs property locations
    getLocations = () => {
        API.getLocations()
            .then(res => {
                this.setState({
                    property: res.data,
                    list: res.data
                })
                this.init();
            })
            .catch(err => console.log(err));
    };
// API function that grabs the different building types
    getBuildingTypes = () => {
        API.getBuildingTypes()
            .then(res => 
                this.setState({
                    buildings: res.data
                })
            )
    };

    // This function sets the min and max for beds and baths
    init = () => {
        let beds = [];
        let baths = [];

        //Continues to loop through null 
        for (var i = 0; i < this.state.property.length; i++){
            if(this.state.property[i].beds === null || this.state.property[i].baths === null) {
                continue;
            }
            // push bed and bath query into the arrays
            beds.push(parseInt(this.state.property[i].beds, 10));
            baths.push(parseInt(this.state.property[i].baths, 10));
        };

       
        bedmax = Math.max.apply(null, beds);
        bathmax = Math.max.apply(null, baths);
        bedmin = Math.min.apply(null, beds);
        bathmin = Math.min.apply(null, baths);

    
        this.setState({bedmax: Math.max.apply(null, beds)});
        this.setState({bedmin: Math.min.apply(null, beds)});
        this.setState({bathmax: Math.max.apply(null, baths)});
        this.setState({bathmin: Math.min.apply(null, baths)});
    };

    // Handles all input values
    handleEvent = event => {
        if(event.target.value === ''){
            let blanks = eval(event.target.name);
            this.setState({[event.target.name]: blanks});
        } else {
            this.setState({[event.target.name] : event.target.value});
        }
       
    };

    // Filters lists based on specified ranges
    listFilter = () => {
        let list = [];
        let bed;
        let bath;
      
        for (var i = 0; i < this.state.property.length; i++) {
            bed = this.state.property[i].beds === null ? 0 : this.state.property[i].beds;
            bath = this.state.property[i].baths === null ? 0 : this.state.property[i].baths;

            if (
                (parseInt(bed, 10) >= this.state.bedmin && parseInt(bed, 10) <= this.state.bedmax) && (parseInt(bath, 10) >= this.state.bathmin && parseInt(bath, 10) <= this.state.bathmax)
            ) {
                if (this.state.buildingTypeSelected === "All") {
                    list.push(this.state.property[i])
                }
                if (this.state.buildingTypeSelected !== "All" && this.state.property[i].buildingType.name === this.state.buildingTypeSelected) {
                    list.push(this.state.property[i]);
                }
            } 
        }
        this.setState({list: list})
    }
    render() {
        return ( <div className = "testContainer">
            <div className = "filterContainer" >
            <h3 >Beds </h3> 
            <input type="number" name="bedmin" placeholder="Min" onChange={this.handleEvent} /> <br /> <br />
            <input type="number" name="bedmax" placeholder="Max" onChange={this.handleEvent} />
            
            <h3 >Baths </h3>  
                <input type="number" name="bathmin" placeholder="Min" onChange={this.handleEvent} /> <br /> <br />
                <input type="number" name="bathmax" placeholder="Max" onChange={this.handleEvent} /> <br /> <br />
            
            <select onChange={this.handleEvent} name="buildingTypeSelected">
               <option value="All">All</option>
                     {this.state.buildings.map(building => (
                   <option key={building.id} value={building.name}>
                    {building.name}
                   </option>
               ))} 
            </select><br /><br />
            <button onClick={this.listFilter}>Submit</button> 
            </div> 
            <RemineTable properties={this.state.list} /> 
            </div>
        );
    }
}

export default Test;