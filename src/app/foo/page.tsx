"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useHookstate } from "@hookstate/core";
import { Button } from "@/components/ui/button";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
const correctIcon = "✅";
const wrongIcon = "❌";
const blankToken = "_____";

const useConvert = () => {
  const destTokens = useHookstate<string[]>([
    "The",
    "quick",
    blankToken,
    "fox",
  ]);
  const sourceTokens = useHookstate<string[]>([
    "The",
    "quick",
    "brown",
    "fox",
    "learn",
    "to",
    "read",
  ]);
  const blankIndex = useHookstate<number>(2);

  // insert token into destTokens at blankIndex
  const insertToken = (token: string) => {
    const oldToken = destTokens.value[blankIndex.value];

    destTokens.set((prev) => {
      const newTokens = [...prev];
      newTokens[blankIndex.value] = token;
      return newTokens;
    });
    // update sourceTokens to remove the token
    sourceTokens.set((prev) => {
      const newTokens = [...prev];
      // find the index of the token
      const index = newTokens.indexOf(token);
      // remove the token
      newTokens.splice(index, 1);
      // reinsert the old token 
      newTokens.splice(blankIndex.value, 0, oldToken);
      return newTokens;
    });
    // update blankIndex to the next blank
    blankIndex.set((prev) => prev + 1);
  };

  const reset = () => {
    destTokens.set(["The", "quick", blankToken, "fox"]);
    sourceTokens.set(["The", "quick", "brown", "fox", "learn", "to", "read"]);
    blankIndex.set(2);
  };

  return {
    data: {
      destTokens,
      sourceTokens,
      blankIndex,
    },
    actions: {
      insertToken,
      reset,
    },
  };
};
export default function HocPage() {
  const { data, actions } = useConvert();

  const renderTargetCard = () => {
    const buttons = data.destTokens.get().map((token, index) => {
      return (
        <Button
          disabled={true}
          variant="outline"
          key={`target-token-${index}`}
          onClick={() => actions.insertToken(token)}
        >
          {token}
        </Button>
      );
    });

    return (
      <Card>
        <CardContent>{buttons}</CardContent>
      </Card>
    );
  };
  const renderSourceCard = () => {
    const buttons = data.sourceTokens.value.map((token, index) => {
      return (
        <Button
          key={`source-token-${index}`}
          onClick={() => actions.insertToken(token)}
        >
          {token}
        </Button>
      );
    });
    return (
      <Card>
        <CardContent>{buttons}</CardContent>
      </Card>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      {renderTargetCard()}
      {renderSourceCard()}
    </div>
  );
}
