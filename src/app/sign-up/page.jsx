"use client";

import { Card, Separator } from '@heroui/react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import {Radio, RadioGroup} from "@heroui/react";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';



const SignUpPage = () => {

    const [role, setRole] = useState("user");

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
            role: user.role,
            plan: user.plan
        })
        if (data) {
            toast.success("Successfully registered!")
            redirect('/');
            
        }

        if (error) {
            toast.error("Email or password is incorrect", {
                position: "top-right",
                autoClose: 3000,
            });
        };
    }
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }
    return (
        <div className='flex flex-col items-center'>
            <div className='text-center mb-4'>
                <h1 className='text-2xl font-bold'>Please Sign Up</h1>
                <p>Enjoy Reading Life Lessons</p>
            </div>
            <Card className='border rounded-md'>
                <Form onSubmit={onSubmit} autoComplete="off" className="flex w-96 flex-col gap-4 space-y-2 p-2">
                    <TextField
                        isRequired
                        name="name"
                        type="text"

                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="image"
                        type="url"

                    >
                        <Label>Image URL</Label>
                        <Input placeholder="Image url" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        autoComplete="off"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>

                    {/* Role selection */}
                    <div className="flex flex-col gap-4">
      <Label>Sign up as</Label>
      <RadioGroup defaultValue="user" name="role" onChange={value => setRole(value)} orientation="horizontal">
        <Radio value="user">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            User
          </Radio.Content>
          
        </Radio>
        <Radio value="admin" isDisabled>
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Admin
          </Radio.Content>
          
        </Radio>        
      </RadioGroup>
    </div>

                    <div className="flex justify-center">
                        <Button type="submit" className={'w-full rounded-none bg-cyan-500'}>
                            Create account
                        </Button>                       

                    </div>
                </Form>                                    
                    <p className='text-center'>Or</p>
                <div>
                    <Button onClick={handleGoogleSignIn} variant="outline" className={"w-full rounded-none"}><FcGoogle />Sign in with Google</Button>
                </div>


            </Card>
            
        </div>
    );
};

export default SignUpPage;