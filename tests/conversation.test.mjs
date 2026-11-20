import assert from 'node:assert/strict';
import test from 'node:test';
import { ConversationMessage, ConversationSurface } from '../dist/index.js';

const required = { label: 'Conversation', transcriptLabel: 'Messages', header: 'Header', children: 'Body' };
const visibleChildren = (element) => element.props.children.filter(Boolean);

test('surface keeps all application slots outside the keyboard-scrollable transcript', () => {
  const surface = ConversationSurface({ ...required, status: 'Status', actions: 'Actions', composer: 'Composer', keyboard: 'Keyboard', busy: true, id: 'conversation', className: 'custom' });
  assert.equal(surface.type, 'section');
  assert.equal(surface.props.id, 'conversation');
  assert.equal(surface.props.className, 'ryl-conversation custom');
  assert.equal(surface.props['aria-label'], 'Conversation');
  const parts = visibleChildren(surface);
  assert.deepEqual(parts.map((part) => part.props.children), ['Header', 'Body', 'Status', 'Actions', 'Composer', 'Keyboard']);
  assert.equal(parts[1].props.role, 'region');
  assert.equal(parts[1].props.tabIndex, 0);
  assert.equal(parts[1].props['aria-label'], 'Messages');
  assert.equal(parts[1].props['aria-busy'], true);
  // Applications announce a concise update in their own live region, not the entire history.
  assert.equal(parts[1].props['aria-live'], undefined);
});

test('optional slots are omitted and the transcript starts idle', () => {
  const parts = visibleChildren(ConversationSurface(required));
  assert.equal(parts.length, 2);
  assert.equal(parts[1].props['aria-busy'], false);
});

test('message preserves semantic attributes, rich content and actions', () => {
  const content = { type: 'p', props: { children: 'Message' } };
  const message = ConversationMessage({ children: content, alignment: 'end', metadata: 'You', actions: 'Choose', 'aria-label': 'Your message', dir: 'rtl', className: 'custom' });
  assert.equal(message.type, 'article');
  assert.equal(message.props['data-alignment'], 'end');
  assert.equal(message.props['aria-label'], 'Your message');
  assert.equal(message.props.dir, 'rtl');
  assert.equal(message.props.className, 'ryl-conversation-message custom');
  assert.deepEqual(visibleChildren(message).map((part) => part.props.children), ['You', content, 'Choose']);
  assert.equal(ConversationMessage({ children: 'Hello' }).props['data-alignment'], 'start');
});
