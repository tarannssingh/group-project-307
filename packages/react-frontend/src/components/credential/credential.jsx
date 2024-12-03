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
    // CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useEffect, useState } from "react";

  const Credential = async ({username, website, password}) => {
    const [credential, setCredential] = useState({
        "username": "",
        "website": "",
        "password": ""
        })
    useEffect(() => {
        const json = {
            "username": username,
            "website": website,
            "password": password
            }
        setCredential(json)
    }, [])
    const response = await fetch(`${API_PREFIX}/credentials`, {
        method: "POST",
        headers: addAuthHeader({"Content-Type": "application/json"}),
        body: JSON.stringify({...values, user_id: decoded.sub})
    })

    return (
        <>
        <div>
            <Dialog>
            <DialogTrigger asChild>
                <Card className="transition-colors duration-300 cursor-pointer">
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