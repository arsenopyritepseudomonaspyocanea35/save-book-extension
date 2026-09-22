import { Show, type Component } from 'solid-js';
import { t } from '../shared/i18n';
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
    title={t('stamp.title', props.sites.length, props.sites.map(siteName).join(', '))}
   >
    {t('count.sites', props.sites.length)}
   </span>
  </Show>
 </span>
);
