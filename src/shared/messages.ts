export interface ToggleCardMessage {
  type: 'sb:toggle';
}

export interface OpenOptionsMessage {
  type: 'sb:open-options';
}

export type BackgroundToCard = ToggleCardMessage;
export type CardToBackground = OpenOptionsMessage;
