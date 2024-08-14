import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import Input from "../components/Input";
import Form from "../components/Form";
import { useSession } from "./SessionContext";
import { useResolveApi } from "../hooks/useResolveApi";
import User from "../model/User";
import { Link, useNavigate } from "@tanstack/react-router";
import Button from "../components/Button";

const LoginSchema = z.object({
  email: z
    .string({
      message: "Username is required",
    })
    .email({
      message: "Username must be a valid email address",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
  // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
  //   message: "Password must contain at least one letter and one number",
  // }),
});

export const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const form = useForm({
    mode: "controlled",
    validate: zodResolver(LoginSchema),
    initialValues,
  });
  const { setUserSession } = useSession();
  const { postApi, zodValidationErrors } = useResolveApi();
  const navigate = useNavigate();
  const handleLogin = (values: typeof form.values) => {
    postApi("auth/login", values)
      .then((response) => {
        if (response.success) {
          const currentUser = response.session as unknown as User;
          navigate({
            to: "/",
          });
          setUserSession(currentUser);
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };
  return (
    <Form onSubmit={form.onSubmit(handleLogin, zodValidationErrors)}>
      <div className="input-label">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Write your username or email"
          name="username"
          {...form.getInputProps("email")}
        />
      </div>
      <div className="input-label">
        <label htmlFor="password">Password</label>
        <Input
          placeholder="Write your password"
          type="password"
          id="password"
          name="password"
          {...form.getInputProps("password")}
        />
      </div>
      <p>
        Don't have an account? <Link to="/auth/register">register</Link>
      </p>
      <Button type="submit">Login</Button>
    </Form>
  );
};
