import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar';
import FormAddProperty from './components/FormAddProperty/FormAddProperty';
import properties from './constants/properties';
 class App extends Component {
   constructor(){
     super();
       this.state = {
         addProperty:false,
         properties:properties,
         index: 8
       }
   }
   handleClick = (id)=>{
      console.log(id)
   }
   toggleForm =() =>{
        this.setState({addProperty:!this.state.addProperty});
   }
  handleFormSubmit = (data) =>{
       const newProperties =this.state.properties;
       newProperties.push(data);
       data.id = this.state.index;
       console.log(newProperties)
       this.setState({
         properties: newProperties,
         addProperty:false,
         index : this.state.index +1
       });
   }
   handleDelete = (id)=>{
     const newProperties =this.state.properties.filter(data => data.id !== id);
     this.setState({properties: newProperties});
   }

  render() {
    return (
      <>
      <Navbar/>
      <div className=" container">
      <h2 className="text-center home-header">All Properties</h2>
       
      <hr />
      {!this.state.addProperty ? (<div className="text-center"><button className="btn btn-primary" onClick={this.toggleForm}> Add New Property</button></div>):
      (
        <>
        <div className="text-center"><button className="btn btn-primary mb-3" onClick={this.toggleForm}> Hide Form</button></div>
        <FormAddProperty index = {this.state.index} handleFormSubmit={this.handleFormSubmit}/> </>
      )}     
      {
        <div className="row mx-auto home">
         {this.state.properties.length > 0 ?(this.state.properties.map((data) => (
            <div className="card mt-2 mx-auto" key={data.id}>
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {data.size}
              </h6>
              <p className="card-text">{data.description} </p>
              <h6>{data.city}</h6>
              <button
                className="btn btn-primary"
                onClick={() => this.handleDelete(data.id)}
              >
                Delete
              </button>
            </div>
        </div>
          ))) : (<h4 className="text-center mt-2">No property available</h4>) } 
        </div>
      }
    </div>
      </>
    );
  }
}
export default App;
