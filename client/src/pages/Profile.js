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
import { useStoreContext } from '../utils/GlobalState';
import React, { useEffect, useState } from "react";
import formatDate from "../utils/helpers";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LISTINGS } from "../utils/queries";
import { ADD_LISTING } from "../utils/mutations";
import Auth from "../utils/auth";
import { idbPromise } from '../utils/helpers';
import { UPDATE_LISTINGS } from "../utils/actions";



// Updates profile page depending on user info 

function Profile() {
    const [state, dispatch] = useStoreContext();
    const [formState, setFormState] = useState({ title: "", price: "", description: "" })
    const { loading, refetch, data } = useQuery(GET_LISTINGS)
    const [addListing, { error }] = useMutation(ADD_LISTING)

    const createListing = async (event) => {
        event.preventDefault()
        // prevents the server from posting using restful APIs
        console.log(formState)
        try {
            const addedListing = await addListing({
                variables: {
                    newListing: {
                        ...formState,
                        price: JSON.parse(formState.price)
                    }
                }
            })
            refetch()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
        console.log(formState)
    }

    useEffect(() => {
        console.log('test');
        console.log(data);
        console.log(loading);


        const userObj = Auth.getProfile()
        console.log(userObj)

        if (data) {
            console.log(data);
            const filteredListings = data.listings.filter(listing => {
                return listing.user._id === userObj.data._id
            })
            dispatch({
                type: UPDATE_LISTINGS,
                listings: filteredListings,
            });
            filteredListings.forEach((listing) => {
                idbPromise('listings', 'put', listing);
            });
        } else if (!loading) {
            idbPromise('listings', 'get').then((listings) => {
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

    const listings = []

    // Renders the "Create a Listing" form
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-auto ms-1">
                        
                    </div>
                </div>

                <div className="row mt-4 d-flex justify-content-center my-5">
                    <div className="col-8 text-center">
                        <h3>Create a New Listing:</h3>

                        <form onSubmit={createListing} className="form new-listing-form container m-0">
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
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="listing-price">Price:</label>
                                <input
                                    className="form-input form-control"
                                    type="number"
                                    id="listing-price"
                                    name="price"
                                    min="0"
                                    value={formState.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="listing-desc">
                                    Description:
                                </label>
                                <textarea
                                    className="form-input form-control"
                                    id="listing-desc"
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
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

                {state?.listings.length > 0 && state?.listings.map((listing) => (
                    <div
                        key={listing._id}
                        className="container-fluid d-flex justify-content-center col-8"
                    >
                        <div className="card flex-fill mb-3">
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
                                        <h5 className="card-title">
                                            {listing.title}
                                        </h5>

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
