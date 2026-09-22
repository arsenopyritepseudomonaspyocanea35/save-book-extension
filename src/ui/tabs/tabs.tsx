import { For, Show, type JSX } from 'solid-js';

export interface TabDefinition<T extends string> {
  id: T;
  label: string;
  count?: number;
}

export interface TabsProps<T extends string> {
  label: string;
  tabs: TabDefinition<T>[];
  value: T;
  onChange: (id: T) => void;
}

export function Tabs<T extends string>(props: TabsProps<T>): JSX.Element {
  let list: HTMLDivElement | undefined;

  const focusTab = (id: T) => {
    props.onChange(id);
    list?.querySelector<HTMLButtonElement>(`#tab-${id}`)?.focus();
  };

  return (
    <div class="tabs" role="tablist" aria-label={props.label} ref={list}>
      <For each={props.tabs}>
        {(tab) => (
          <button
            class="tab"
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === props.value}
            aria-controls={`panel-${tab.id}`}
            tabindex={tab.id === props.value ? 0 : -1}
            onClick={() => props.onChange(tab.id)}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
              event.preventDefault();
              const index = props.tabs.findIndex((candidate) => candidate.id === tab.id);
              const step = event.key === 'ArrowRight' ? 1 : -1;
              const next = props.tabs[(index + step + props.tabs.length) % props.tabs.length];
              if (next) focusTab(next.id);
            }}
          >
            <span>{tab.label}</span>
            <Show when={tab.count !== undefined}>
              <span class="count">{tab.count}</span>
            </Show>
          </button>
        )}
      </For>
    </div>
  );
}
