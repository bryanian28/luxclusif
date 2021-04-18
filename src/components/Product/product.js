import React from "react";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./product.module.css";

class product extends React.Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      savePhoto: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }
  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ ...this.props.item });
      this.fileArray = [];
      this.fileObj = [];
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.file);

    let id = "_" + Math.random().toString(36).substr(2, 9);
    let data = {
      ...this.state,
      id: this.state.id === null ? id : this.state.id,
    };
    console.log(data);

    event.target.reset();
    this.props.clicked(data);
  };
  handleInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  uploadMultipleFiles(e) {
    // if (e.target.files.length > this.state.photo) {
    //   alert(`Only ${this.state.photo} files accepted.`);
    //   this.fileObj = []
    //   return;
    // }
    this.fileObj.push(e.target.files);

    for (const value of this.fileObj[0]) {
      this.fileArray.push(URL.createObjectURL(value));
    }

    this.setState({
      file:
        this.state.file.length > 1
          ? [...this.state.file, ...this.fileArray]
          : this.fileArray,
    });
    this.fileObj = [];
    this.fileArray = [];
  }
  remove = (file) => {
    const filter = this.state.file.filter((item) => item !== file);
    this.setState({ file: filter });
  };
  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <Input
            id="name"
            label="Name"
            type="text"
            value={this.state.name || ""}
            onChange={this.handleInputChange}
          />
          <Input
            id="brand"
            label="Brand"
            type="text"
            value={this.state.brand || []}
            onChange={this.handleInputChange}
          />
          <Input
            id="description"
            label="Description"
            type="text"
            value={this.state.description || ""}
            onChange={this.handleInputChange}
          />
          <Input
            id="color"
            label="Color"
            type="text"
            value={this.state.color || ""}
            onChange={this.handleInputChange}
          />

          <input type="file" onChange={this.uploadMultipleFiles} multiple />
          <div className={classes.image_Preview}>
            {(this.state.file || []).map((url, index) => (
              <div className={classes.container_Image} key={index}>
                <span
                  className={classes.close}
                  onClick={() => this.remove(url)}
                >
                  &times;
                </span>
                <img
                  className={classes.image}
                  src={url}
                  width="100"
                  alt="..."
                />
              </div>
            ))}
          </div>
          <Button type="submit">
            {this.props.item.edit ? "Update" : "Submit"}
          </Button>
        </form>
      </>
    );
  }
}

export default product;
