import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

let userSchema = object().shape({
  name: string().min(2).required(),
  number: string()
    .min(10, '10 number not with space: 067 954 310')
    .matches(
      /^((\(\d{3}\)?)|(\d{3}))?\d{3}\d{4}$/,
      '10 number not with space: 067 954 310'
    )
    .required(),
});

export default function ContactForm({ onSubmit }) {
  const handleSubmit = ({ name, number }, action) => {
    onSubmit(nanoid(), name, number);
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <Form autoComplete="off">
        <label>
          <p>Name</p>
          <Field type="text" name="name" />
          <ErrorMessage component="p" className={css.nameError} name="name" />
        </label>

        <label>
          <p>Number</p>
          <Field type="tel" name="number" />
          <ErrorMessage
            component="p"
            className={css.phoneError}
            name="number"
          />
        </label>
        <br></br>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}

ContactForm.propTypes = {
  onChange: PropTypes.func,
};
