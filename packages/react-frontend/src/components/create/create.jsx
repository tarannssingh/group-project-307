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

const Create = () => {
    return (
        <>
        <div>
            <Dialog>
            <DialogTrigger asChild>
                <Card className="cursor-pointer transition-colors duration-300">
                    <CardHeader>
                        <CardTitle>Add Password</CardTitle>
                        <CardDescription className="text-yellow-400 ">{credential.username}</CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>E</DialogTitle>
                <DialogDescription>
                <div>
                    <h1>
                        E
                    </h1>
                    <h1>
                        E
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

export default Create