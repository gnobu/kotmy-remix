import FormControl from '../../reusables/FormControl'
import Button from '../../reusables/Button'

export default function ContactForm() {
    return (
        <form className="wrapper flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
                <FormControl as='input' labelText='Full Name' id='fullName' name='fullName'
                    placeholder='Enter your full name'
                />
                <FormControl as='input' labelText='Email Address' id='email' name='email'
                    placeholder='Enter your email address'
                />
            </div>
            <FormControl as='input' labelText='Subject' id='subject' name='subject'
                placeholder='Enter subject'
            />
            <FormControl as='textarea' labelText='Message' id='message' name='message'
                placeholder='Enter your message here...'
            />
            <Button element='button' className='md:self-end'>Submit</Button>
        </form>
    )
}
