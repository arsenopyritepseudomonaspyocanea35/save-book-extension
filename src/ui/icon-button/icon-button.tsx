import type { Component, JSX } from 'solid-js';

export interface IconButtonProps {
  title: string;
  danger?: boolean;
  /** For toggle buttons, so assistive tech reads the state. */
  pressed?: boolean;
  onClick: JSX.EventHandlerWithOptionsUnion<HTMLButtonElement, MouseEvent>;
  children: JSX.Element;
}

export const IconButton: Component<IconButtonProps> = (props) => (
  <button
    class="icon-button"
    classList={{ 'icon-button-danger': props.danger === true }}
    type="button"
    title={props.title}
    aria-label={props.title}
    aria-pressed={props.pressed}
    on:click={props.onClick}
  >
    {props.children}
  </button>
);
