import { useForm, zodResolver } from '@mantine/form'
import z from 'zod'
import Input, { Form } from '../components/Input'

const LoginSchema = z.object({
  username: z.string({
    message: 'Username is required',
  }).min(3, {
    message: 'Username must be at least 3 characters long',
  }),
  password: z.string({
    message: 'Password is required',
  }).min(6, {
    message: 'Password must be at least 6 characters long',
  }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  }),
})

export const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  }
  const form = useForm({
    mode: 'controlled',
    validate: zodResolver(LoginSchema),
    initialValues,
  })
  return (
    <Form>
      <div className='input-label'>
        <label htmlFor="username">Username</label>
        <Input type="text" id="username" name="username" {...form.getInputProps("username")}/>
      </div>
      <div className='input-label'>
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" name="password" {...form.getInputProps("password")}/>
      </div>
      <button type="submit">Login</button>
    </Form>
  )
}
