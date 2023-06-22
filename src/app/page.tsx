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
      <h1 className='text-center text-2xl'>Count: {count}</h1>
      <div className="buttonSection flex justify-center gap-2">
        <button className='bg-green-500 py-3 px-2 rounded-md' onClick={() => dispatch(incrementCounter())}>Increment</button>
        <button className='bg-blue-500 py-3 px-2 rounded-md' onClick={() => dispatch(decrementCounter())}>Decrement</button>
      </div>
      <div className='grid grid-cols-3 gap-2 p-2'>
        {
          data?.map((user, id) => {
            return <div key={id} className='bg-slate-200'>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.username}</p>
            </div>
          })
        }
      </div>
    </section>
  )
}

export default HomePage