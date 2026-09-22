import { For, Show, createEffect, createSignal, onCleanup, onMount, type Component } from 'solid-js';
import { IconButton } from '../ui/icon-button/icon-button';
import { ChevronIcon, CloseIcon, EyeIcon, EyeOffIcon, GripIcon } from '../ui/icons/icons';
import { t } from '../shared/i18n';
import { itemTypes } from '../shared/itemTypes';
import type { Item, Site, SiteUI, Theme } from '../shared/schema';

const DOTS = '••••••••';
const GUTTER = 12;
const COPY_MS = 1000;

export interface CardProps {
  site: Site;
  items: Item[];
  theme: Theme;
  host: HTMLElement;
  onPatchUi: (patch: Partial<SiteUI>) => void;
  onOpenOptions: () => void;
  copy: (item: Item) => Promise<boolean>;
}

const Row: Component<{ item: Item; copy: (item: Item) => Promise<boolean> }> = (props) => {
  const definition = () => itemTypes[props.item.type];
  const [revealed, setRevealed] = createSignal(false);
  const [copied, setCopied] = createSignal(false);
  let timer = 0;

  onCleanup(() => clearTimeout(timer));

  const shown = () => (definition().secret && !revealed() ? DOTS : props.item.value);

  const activate = async () => {
    if (!(await props.copy(props.item))) return;
    setCopied(true);
    clearTimeout(timer);
    timer = setTimeout(() => setCopied(false), COPY_MS);
  };

  return (
    <li>
      <div
        class="row"
        classList={{ nolabel: !props.item.label }}
        role="button"
        tabindex="0"
        title={t('card.copyHint')}
        on:click={() => void activate()}
        on:keydown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          void activate();
        }}
      >
        <Show when={props.item.label}>{(label) => <span class="lbl">{label()}</span>}</Show>
        <span class="val" classList={{ copied: copied(), dim: !copied() && !shown() }}>
          {copied() ? t('card.copied') : shown() || '—'}
        </span>
        <Show when={definition().secret}>
          <IconButton
            title={revealed() ? t('card.hide') : t('card.reveal')}
            pressed={revealed()}
            onClick={(event) => {
              event.stopPropagation();
              setRevealed((value) => !value);
            }}
          >
            {revealed() ? <EyeOffIcon /> : <EyeIcon />}
          </IconButton>
        </Show>
      </div>
    </li>
  );
};

export const Card: Component<CardProps> = (props) => {
  let position = { x: 0, y: 0 };
  let dragging = false;
  let endDrag: (() => void) | undefined;

  const apply = (x: number, y: number) => {
    const width = props.host.offsetWidth;
    const height = props.host.offsetHeight;
    const maxX = Math.max(GUTTER, window.innerWidth - width - GUTTER);
    const maxY = Math.max(GUTTER, window.innerHeight - height - GUTTER);
    position = {
      x: Math.round(Math.min(Math.max(GUTTER, x), maxX)),
      y: Math.round(Math.min(Math.max(GUTTER, y), maxY)),
    };
    props.host.style.setProperty(
      'transform',
      `translate3d(${position.x}px, ${position.y}px, 0)`,
      'important',
    );
  };

  const applyStored = () => {
    const { x, y } = props.site.ui;
    apply(x ?? window.innerWidth, y ?? GUTTER);
  };

  createEffect(() => {
    const { hidden, x, y } = props.site.ui;
    props.host.style.setProperty('display', hidden ? 'none' : 'block', 'important');
    if (hidden || dragging) return;
    if (x === position.x && y === position.y) return;
    applyStored();
  });

  const onResize = () => {
    if (!dragging && !props.site.ui.hidden) apply(position.x, position.y);
  };

  onMount(() => window.addEventListener('resize', onResize));
  onCleanup(() => {
    window.removeEventListener('resize', onResize);
    endDrag?.();
  });

  const onDragStart = (event: PointerEvent) => {
    if (event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest('button')) return;

    dragging = true;
    const startX = event.clientX;
    const startY = event.clientY;
    const baseX = position.x;
    const baseY = position.y;
    let pending: { x: number; y: number } | null = null;
    let frame = 0;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      apply(pending.x, pending.y);
      pending = null;
    };
    const onMove = (move: PointerEvent) => {
      pending = { x: baseX + move.clientX - startX, y: baseY + move.clientY - startY };
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove, true);
      window.removeEventListener('pointerup', onUp, true);
      window.removeEventListener('pointercancel', onUp, true);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      flush();
      dragging = false;
      endDrag = undefined;
      props.onPatchUi({ x: position.x, y: position.y });
    };

    window.addEventListener('pointermove', onMove, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('pointercancel', onUp, true);
    endDrag = onUp;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      class="card ui-tokens"
      classList={{ collapsed: props.site.ui.collapsed }}
      data-theme={props.theme === 'system' ? undefined : props.theme}
      on:click={(event) => event.stopPropagation()}
      on:contextmenu={(event) => event.stopPropagation()}
    >
      <div class="head" on:pointerdown={onDragStart}>
        <span class="grip" aria-hidden="true">
          <GripIcon />
        </span>
        <span class="title">{props.site.label || props.site.pattern}</span>
        <span class="acts">
          <IconButton
            title={t('card.collapse')}
            onClick={() => props.onPatchUi({ collapsed: !props.site.ui.collapsed })}
          >
            <ChevronIcon />
          </IconButton>
          <IconButton title={t('card.hideCard')} onClick={() => props.onPatchUi({ hidden: true })}>
            <CloseIcon />
          </IconButton>
        </span>
      </div>
      <div class="sep" />
      <ul class="items">
        <Show
          when={props.items.length}
          fallback={
            <li class="empty">
              <span>{t('card.empty')}</span>
              <button class="link" type="button" on:click={() => props.onOpenOptions()}>
                {t('card.addItems')}
              </button>
            </li>
          }
        >
          <For each={props.items}>{(item) => <Row item={item} copy={props.copy} />}</For>
        </Show>
      </ul>
    </div>
  );
};
