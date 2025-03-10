import React from 'react'
import parse from "html-react-parser";

export default function EditorContentParser({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-p:text-lg prose-p:text-muted-foreground max-w-none">{parse(content || "")}</div>
  )
}
