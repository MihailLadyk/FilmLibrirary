import { Component } from "react";

export default class Searchbar extends Component {
  state = {
    querry: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.querry);
    this.setState({ querry: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="search"
          name="querry"
          placeholder="Search for movies"
          value={this.state.querry}
          onChange={this.handleChange}
        ></input>
        <button type="submit">Search</button>
      </form>
    );
  }
}
