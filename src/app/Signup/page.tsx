import React from 'react'
import Register from '../GenComponents/Register'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from '../GenComponents/Login'

export default function page() {
  return (
    <div className='w-full max-w-md mx-auto'>
       <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
      <Register/>
      </TabsContent>
      <TabsContent value="password">
      <Login/>
 
      </TabsContent>
    </Tabs>
        
    </div>
  )
}
