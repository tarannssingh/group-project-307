import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useEffect, useState } from "react";

  const Credential = () => {
    const [credential, setCredential] = useState({
        "username": "",
        "website": "",
        "password": ""
        })
    useEffect(() => {
        const json = {
            "username": "john_doe",
            "website": "example.com",
            "password": "securepassword123"
            }
        setCredential(json)
    }, [])
    

    return (
        <>
        <div>
            <Dialog>
            <DialogTrigger asChild>
                <Card className="cursor-pointer transition-colors duration-300">
                    <CardHeader>
                        <CardTitle>{credential.website}</CardTitle>
                        <CardDescription className="text-yellow-400 ">{credential.username}</CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{credential.website}</DialogTitle>
                <DialogDescription>
                <div>
                    <h1>
                        {credential.username}
                    </h1>
                    <h1>
                        {credential.password}
                    </h1>
                </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        </div>
        </>
    )
  }


  export default Credential;