'use client';

import * as React from 'react';
import Select from 'react-select';
// import Select from '../../../libFix/react-select';
import styles from './page.module.css';
import moment from 'moment';
import axios from 'axios';

// ;[aga SSR CSR pb]; And a Server Component shouldn't contain client-specific code, for example, hooks such as useState. If you need that, you should add "use client" at the top, to make it a Client Component, which, obviously, shouldn't contain server-side stuff like metadata: https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp -- reactjs - You're importing a component that needs useState. It only works in a Client Component, but none of its parents are marked with "use client" - Stack Overflow - Google Chrome


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

enum ProgramLang {
  Java,
  Typescript,
}

class RemoveCodeCommentSender {
  private static ip = '127.0.0.1'; // 'localhost';
  private static url_ts_removeCodeComment = `http://${this.ip}:14080/v1/remove_Comment_inGiven_FileCode`;
  private static url_java_removeCodeComment = `http://${this.ip}:18082/v0.1/removeCodeCommentGivenFileCode`;

  // @main:
  public static async removeCodeComment(code_input: string, programLang: ProgramLang) {
    let url = null;
    if (programLang === ProgramLang.Typescript) {
      url = this.url_ts_removeCodeComment;
    } else if (programLang === ProgramLang.Java) {
      url = this.url_java_removeCodeComment;
    } else {
      throw new TypeError('Unsupported language');
    }

    // ;TP; let code_CommentRemoved = code_input;@¦    // ;TP; code_CommentRemoved = code_CommentRemoved.replaceAll(' ', '_');@¦    // ;TP; return code_CommentRemoved;@¦@¦    // ;recall;  async function rpc_sendMsgWsTest_http(msg: string) {@¦    // ;recall;    // https://stackoverflow.com/questions/51415439/how-can-i-add-raw-data-body-to-an-axios-request@¦    // ;recall;    const result = await axios.post(@¦    // ;recall;      url_http_endpoint_delegate_to_ws,@¦    // ;recall;      {@¦    // ;recall;        message: msg,@¦    // ;recall;      },@¦    // ;recall;      {@¦    // ;recall;        headers: {@¦    // ;recall;          'Content-type': 'application/json',@¦    // ;recall;        },@¦    // ;recall;      }@¦    // ;recall;    );@¦    // ;recall;  }@¦@¦    // ;del; const config = {@¦    // ;del;   method: 'post',@¦    // ;del;   url: 'http://127.0.0.1:14080/v1/remove_Comment_inGiven_FileCode',@¦    // ;del;   headers: {@¦    // ;del;     'Content-Type': 'text/plain'@¦    // ;del;   },@¦    // ;del;   data : code_input@¦    // ;del; };@¦    // ;del;@¦    // ;del; const result = await axios(config);@¦    // ;del; return result.data as string;

    //     // []
    //     // Access to XMLHttpRequest at 'http://127.0.0.1:14080/v1/remove_Comment_inGiven_FileCode' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    //     // <>
    //     // http://localhost:3000/tool/codeCommentRemove
    //     //
    //     //
    //     // ~~~// damn the server client side . shoudl check the console
    //     // err respond .. can send but not reply ..
    //
    //     // jquery - Why does my JavaScript code receive a "No 'Access-Control-Allow-Origin' header is present on the requested resource" error, while Postman does not? - Stack Overflow
    //     // https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i
    //     //
    //     // javascript - No 'Access-Control-Allow-Origin' header is present on the requested resource—when trying to get data from a REST API - Stack Overflow
    //     // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    //     //
    //     // Why does my JavaScript code receive a No AccessControlAllowOrigin header is present on the requested resource error while Postman does not | Saturn Cloud Blog
    //     // https://saturncloud.io/blog/why-does-my-javascript-code-receive-a-no-accesscontrolalloworigin-header-is-present-on-the-requested-resource-error-while-postman-does-not/
    //     //
    //     // How to fix CORS error “no ‘access-control-allow-origin’ header is present on the requested resource”?
    //     // https://codedamn.com/news/backend/how-to-fix-cors-error
    //
    //     // []
    //     // The CORS headers that need to be included in the response are:
    //     // <>
    //     // https://saturncloud.io/blog/why-does-my-javascript-code-receive-a-no-accesscontrolalloworigin-header-is-present-on-the-requested-resource-error-while-postman-does-not/
    //     //
    //     //
    //     // []
    //     // app.use((req, res, next) => {
    //     //   res.setHeader("Access-Control-Allow-Origin", "*");
    //     //   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    //     //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //     //   next();
    //     // })
    //     // <>
    //     // https://codedamn.com/news/backend/how-to-fix-cors-error
    //     // ~~~// dk why its set on the response .. not blocking at income, but blocking at outcome ... weird design ..
    //     // why postman can emmm // feels localhost  & ip thing ...
    //
    //     // const ip_cors = 'http://localhost:3000'; // '127.0.0.1'; // dk port em // cannot use num, need localhost
    //
    //     // TODO // @messy CROS .... design meaning .. n k dk
    //
    //     // hot fix no...
    //
    //     @CrossOrigin(origins = MoveVehicleWebController.url_JsVite_CrossOrigin) // https://spring.io/guides/gs/rest-service-cors/

    const result = await axios.post(
      url, //
      code_input,
      {
        headers: {
          // 'Content-type': 'application/json',
          'Content-Type': 'text/plain',
        },
      }
    );
    return result.data as string; // aga 1. auto convert 1. error handle..
  }
}

const ConvertButtonBox: React.FC<{
  codeInput_rst: string;
  codeOutput_setRst: React.Dispatch<React.SetStateAction<string>>;
}> = ({ codeInput_rst: codeInput_rst, codeOutput_setRst: codeOutput_setRst }) => {
  const [programLang_rst, programLang_setRst] = React.useState(ProgramLang.Typescript);
  function resultState_reducer(state: string, msg: any) {
    return `${moment().format('HH:mm:ss.SSS')}\n${msg}`;
  }
  const [resultState_rst, resultState_dispatchRst] = React.useReducer(resultState_reducer, `NA`); // timer .. (( was from googleChromeExt ..
  // []
  // Next.js pre-renders every page on the server.
  //
  // > By default, Next.js **pre-renders** every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.
  // <>
  // https://stackoverflow.com/questions/66374123/warning-text-content-did-not-match-server-im-out-client-im-in-div
  //
  //
  // []
  // because your client and server purposefully render different content (like the server rendering a dark theme which gets replaced with the user preference on load), use `suppressHydrationWarning` to suppress the error.
  // <>
  // https://stackoverflow.com/questions/47349500/text-content-did-not-match-warning-in-react-16
  //

  // log.error("Java Parse failed :: " + parseResult); // must throw .. only in project may suppress ..

  return (
    <div className={styles.panelConvertButtonBox}>
      <Select
        defaultValue={{
          value: programLang_rst,
          label: ProgramLang[programLang_rst],
        }}
        options={[
          // []
          // let nameOfA = SampleEnum[SampleEnum.A]; // "A"
          // <>
          // https://stackoverflow.com/questions/18111657/how-to-get-names-of-enum-entries
          { value: ProgramLang.Typescript, label: ProgramLang[ProgramLang.Typescript] },
          { value: ProgramLang.Java, label: ProgramLang[ProgramLang.Java] },
        ]}
        onChange={(optSelected) => {
          if (!optSelected) {
            throw new TypeError();
          }
          // if (!optSelected.value) { // cuz it can be 0 ...... -- dk why enum use number (not Symbol or.)..
          //   console.log(typeof optSelected.value)
          //   console.log(optSelected.value)
          //   console.log(optSelected.label)
          //   console.log(optSelected)
          // }
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
          dropdownIndicator: (baseStyles, props) => ({ ...baseStyles, padding: 0, }), // prettier-ignore
          input: (baseStyles, props) => ({ ...baseStyles, margin: 0, }), // prettier-ignore
          // https://react-select.com/styles#inner-components
        }}
      />
      <button
        onClick={async () => {
          try {
            // @main:
            const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);
            codeOutput_setRst(codeOutput);
            resultState_dispatchRst('done');
          } catch (error) {
            if (typeof error === 'string') {
              throw new Error(error);
            } else if (error instanceof Error) {
              if (axios.isAxiosError(error)) {
                if (error.response) {
                  // if (error.response && error.response.status === 404 && error.response.data === null) {
                  resultState_dispatchRst(error.response.data);
                } else {
                  resultState_dispatchRst(JSON.stringify(error, null, 2));
                }
              } else {
                throw error;
              }
            }
          }
        }}
      >
        {RemoveCodeCommentSender.removeCodeComment.name}
      </button>
      <pre style={{ maxWidth: '300px', overflow: 'scroll' }}>{resultState_rst}</pre>
    </div>
  );
};

const Index = () => {
  const [codeInput_rst, codeInput_setRst] = React.useState('console.log("default sample"); // Check'); // default useless
  const [codeOutput_rst, codeOutput_setRst] = React.useState('console');

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
