import React from "react";
import ReactDOM from "react-dom";
import { init, loadRemote } from "@module-federation/runtime";

import pkg from "../package.json";

import Counter from "./components/Counter";
import Wrapper from "./components/Wrapper";

init({
  name: "host",
  remotes: [
    {
      name: "remote",
      entry: "http://127.0.0.1:8081/remoteEntry.js",
      alias: "remote",
      type: "module",
    },
  ],
  shared: {
    react: {
      version: pkg.dependencies["react"],
      scope: "default",
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: pkg.dependencies["react"],
      },
    },
    "react-dom": {
      version: pkg.dependencies["react-dom"],
      scope: "default",
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: pkg.dependencies["react-dom"],
      },
    },
    "styled-components": {
      version: pkg.dependencies["styled-components"],
      scope: "default",
      // This throws an error: `Uncaught TypeError: styled.button is not a function`
      // lib: () => import("styled-components"),

      // (Expected) This throws an error: `Uncaught Error: Element type is invalid` - because `ThemeProvider` is not default export -> therfore it's not included into lib
      // lib: () => import("styled-components").then((mod) => mod.default),

      // Both works, but it loads two instances of `styled-components` -> from host and remote. Why?
      // get: () => () => import("styled-components"),
      // get: () => () => import("styled-components").then((mod) => mod.default),

      // Not passing either `lib` or `get` also works, but it loads two instances of `styled-components` -> from host and remote. Why?
      shareConfig: {
        singleton: true,
        requiredVersion: pkg.dependencies["styled-components"],
      },
    },
  },
});

// @ts-ignore
const RemoteCounter = React.lazy(async () => loadRemote("remote/remote-app"));

export default () => {
  React.useEffect(() => {
    console.log("Host useEffect");
  }, []);

  return (
    <>
      <Wrapper>
        <Counter />
      </Wrapper>

      <React.Suspense fallback="loading...">
        <RemoteCounter />
      </React.Suspense>
    </>
  );
};
