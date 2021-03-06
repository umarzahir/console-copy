import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

// import { Link } from "react-router-dom";
import { creatAdmin } from "../../actions/adminAction";
class Register extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      imageUrl: null,
      selectedFile: null,
      imageData: null,
      error: "",
    };
  }
  componentDidUpdate = () => {
    if (this.props.signupMessage === "Signup Success") {
      this.props.history.push("/dashboard");
    }
  };
  handleSignup = (event) => {
    event.preventDefault();
    console.log("signup event", event);
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("The Passwords Dont Match. Please Try again!");
    } else {
      this.setState({
        error: "",
      });
      this.props.signup(this.state);
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };
  onDismiss = () => {
    this.setState({ visible: false });
  };
  onChange(e) {
    const tempUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0], imageUrl: tempUrl });
    console.log("image upload", e.target.files[0]);
  }
  render() {
    return ( 
     
      <div className="d-flex m-auto form-container text-left flex-wrap">
        <div className="w-100">
        {this.props.visible && this.props.signupMessage.trim() === "Admin Created." ?
        setTimeout(() =>{  this.props.history.push("/") }, 3000)
        : null}
          <div className="">
            <h1>New Agency Account</h1>
          </div>
          <form onSubmit={this.handleSignup} className="col-12 form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={this.handleChange}
                name="name"
                value={this.state.name}
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password1">Password</label>
              <input
                onChange={this.handleChange}
                name="password1"
                type="password"
                value={this.state.password1}
                className="form-control"
                id="password1"
                required
              />
              <p className="text-danger font-weight-bold">{this.state.error}</p>
              <label htmlFor="password2">Repeat Password</label>
              <input
                onChange={this.handleChange}
                name="password2"
                type="password"
                value={this.state.password2}
                className="form-control"
                id="password2"
                required
              />
              <label>Upload Image</label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={this.onChange}
                required
              />
              {this.state.imageUrl ? (
                <img
                  style={{ width: "70%", paddingTop: 10 }}
                  src={this.state.imageUrl}
                  alt=""
                />
              ) : (
                <img src={this.state.imageSrc} alt="" />
              )}
            </div>
            <div className="form-footer w-100 d-flex">
              <Alert
                color="info"
                isOpen={this.props.visible}
                toggle={this.onDismiss}
              >
                {this.props.signupMessage}
              </Alert>

              <Button variant="primary" type="submit">
                {this.props.signupState ? "Loading" : "SignUp"}
              </Button>
              {/* <Link type="submit" to='/login' className="btn btn-primary form-button">Submit</Link> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signupState: state.admin.isAdminLoding,
    signupMessage: state.admin.adminSignupMessage,
    visible: state.admin.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (data) => {
      dispatch(creatAdmin(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
