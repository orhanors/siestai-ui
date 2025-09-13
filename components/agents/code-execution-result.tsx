import { Terminal, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface CodeExecutionResultProps {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  language: string;
  dependencies: string[];
  timestamp: string;
}

export function CodeExecutionResult({ 
  stdout, 
  stderr, 
  exitCode, 
  executionTime, 
  language, 
  dependencies, 
  timestamp 
}: CodeExecutionResultProps) {
  const isSuccess = exitCode === 0;

  return (
    <div className="border border-green-200 rounded-lg p-4 bg-green-50 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-600">
          <Terminal className="w-4 h-4" />
          <span className="font-medium">Code Execution Result</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {isSuccess ? (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Success</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600">
              <XCircle className="w-4 h-4" />
              <span>Error</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500">Language</div>
          <div className="font-medium text-green-700">{language}</div>
        </div>
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500">Exit Code</div>
          <div className={`font-medium ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
            {exitCode}
          </div>
        </div>
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Execution Time
          </div>
          <div className="font-medium text-green-700">{executionTime.toFixed(2)}ms</div>
        </div>
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500">Dependencies</div>
          <div className="font-medium text-green-700">
            {dependencies.length > 0 ? dependencies.length : 'None'}
          </div>
        </div>
      </div>

      {dependencies.length > 0 && (
        <div className="bg-white rounded-md p-3 border border-green-100">
          <div className="text-sm font-medium text-gray-700 mb-2">Dependencies Used:</div>
          <div className="flex flex-wrap gap-2">
            {dependencies.map((dep, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-mono"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {stdout && (
        <div className="bg-white rounded-md p-3 border border-green-100">
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Output (stdout):
          </div>
          <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap bg-gray-50 p-2 rounded border overflow-x-auto">
            {stdout}
          </pre>
        </div>
      )}

      {stderr && (
        <div className="bg-red-50 rounded-md p-3 border border-red-200">
          <div className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Error (stderr):
          </div>
          <pre className="text-sm font-mono text-red-800 whitespace-pre-wrap bg-red-100 p-2 rounded border overflow-x-auto">
            {stderr}
          </pre>
        </div>
      )}

      <div className="text-xs text-gray-500 border-t border-green-100 pt-2">
        Executed at {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}