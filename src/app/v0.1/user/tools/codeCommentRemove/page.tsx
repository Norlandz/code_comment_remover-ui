'use client';

import React from 'react';
import Select from 'react-select';
import styles from './page.module.css';
import dayjs from 'dayjs';
import { ProgramLang } from './enum/ProgramLang';
import * as removeCodeComment_serverAction from "./serviceDelegator/removeCodeComment_serverAction";

// ;[aga SSR CSR pb]; And a Server Component shouldn't contain client-specific code, for example, hooks such as useState. If you need that, you should add "use client" at the top, to make it a Client Component, which, obviously, shouldn't contain server-side stuff like metadata: https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp -- reactjs - You're importing a component that needs useState. It only works in a Client Component, but none of its parents are marked with "use client" - Stack Overflow - Google Chrome

const Index = () => {
  const [codeInput_rst, codeInput_setRst] = React.useState('');
  const [codeOutput_rst, codeOutput_setRst] = React.useState('get your codeOutput here');

  return (
    <>
      <h1>codeCommentRemove</h1>

      <ul>
        <li>
          How to use
          <ol>
            <li>Paste the input code on the left</li>
            <li>Select your CodeLanguage</li>
            {/* ~~~~// r proxy ... those function.name is really a pb ... */}
            <li>Click removeCodeComment</li>
            <li>Copy the output code on the right</li>
          </ol>
        </li>
        <li>
          Note::
          <ul>
            <li>
              If your input code syntax is wrong, comment remove will fail / result in a wrong/corrupted output{' '}
              <ul>
                <li>-- JavaParser will report an Error. TsParser will just silently produce a corrupted output.</li>
              </ul>
            </li>
            <li>
              This internally uses JavaParser / TsParser to catch the comments, not simple regex. So it should be reliable.
              <ul>
                <li>Though, if there is a bug in the Program, the output can be wrong. (unlikely)</li>
                <li>If the version of Java/Typescript doesnt match, the output may be wrong. (unlikely)</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <div className={styles.panelMainConvert}>
        <InputCode codeInput_setRst={codeInput_setRst} />
        <ConvertButtonBox codeInput_rst={codeInput_rst} codeOutput_setRst={codeOutput_setRst} />
        <OutputCode codeOutput_rst={codeOutput_rst} />
      </div>
    </>
  );
};
export default Index;

const InputCode: React.FC<{
  codeInput_setRst: React.Dispatch<React.SetStateAction<string>>;
}> = ({ codeInput_setRst }) => {
  return (
    <div className={styles.panelCode + ' ' + styles.panelInputCode}>
      <textarea
        onChange={(event) => {
          codeInput_setRst(event.target.value);
        }}
        style={{ height: '98%', width: '98%', overflow: 'scroll', whiteSpace: 'pre' }}
      ></textarea>
    </div>
  );
};

const OutputCode: React.FC<{
  codeOutput_rst: string;
}> = ({ codeOutput_rst }) => {
  // dk is the `value` is React thing or native js thing
  return (
    <div className={styles.panelCode + ' ' + styles.panelOutputCode}>
      {/* <textarea>{codeOutput_rst}</textarea> */}
      {/* <pre>{codeOutput_rst}</pre> */}
      <textarea readOnly value={codeOutput_rst} style={{ height: '98%', width: '98%', overflow: 'scroll', whiteSpace: 'pre' }}></textarea>
    </div>
  );
};

const ConvertButtonBox: React.FC<{
  codeInput_rst: string;
  codeOutput_setRst: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  codeInput_rst, //
  codeOutput_setRst,
}) => {
  const [programLang_rst, programLang_setRst] = React.useState(ProgramLang.Typescript);

  function reducer_resultState(
    state: string,
    msgDispatched: {
      time: string;
      resultState: string;
    }
  ) {
    // react rerender involve time
    // return `${moment().format('HH:mm:ss.SSS')}\n${msg}`;
    return JSON.stringify(msgDispatched, null, 2);
  }
  const [resultState_rst, dispatch_resultState] = React.useReducer(reducer_resultState, `NA`);
  // []
  // because your client and server purposefully render different content (like the server rendering a dark theme which gets replaced with the user preference on load), use `suppressHydrationWarning` to suppress the error.
  // <>
  // https://stackoverflow.com/questions/47349500/text-content-did-not-match-warning-in-react-16

  // cannot add this inside dispatch, cuz it needs to be pure function ...
  function dispatch_resultState_withTime(state: { resultState: string }) {
    dispatch_resultState({
      time: dayjs().format('HH:mm:ss.SSS'),
      ...state,
    });
  }

  // log.error("Java Parse failed :: " + parseResult); // must throw .. only in project may suppress ..

  return (
    <div className={styles.panelConvertButtonBox}>
      <Select
        // Warning: Prop `id` did not match. Server: "react-select-2-live-region" Client: "react-select-3-live-region"
        instanceId={React.useId()} // https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match
        defaultValue={{
          value: programLang_rst,
          label: programLang_rst,
        }}
        options={[
          { value: ProgramLang.Typescript, label: ProgramLang.Typescript },
          { value: ProgramLang.Java, label: ProgramLang.Java },
        ]}
        onChange={(optSelected) => {
          if (optSelected == null) throw new TypeError();
          programLang_setRst(optSelected.value);
        }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // borderColor: state.isFocused ? 'grey' : 'red',
            display: 'inline-flex',
            fontSize: 12,
            minHeight: 'initial',
          }),
          // indicatorsContainer: (baseStyles, state) => ({ ...baseStyles, padding: 0, }),
          dropdownIndicator: (baseStyles, props) => ({ ...baseStyles, padding: 0 }),
          input: (baseStyles, props) => ({ ...baseStyles, margin: 0 }),
          // https://react-select.com/styles#inner-components
        }}
      />
      <button
        onClick={async () => {
          // try {@¦          //   // @main:@¦          //   const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);@¦          //   codeOutput_setRst(codeOutput);@¦          //   resultState_dispatchRst('done');@¦          // } catch (error) {@¦          //   if (!axios.isAxiosError(error)) throw error;@¦          //   if (error.response) {@¦          //     // if (error.response && error.response.status === 404 && error.response.data === null) {@¦          //     resultState_dispatchRst(error.response.data);@¦          //   } else {@¦          //     resultState_dispatchRst(JSON.stringify(error, null, 2));@¦          //   }@¦          // }

          dispatch_resultState_withTime({ resultState: 'fetching' });
          // should i move this out of async?
          // TODO @que: actually react render async... shouldnt it wait until this button onclick is done then rerender? this should block below, why would this work?

          // @design[think]: try {
          // @design[think]:   // @main:
          // @design[think]:   // @comment: well if that sequence of code is must . wrap the whole handler into ?.... em
          // @design[think]:   // @comment: still feel then the unified api inanother backend server -- like a reverse proxy should be fine then .. -- just that allow (its jus ttat rigger action -- sequence (/groups of) actions are exec (/ wrapped) in that call -- the mapping is already say good wrapping ..
          // @design[think]:   // @comment: -- and say the Nextjs use server just cope well with this idea then (guess rt the port no need re export . wel
          // @design[think]:   // const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);
          // @design[think]:   // @need_check try with manual url path to POST, see if diff // <see [consider 'use server' // both seems work]>
          // @design[think]:   // @: call to server_action
          // @design[think]:   const { codeOutput } = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);
          // @design[think]:   codeOutput_setRst(codeOutput);
          // @design[think]:   dispatch_resultState_withTime({ resultState: 'done' });
          // @design[think]: } catch (error) {
          // @design[think]:   // @que,pb: dont seem try catch would work with server_action @no_knowlres
          // @design[think]:   // ;not_working[try catch Server_Action pb]; if (error instanceof UnsupportedProgrammingLanguageException) {
          // @design[think]:   // ;not_working[try catch Server_Action pb];   codeOutput_setRst(error.message);
          // @design[think]:   // ;not_working[try catch Server_Action pb];   dispatch_resultState_withTime({ resultState: error.name });
          // @design[think]:   // ;not_working[try catch Server_Action pb]; } else if (error instanceof EmptyContentException) {
          // @design[think]:   // ;not_working[try catch Server_Action pb];   codeOutput_setRst(error.message);
          // @design[think]:   // ;not_working[try catch Server_Action pb];   dispatch_resultState_withTime({ resultState: error.name });
          // @design[think]:   // ;not_working[try catch Server_Action pb]; } else if (error instanceof FetchResponseException) {
          // @design[think]:   // ;not_working[try catch Server_Action pb];   codeOutput_setRst(await error.fetchResponse.text());
          // @design[think]:   // ;not_working[try catch Server_Action pb];   dispatch_resultState_withTime({ resultState: FetchResponseException.name });
          // @design[think]:   // ;not_working[try catch Server_Action pb]; } else if (error instanceof FetchNetworkErrorWrapper) {
          // @design[think]:   // ;not_working[try catch Server_Action pb];   codeOutput_setRst(error.errorWrapped instanceof Error ? error.errorWrapped.message : typeof error.errorWrapped === 'string' ? error.errorWrapped : 'unknown FetchNetworkError');
          // @design[think]:   // ;not_working[try catch Server_Action pb];   dispatch_resultState_withTime({ resultState: FetchNetworkErrorWrapper.name });
          // @design[think]:   // ;not_working[try catch Server_Action pb]; } else {
          // @design[think]:   // ;not_working[try catch Server_Action pb];   // TODOX @que: dont seem try catch would work with server_action @no_knowlres
          // @design[think]:   // ;not_working[try catch Server_Action pb];   // actually kinda works, but not the same instance; guess serialization pb
          // @design[think]:   // ;not_working[try catch Server_Action pb];   console.error(error)
          // @design[think]:   // ;not_working[try catch Server_Action pb];   console.error(typeof error)
          // @design[think]:   // ;not_working[try catch Server_Action pb];   console.error(typeof error.constructor.name)
          // @design[think]:   // ;not_working[try catch Server_Action pb];   console.error(typeof Object.getPrototypeOf(error).constructor.name)
          // @design[think]:   // ;not_working[try catch Server_Action pb];   console.error(error.stack)
          // @design[think]:   // ;not_working[try catch Server_Action pb];   throw error;
          // @design[think]:   // ;not_working[try catch Server_Action pb]; }
          // @design[think]:   type ErrorFromServerAction = {
          // @design[think]:     stack: string;
          // @design[think]:   };
          // @design[think]:   function typeguard_ErrorFromServerAction(error: unknown): error is ErrorFromServerAction {
          // @design[think]:     return error != null && typeof error === 'object' && Object.hasOwn(error as ErrorFromServerAction, 'stack') && typeof (error as ErrorFromServerAction).stack === 'string';
          // @design[think]:   }
          // @design[think]:   if (typeguard_ErrorFromServerAction(error)) {
          // @design[think]:     codeOutput_setRst(error.stack);
          // @design[think]:     dispatch_resultState_withTime({ resultState: 'general_error' });
          // @design[think]:   } else {
          // @design[think]:     throw error;
          // @design[think]:   }
          // @design[think]: }

          // @compare,design[fetchApi]           let fetchResponse: Response;
          // @compare,design[fetchApi]           try {
          // @compare,design[fetchApi]             // TODO url need dommain name? what if behind proxy server?
          // @compare,design[fetchApi]             fetchResponse = await fetch('/v0.1/user/tools/codeCommentRemove/api/remove_Comment_inGiven_FileCode', {
          // @compare,design[fetchApi]               method: 'POST',
          // @compare,design[fetchApi]               headers: {
          // @compare,design[fetchApi]                 // 'Content-Type': 'text/plain',
          // @compare,design[fetchApi]                 'Content-type': 'application/json',
          // @compare,design[fetchApi]                 Accept: 'application/json,*/*;q=0.0',
          // @compare,design[fetchApi]               },
          // @compare,design[fetchApi]               body: JSON.stringify({
          // @compare,design[fetchApi]                 codeInput: codeInput_rst,
          // @compare,design[fetchApi]                 pglang: programLang_rst,
          // @compare,design[fetchApi]               }),
          // @compare,design[fetchApi]             });
          // @compare,design[fetchApi]           } catch (error) {
          // @compare,design[fetchApi]             // throw new FetchNetworkErrorWrapper(error);
          // @compare,design[fetchApi]             // aga error handle .. this cant know anything about what really is the error ...
          // @compare,design[fetchApi]             // bit conflict with another layer, better have better msg indication, but whatever
          // @compare,design[fetchApi]             codeOutput_setRst(error instanceof Error ? error.message : typeof error === 'string' ? error : 'unknown FetchError'!);
          // @compare,design[fetchApi]             dispatch_resultState_withTime({ resultState: 'general_error' });
          // @compare,design[fetchApi]             return;
          // @compare,design[fetchApi]           }
          // @compare,design[fetchApi]
          // @compare,design[fetchApi]           const  { codeOutput, errorMsg }  = (await fetchResponse.json()) as CodeConversionOutputMsg;

          // @main:
          // @comment: well if that sequence of code is must . wrap the whole handler into ?.... em
          // @comment: still feel then the unified api inanother backend server -- like a reverse proxy should be fine then .. -- just that allow (its jus ttat rigger action -- sequence (/groups of) actions are exec (/ wrapped) in that call -- the mapping is already say good wrapping ..
          // @comment: -- and say the Nextjs use server just cope well with this idea then (guess rt the port no need re export . wel
          // const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);
          // @need_check try with manual url path to POST, see if diff // <see [consider 'use server' // both seems work]>
          // @: call to server_action
          const { codeOutput, errorName, errorMsg } = await removeCodeComment_serverAction.removeCodeComment_serverAction({
            codeInput: codeInput_rst,
            pglang: programLang_rst,
          });
          if (codeOutput != null) {
            if (errorMsg != null) throw new TypeError();
            codeOutput_setRst(codeOutput);
            dispatch_resultState_withTime({ resultState: 'done' });
          }
          // @que,pb: dont seem try catch would work with server_action @no_knowlres
          else {
            if (errorMsg == null) throw new TypeError();
            if (codeOutput != null) throw new TypeError();
            codeOutput_setRst('There was an error during removeCodeComment:\n' + errorName + '\n' +errorMsg);
            dispatch_resultState_withTime({ resultState: 'error' });
          }
        }}
      >
        removeCodeComment
      </button>
      <pre style={{ maxWidth: '300px', overflow: 'scroll' }}>{resultState_rst}</pre>
    </div>
  );
};
