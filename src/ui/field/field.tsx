import type { Component, JSX } from 'solid-js';

export interface FieldProps {
  label: string;
  children: JSX.Element;
}

export const Field: Component<FieldProps> = (props) => (
  <label class="field">
    <span class="field-label">{props.label}</span>
    {props.children}
  </label>
);
