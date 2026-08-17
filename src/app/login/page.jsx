"use client";
import { Card, Separator } from '@heroui/react';
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signIn.email({
            email: user.user_email,
            password: user.user_password,
        });
        console.log({ data, error });

        if (data) {
            toast.success("Successfully login!")
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
            <div className='text-center mb-2'>
                <h1 className='text-2xl font-bold py-5'>Please login</h1>                
            </div>
            <Card className='border rounded-md'>
                <Form onSubmit={onSubmit} autoComplete="off"  className="flex w-96 flex-col gap-4 space-y-3 p-3">

                    <TextField
                        isRequired
                        name="user_email"
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
                        <Input placeholder="john@example.com"
                        autoComplete="off" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="user_password"
                        type="password"                        
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
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
                        <Input placeholder="Enter your password" 
                        autoComplete='new-password'/>
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex justify-center">
                        <Button type="submit" className={'w-full rounded-none bg-cyan-500'}>

                            Login
                        </Button>

                    </div>
                </Form>
                <div className='flex justify-center items-center gap-3'>
                    
                    <div className='whitespace-nowrap'>Or</div>
                    
                </div>
                <div>
                    <Button onClick={handleGoogleSignIn} variant="outline" className={"w-full rounded-none"}><FcGoogle /> Sign in with Google</Button>
                </div>

            </Card>

        </div>
    );
};

export default LoginPage;