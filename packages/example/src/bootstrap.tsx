import React from "react";
import { Text, render } from "ink";
import { CommandRouter, Command, NoMatch, useArgs } from "ink-command-router";

export const bootstrap = (args: string[]) => {
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
};
