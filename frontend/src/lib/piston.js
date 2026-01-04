
const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSION = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

export const execCode = async (language, code) => {
  try {

    // Code challaaa ha
    const lang = language.toLowerCase();

    const languageConfig = LANGUAGE_VERSION[lang];

    if (!languageConfig) {
      return { success: false, error: `Unsupported language ${language}` };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(lang)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();

    const { stdout, stderr, code: exitCode } = data.run;

    if (exitCode !== 0) {
      return { success: false, error: stderr || "Runtime error" };
    }

    return { success: true, output: stdout || "No output" };

    
  } catch (e) {
    return { success: false, error: e.message };
  }
};

const getFileExtension = (language) =>
  ({ javascript: "js", python: "py", java: "java" }[language] || "txt");
