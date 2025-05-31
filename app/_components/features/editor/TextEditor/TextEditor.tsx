'use client'
import React, { useCallback } from "react";
import { LoadingOverlay } from "@mantine/core";
import Editor, { type EditorProps, loader, type OnMount, useMonaco } from "@monaco-editor/react";
import useConfig from "../../../../_store/useConfig";
import useFile from "../../../../_store/useFile";
import TextEditorWrapper from "./_components/TextEditorWrapper";
import StyledEditorWrapper from "../views/GraphView/_components/StyledEditorWrapper";

loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs",
  },
});

const editorOptions: EditorProps["options"] = {
  formatOnPaste: true,
  tabSize: 2,
  formatOnType: true,
  minimap: { enabled: false },
  stickyScroll: { enabled: false },
  scrollBeyondLastLine: false,
  placeholder: "Start typing...",
};

const TextEditor = () => {
  const monaco = useMonaco();
  const contents = useFile(state => state.contents);
  const setContents = useFile(state => state.setContents);
  const setError = useFile(state => state.setError);
  const jsonSchema = useFile(state => state.jsonSchema);
  const getHasChanges = useFile(state => state.getHasChanges);
  const theme = useConfig(state => (state.darkmodeEnabled ? "vs-dark" : "light"));
  const fileType = useFile(state => state.format);

  React.useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      enableSchemaRequest: true,
      ...(jsonSchema && {
        schemas: [
          {
            uri: "http://myserver/foo-schema.json",
            fileMatch: ["*"],
            schema: jsonSchema,
          },
        ],
      }),
    });
  }, [jsonSchema, monaco?.languages.json.jsonDefaults]);

  React.useEffect(() => {
    const beforeunload = (e: BeforeUnloadEvent) => {
      if (getHasChanges()) {
        const confirmationMessage =
          "Unsaved changes, if you leave before saving  your changes will be lost";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", beforeunload);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [getHasChanges]);

  const handleMount: OnMount = useCallback(editor => {
    editor.onDidPaste(() => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  }, []);

  return (
    // changed from StyledEditorWrapper to TextEditorWrapper. not sure why!!!!!
    <TextEditorWrapper>
        <Editor
          height="100%"
          language={fileType}
          theme={theme}
          value={contents}
          options={editorOptions}
          onMount={handleMount}
          onValidate={errors => setError(errors[0]?.message)}
          onChange={contents => setContents({ contents, skipUpdate: true })}
          loading={<LoadingOverlay visible />}
        />
    </TextEditorWrapper>
  );
};

export default TextEditor;

