/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';

import '../styles/buttonLogout.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function LogoutButton(props: ButtonProps) {
  return <button className="logout-button" {...props} />;
}
