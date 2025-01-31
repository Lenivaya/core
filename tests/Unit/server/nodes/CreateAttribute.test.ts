import { CreateAttribute } from '../../../../src/server/nodes';
import { when } from '../NodeTester';

it('can add a attribute value to an object feature', async () => {
  await when(CreateAttribute)
    .hasInput([{}])
    .and()
    .parameters({
      'Atrribute & value to create': [
        {
          Attribute: { value: 'foo' },
          Value: { value: 'bar' },
        },
      ],
    })
    .assertOutput([{ foo: 'bar' }])
    .finish();
});

it('can add a attribute with object value to an object feature', async () => {
  await when(CreateAttribute)
    .hasInput([{}])
    .and()
    .parameters({
      'Atrribute & value to create': [
        {
          Attribute: { value: 'foo' },
          Value: { value: {} },
        },
      ],
    })
    .assertOutput([{ foo: {} }])
    .finish();
});
