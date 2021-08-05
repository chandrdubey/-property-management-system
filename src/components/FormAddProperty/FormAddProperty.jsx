import React, {Component} from "react";

class FormAddProperty extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            name: "",
            size:""
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      };
      handleOnSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            description: this.state.description,
            size: this.state.size,
        };
        this.props.handleFormSubmit(data);
       
      };
    render() {
       
        return (
            <div className="formStyle text-center mx-auto">
                <form className="form-style mx-auto "
                    onSubmit={
                        this.handleOnSubmit
                }>
                    <h3 className="text-center">New Job</h3>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" name="name"
                            value={
                                this.state.name
                            }
                            placeholder="name"
                            onChange={
                                this.handleChange
                            }/>
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" name="description"
                            value={
                                this.state.description
                            }
                            placeholder="Description"
                            onChange={
                                this.handleChange
                            }/>
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" name="size"
                            value={
                                this.state.size
                            }
                            placeholder="size"
                            onChange={
                                this.handleChange
                            }/>
                    </div>
                    <button type="submit" className=" btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default FormAddProperty;
