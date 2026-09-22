import { Show, type Component } from 'solid-js';
import { siteName } from '../shared/naming';
import type { Site } from '../shared/schema';

export interface RouteStampProps {
 /** Every site this item is shown on, in store order. */
 sites: Site[];
}

/**
 * Says out loud that one value stands on several sites. The slot is always rendered, so a row
 * without a stamp keeps the same column widths as one with it.
 */
export const RouteStamp: Component<RouteStampProps> = (props) => (
 <span class="stamp-slot">
  <Show when={props.sites.length > 1}>
   <span
    class="stamp"
    title={`Shown on ${props.sites.length} sites: ${props.sites.map(siteName).join(', ')}`}
   >
    {props.sites.length} sites
   </span>
  </Show>
 </span>
);
