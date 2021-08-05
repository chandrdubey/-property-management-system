import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import FormAddProperty from "./components/FormAddProperty/FormAddProperty";
import axios from "axios";
//content type to send with all POST requests
axios.defaults.headers.post["Content-Type"] = "application/json";
//authenticate to the base with the API key
axios.defaults.headers["Authorization"] = `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`;
// console.log(process.env.REACT_APP_AIRTABLE_API_KEY)
var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  "apphVtN0AhCleeM2S"
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      addProperty: false,
      properties: [],
      index: 8,
    };
  }
  componentDidMount() {
    axios(
      `https://api.airtable.com/v0/apphVtN0AhCleeM2S/Table%201?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`
    )
      .then((res) => {
        this.setState({ properties: res.data.records });
      })
      .catch((error) => console.log(error));
  }
  handleClick = (id) => {
    console.log(id);
  };
  toggleForm = () => {
    this.setState({ addProperty: !this.state.addProperty });
  };
  handleFormSubmit = (data) => {
    //  const newProperties =this.state.properties;
    //  newProperties.push(data);
    data.id = this.state.index;
    const sendData = [
      {
        fields: {
          description: data.description,
          name: data.name,
          size: data.size,
          id: data.id,
        },
      },
    ];
    base("Table 1").create(sendData, function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
    
   
    });
    this.setState({
      addProperty: false,
      index: this.state.index+1,
    })
  };
  handleDelete = (id) => {
    base("Table 1").destroy([id], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      //console.log("Deleted", deletedRecords.length, "records");
    });
    const newProperties = this.state.properties.filter(
      (data) => data.id !== id
    );
    this.setState({ properties: newProperties });
  };

  render() {

    return (
      <>
        <Navbar />
        <div className=" container">
          <h2 className="text-center home-header">All Properties</h2>

          <hr />
          {!this.state.addProperty ? (
            <div className="text-center">
              <button className="btn btn-primary" onClick={this.toggleForm}>
                {" "}
                Add New Property
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <button
                  className="btn btn-primary mb-3"
                  onClick={this.toggleForm}
                >
                  {" "}
                  Hide Form
                </button>
              </div>
              <FormAddProperty
                index={this.state.index}
                handleFormSubmit={this.handleFormSubmit}
              />{" "}
            </>
          )}
          {
            <div className="row mx-auto home">
              {this.state.properties.length > 0 ? (
                this.state.properties.map((data) => (
                  <div className="card mt-2 mx-auto" key={data.id}>
                    <div className="card-body">
                      <h5 className="card-title">{data.fields.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {data.size}
                      </h6>
                      <p className="card-text">{data.fields.description} </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h4 className="text-center mt-2">No property available</h4>
              )}
            </div>
          }
        </div>
      </>
    );
  }
}
export default App;
