import React, { Component, useState, useEffect } from "react";
import Content from "../customer/Content";
import { IsLoggedIn, IsCustomerLoggedIn, GetToken } from "../../Util";
import SearchResult from "../../Component/LibrarianComponents/SearchResult";
import { Link, Redirect } from "react-router-dom";
import {displayUsers} from "./ApiLibrary";

const AllUsers = () => {

    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        displayUsers().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setUsers(data);
            }
        })
    }

    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <Content>

            <div>
                <ul className="list-group">
                    <h2 align="center">ALL MEMBERS</h2>
                    {users.map((u,i) => (
                        <li
                            key={i}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{u.firstName}</strong>
                                <strong>{u.email}</strong>

                                <Link to={`/admin/user/${u._id}`} className="mr-2">
                                    View Borrowed Books
                                </Link>

                                <Link to={`/admin/lend/${u._id}`} className="mr-2">
                                    Lend a book
                                </Link>
                            </li>
                    ))}
                </ul>
            </div>
        </Content>


    );
};

export default AllUsers;