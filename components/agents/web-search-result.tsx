import { ExternalLink, Search } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

interface WebSearchResultProps {
  query: string;
  results: SearchResult[];
  totalResults: number;
  timestamp: string;
}

export function WebSearchResult({ query, results, totalResults, timestamp }: WebSearchResultProps) {
  return (
    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 space-y-4">
      <div className="flex items-center gap-2 text-blue-600">
        <Search className="w-4 h-4" />
        <span className="font-medium">Web Search Results</span>
      </div>
      
      <div className="text-sm text-blue-700">
        <strong>Query:</strong> "{query}" • <strong>{totalResults}</strong> results found
      </div>
      
      <div className="space-y-3">
        {results.map((result, index) => (
          <div key={index} className="bg-white border border-blue-100 rounded-md p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 hover:text-blue-700">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    {result.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">{result.snippet}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                  <span>{result.source}</span>
                  <span>•</span>
                  <span className="text-gray-500">{new URL(result.url).hostname}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 border-t border-blue-100 pt-2">
        Search completed at {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}