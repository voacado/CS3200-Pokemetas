import React from 'react';
import PropTypes from 'prop-types';
import {
    Div,
    H1,
    P,
    Form,
    Input,
    Button,
  } from './FormBoxStyle';

  /**
   * Form box component, abstracted to suit any need for a form with 2 inputs.
   * @param props arguments passed down by parent component
   */
export default function FormBox(props) {

  // subfunction to handle what occurs at submission
  const handleSubmit = props.handleSubmit;

  return(
    <Div>
    <Form onSubmit={handleSubmit}>
        <H1>{props.title}</H1>
        <P id="message"></P>
        <Input placeholder={props.topName} type={props.topType} onChange={e => props.setTop(e.target.value)} />
        <Input placeholder={props.bottomName} type={props.bottomType} onChange={e => props.setBottom(e.target.value)} />
        <Button id="submit">{props.title}</Button>
    </Form>
    </Div>
  );
}

FormBox.propTypes = {
  setToken: PropTypes.func.isRequired
}
