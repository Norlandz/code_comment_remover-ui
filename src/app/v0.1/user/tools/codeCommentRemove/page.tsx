'use client';

import React from 'react';
import Select from 'react-select';
// import Select from '../../../libFix/react-select';
import styles from './page.module.css';
import moment from 'moment';
import dayjs from 'dayjs';
import axios from 'axios';
import { RemoveCodeCommentSender, ProgramLang } from './RemoveCodeCommentSender';
import { FetchResponseException } from '@/exception/fetchApi/FetchResponseException';
import { CategorySrcCodeBelongsTo, ErrorBelongWrapper } from '@/exception/general/ErrorBelongWrapper';

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
            <li>Click {RemoveCodeCommentSender.removeCodeComment.name}</li>
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
  //

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

          dispatch_resultState({
            time: dayjs().format('HH:mm:ss.SSS'),
            resultState: 'fetching',
          });
          // should i move this out of async?

          try {
            // @main:
            const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);
            codeOutput_setRst(codeOutput);
            dispatch_resultState({
              time: dayjs().format('HH:mm:ss.SSS'),
              resultState: 'done',
            });
          } catch (error) {
            if (error instanceof ErrorBelongWrapper) {
              if (error.categorySrcCodeBelongsTo === CategorySrcCodeBelongsTo.fetchApi) {
                if (error.errorWrapped instanceof FetchResponseException) {
                  codeOutput_setRst(await error.errorWrapped.fetchResponse.text());
                  dispatch_resultState({
                    time: dayjs().format('HH:mm:ss.SSS'),
                    resultState: FetchResponseException.name,
                  });
                } else if (error.errorWrapped instanceof TypeError) {
                  codeOutput_setRst(error.errorWrapped.message); // JSON.stringify(error.errorWrapped, null, 2)); doesnt shows
                  dispatch_resultState({
                    time: dayjs().format('HH:mm:ss.SSS'),
                    resultState: TypeError.name,
                  });
                } else {
                  throw error.errorWrapped;
                }
              } else {
                throw error.errorWrapped;
              }
            } else {
              throw error;
            }
          }
          // the use of finally & the throw ......
        }}
      >
        {RemoveCodeCommentSender.removeCodeComment.name}
      </button>
      <pre style={{ maxWidth: '300px', overflow: 'scroll' }}>{resultState_rst}</pre>
    </div>
  );
};
