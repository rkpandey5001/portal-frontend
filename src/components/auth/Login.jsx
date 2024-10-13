import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/host';
import { toast } from "sonner";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';



const Login = () => {
  const {loading}=useSelector(state=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [input,setInput]=useState({
    email:'',
    password:'',
    role:''
  });

  const handleInput=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
      dispatch(setLoading(true));
      await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      }).then(res=>{
        if(res.data.success){
          dispatch(setUser(res.data.user));
          navigate('/');
          toast.success(res.data.message);
        }
      }).catch(err=>{
         toast.error(err.response.data.message);
      })
      .finally(()=>{
        dispatch(setLoading(false));
      })
    
  }
  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form className='w-1/2 border border-gray-200 rounded-md p-4 my-10' onSubmit={handleSubmit}>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
            type='email'
            name='email'
            value={input.email}
            placeholder='Enter Email'
            onChange={handleInput}
            />
          </div>

          <div className='my-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
            type='password'
            name='password'
            value={input.password}
            placeholder='Enter Password'
            onChange={handleInput}
            />
          </div>
          <div className='flex items-center justify-between'>
           <RadioGroup className='flex items-center gap-4 my-5'>
            <div className='flex items-center space-x-2'>
              <input type='radio' name='role' value='student' className='cursor-pointer' id='r1' checked={input.role==='student'} onChange={handleInput}/>
              <Label htmlFor='r1'>Student</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <input type='radio' name='role' value='recruiter' className='cursor-pointer' id='r2' checked={input.role==='recruiter'} onChange={handleInput}/>
              <Label htmlFor='r2'>Recruiter</Label>
            </div>
           </RadioGroup>
          </div>
          {loading?<Button className='w-full my-4 bg-green-500 text-white hover:bg-green-600'> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>: <Button className='w-full my-4 bg-green-500 text-white hover:bg-green-600' type='submit'>Login</Button>}
          <span className='text-sm flex items-center justify-center'>Not an account? <Link to='/signup' className='text-blue'>Sign Up</Link></span>
        </form>
      </div>
  )
}

export default Login;
