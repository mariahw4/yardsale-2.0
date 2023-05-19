import React, { useState, useEffect } from "react";

import { GET_LISTING } from "../utils/queries";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import format_date from "../utils/helpers";

const HomepageHandler = (event) => {
    const [getListing, { error }] = useQuery(GET_LISTING);
    // const [showAlert, setShowAlert] = useState(false);
    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //         setShowAlert(true);
    //     } else {
    //         setShowAlert(false);
    //     }
    // }, [error]);

    return (
        <>
            {listings.map((listing) => (
                <div
                    className="container-fluid d-flex justify-content-center"
                    style={{ width: "100%" }}
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
                                            Posted by {listing.user.name} on{" "}
                                            {format_date(listing.date_created)}
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
