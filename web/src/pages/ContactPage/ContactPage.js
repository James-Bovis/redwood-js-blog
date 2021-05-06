import {
  Form,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
  Label
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your contact submission!')
      formMethods.reset()
    }
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }

  const formMethods = useForm({ mode: 'onBlur' })

  return (
    <>
      <Toaster position="top-right" />
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{
            required: true
          }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address'
            }
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading} onSubmit={onSubmit}>
          Save
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
