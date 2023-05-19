import React, { useState, useEffect } from "react";
import ListingItem from '../components/ListingItem';
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from "@apollo/client";
import { GET_LISTINGS } from "../utils/queries";
import { idbPromise } from '../utils/helpers';

import Auth from "../utils/auth";
import formatDate from "../utils/helpers";

function HomepageHandler() {
    // const [ state, dispatch ] = useStoreContext();
    const { loading, data }  = useQuery(GET_LISTINGS)
    console.log(data)
    

   

// setHomeListings(listingData)

    // const [showAlert, setShowAlert] = useState(false);
    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //         setShowAlert(true);
    //     } else {
    //         setShowAlert(false);
    //     }
    // }, [error]);

   const listings = []

    return (
        <>
            {data?.listings.length > 0 && data.listings?.map((listing) => (
                <div
                    className="container-fluid d-flex justify-content-center"
                    style={{ width: "100%" }}
                    key={listing._id}
                >
                    <div
                        className="card mb-3 col-7 my-3"
                        style={{ maxWidth: "70%" }}
                    >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={listing.image}
                                    className="img-fluid rounded-start object-fit mx-auto d-block"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <a href={`/api/listings/${listing.id}`}>
                                        <h5 className="card-title">
                                            {listing.title}
                                        </h5>
                                    </a>

                                    {/* Show price or SOLD depending on listing.sold */}
                                    {listing.sold ? (
                                        <h6 className="text-danger font-weight-bold">
                                            SOLD
                                        </h6>
                                    ) : (
                                        <h6>${listing.price}</h6>
                                    )}

                                    <p className="card-text">
                                        {listing.description}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Posted by {listing.user?.username} on{" "}
                                            {formatDate(listing.date_created)}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HomepageHandler;
