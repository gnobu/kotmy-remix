type Props =
  | ({
    as: 'input';
    labelText?: string;
    labelClassNames?: string;
    type?: string
  } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({
    labelText?: string;
    labelClassNames?: string;
    as: 'textarea';
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)

export default function FormControl({ labelClassNames, labelText, ...props }: Props) {
  const formControlClasses = 'p-3 rounded-lg bg-transparent border hover:border-primary w-full font-medium focus:outline-accent'
  return (
    <label htmlFor={props.id} className={`block font-bold ${labelClassNames}`}>{labelText}
      {props.as === 'input'
        ? <input {...props} type={props.type ?? 'text'} className={`${formControlClasses} ${props.className}`} />
        : <textarea cols={30} rows={6} {...props} className={`${formControlClasses} ${props.className}`}></textarea>
      }
    </label>
  )
}
