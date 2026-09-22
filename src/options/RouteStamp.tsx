import { Show, type Component } from 'solid-js';
import { siteName } from '../shared/naming';
import type { Site } from '../shared/schema';

export interface RouteStampProps {
 sites: Site[];
}

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
