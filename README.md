# els-addon-typed-templates
Ember Language Server Typed Templates Addon

How to use?

Install this addon as `dev-dependency` inside your ember project.

How typed template looks under the hood?
[issue-351282903](https://github.com/lifeart/els-addon-typed-templates/pull/11#issue-351282903)

* route templates not supported (yet);

### Autocomplete

![autocomplete preview](previews/autocomplete.png)

### Warn Each


![warn each](previews/warn-each.png)

### Unknown Property
![warn unknown](previews/warn-unknown.png)

### Features

* Component context autocomplete `{{this.}}`
* Component arguments autocomplete `{{@}}`
* Warn on undefined properties (on complete)
* Warn on incorrect `each` arguments (not an array)

### NPM
`npm install els-addon-typed-templates --save-dev`

### Yarn
`yarn add els-addon-typed-templates --dev`

### VSCode

Install: [Unstable Ember Language Server](https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-ember-unstable).

* Restart `VSCode`.


## Usage


Try type `{{this.}}` or `{{@}}` inside component template.

[UELS](https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-ember-unstable) >= `0.2.57` required.


### Ignore line?

 - use handlebars comments

```hbs
 {{!-- @ts-ignore --}} 
 {{this.line.to.ignore}}
```

### Ignore file?

```hbs
{{!-- @ts-nocheck --}}
```


### Owerride/Extend global typings?

```ts
// + project/types/index.d.ts
declare module "ember-typed-templates" {
    interface GlobalRegistry {
		// helper, component, modifier name -> result
        'unknown-helper': (params: string[], hash?)=> string,
        'block': (params?, hash?) => [ { someFirstBlockParamProperty: 42 } ]
    }
}
```


### Is it support JSDoc?

- yes


### How to get args checking for template-only components?

- add typings (even in an `.js` project) to template!

```hbs
{{!-- 
    interface Args {
        foo: {
            bar: string
        }
    }
--}}
{{@foo.bar}}
```

### How to get block autocomplete / js files typings support ?


`components/cart.js`
```js
/**
* @typedef {import('./../services/cart').default} CartService
*/
export default class CartComponent extends Component {
     /**
     * CartService
     * @type {CartService}
     */
    @service('cart') cart;
}
```

`components/cart.hbs`
```hbs
{{#each this.cart.items as |item|}}
    {{item.name}} 
    // ^ will support autocomplete and linting
{{/each}}
```


### QA:

``` 
	- Would it be possible to add these as dependencies to the language server or somesuch?
	- Nope, because it's "experimental" and "heavy" functionality, adding it into language server itself may decrease DX for other users. UELS has addon API, using this addon API you able add functionality into langserver. All addons scoped inside projects (to allow users have multple addon versions for different ember projects and versions).
```

## Is it stable?

* Sometimes it may crash your language server, don't worry it will awake automatically.

