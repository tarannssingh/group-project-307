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

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
//   FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect, useContext } from "react"
import { addAuthHeader, API_PREFIX } from "../../utils"
import { jwtDecode } from "jwt-decode"
import { CredContext } from "../../pages/Home"

  const Credential = ({username, website, password, cred_id}) => {
    const update = useContext(CredContext)
    const [superOpen, setSuperOpen] = useState(false)
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
    }, [credential])
    
    return (
        <>
        <div>
            <Dialog open={superOpen} onOpenChange={setSuperOpen}>
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
                <div className="mt-3">
                    <h1>
                        Username: 
                        {" " + credential.username}
                    </h1>
                    <h1>
                        Password: 
                        {" " + credential.password}
                    </h1>
                    <div className="mt-4 flex space-x-4 justify-center">
                        {/* to update */}
                        <Update username={username} website={website} password={password} id={cred_id} update={update} setCredential={setCredential} superOpen={superOpen} setSuperOpen={setSuperOpen}/>
                        {/* to delete */}
                        <Delete cred_id={cred_id} update={update} superOpen={superOpen} setSuperOpen={setSuperOpen}/>
                    </div>
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


            

  const Update = ({username, website, password, id, update, setCredential, setSuperOpen}) =>  {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const formSchema = z.object ({
        website: z.string().url(),
        username: z.string().min(2).max(50),
        password: z.string().min(1).max(100),
    
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            website: website,
            username: username,
            password: password
        }
      })
    const handleSubmit = async (values) => {
    try {
        console.log(id);
        const response = await fetch(`${API_PREFIX}/credentials`, {
            method: "PUT",
            headers: addAuthHeader({"Content-Type": "application/json"}),
            body: JSON.stringify({...values, _id: id})
        })
        if (!response.ok) {
            const json = await response.json()
            throw Error(json.error)
        } else {
            setOpen(false)
            setSuperOpen(false)
            setCredential(prev => {return {...prev, values}})
            username = values.username ? values.username : username
            password = values.password ? values.password : password
            form.reset()
            update.setUpdate(!update.update)
        }
        setMessage("")
    } catch (error) {
        console.log(error)
        setMessage(error.message)
    }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="bg-green-400">Update</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to update?</DialogTitle>
                <DialogDescription className="pt-4">
                        <div>
                            <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input disabled={true} className="website" placeholder="Website URL (Include https://)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input className="username" placeholder="Credential Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                    {/* <FormLabel>Password</FormLabel> */}
                                    <FormControl>
                                        <Input className="password" placeholder="Credential Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button type="submit" className="bg-yellow-400">Yes</Button>
                            </form>
                            <p className="pt-4">
                                {message}
                            </p>
                            </Form>
                        </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
  }



  const Delete = ({update, cred_id, setSuperOpen}) => {
    const [open, setOpen] = useState(false)
    const onDelete = async () => {
        try {
            const response = await fetch(`${API_PREFIX}/credentials`, {
                method: "DELETE",
                headers: addAuthHeader({"Content-Type": "application/json"}),
                body: JSON.stringify({_id: cred_id})
            })
            if (!response.ok) {
                const json = await response.json()
                throw Error(json.error)
            } else {
                setOpen(false)
                setSuperOpen(false)
                update.setUpdate(!update.update)
            }
        } catch (error) {
            console.log(error)
        }
        }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="bg-red-400">Delete</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure sure you want to delete?</DialogTitle>
                <DialogDescription className="pt-4">
                    <Button onClick={onDelete} className="bg-yellow-400">Yes</Button>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
  }