'use client'
import { Children, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMantineColorScheme } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
// import Cookie from "js-cookie";
import { BottomBar } from "./_components/features/editor/BottomBar/BottomBar";
import { FullscreenDropzone } from "./_components/features/editor/FullscreenDropzone";
import { Toolbar } from "./_components/features/editor/Toolbar";
import useGraph from "./_components/features/editor/views/GraphView/stores/useGraph";
import useConfig from "./_store/useConfig";
import useFile from "./_store/useFile";
import styles from './pages.module.css';

const ModalController = dynamic(() => import("./_components/features/modals/ModalController"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const StyledPageWrapper = ({children}) =>{
  return (
    <div className={styles['page-wrapper']}>{children}</div>
  )
}

export const StyledEditorWrapper = ({children}) => {
  return (<div className={styles['editor-wrapper']}>{children}</div>)
}

export const StyledEditor = ({children, ...props}) => {
  return (
    <Allotment {...props} className={styles['styled-allotment']}  >
      {children}
    </Allotment>
  )
}

const TextEditor = dynamic(() => import("./_components/features/editor/TextEditor/TextEditor"), {
  ssr: false,
});

const LiveEditor = dynamic(() => import("./_components/features/editor/InteractiveView/InteractiveView"), {
  ssr: false,
});

const EditorPage = () => {
  const pageRef = useRef(null);
  const checkEditorSession = useFile(state => state.checkEditorSession);
  const fullscreen = useGraph(state => state.fullscreen);
  const { setColorScheme } = useMantineColorScheme();

  // sets JSON to the editor! 
  // TODO: Look into Editor Session, separate all concerns. trigger this on URL loaded. maybe? 

  useEffect(()=>{
    checkEditorSession(undefined, false);
  }, [pageRef])
  

  // TODO: find out why I need this here! and move it if possible.

  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  useEffect(() => {
    setColorScheme(darkmodeEnabled ? "dark" : "light");
  }, [darkmodeEnabled, setColorScheme]);

  return (
    <div ref={pageRef}>
      <QueryClientProvider client={queryClient}>
        <ModalController />
        <StyledEditorWrapper>
          <StyledPageWrapper>
            <Toolbar />
            <StyledEditorWrapper>
              <StyledEditor proportionalLayout={false}>
                <Allotment.Pane
                  preferredSize={450}
                  minSize={fullscreen ? 0 : 300}
                  maxSize={800}
                  visible={!fullscreen}
                >
                  <TextEditor />
                </Allotment.Pane>
                <Allotment.Pane minSize={0}>
                  <LiveEditor />
                </Allotment.Pane>
              </StyledEditor>
              <FullscreenDropzone />
            </StyledEditorWrapper>
          </StyledPageWrapper>
          <BottomBar />
        </StyledEditorWrapper>
      </QueryClientProvider>
    </div>

  );
};

export default EditorPage;
