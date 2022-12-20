import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

type Inputs = {
  example: string;
  example2: string;
  controlled: string;
  exampleRequired: string;
};

const Input2 = (props: any, ref: any) => {
  console.log('rendered');
  return <input {...props} ref={ref} />;
};

const Input = React.forwardRef(Input2);

const Button = ({ onClick }: any) => {
  console.log('button render');
  return (
    <button type="button" onClick={onClick}>
      Click
    </button>
  );
};

const ControlletInput = ({ value, onChange }) => {
  return <input value={value} onChange={onChange} />;
};

export default function BasicHookForm() {
  const [numb, setNumb] = React.useState(0);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it
  const onButtonClick = React.useCallback(() => setNumb(Math.random()), []);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Input defaultValue="test" {...register('example')} />
      <Input defaultValue="lala" {...register('example2')} />

      <Controller
        name="controlled"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <ControlletInput {...field} />}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <Input {...register('exampleRequired', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <Input type="submit" />
      <Button type="button" onClick={onButtonClick} />
    </form>
  );
}
