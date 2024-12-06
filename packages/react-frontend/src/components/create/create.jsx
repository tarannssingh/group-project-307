import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import keyIcon from "../../../public/key.png"
import subIcon from "../../../public/sub.png"
import eyeIcon from "../../../public/eye.png"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState } from "react";
import { addAuthHeader, API_PREFIX } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { CredContext } from "../../pages/Home";

const formSchema = z.object({
  website: z.string().url(),
  username: z.string().min(2).max(50),
  password: z.string().min(1).max(100),
});

const Create = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const update = useContext(CredContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);
      const response = await fetch(`${API_PREFIX}/credentials`, {
        method: "POST",
        headers: addAuthHeader({ "Content-Type": "application/json" }),
        body: JSON.stringify({ ...values, user_id: decoded.user_id }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error(json.error);
      } else {
        setOpen(false);
        update.setUpdate(!update.update);
        form.reset();
      }
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="createDialog">
            <Card
              className="transition-colors duration-300 cursor-pointer"
              style={{ backgroundColor: "#FFC1A1" }}
            >
              <CardHeader>
                <CardTitle>Add Credential</CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h1 className="m-2 mb-4">Add Credential</h1>
              </DialogTitle>
              <DialogDescription>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="website"
                                placeholder="Website URL (Include https://www. or Copy Paste URL)"
                                {...field}
                              />
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
                              <Input
                                className="username"
                                placeholder="Credential Username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            const[isPassVis, setIsPassVis] = useState(false);
                            return (
                                <FormItem>
                                <FormControl>
                                    <Input 
                                    className="password" 
                                    placeholder="Credential Password" 
                                    type={isPassVis ? "text" : "password"}
                                    autocomplete="new-password"
                                    {...field} />
                                </FormControl>
                                <div className="d-flex justify-content-start align-center">
                                    <img
                                        src={keyIcon}
                                        alt="Generate Password"
                                        className="w-8 h-8 p-1 m-2 cursor-pointer"
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(`${API_PREFIX}/randPass`, {
                                                    method: "GET",
                                                });
                                                if (!response.ok) {
                                                    throw new Error("Failed to fetch password");
                                                }
                                                const data = await response.json();
                                                form.setValue("password", data);
                                            } catch (error) {
                                                console.error("Error generating password:", error.message);
                                            }
                                        }}
                                        title="Generate Password"
                                    />
                                    <img
                                        src={subIcon}
                                        alt="Substitute Password"
                                        className="w-8 h-8 p-1 m-1 cursor-pointer"
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(`${API_PREFIX}/subPass`, {
                                                    method: "POST",
                                                    headers: {"Content-Type": "application/json"},
                                                    body: JSON.stringify({input: form.getValues("password")}),
                                                });
                                                if(!response.ok) {
                                                    throw new Error("Failed to substitute password");
                                                }
                                                const data = await response.json();
                                                form.setValue("password", data.password);
                                            } catch (error) {
                                                console.error("Error substituting password:", error.message);
                                            }
                                        }}
                                        title = "Substitute Password"
                                    />
                                    <img
                                        src = {eyeIcon}
                                        alt = "Toggle Visibility"
                                        className="w-8 h-8 p-1 m-1 cursor-pointer"
                                        onClick={() => setIsPassVis(!isPassVis)}
                                        title = "Toggle Visibility"
                                    />
                                </div>
                                <FormMessage />
                                </FormItem>
                            );
                        }}
                        />
                        <Button type="submit" className="bg-red-600">Submit</Button>
                    </form>
                    <div className="pt-4">
                      <p>{message}</p>
                    </div>
                  </Form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Create;
