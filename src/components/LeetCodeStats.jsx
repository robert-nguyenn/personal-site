import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from "../lib/utils";

export const LeetCodeStats = () => {
  // Sample data from your LeetCode profile
  const leetcodeStats = {
    username: "robertnguyenn",
    totalSolved: 67,
    totalQuestions: 3565,
    easySolved: 24,
    easyTotal: 878,
    mediumSolved: 40,
    mediumTotal: 1849,
    hardSolved: 3,
    hardTotal: 838,
    ranking: "1,606,197",
    profileUrl: "https://leetcode.com/u/robertnguyenn/"
  };

  // Calculate percentages for circle progress
  const calculatePercentage = (solved, total) => {
    return (solved / total) * 100;
  };

  const easyPercentage = calculatePercentage(leetcodeStats.easySolved, leetcodeStats.easyTotal);
  const mediumPercentage = calculatePercentage(leetcodeStats.mediumSolved, leetcodeStats.mediumTotal);
  const hardPercentage = calculatePercentage(leetcodeStats.hardSolved, leetcodeStats.hardTotal);

  // Animation for circles on component mount
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative p-6 rounded-2xl backdrop-blur-sm border border-primary/20 shadow-xl bg-card/80">
      {/* LeetCode branded element */}
      <div className="absolute -top-4 -right-4 bg-[#1a1a1a] text-white px-3 py-1 rounded-lg border-2 border-[#ffa116] shadow-lg flex items-center gap-2">
        <img 
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" 
          alt="LeetCode" 
          className="w-5 h-5 object-contain" 
        />
        <span className="font-bold">LeetCode</span>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Coding Challenges
        </h3>
        <p className="text-muted-foreground">
          Track my problem-solving journey
        </p>
      </div>

      {/* Main stats with total solved */}
      <div className="mb-8 relative">
        <div className="w-28 h-28 mx-auto relative">
          {/* Background circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(167, 139, 250, 0.1)" 
              strokeWidth="8"
            />
            
            {/* Progress circle with animation */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#leetcode-gradient)" 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset={animate ? 283 - (283 * (leetcodeStats.totalSolved / leetcodeStats.totalQuestions)) : 283}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="leetcode-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3ccfcf" />
                <stop offset="50%" stopColor="#ffa116" />
                <stop offset="100%" stopColor="#ef4743" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{leetcodeStats.totalSolved}</span>
            <span className="text-xs text-muted-foreground">/{leetcodeStats.totalQuestions}</span>
            <span className="text-xs font-medium text-primary mt-1">Solved</span>
          </div>
        </div>
        
        {/* Circular indicator for "attempting" like in your profile */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-card/90 border border-primary/20 rounded-full px-3 py-1 shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#03A89E] rounded-full"></div>
            <span className="text-sm font-medium">4 Attempting</span>
          </div>
        </div>
      </div>

      {/* Difficulty breakdown with circular progress */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Easy problems */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="rgba(0, 175, 155, 0.2)" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#00AF9B" 
                  strokeWidth="8" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={animate ? 251.2 - (251.2 * (easyPercentage / 100)) : 251.2}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{leetcodeStats.easySolved}</span>
                <span className="text-[10px] text-muted-foreground">/{leetcodeStats.easyTotal}</span>
              </div>
            </div>
          </div>
          <span className="text-[#00AF9B] font-medium text-sm">Easy</span>
        </div>
        
        {/* Medium problems */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="rgba(255, 161, 22, 0.2)" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#FFA116" 
                  strokeWidth="8" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={animate ? 251.2 - (251.2 * (mediumPercentage / 100)) : 251.2}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{leetcodeStats.mediumSolved}</span>
                <span className="text-[10px] text-muted-foreground">/{leetcodeStats.mediumTotal}</span>
              </div>
            </div>
          </div>
          <span className="text-[#FFA116] font-medium text-sm">Medium</span>
        </div>
        
        {/* Hard problems */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="rgba(239, 71, 67, 0.2)" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#EF4743" 
                  strokeWidth="8" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={animate ? 251.2 - (251.2 * (hardPercentage / 100)) : 251.2}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{leetcodeStats.hardSolved}</span>
                <span className="text-[10px] text-muted-foreground">/{leetcodeStats.hardTotal}</span>
              </div>
            </div>
          </div>
          <span className="text-[#EF4743] font-medium text-sm">Hard</span>
        </div>
      </div>
      
      {/* Additional stats */}
      <div className="mb-6 bg-card/50 border border-primary/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{leetcodeStats.username}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="font-medium">{leetcodeStats.ranking}</p>
          </div>
        </div>
      </div>
      
      {/* Profile link button */}
      <a 
        href={leetcodeStats.profileUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="group w-full py-3 px-4 relative overflow-hidden rounded-xl inline-flex items-center justify-center
                  bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-all 
                  border border-[#ffa116]/50 hover:border-[#ffa116] shadow-md"
      >
        <span className="relative z-10 flex items-center gap-2">
          <img 
            src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" 
            alt="LeetCode" 
            className="w-5 h-5 object-contain" 
          />
          <span>Visit My LeetCode Profile</span>
          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </a>
    </div>
  );
};