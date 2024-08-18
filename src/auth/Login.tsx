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
  nickname: z
    .string({
      message: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(255, {
      message: "Username must be less than 255 characters long",
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
    nickname: "",
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
          placeholder="Username or email"
          name="username"
          {...form.getInputProps("nickname")}
        />
      </div>
      <div className="input-label">
        <label htmlFor="password">Password</label>
        <Input
          placeholder="Your password"
          type="password"
          id="password"
          name="password"
          {...form.getInputProps("password")}
        />
      </div>
      <p>
        Don't have an account? <Link to="/auth/register">Register</Link>
      </p>
      <Button type="submit">Login</Button>
    </Form>
  );
};
