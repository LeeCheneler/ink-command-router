import React from "react";
import { Text } from "ink";
import minimist from "minimist";

export interface BaseArgs {
  _: string[];
}

const ArgsContext = React.createContext<BaseArgs>({ _: [] });

export const useArgs = <TArgs extends BaseArgs>(): TArgs => {
  return React.useContext(ArgsContext) as TArgs;
};

export interface CommandProps {
  children: React.ReactNode;
  name: string;
}

export const Command = (props: CommandProps) => {
  return <>{props.children}</>;
};

export interface NoMatchProps {
  children: React.ReactNode;
}

export const NoMatch = (props: NoMatchProps) => {
  return <>{props.children}</>;
};

export interface CommandRouterProps {
  args: string[];
  children: React.ReactNode;
}

const DefaultNoMatch = () => {
  return <Text>Command not found</Text>;
};

export const CommandRouter = (props: CommandRouterProps) => {
  const [, , command, ...args] = props.args;

  const children = React.Children.toArray(
    props.children
  ) as React.ReactElement[];

  const matchedCommandElement = children.find(
    (c) => Command === c.type && c.props.name === command
  );
  const noMatchElement = children.find((c) => NoMatch === c.type) ?? (
    <DefaultNoMatch />
  );
  const parsedArgs = minimist(args);

  return (
    <ArgsContext.Provider value={parsedArgs}>
      {matchedCommandElement ? matchedCommandElement : noMatchElement}
    </ArgsContext.Provider>
  );
};
