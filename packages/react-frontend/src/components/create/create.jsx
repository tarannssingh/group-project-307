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
    // CardDescription,
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
import { useState } from "react"
import { addAuthHeader, API_PREFIX } from "../../utils"
import { jwtDecode } from "jwt-decode"
 
const formSchema = z.object ({
    website: z.string().url(),
    username: z.string().min(2).max(50),
    password: z.string().min(1).max(100),

})

const Create = () => {
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            website: "",
            username: "",
            password: ""
        }
      })

    const handleSubmit = async (values) => {
        try {
            const token = sessionStorage.getItem("token")
            const decoded = jwtDecode(token)
            const response = await fetch(`${API_PREFIX}/credentials`, {
                method: "POST",
                headers: addAuthHeader({"Content-Type": "application/json"}),
                body: JSON.stringify({...values, user_id: decoded.sub})
            })
            const json = await response.json()
            if (!response.ok) {
                throw Error(json.error)
            } else {
                setOpen(false)
                form.reset()
            }
            setMessage("")
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <>
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Card className="transition-colors duration-300 cursor-pointer">
                    <CardHeader>
                        <CardTitle>Add Credential</CardTitle>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>
                    <h1 className="m-2 mb-4">
                        Add Credential
                    </h1>
                </DialogTitle>
                <DialogDescription>
                <div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder="Website URL (Include https://)" {...field} />
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
                                <Input placeholder="Credential Username" {...field} />
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
                                <Input placeholder="Credential Password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="bg-red-600">Submit</Button>
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
        </div>
        </>
    )
}

export default Create



// {/* Render One Error at the Bottom */}
// {form.formState.errors && (
//     <p className="mt-4 text-sm text-red-500">
//       {Object.values(form.formState.errors)[0]?.message}
//     </p>