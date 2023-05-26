import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import Auth from "../utils/auth";
import formatDate from "../utils/helpers";
import Button from 'react-bootstrap/Button';

// renders individual listing on the homepage
function ListingItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    title,
    _id,
    price,
    description,
    date_created,
    sold,
    quantity,
    username
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        listing: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div
    className="container-fluid d-flex justify-content-center"
    style={{ width: "100%" }}
    key={_id}
>
    <div
        className="card mb-3 col-7 my-3"
        style={{ maxWidth: "70%" }}
    >
        <div className="row g-0">
            <div className="col-md-4">
                <img
                    src={image}
                    className="img-fluid rounded-start object-fit mx-auto d-block"
                    alt=""
                />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    {/* <a href={`/api/listings/${_id}`}> */}
                        <h5 className="card-title">
                            {title}
                        </h5>
                    {/* </a> */}

                    {/* Show price or SOLD depending on sold */}
                    {sold ? (
                        <h6 className="text-danger font-weight-bold">
                            SOLD
                        </h6>
                    ) : (
                        <h6>${price}</h6>
                    )}

                    <p className="card-text">
                        {description}
                    </p>
                    <p className="card-text">
                        <small className="text-muted">
                            Posted by {username} on{" "}
                            {formatDate(date_created)}
                        </small>
                    </p>
                    <Button variant="primary" onClick={addToCart}>Add to Cart</Button>{' '}
                    <Button variant="danger">Flag</Button>{' '}
                    
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default ListingItem;
