import React, {useState} from "react";
import { TextInput, Textarea, Button, Group } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useStyles } from "./SendEmailForm.style";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().email().required(),
    subject: yup.string().required(),
    message: yup.string().required(),
  })
  .required();

const SendEmailForm = () => {
  const [loading, setLoading] = useState(false)
  const { classes } = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data) => {
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:4000/api/v1/sendemail", data);
      if (res.status === 200) {
        setLoading(false)
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        reset()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        classNames={{ input: classes.input, label: classes.inputLabel }}
        error={errors?.email?.message}
        {...register("email")}
      />
      <TextInput
        label="Subject"
        placeholder="Subject"
        mt="md"
        classNames={{ input: classes.input, label: classes.inputLabel }}
        error={errors?.subject?.message}
        {...register("subject")}
      />
      <Textarea
        label="Your message"
        placeholder="Your message ..."
        minRows={4}
        mt="md"
        classNames={{ input: classes.input, label: classes.inputLabel }}
        error={errors?.message?.message}
        {...register("message")}
      />

      <Group position="right" mt="md">
        <Button type="submit" disabled={loading} className={classes.control}>
          Send message
        </Button>
      </Group>
    </form>
  );
};

export default SendEmailForm;
