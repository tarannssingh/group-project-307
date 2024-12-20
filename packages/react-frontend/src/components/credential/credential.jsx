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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import keyIcon from "@/assets/key.png";
import subIcon from "@/assets/sub.png";
import eyeIcon from "@/assets/eye.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useContext } from "react";
import { addAuthHeader, API_PREFIX } from "../../utils";
import { CredContext } from "../../pages/Home";

const Credential = ({ username, website, password, cred_id }) => {
  const update = useContext(CredContext);
  const [superOpen, setSuperOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [peekedPassword, setPeekedPassword] = useState(false);
  const [credential, setCredential] = useState({
    username: "",
    website: "",
    password: "",
  });
  useEffect(() => {
    const json = {
      username: username,
      website: website,
      password: password,
    };
    setCredential(json);
  }, [username, website, password]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const peekPassword = () => {
    if (showPassword) {
      setShowPassword(false);
      setPeekedPassword(true);
    } else {
      setPeekedPassword(!peekedPassword);
    }
  };

  const getPeekedPassword = () => {
    const { password } = credential;
    const visible = password.slice(0, Math.ceil(password.length / 2));
    const hidden = "*".repeat(password.length - visible.length);
    return visible + hidden;
  };

  return (
    <>
      <div>
        <Dialog open={superOpen} onOpenChange={setSuperOpen}>
          <DialogTrigger asChild>
            <Card className="transition-colors duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle>{credential.website}</CardTitle>
                <CardDescription className="text-yellow-400 ">
                  {credential.username}
                </CardDescription>
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
                    Password:{" "}
                    {showPassword
                      ? credential.password
                      : peekedPassword
                        ? getPeekedPassword()
                        : "*****"}
                  </h1>
                  <div className="flex justify-center mt-4 space-x-4 align-items-center">
                    {/* to update */}
                    <Update
                      className="bg-green-500"
                      username={username}
                      website={website}
                      password={password}
                      id={cred_id}
                      update={update}
                      setCredential={setCredential}
                      superOpen={superOpen}
                      setSuperOpen={setSuperOpen}
                    />
                    {/* to delete */}
                    <Delete
                      cred_id={cred_id}
                      update={update}
                      superOpen={superOpen}
                      setSuperOpen={setSuperOpen}
                    />
                    {/* to peek a password */}
                    <Button onClick={peekPassword} className="bg-orange-500">
                      {peekedPassword ? "Hide" : "Peek"}
                    </Button>
                    {/* to show Password */}
                    <Button onClick={togglePassword} className="bg-gray-500">
                      {showPassword ? "Hide Password" : "Show Password"}
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Credential;

const Update = ({
  username,
  website,
  password,
  id,
  update,
  setCredential,
  setSuperOpen,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const formSchema = z.object({
    website: z.string().url(),
    username: z.string().min(2).max(50),
    password: z.string().min(1).max(100),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: website,
      username: username,
      password: password,
    },
  });
  const handleSubmit = async (values) => {
    try {
      console.log(id);
      const response = await fetch(`${API_PREFIX}/credentials`, {
        method: "PUT",
        headers: addAuthHeader({ "Content-Type": "application/json" }),
        body: JSON.stringify({ ...values, _id: id }),
      });
      if (!response.ok) {
        const json = await response.json();
        throw Error(json.error);
      } else {
        setOpen(false);
        setSuperOpen(false);
        setCredential((prev) => {
          return { ...prev, values };
        });
        username = values.username ? values.username : username;
        password = values.password ? values.password : password;
        form.reset();
        update.setUpdate(!update.update);
      }
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };
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
                            disabled={true}
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
                      const [isPassVis, setIsPassVis] = useState(false);
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="password"
                              placeholder="Credential Password"
                              type={isPassVis ? "text" : "password"}
                              autocomplete="new-password"
                              {...field}
                            />
                          </FormControl>
                          <div className="d-flex justify-content-start align-center">
                            <img
                              src={keyIcon}
                              alt="Generate Password"
                              className="w-8 h-8 p-1 m-2 cursor-pointer"
                              onClick={async () => {
                                try {
                                  const response = await fetch(
                                    `${API_PREFIX}/randPass`,
                                    {
                                      method: "GET",
                                    },
                                  );
                                  if (!response.ok) {
                                    throw new Error("Failed to fetch password");
                                  }
                                  const data = await response.json();
                                  form.setValue("password", data);
                                } catch (error) {
                                  console.error(
                                    "Error generating password:",
                                    error.message,
                                  );
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
                                  const response = await fetch(
                                    `${API_PREFIX}/subPass`,
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        input: form.getValues("password"),
                                      }),
                                    },
                                  );
                                  if (!response.ok) {
                                    throw new Error(
                                      "Failed to substitute password",
                                    );
                                  }
                                  const data = await response.json();
                                  form.setValue("password", data.password);
                                } catch (error) {
                                  console.error(
                                    "Error substituting password:",
                                    error.message,
                                  );
                                }
                              }}
                              title="Substitute Password"
                            />
                            <img
                              src={eyeIcon}
                              alt="Toggle Visibility"
                              className="w-8 h-8 p-1 m-1 cursor-pointer"
                              onClick={() => setIsPassVis(!isPassVis)}
                              title="Toggle Visibility"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <Button type="submit" className="bg-yellow-400">
                    Yes
                  </Button>
                </form>
                <p className="pt-4">{message}</p>
              </Form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Delete = ({ update, cred_id, setSuperOpen }) => {
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      const response = await fetch(`${API_PREFIX}/credentials`, {
        method: "DELETE",
        headers: addAuthHeader({ "Content-Type": "application/json" }),
        body: JSON.stringify({ _id: cred_id }),
      });
      if (!response.ok) {
        const json = await response.json();
        throw Error(json.error);
      } else {
        setOpen(false);
        setSuperOpen(false);
        update.setUpdate(!update.update);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-400">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure sure you want to delete?</DialogTitle>
          <DialogDescription className="pt-4">
            <Button onClick={onDelete} className="bg-yellow-400">
              Yes
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
