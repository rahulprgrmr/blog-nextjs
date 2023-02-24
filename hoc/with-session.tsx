"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ComponentProps, ComponentPropsWithoutRef } from "react";

interface ISessionProps {
  children: React.ReactNode;
}

function withSession(OriginalComponent: () => any) {
  return class extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render(): React.ReactNode {
      return (
        <SessionProvider>
          <OriginalComponent />
        </SessionProvider>
      );
    }
  };
}

export default withSession;
