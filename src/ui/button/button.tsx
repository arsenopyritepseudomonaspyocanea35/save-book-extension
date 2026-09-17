import type { Component, JSX } from 'solid-js';

export type ButtonVariant = 'default' | 'primary' | 'ghost' | 'danger';

export interface ButtonProps {
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  title?: string;
  disabled?: boolean;
  onClick?: JSX.EventHandlerWithOptionsUnion<HTMLButtonElement, MouseEvent>;
  children: JSX.Element;
}

export const Button: Component<ButtonProps> = (props) => {
  const variant = () => props.variant ?? 'default';

  return (
    <button
      class="button"
      classList={{
        'button-default': variant() === 'default',
        'button-primary': variant() === 'primary',
        'button-ghost': variant() === 'ghost',
        'button-danger': variant() === 'danger',
      }}
      type={props.type ?? 'button'}
      title={props.title}
      disabled={props.disabled}
      on:click={props.onClick}
    >
      {props.children}
    </button>
  );
};
