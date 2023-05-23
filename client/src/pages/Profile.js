// const newFormHandler = async (event) => {
//     event.preventDefault();

//     const title = document.querySelector('#listing-title').value.trim();
//     const price = document.querySelector('#listing-price').value.trim();
//     const description = document.querySelector('#listing-desc').value.trim();
//     const fileInput = document.querySelector('#file-input')

//     console.log("fileInput", fileInput.files[0])

//     console.log(title, price, description)
//     const formData = new FormData();
//     formData.append("title", title)
//     formData.append("price", price)
//     formData.append("description", description)
//     formData.append("Image", fileInput.files[0])

//     if (title && price && description) {
//         const response = await fetch(`/api/listings/upload`, {
//             method: 'POST',
//             body: formData,
//             // headers: {
//             //     'Content-Type': 'multipart/form-data',
//             // },
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to create listing');
//             console.log("error", err);
//         }
//     }
// };

// document
//     .querySelector('.new-listing-form')
//     .addEventListener('submit', newFormHandler);

import React from "react";
import formatDate from "../utils/helpers";
import { useQuery } from "@apollo/client";
import { GET_LISTINGS } from "../utils/queries";
import { ADD_LISTING } from "../utils/mutations";
import Auth from "../utils/auth";




function Profile() {
    const { loading, data }  = useQuery(GET_LISTINGS)
    console.log(data)
    
    const listings = []

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-auto ms-1">
                        <h2>Welcome, {data?.username}!</h2>
                    </div>
                </div>

                <div className="row mt-4 d-flex justify-content-center my-5">
                    <div className="col-8 text-center">
                        <h3>Create a New Listing:</h3>

                        <form className="form new-listing-form container m-0">
                            <div className="form-group my-3">
                                <label
                                    htmlFor="listing-title"
                                    className="form-label"
                                >
                                    Listing Title:
                                </label>
                                <input
                                    className="form-input form-control"
                                    type="text"
                                    id="listing-title"
                                    name="listing-title"
                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="listing-price">Price:</label>
                                <input
                                    className="form-input form-control"
                                    type="number"
                                    id="listing-price"
                                    name="listing-price"
                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="listing-desc">
                                    Description:
                                </label>
                                <textarea
                                    className="form-input form-control"
                                    id="listing-desc"
                                    name="listing-desc"
                                ></textarea>
                            </div>
                            <div
                                method="POST"
                                action="/profile"
                                encType="multipart/form-data"
                                className="my-3"
                            ></div>
                            <input
                                type="file"
                                name="Image"
                                id="file-input"
                                accept="image/*"
                                className="btn btn-warning col-12"
                            />
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary my-3"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <h3 className="text-center">Your Current Listings:</h3>

                {data?.listings.length >0 && data?.listings.map((listing) => (
                    <div
                        key={listing.id}
                        className="container-fluid d-flex justify-content-center col-8"
                    >
                        <div className="card flex-fill mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {/* <a href={`/api/listings/${listing.id}`}> */}
                                        <img
                                            src={listing.image}
                                            className="img-fluid rounded-start object-fit mx-auto d-block"
                                            alt=""
                                        />
                                    {/* </a> */}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        {/* <a href={`/api/listings/${listing.id}`}> */}
                                            <h5 className="card-title">
                                                {listing.title}
                                            </h5>
                                        {/* </a> */}

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
                                                Posted on{" "}
                                                {formatDate(
                                                    listing.date_created
                                                )}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Profile;
