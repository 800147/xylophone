import { __, appendChildren } from './el.js'
import { urlParams } from './urlParams.js';

const {
  name = '',
  schema = '',
  keys = 12,
  source = '',
  edit
} = urlParams({ keys: Number, edit: Boolean });

if (name) {
  document.title = `${name} — melody for xylophone`;
}

const Key = key => __('div', { className: 'Key-N', style: `--index: ${key - 1}` }, [ key ]);

const KeyRow = keyRow => __(
  'div',
  { className: 'Keys-Key Key' },
  keyRow.split('.').filter(Boolean).map(Key)
);

const Form = () => __('form',
  {
    className: 'Form',
    action: './',
    method: 'GET',
    enctype: 'text/plain'
  },
  [
    __('label', { className: 'Form-Label', htmlFor: 'name' }, [ 'melody name' ]),
    __('input', { className: 'Form-Field', value: name, name: 'name', id: 'name' }),

    __('label', { className: 'Form-Label', htmlFor: 'keys' }, [ 'keys count' ]),
    __('input', { className: 'Form-Field', type: 'number', value: keys, name: 'keys', id: 'keys' }),

    __('label', { className: 'Form-Label', htmlFor: 'schema' }, [ 'schema' ]),
    __('textarea',
      {
        className: 'Form-Field Form-Field_textarea',
        name: 'schema',
        id: 'schema',
        inputMode: 'numeric'
      },
      [ schema ]
    ),

    __('label', { className: 'Form-Label', htmlFor: 'source' }, [ 'source url' ]),
    __('input',
      { className: 'Form-Field', type: 'url', value: source, name: 'source', id: 'source' }
    ),

    __('button', { className: 'Form-Submit', type: 'submit' }, [ 'Submit' ])
  ]
);

document.createElement('label').formFor

const onLoad = () => {
  const body = document.querySelector('body');

  if (edit || !schema) {
    body.appendChild(Form());
  } else {
    appendChildren(body, [
      name && __('h1', {}, [ name ]),

      __('div',
        { className: 'Keys', style: `--keys-count: ${keys}` },
        schema.split(',').map(KeyRow)
      ),

      source && __('p', {}, [
        __('a', { href: source, target: '_blank', className: 'Link' }, [ 'source' ])
      ]),

      __('p', {}, [
        __('a', { href: `${window.location.search}&edit=1`, className: 'Link' }, [ 'edit' ])
      ])
    ]);
  }
};

window.addEventListener('load', onLoad);
