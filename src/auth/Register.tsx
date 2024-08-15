import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import Input from "../components/Input";
import Form from "../components/Form";
import { Link, useNavigate } from "@tanstack/react-router";
import Button from "../components/Button";
import { useResolveApi } from "../hooks/useResolveApi";

const RegisterSchema = z
  .object({
    username: z
      .string({
        message: "Username is required",
      })
      .min(3, {
        message: "Username must be at least 3 characters long",
      }),
    email: z
      .string({
        message: "Email is required",
      })
      .email({
        message: "Email must be a valid email address",
      }),
    password: z
      .string({
        message: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: "Password must contain at least one letter and one number",
      }),
    confirmPassword: z
      .string({
        message: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: "Password must contain at least one letter and one number",
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const form = useForm({
    mode: "controlled",
    validate: zodResolver(RegisterSchema),
    initialValues,
  });
  const { postApi, zodValidationErrors } = useResolveApi();
  const navigate = useNavigate();
  const onSubmit = (values: typeof initialValues) => {
    postApi("auth/register", values)
      .then((response) => {
        if (response?.success) {
          navigate({
            to: "/auth",
          });
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <Form onSubmit={form.onSubmit(onSubmit, zodValidationErrors)}>
      <div className="input-label">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
      </div>
      <div className="input-label">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
      </div>
      <div className="input-label">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          {...form.getInputProps("confirmPassword")}
        />
      </div>
      <p>
        Already have an account? <Link to="/auth">sign in</Link>
      </p>
      <Button type="submit">Register</Button>
    </Form>
  );
};
