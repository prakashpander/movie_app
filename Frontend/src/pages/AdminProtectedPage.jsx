import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

const AdminProtectedPage = ({ children }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (!token) {
            navigate("/adminlogin")
        }

        axiosInstance.get(`/admin/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                toast.error("Please login again");
                localStorage.removeItem("adminToken");
                navigate("/adminlogin")
                setIsLoading(false)
                console.log("error = ", err);
            })

    }, [token, navigate]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>{children}</div>
    )
}

export default AdminProtectedPage