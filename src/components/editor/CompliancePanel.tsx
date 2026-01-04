'use client';

import React from 'react';
import { ComplianceResult } from '@/lib/compliance-checker';

interface CompliancePanelProps {
  result: ComplianceResult | null;
  onRunCheck: () => void;
  isChecking: boolean;
}

const CompliancePanel: React.FC<CompliancePanelProps> = ({
  result,
  onRunCheck,
  isChecking,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500/20 to-green-500/5';
    if (score >= 60) return 'from-yellow-500/20 to-yellow-500/5';
    return 'from-red-500/20 to-red-500/5';
  };

  const getSeverityIcon = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Compliance Check
        </h3>
        <p className="text-xs text-gray-400 mt-1">Tesco Brand Guidelines</p>
      </div>

      {/* Run Check Button */}
      <div className="p-4 border-b border-white/10">
        <button
          onClick={onRunCheck}
          disabled={isChecking}
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 disabled:from-gray-600 disabled:to-gray-700 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
        >
          {isChecking ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Compliance Check
            </>
          )}
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {result ? (
          <div className="p-4 space-y-4">
            {/* Score */}
            <div className={`p-4 rounded-xl bg-gradient-to-b ${getScoreGradient(result.score)} border border-white/10`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {result.passed ? 'Compliance Passed' : 'Needs Improvement'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.score >= 80 ? 'bg-green-500' :
                    result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Checks */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Checks ({result.checks.length})</h4>
              
              {result.checks.map((check) => (
                <div
                  key={check.id}
                  className={`p-3 rounded-lg border ${
                    check.passed ? 'bg-green-500/5 border-green-500/20' :
                    check.severity === 'error' ? 'bg-red-500/5 border-red-500/20' :
                    'bg-yellow-500/5 border-yellow-500/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {getSeverityIcon(check.passed ? 'info' : check.severity)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{check.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{check.message}</div>
                      {check.suggestion && !check.passed && (
                        <div className="text-xs text-violet-400 mt-1 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                          </svg>
                          {check.suggestion}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Recommendations</h4>
                <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <ul className="space-y-1">
                    {result.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">Run a compliance check</p>
              <p className="text-xs mt-1">to validate your ad design</p>
            </div>
          </div>
        )}
      </div>

      {/* Guidelines Reference */}
      <div className="p-4 border-t border-white/10">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <h5 className="text-xs font-medium text-white mb-2">Brand Colors</h5>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded bg-[#00539f] border border-white/20"></div>
              <span className="text-xs text-gray-400">Blue</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded bg-[#e4002b] border border-white/20"></div>
              <span className="text-xs text-gray-400">Red</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded bg-white border border-white/20"></div>
              <span className="text-xs text-gray-400">White</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePanel;
