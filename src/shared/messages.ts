/** Messages the toolbar click forwards to the card in the active tab. */
export interface ToggleCardMessage {
  type: 'sb:toggle';
}

/** Message the card sends when it has no items and the user asks for the editor. */
export interface OpenOptionsMessage {
  type: 'sb:open-options';
}

export type BackgroundToCard = ToggleCardMessage;
export type CardToBackground = OpenOptionsMessage;
