import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import Input from "../components/Input";
import Form from "../components/Form";

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
  return (
    <Form>
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
      <button type="submit">Register</button>
    </Form>
  );
};
