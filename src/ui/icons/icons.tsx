import type { Component } from 'solid-js';

export const EyeIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path
      d="M1.6 8S4 4.2 8 4.2 14.4 8 14.4 8 12 11.8 8 11.8 1.6 8 1.6 8z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
    />
    <circle cx="8" cy="8" r="1.7" fill="currentColor" />
  </svg>
);

export const EyeOffIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path
      d="M1.6 8S4 4.2 8 4.2 14.4 8 14.4 8 12 11.8 8 11.8 1.6 8 1.6 8z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
    />
    <path d="M3 13L13 3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
  </svg>
);

export const CloseIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path
      d="M4 4l8 8M12 4l-8 8"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />
  </svg>
);

export const GripIcon: Component = () => (
  <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden="true">
    <g fill="currentColor">
      <circle cx="2" cy="2" r="1.1" />
      <circle cx="6" cy="2" r="1.1" />
      <circle cx="2" cy="7" r="1.1" />
      <circle cx="6" cy="7" r="1.1" />
      <circle cx="2" cy="12" r="1.1" />
      <circle cx="6" cy="12" r="1.1" />
    </g>
  </svg>
);

export const ChevronIcon: Component = () => (
  <svg class="chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path
      d="M4 6.5l4 4 4-4"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const XIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path
      d="M4.5 4.5l7 7M11.5 4.5l-7 7"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export const TextIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.4">
      <path d="M3 5.5h10" />
      <path d="M3 9.5h6.5" />
    </g>
  </svg>
);

export const LockIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path
      d="M5.2 7V5.7a2.8 2.8 0 0 1 5.6 0V7"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
    />
    <rect
      x="3.4"
      y="7"
      width="9.2"
      height="6.2"
      rx="1.6"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
    />
  </svg>
);

export const PlusIcon: Component = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path
      d="M8 3.5v9M3.5 8h9"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.5"
    />
  </svg>
);
