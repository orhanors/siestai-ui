import { Code, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface CodeIssue {
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  rule: string;
}

interface CodeAnalysisResultProps {
  language: string;
  analysisType: 'quality' | 'security' | 'performance' | 'style';
  issues: CodeIssue[];
  suggestions: string[];
  score: number;
  timestamp: string;
}

export function CodeAnalysisResult({ 
  language, 
  analysisType, 
  issues, 
  suggestions, 
  score, 
  timestamp 
}: CodeAnalysisResultProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="border border-green-200 rounded-lg p-4 bg-green-50 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-600">
          <Code className="w-4 h-4" />
          <span className="font-medium">Code Analysis Result</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(score)}`}>
          Score: {score}/100
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500">Language</div>
          <div className="font-medium text-green-700 capitalize">{language}</div>
        </div>
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500">Analysis Type</div>
          <div className="font-medium text-green-700 capitalize">{analysisType}</div>
        </div>
        <div className="bg-white rounded-md p-2 border border-green-100">
          <div className="text-gray-500">Issues Found</div>
          <div className="font-medium text-green-700">{issues.length}</div>
        </div>
      </div>

      {issues.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Issues Found:</div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {issues.map((issue, index) => (
              <div key={index} className={`p-3 rounded-md border ${getSeverityColor(issue.severity)}`}>
                <div className="flex items-start gap-2">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      Line {issue.line}, Column {issue.column}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{issue.message}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">{issue.rule}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="bg-white rounded-md p-3 border border-green-100">
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Suggestions for Improvement:
          </div>
          <ul className="space-y-1 text-sm text-gray-700">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-gray-500 border-t border-green-100 pt-2">
        Analysis completed at {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}