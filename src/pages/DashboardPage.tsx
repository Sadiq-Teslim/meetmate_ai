// src/pages/DashboardLayout.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaMicrophone,
  FaRegCircle,
  FaStopCircle,
  FaFileAlt,
  FaBrain,
  FaQuestionCircle,
  FaCheckCircle,
  FaLightbulb,
  FaUserEdit,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import AudioVisualizer from "../components/AudioVisualizer";

// --- TYPE DEFINITIONS ---
type TranscriptLine = { text: string; speaker: string; isQuestion?: boolean };
type QaPair = { id: number; question: string; answer: string | null };
type Meeting = { _id: string; title: string };
type Summary = { summary: string; keyPoints: string[]; actionItems: string[] };

// --- HYPER-REALISTIC MOCK DATA ---
const MOCK_MEETING: Meeting = {
  _id: "demo_meeting_123",
  title: "Project Nova - Q3 Strategy",
};

const MOCK_SCRIPT: TranscriptLine[] = [
  {
    speaker: "Alex",
    text: "Alright team, thanks for joining. The main topic today is the final push for the Project Nova launch.",
  },
  {
    speaker: "Brenda",
    text: "Happy to be here. I think we're in good shape, but we need to align on the marketing timeline.",
  },
  {
    speaker: "Alex",
    text: "Exactly. The go-live date is firm for August 28th. That gives us just over a month.",
  },
  {
    speaker: "Carlos",
    text: "From an engineering standpoint, that's doable, but it's tight. What's the final deadline for the creative assets from marketing?",
    isQuestion: true,
  },
  {
    speaker: "Brenda",
    text: "Good question. We'll have all final assets, including ad copy and visuals, delivered to you by August 5th. That gives you three full weeks for integration.",
  },
  {
    speaker: "Alex",
    text: "That sounds good. Let's make sure that's tracked. Carlos, what about the budget?",
  },
  {
    speaker: "Carlos",
    text: "The initial projection was $75,000. Are we still on track with the initial budget?",
    isQuestion: true,
  },
  {
    speaker: "Alex",
    text: "We are. In fact, we're slightly under. Current spend is at $68,000, leaving us a healthy contingency.",
  },
  {
    speaker: "Brenda",
    text: "That's fantastic news. I'll make a note to finalize the social media ad spend by this Friday.",
  },
  {
    speaker: "Alex",
    text: "Perfect. So, to recap: creatives from Brenda by August 5th, I will oversee the budget, and Carlos' team will handle the final implementation for the August 28th launch.",
  },
];

const MOCK_ANSWERS: { [key: string]: string } = {
  "What's the final deadline for the creative assets from marketing?":
    "The final assets are scheduled to be delivered by August 5th, which allows three weeks for engineering integration.",
  "Are we still on track with the initial budget?":
    "Yes, the project is currently under the initial $75,000 budget, with the current spend at $68,000.",
};

const MOCK_SUMMARY: Summary = {
  summary:
    "The meeting finalized the timeline and budget for the Project Nova launch. Key deadlines were confirmed, and action items were assigned to ensure alignment across teams for the August 28th launch date.",
  keyPoints: [
    "The official launch date for Project Nova is confirmed for August 28th.",
    "The project is currently under its initial budget of $75,000, with $68,000 spent to date.",
    "The marketing team will deliver all final creative assets to the engineering team by August 5th.",
  ],
  actionItems: [
    "Brenda to finalize the social media ad spend by this Friday.",
    "Carlos's team is responsible for the final technical implementation.",
    "Alex will continue to oversee the project budget.",
  ],
};

// --- All Child Components Included Below for a Single, Complete File ---

const Header: React.FC<{ connectionStatus: "connected" | "disconnected" }> = ({
  connectionStatus,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <header className="w-full bg-slate-800/30 backdrop-blur-lg border-b border-slate-700/50 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <FaRegCircle className="text-blue-500 text-xl" />
          <h1 className="font-bold text-xl text-slate-100">MeetMate AI</h1>
        </Link>
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center space-x-3 cursor-pointer">
            <span
              className={`text-xs font-semibold ${
                connectionStatus === "connected"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {connectionStatus.toUpperCase()}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                connectionStatus === "connected" ? "bg-green-400" : "bg-red-400"
              }`}
            />
            <img
              src="https://i.pravatar.cc/40?u=a042581f4e29026704d"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-slate-600"
            />
          </div>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
              >
                <Link
                  to="/profile"
                  className="flex items-center w-full text-left space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <FaUserEdit /> <span>Edit Profile</span>
                </Link>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <FaCog /> <span>Settings</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const MeetingControls: React.FC<{
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  onEndMeeting: () => void;
}> = ({ isRecording, onStart, onStop, onEndMeeting }) => (
  <div className="space-y-4">
    {isRecording ? (
      <motion.button
        onClick={onStop}
        className="w-full bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaStopCircle />
        <span>Stop Recording</span>
      </motion.button>
    ) : (
      <motion.button
        onClick={onStart}
        className="w-full bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaMicrophone />
        <span>Start Recording</span>
      </motion.button>
    )}
    <div className="border-t border-slate-700" />
    <motion.button
      onClick={onEndMeeting}
      className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <FaSignOutAlt />
      <span>End Meeting</span>
    </motion.button>
  </div>
);

const TranscriptViewer: React.FC<{ lines: TranscriptLine[] }> = ({ lines }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div ref={scrollRef} className="h-96 overflow-y-auto space-y-4 pr-2">
      <AnimatePresence>
        {lines.map((line, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-start space-x-3 ${
              line.isQuestion ? "p-3 bg-blue-900/50 rounded-lg" : ""
            }`}
          >
            {line.isQuestion && (
              <FaQuestionCircle className="text-blue-400 mt-1 flex-shrink-0" />
            )}
            <p className="text-slate-200 leading-relaxed">
              <span className="font-bold text-slate-400">{line.speaker}:</span>{" "}
              {line.text}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const QAInterface: React.FC<{ questions: QaPair[] }> = ({ questions }) => (
  <div className="h-full space-y-4">
    {questions.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <FaBrain className="text-4xl mb-2" />
        <p>Detected questions and AI answers will appear here.</p>
      </div>
    ) : (
      <AnimatePresence>
        {questions.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="bg-slate-700/50 p-4 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <FaQuestionCircle className="text-blue-400 mt-1 flex-shrink-0" />
              <p className="font-semibold text-slate-100">{q.question}</p>
            </div>
            <AnimatePresence>
              {q.answer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="border-t border-slate-600 my-3" />
                  <div className="flex items-start space-x-3">
                    <FaBrain className="text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300">{q.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    )}
  </div>
);

const SummaryDisplay: React.FC<{
  summary: Summary | null;
  onGenerate: () => void;
  isSummarizing: boolean;
}> = ({ summary, onGenerate, isSummarizing }) => {
  if (summary) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h3 className="flex items-center space-x-2 font-bold text-lg text-slate-100 mb-2">
            <FaLightbulb className="text-amber-400" />
            <span>Key Takeaways</span>
          </h3>
          <ul className="space-y-2 list-inside text-slate-300">
            {summary.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center space-x-2 font-bold text-lg text-slate-100 mb-2">
            <FaCheckCircle className="text-green-400" />
            <span>Action Items</span>
          </h3>
          <ul className="space-y-2 list-inside text-slate-300">
            {summary.actionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.button
      onClick={onGenerate}
      disabled={isSummarizing}
      className="w-full flex items-center justify-center space-x-2 bg-amber-500 text-black font-bold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-wait transition-all"
      whileHover={{ scale: !isSummarizing ? 1.03 : 1 }}
      whileTap={{ scale: !isSummarizing ? 0.98 : 1 }}
    >
      {isSummarizing ? (
        <>
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <FaFileAlt />
          <span>Generate Summary</span>
        </>
      )}
    </motion.button>
  );
};

// --- THE MAIN DASHBOARD COMPONENT (DEMO VERSION) ---
const DashboardLayout: React.FC = () => {
  const [currentMeeting, setCurrentMeeting] = useState<Meeting>(MOCK_MEETING);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [questions, setQuestions] = useState<QaPair[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const audioStreamRef = useRef<MediaStream | null>(null);
  const simulationTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Cleanup function to stop all simulations if the component unmounts
    return () => {
      simulationTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const startSimulation = () => {
    let cumulativeDelay = 1000; // Start after 1 second
    setTranscript([]); // Clear initial message

    MOCK_SCRIPT.forEach((line, index) => {
      const delay = 1500 + Math.random() * 2000; // Realistic pause between lines
      cumulativeDelay += delay;

      const timeoutId = setTimeout(() => {
        setTranscript((prev) => [...prev, line]);

        if (line.isQuestion) {
          const questionId = Date.now() + index; // More unique key
          const newQuestion: QaPair = {
            id: questionId,
            question: line.text,
            answer: null,
          };
          setQuestions((prev) => [...prev, newQuestion]);

          // Simulate AI thinking for an answer
          const answerTimeoutId = setTimeout(() => {
            setQuestions((prev) =>
              prev.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      answer:
                        MOCK_ANSWERS[q.question] || "Processing answer...",
                    }
                  : q
              )
            );
          }, 3000); // 3-second delay for the AI to "think"
          simulationTimeoutsRef.current.push(answerTimeoutId);
        }

        // If this is the last line of the script, stop the recording
        if (index === MOCK_SCRIPT.length - 1) {
          // Add a small delay before auto-stopping
          setTimeout(stopRecording, 2000);
        }
      }, cumulativeDelay);
      simulationTimeoutsRef.current.push(timeoutId);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setIsRecording(true);
      setSummary(null);
      setQuestions([]);
      startSimulation();
    } catch (error) {
      console.error("Failed to start recording:", error);
      alert(
        "Microphone access was denied. This demo uses the mic for the visualizer."
      );
    }
  };

  const stopRecording = () => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    simulationTimeoutsRef.current.forEach(clearTimeout);
    simulationTimeoutsRef.current = [];
    setIsRecording(false);
    setTranscript((prev) => {
      if (!prev.some((line) => line.text.includes("Recording stopped"))) {
        return [
          ...prev,
          {
            speaker: "System",
            text: "--- Recording stopped. You can now generate a summary. ---",
          },
        ];
      }
      return prev;
    });
  };

  const handleEndMeeting = () => {
    stopRecording();
    // Reset the state to the beginning for a new demo
    setTranscript([]);
    setQuestions([]);
    setSummary(null);
    setIsSummarizing(false);
    setCurrentMeeting(MOCK_MEETING);
  };

  const handleGenerateSummary = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setSummary(MOCK_SUMMARY);
      setIsSummarizing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans">
      <Header connectionStatus={isConnected ? "connected" : "disconnected"} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-white mb-6">
          Meeting: {currentMeeting.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center">
                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      LIVE AUDIO INPUT
                    </p>
                    <AudioVisualizer audioStream={audioStreamRef.current} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                <TranscriptViewer lines={transcript} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                <QAInterface questions={questions} />
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Controls</h3>
                <MeetingControls
                  isRecording={isRecording}
                  onStart={startRecording}
                  onStop={stopRecording}
                  onEndMeeting={handleEndMeeting}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Meeting Summary
                </h3>
                <SummaryDisplay
                  summary={summary}
                  onGenerate={handleGenerateSummary}
                  isSummarizing={isSummarizing}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
