"use client";
import React, { useEffect, useState } from "react";

export default function UserList() {
    // State variable to hold all users
    const [allUsers, setAllUsers] = useState([1, 2, 3, 4]);
    console.log("zzzzzzzzzzz");

    // Use the useEffect hook
    React.useEffect(() => {
        console.log("inside useeffect")
        // Method to get all users' details
        async function getAllUsers() {
            try {
                const res = await fetch("http://localhost:5000/api/v1/users/");
                if (res.ok) {
                    const allUsers = await res.json();
                    // Set the value of allUsers state variable
                    setAllUsers(allUsers);
                    console.log("done");
                } else {
                    console.log("Error fetching data from the server");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        // Invoke the getAllUsers function
        getAllUsers();
    }, []); // Pass an empty dependency array



    console.log(allUsers);

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light">
                                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            User Reg number
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            First name
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Last Name
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers &&
                                        allUsers.map((user) => {
                                            return (
                                                <tr className="border-b dark:border-neutral-500" key={user._id}>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        {user.userRegNo}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {user.firstName}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {user.lastName}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {user.role}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
