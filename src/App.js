import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: [],
    };
    // console.log('hi...');
  }
  componentDidMount() {
    // console.log('hi123');
    let axios = require('axios');
    axios
      .get('https://freeestoreapi.herokuapp.com/api/v1/products')
      // .get(' https://jsonplaceholder.typicode.com/photos')

      .then((response) => {
        // handle success
        //   console.log(JSON.stringify(response.data));
        const d = response.data;
        this.setState({ productData: d.data.products });
        console.log(d.data.products);
      });
    /* fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          userData: json,
        });
      });*/
    //  console.log(this.state.userData);
  }
  render() {
    return (
      <div className="container">
        <h1> Fetch data from an api in react </h1>{' '}
        <div className="row">
          {this.state.productData.map((product) => (
            <div className="card d-flex col-3 mydel" key={product.id}>
              <img
                className="card-img-top"
                src={`https://freeestoreapi.herokuapp.com/images/products/${product.images[0]}`}
              />
              <p className="card-body">{product.name}</p>
              <p className="btn btn-primary">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
