import { Button } from 'react-bootstrap';
import React from 'react';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      div1Shown: true,
      test: true,
      productData: [],
      cart: [],
    };
  }
  addTodo = (event) => {
    this.setState({
      arr: this.state.cart.push(event),
    });
    this.itemCount = this.state.cart.length;
    console.log(this.state.cart);
  };
  detTodo = (event) => {
    this.setState({
      arr: this.state.cart.shift(event),
    });
    this.itemCount = this.state.cart.length;
    console.log(this.state.cart);
  };
  cartTodo = (event) => {
    console.log(event);
    this.setState({
      div1Shown: false,
    });
  };
  delete(itemToDelete) {
    this.setState((state) => ({
      cart: state.cart.filter((item) => itemToDelete !== item),
    }));
  }
  prdTodo = (event) => {
    this.setState({
      div1Shown: true,
    });
    console.log(this.state.div1Shown);
  };
  componentDidMount() {
    let axios = require('axios');
    axios
      .get('https://freeestoreapi.herokuapp.com/api/v1/products')
      .then((response) => {
        const d = response.data;
        this.setState({ productData: d.data.products });
        console.log(d.data.products);
      });
  }

  render() {
    return this.state.div1Shown ? (
      <div className="container">
        <h5>Product Details</h5>{' '}
        <Badge color="secondary" badgeContent={this.itemCount}>
          <ShoppingCartIcon onClick={() => this.cartTodo(this.state.cart)} />{' '}
        </Badge>
        <Button
          style={{ marginLeft: '2px' }}
          type="button"
          onClick={() => this.cartTodo(this.state.cart)}
        >
          View cart
        </Button>
        <div className="row">
          {this.state.productData.map((product) => (
            <div className="card d-flex col-3 mydel" key={product.id}>
              <img
                className="card-img-top"
                src={`https://freeestoreapi.herokuapp.com/images/products/${product.images[0]}`}
              />
              <p>{product.name}</p>
              <p className="btn btn-primary">₹{product.price}</p>
              <Button
                style={{ marginTop: '12%' }}
                onClick={() => this.addTodo(product)}
                className="success"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>
        {' '}
        <Badge color="secondary" badgeContent={this.itemCount}>
          <ShoppingCartIcon onClick={() => this.cartTodo(this.state.cart)} />{' '}
        </Badge>
        <Button
          style={{ marginLeft: '2px' }}
          type="button"
          onClick={() => this.prdTodo()}
        >
          go to products
        </Button>
        <div className="row">
          {this.state.cart.map((product) => (
            <div className="card d-flex col-3 mydel" key={product.id}>
              <img
                className="card-img-top"
                style={{ size: '2px' }}
                src={`https://freeestoreapi.herokuapp.com/images/products/${product.images[0]}`}
              />
              <p className="card-body">{product.name}</p>
              <p className="btn btn-primary">₹{product.price}</p>

              <button onClick={() => this.detTodo(product)}>remove</button>
            </div>
          ))}
          {this.state.cart.length === 0 && (
            <p className="card-body" style={{ marginLeft: '50px' }}>
              No items in your cart
            </p>
          )}
        </div>
      </div>
    );
  }
}
