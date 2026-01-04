import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {PanelGroup , Panel , PanelResizeHandle} from "react-resizable-panels"
import Navbar from '../Components/Navbar';
import ProblemDescription from '../Components/Problems/ProblemDescription';
import CodeEditor from '../Components/Problems/CodeEditor';
import ProblemOutput from '../Components/Problems/ProblemOutput';
import { PROBLEMS } from '../data/problems';
import { LANGUAGE_CONFIG } from '../../../../../Downloads/talent-IQ-master/talent-IQ-master/frontend/src/data/problems';
import { execCode } from '../lib/piston';
import toast from "react-hot-toast"
import confetti from 'canvas-confetti';
const ProblemDetails = () => {

    const {id} = useParams();
    const Navigate = useNavigate();

    const [currentProblemid, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemid].starterCode.javascript);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);


    const currentProblem = PROBLEMS[id];



    //! normalize output for comparison (trim whitespace, handle different spacing)
    const normalizedOutput = (output) => {
        return output
             .trim()
            .split("\n")
            .map((line) =>
                line
                .trim()
                // remove spaces after [ and before ]
                .replace(/\[\s+/g, "[")
                .replace(/\s+\]/g, "]")
                // normalize spaces around commas to single space after comma
                .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");

    };

    //! Cheack THe Solution THat is it match With the original Solution 
    const checkIfTestsPassed = (actualOutput , expectedOutput) => {
        const normalizeActual  = normalizedOutput(actualOutput)
        const normalizeExpected  = normalizedOutput(expectedOutput);

        return normalizeActual === normalizeExpected
    }

    // ! What Happen When You Click On the Problem In THe Option
    const handleProblemChange = (e) => {
       
        Navigate(`/problems/${e}`);
        setCurrentProblemId(e)
    };

    //! That effect When The th Problem Is Solved That the Fuljadiii
     const triggerConfetti = () => {
        confetti({
          particleCount: 80,
          spread: 250,
          origin: { x: 0.2, y: 0.6 },
        });
    
        confetti({
          particleCount: 80,
          spread: 250,
          origin: { x: 0.8, y: 0.6 },
        });
      };

    // @@ Very Importent That What Happen When i Click On the Run Code 
    const handleRunCode =  async () => {

        setIsRunning(true)
        setOutput(null);

        const solution = await execCode(selectedLanguage , code);

        setOutput(solution); // ← THIS WAS MISSING

        if(solution.success){
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testsPassed = checkIfTestsPassed(solution.output , expectedOutput)

            if(testsPassed){
                triggerConfetti()
                toast.success("All Test Passed ! Great Job");
                 
            }
            else {
                toast.error("Not Matched with expected Output")
            }
        }
        setIsRunning(false);
    }

    
    //! What Happen When User Click to Change the problem 
     const handleLanguageChange = (e) => {
            const newLanguage = e.target.value
            setSelectedLanguage(newLanguage)
            setCode(currentProblem.starterCode[newLanguage])
            setOutput(null)
     } ;


  return (
    <div className='h-screen bg-base-100 flex flex-col '>

        <Navbar/>

        <div className='flex-1'>
            
            <PanelGroup direction='horizontal'>

                {/* Left Pannel -- Problem Decription */}
                <Panel defaultSize={50} minSize={30}>
                    <ProblemDescription
                        problem = {currentProblem}
                        onProblemChange = {handleProblemChange}
                        currentProblemid = {currentProblemid}
                        allProblems = {Object.values(PROBLEMS)}
                    />
                </Panel>

                <PanelResizeHandle className='w-2 hover:bg-primary bg-base-300 transition-colors duration-200 cursor-col-resize ' />

                {/* Right Pannel -- Output and Code Editor Decription */}
                <Panel defaultSize={50} minSize={30}>
                    <PanelGroup direction='vertical'>

                            <Panel defaultSize={40} minSize={40}>
                                <CodeEditor
                                    selectedLanguage = {selectedLanguage}
                                    code = {code}
                                    currentProblem = {currentProblem}
                                    isRunning = {isRunning}
                                    onlanguageChange = {handleLanguageChange}
                                    onCodeChange = {setCode}
                                    onRunCode = {handleRunCode}
                                />
                            </Panel>
                            <PanelResizeHandle className='h-2 hover:bg-primary bg-base-300 transition-colors duration-200 '/>
                            <Panel defaultSize={60} minSize={30}>
                                <ProblemOutput
                                    output = {output}
                                />
                            </Panel>

                    </PanelGroup>
                </Panel>

            </PanelGroup>
        </div>
       
    </div>
  )
}

export default ProblemDetails
