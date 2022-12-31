# Honest Magic Typescript Utilities #

Node Module with some useful utils.

## String Templates ##

String template is handy if the string template with variables within is not static but
perhaps user defined.

### Example ###

```typescript
import {StringTemplate, VariableMapping} from "@honest-magic/honest-magic-utils";

let text = '"There are Words," Wyndle said. ' +
    '"That\'s what we call them, at least. ' +
    'They\'re more ... ${idea}s. Living ${idea}s, with power. ' +
    'You have to let them into your ${soul}. Let me into your soul." ' +
    '' +
    '-- Wyndle to Lift in Edgedancer by Brandon Sanderson';

let variableMapping: VariableMapping = {
    mapping: {
        idea: 'idea',
        soul: () => 'soul'
    }
}

let template = new StringTemplate(text)

console.log(template.substitute(variableMapping))

```
The output will be
```shell
"There are Words," Wyndle said. "That's what we call them, at least. They're more ... ideas. Living ideas, with power. You have to let them into your soul. Let me into your soul." -- Wyndle to Lift in Edgedancer by Brandon Sanderson
```

### Features ###

Support for bash 4.0 like transformations:

- `${property,}` to convert the first letter of the string to lowercase
- `${property,,}` to convert the whole string to lowercase
- `${property^}` to convert the first letter of the string to lowercase
- `${property^^}` to convert the whole string to lowercase

## Development ##

### Build ###

```shell
$ tsc
```

### Test ###

```shell
$ npm test
```

### Deploy ###

```shell
$ npm publish --access public
```

