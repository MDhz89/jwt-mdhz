import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";

export const ProfileSeller = () => {
    const { store, actions } = useContext(Context);
    
    const [sellerProfile, setSellerProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

   

    const getSellerProfile = () => {
        const token = actions.verifyTokenSeller();

        if (!token) {
            console.error("No valid token found. User might need to log in.");
            navigate("/private");
            return;
        }

        fetch(`${process.env.BACKEND_URL}/api/seller/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch seller profile");
                return response.json();
            })
            .then((data) => {
                
                setSellerProfile(data);
                setEditData({
                    name: "paco" || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    bank_account: data.bank_account || '',
                });
            })
            .catch((error) => console.error("Error:", error));
    };

    

    
    const handleProfileUpdate = () => {
        const token = actions.verifyTokenSeller();

        fetch(`${process.env.BACKEND_URL}/api/seller/profile/edit`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editData),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to update profile");
                setIsEditing(false);
                getSellerProfile();
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        getSellerProfile();
    }, []); 

    return (
        <div className="container profile py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card-black body-card">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="mb-0 t">Seller Profile</h3>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="btn-group w-100 mb-4">
                                <button 
                                    onClick={() => setIsEditing(false)} 
                                    className={`btn ${!isEditing ? 'btn-purple' : 'btn-none'}`}
                                >
                                    View Profile
                                </button>
                                <button 
                                    onClick={() => setIsEditing(true)} 
                                    className={`btn ${isEditing ? 'btn-purple' : 'btn-none'}`}
                                >
                                    Edit Profile
                                </button>
                            </div>

                            {isEditing ? (
                                <div className="mt-4">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <label className="form-label">Name</label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={editData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label">Email</label>
                                                <input 
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={editData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-6">
                                                <label className="form-label">Phone</label>
                                                <input 
                                                    type="tel"
                                                    className="form-control"
                                                    name="phone"
                                                    value={editData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label">Bank Account</label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    name="bank_account"
                                                    value={editData.bank_account}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="purple-button w-100"
                                            onClick={handleProfileUpdate}
                                        >
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center">
                                    {sellerProfile ? (
                                        <>
                                            <div className="position-relative d-inline-block mb-4">
                                                <img
                                                    src={sellerProfile.image || "https://via.placeholder.com/150"}
                                                    alt={sellerProfile.name}
                                                    className="rounded-circle border"
                                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                                />
                                                <div className="position-absolute bottom-0 end-0">
                                                    <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        className="d-none"
                                                        id="imageInput"
                                                        disabled={isUploading}
                                                    />
                                                    <label 
                                                        htmlFor="imageInput" 
                                                        className={`btn ${isUploading ? 'btn-secondary' : 'btn-light'} btn-sm rounded-circle`}
                                                        style={{ width: "32px", height: "32px", cursor: isUploading ? 'wait' : 'pointer' }}
                                                    >
                                                        {isUploading ? '⌛' : '📷'}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="text-start mt-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title mb-4">{sellerProfile.name}</h4>
                                                        <p className="mb-2">
                                                            <strong>Email:</strong> {sellerProfile.email}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>Phone:</strong> {sellerProfile.phone}
                                                        </p>
                                                        <p className="mb-0">
                                                            <strong>Bank Account:</strong> {sellerProfile.bank_account}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

