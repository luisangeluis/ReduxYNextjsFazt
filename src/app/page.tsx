"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decrementCounter,
  incrementCounter,
} from "@/redux/features/counterSlice";
import {
  useGetUserByIdQuery,
  useGetUsersQuery,
} from "@/redux/services/userApi";
import { useState } from "react";

const HomePage = () => {
  const count = useAppSelector((state) => state.counterReducer.counter);
  const dispatch = useAppDispatch();
  const [id, setId] = useState<string | null>(null);

  const {
    data: users,
    error: usersError,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useGetUsersQuery(null);
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useGetUserByIdQuery({ id }, { skip: !id });

  if (isLoadingUsers || isFetchingUsers) return <p>Loading...</p>;
  if (usersError) return <p>usersError</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    // const id = parseInt(formData.get("id") as string, 10);
    const id = formData.get("id")?.toString();

    if (id) setId(id);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Introduce el id</label>
        <br></br>
        <input type="text" id="id" name="id" />
        <button type="submit">Click</button>
      </form>
      <section>
        <h2>User: {user ? user?.name : userError?.message}</h2>
      </section>
      <h1 className="text-center text-2xl">Count: {count}</h1>
      <div className="buttonSection flex justify-center gap-2">
        <button
          className="bg-green-500 py-3 px-2 rounded-md"
          onClick={() => dispatch(incrementCounter())}
        >
          Increment
        </button>
        <button
          className="bg-blue-500 py-3 px-2 rounded-md"
          onClick={() => dispatch(decrementCounter())}
        >
          Decrement
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2">
        {users?.map((user, id) => {
          return (
            <div key={id} className="bg-slate-200">
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.username}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;
