"use client"

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { decrementCounter, incrementCounter } from '@/redux/features/counterSlice';
import { useGetUsersQuery } from '@/redux/services/userApi';

const HomePage = () => {
  const count = useAppSelector(state => state.counterReducer.counter);
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  if (isLoading || isFetching) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <section>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(incrementCounter())}>Increment</button>
      <button onClick={() => dispatch(decrementCounter())}>Decrement</button>
      {
        data?.map((user,id) => {
          return <div key={id}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        })
      }
    </section>
  )
}

export default HomePage