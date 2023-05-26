import React, { useState, useEffect } from "react";
import ListingItem from "../components/ListingItem";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { GET_LISTINGS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import { UPDATE_LISTINGS } from "../utils/actions";
import spinner from "../assets/spinner.gif";
import Cart from "../components/Cart";
import Auth from "../utils/auth";
import formatDate from "../utils/helpers";

// Updates homepage depending on user input
function HomepageHandler() {
  const [state, dispatch] = useStoreContext();
  const { loading, data, error } = useQuery(GET_LISTINGS);
  console.log(data);

 

  useEffect(() => {
    console.log("test");
    if (data) {
      console.log(data);
      dispatch({
        type: UPDATE_LISTINGS,
        listings: data.listings,
      });
      data.listings.forEach((listing) => {
        idbPromise("listings", "put", listing);
      });
    } else if (!loading) {
      idbPromise("listings", "get").then((listings) => {
        dispatch({
          type: UPDATE_LISTINGS,
          listings: listings,
        });
      });
    }
  }, [data, loading, dispatch]);

  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }

  const listings = [];

  // maps thru listings on homepage to display each listing's info
  return (
    <>
      <div className="my-2">
        <Cart />
        <h2>Our Products:</h2>
        {state.listings.length ? (
          <div className="flex-row">
            {state.listings.map((listing) => (
              <ListingItem
                key={listing._id}
                _id={listing._id}
                image={listing.image}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                quantity={listing.quantity}
                date_created={listing.date_created}
                username={listing?.user?.username}
              />
            ))}
          </div>
        ) : (
          <h3>You haven't added any products yet!</h3>
        )}
        {loading ? <img src={spinner} alt="loading" /> : null}
      </div>
    </>
  );
}

export default HomepageHandler;
