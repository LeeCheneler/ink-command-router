# ink-command-router

![Integration](https://github.com/LeeCheneler/ink-command-router/workflows/Integration/badge.svg)

A simple [React](https://reactjs.org/) based router for [ink](https://github.com/vadimdemedes/ink) CLI commands.

# Getting started

Install the package.

```sh
yarn add ink-command-router
```

Configure your commands.

```tsx
import { Text, render } from "ink";
import { CommandRouter, Command, NoMatch, useArgs } from "ink-command-router";

const Help = () => {
  return <Text>I should probably tell you how to use this tool... 😅</Text>;
};

const Version = () => {
  return <Text>1.0.0</Text>;
};

const PrintParsedArgs = () => {
  const args = useArgs();

  return <Text>{JSON.stringify(args, null, 2)}</Text>;
};

const App = () => {
  return (
    <CommandRouter args={process.argv}>
      <Command name="help">
        <Help />
      </Command>
      <Command name="version">
        <Version />
      </Command>
      <Command name="print-parsed-args">
        <PrintParsedArgs />
      </Command>
      <NoMatch>
        <Help />
      </NoMatch>
    </CommandRouter>
  );
};

render(<App />);
```

You can then use the tool like so:

```sh
> tool help
> I should probably tell you how to use this tool... 😅
>
> tool version
> 1.0.0
>
> tool print-parsed-args -hello world -foo=bar --one=two --three four final-arg
> {
>   "_": ["final-arg"],
>   "hello":"world",
>   "one":"two",
>   "three":"four"
> }
>
> tool this-does-not-exist
> I should probably tell you how to use this tool... 😅
```
