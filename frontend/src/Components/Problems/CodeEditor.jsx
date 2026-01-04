import Editor from "@monaco-editor/react"
import { LANGUAGE_CONFIG } from "../../data/problems"
import { Loader2Icon, PlayIcon } from "lucide-react"


const CodeEditor = ({
    selectedLanguage,
    code ,
    currentProblem,
    isRunning ,
    onlanguageChange ,
    onCodeChange ,
    onRunCode ,
}) => {


  return (
    <div className="h-full  bg-base-300 flex flex-col ">
    {/* DropDown and button*/}
        <div className="flex justify-baseline items-center px-4 py-3 bg-base-100 border-top border-base-300 gap-3">

           <div className="flex  items-center gap-3">
                <img
                    src={LANGUAGE_CONFIG[selectedLanguage].icon}
                    alt={LANGUAGE_CONFIG[selectedLanguage].name}
                    className="size-6 rounded-sm "
                />

                <select
                    className="select select-sm"
                    value={selectedLanguage}
                    onChange={onlanguageChange}   
                >
                    {
                       Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => {
                         return <option key={key} value={key}>
                                {lang.name}
                         </option>
                       })
                    }

                </select>
            </div> 

            <button className="btn btn-primary" disabled = {isRunning} onClick={onRunCode}>
                    {
                        isRunning ? 
                        <>
                            <Loader2Icon className="size-4 animate-bounce"/>
                            Runing.....
                        </>
                        : 
                        <>
                            <PlayIcon className="size-4 "/>
                            Run Code 
                        </>
                    }
            </button>
            
        </div>

        <div className="flex-1">
            <Editor
                height={"100%"}
                language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
                value={code}
                onChange={onCodeChange}
                theme="vs-dark"
                options={{
                    fontSize : 17,
                    minimap : {enabled:false}

                }}

            />
        </div>
        
    </div>
  )
}

export default CodeEditor
