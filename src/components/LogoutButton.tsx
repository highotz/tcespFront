import { ButtonHTMLAttributes } from 'react';

import '../styles/buttonLogout.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function LogoutButton(props: ButtonProps) {
  return <button className="logout-button" {...props} />;
}
