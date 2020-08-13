import React from "react";
import { render } from "ink-testing-library";
import { Text } from "ink";
import {
  CommandRouter,
  Command,
  useArgs,
  BaseArgs,
  NoMatch,
} from "../command-router";

const buildArgs = (...args: string[]) => {
  return ["exec/path", "script/file.js", ...args];
};

interface HookTestHarnessArgs extends BaseArgs {
  x: number;
  y: number;
  n: number;
  a: boolean;
  b: boolean;
  c: boolean;
  beep: string;
}

const HookTestHarness = () => {
  const args = useArgs<HookTestHarnessArgs>();

  return (
    <>
      <Text>{JSON.stringify(args)}</Text>
    </>
  );
};

describe("command-router", () => {
  it("should run first command with matching name", () => {
    const { lastFrame } = render(
      <CommandRouter args={buildArgs("two")}>
        <Command name="one">
          <Text>one</Text>
        </Command>
        <Command name="two">
          <Text>two</Text>
        </Command>
        <Command name="three">
          <Text>three</Text>
        </Command>
      </CommandRouter>
    );

    expect(lastFrame()).toBe("two");
  });

  it("should provide parsed args via useArgs hook", () => {
    const { lastFrame } = render(
      <CommandRouter
        args={buildArgs(
          "one",
          "-x",
          "3",
          "-y",
          "4",
          "-n5",
          "-abc",
          "--beep=boop",
          "foo",
          "bar",
          "baz"
        )}
      >
        <Command name="one">
          <HookTestHarness />
        </Command>
      </CommandRouter>
    );

    expect(lastFrame()).toBe(
      JSON.stringify({
        _: ["foo", "bar", "baz"],
        x: 3,
        y: 4,
        n: 5,
        a: true,
        b: true,
        c: true,
        beep: "boop",
      })
    );
  });

  it("should return 'Command not found' if no command is matched and <NoMatch /> is not used", () => {
    const { lastFrame } = render(
      <CommandRouter args={buildArgs("four")}>
        <Command name="one">
          <Text>one</Text>
        </Command>
        <Command name="two">
          <Text>two</Text>
        </Command>
        <Command name="three">
          <Text>three</Text>
        </Command>
      </CommandRouter>
    );

    expect(lastFrame()).toBe("Command not found");
  });

  it("should return NoMatch child if no command is matched", () => {
    const { lastFrame } = render(
      <CommandRouter args={buildArgs("four")}>
        <Command name="one">
          <Text>one</Text>
        </Command>
        <Command name="two">
          <Text>two</Text>
        </Command>
        <Command name="three">
          <Text>three</Text>
        </Command>
        <NoMatch>
          <Text>Hmm where IS that command?!</Text>
        </NoMatch>
      </CommandRouter>
    );

    expect(lastFrame()).toBe("Hmm where IS that command?!");
  });
});
