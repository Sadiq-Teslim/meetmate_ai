// src/pages/DashboardLayout.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { socket } from "../services/socketService";
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
} from "react-icons/fa";
import AudioVisualizer from "../components/AudioVisualizer"; // The audio visualizer component

// --- TYPE DEFINITIONS ---
type TranscriptLine = { text: string; isQuestion?: boolean };
type QaPair = { question: string; answer: string };
type ListeningStatus = "idle" | "listening" | "stopped";

// --- CHILD COMPONENT: Header (with Dropdown Logic) ---
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
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <FaCog /> <span>Settings</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// --- CHILD COMPONENT: MeetingControls ---
interface MeetingControlProps {
  status: ListeningStatus;
  onConnect: () => void;
  onStop: () => void;
  onSummarize: () => void;
  isSummarizing: boolean;
}

const MeetingControls: React.FC<MeetingControlProps> = ({
  status,
  onConnect,
  onStop,
  onSummarize,
  isSummarizing,
}) => {
  return (
    <div className="space-y-4">
      <motion.button
        onClick={onConnect}
        disabled={status === "listening" || status === "stopped"}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:saturate-150"
        whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
        whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
      >
        <FaMicrophone />
        <span>
          {status === "listening" ? "Listening..." : "Connect to Live Meeting"}
        </span>
      </motion.button>

      <motion.button
        onClick={onStop}
        disabled={status !== "listening"}
        className="w-full flex items-center justify-center space-x-2 bg-slate-600 text-white font-semibold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        whileHover={{ scale: status === "listening" ? 1.03 : 1 }}
        whileTap={{ scale: status === "listening" ? 0.98 : 1 }}
      >
        <FaStopCircle />
        <span>Stop Listening</span>
      </motion.button>

      <AnimatePresence>
        {status === "stopped" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <motion.button
              onClick={onSummarize}
              disabled={isSummarizing}
              className="w-full flex items-center justify-center space-x-2 bg-amber-500 text-black font-bold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-wait transition-all mt-4"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- CHILD COMPONENT: TranscriptViewer ---
const TranscriptViewer: React.FC<{ lines: TranscriptLine[] }> = ({ lines }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      ref={scrollContainerRef}
      className="h-96 overflow-y-auto space-y-4 pr-2"
    >
      <AnimatePresence initial={false}>
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
            <p className="text-slate-200 leading-relaxed">{line.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- CHILD COMPONENT: QAInterface ---
const QAInterface: React.FC<{ qaPairs: QaPair[] }> = ({ qaPairs }) => {
  return (
    <div className="h-full space-y-4">
      {qaPairs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
          <FaBrain className="text-4xl mb-2" />
          <p>AI-generated answers to detected questions will appear here.</p>
        </div>
      ) : (
        <AnimatePresence>
          {qaPairs.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/50 p-4 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <FaQuestionCircle className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="font-semibold text-slate-100">{pair.question}</p>
              </div>
              <div className="border-t border-slate-600 my-3" />
              <div className="flex items-start space-x-3">
                <FaBrain className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300">{pair.answer}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

// --- CHILD COMPONENT: SummaryDisplay ---
const SummaryDisplay: React.FC<{ summary: string | null }> = ({ summary }) => {
  if (!summary) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <FaFileAlt className="text-4xl mb-2" />
        <p>
          Your meeting summary will be generated here after you stop listening.
        </p>
      </div>
    );
  }

  const keyPoints = summary
    .split("\n")
    .filter((line) => line.toLowerCase().startsWith("key point:"));
  const actionItems = summary
    .split("\n")
    .filter((line) => line.toLowerCase().startsWith("action item:"));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center space-x-2 font-bold text-lg text-slate-100 mb-2">
          <FaLightbulb className="text-amber-400" />
          <span>Key Takeaways</span>
        </h3>
        <ul className="space-y-2 list-inside text-slate-300">
          {keyPoints.map((point, index) => (
            <li key={index}>{point.replace("Key Point:", "").trim()}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="flex items-center space-x-2 font-bold text-lg text-slate-100 mb-2">
          <FaCheckCircle className="text-green-400" />
          <span>Action Items</span>
        </h3>
        <ul className="space-y-2 list-inside text-slate-300">
          {actionItems.map((item, index) => (
            <li key={index}>{item.replace("Action Item:", "").trim()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- THE MAIN DASHBOARD LAYOUT COMPONENT ---
const DashboardLayout: React.FC = () => {
  const [status, setStatus] = useState<ListeningStatus>("idle");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([
    { text: "Welcome! Press 'Connect to Live Meeting' to begin." },
  ]);
  const [qaPairs, setQaPairs] = useState<QaPair[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected"
  >("disconnected");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setConnectionStatus("connected"));
    socket.on("disconnect", () => setConnectionStatus("disconnected"));

    const handleTranscriptUpdate = (data: {
      text: string;
      isQuestion?: boolean;
    }) => {
      setTranscript((prev) => [
        ...prev,
        { text: data.text, isQuestion: data.isQuestion || false },
      ]);
    };

    const handleAiAnswer = (data: { question: string; answer: string }) => {
      setQaPairs((prev) => [
        ...prev,
        { question: data.question, answer: data.answer },
      ]);
    };

    const handleSummaryGenerated = (data: { summary: string }) => {
      setSummary(data.summary);
      setIsSummarizing(false);
    };

    socket.on("transcript_update", handleTranscriptUpdate);
    socket.on("ai_answer", handleAiAnswer);
    socket.on("summary_generated", handleSummaryGenerated);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("transcript_update", handleTranscriptUpdate);
      socket.off("ai_answer", handleAiAnswer);
      socket.off("summary_generated", handleSummaryGenerated);
      socket.disconnect();
    };
  }, []);

  const handleConnect = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socket.emit("audio_chunk", event.data);
        }
      };

      recorder.start(1000);

      setStatus("listening");
      setTranscript([{ text: "Microphone connected! Listening..." }]);
      setQaPairs([]);
      setSummary(null);
      socket.emit("start_listening");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Microphone access was denied. Please allow microphone access in your browser settings."
      );
    }
  };

  const handleStop = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }

    setStatus("stopped");
    setTranscript((prev) => [
      ...prev,
      { text: "--- Listening stopped. You can now generate a summary. ---" },
    ]);
    socket.emit("stop_listening");
  };

  const handleSummarize = () => {
    if (status !== "stopped" || isSummarizing || transcript.length <= 1) return;
    setIsSummarizing(true);
    const fullTranscript = transcript.map((line) => line.text).join("\n");
    socket.emit("generate_summary", { transcript: fullTranscript });
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans">
      <Header connectionStatus={connectionStatus} />

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence>
              {status === "listening" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center"
                >
                  <p className="text-sm font-semibold text-slate-300 mb-2">
                    LIVE AUDIO INPUT
                  </p>
                  <AudioVisualizer audioStream={audioStreamRef.current} />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Live Transcript
                </h2>
                <TranscriptViewer lines={transcript} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  AI Assistance
                </h2>
                <QAInterface qaPairs={qaPairs} />
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Controls</h2>
                <MeetingControls
                  status={status}
                  onConnect={handleConnect}
                  onStop={handleStop}
                  onSummarize={handleSummarize}
                  isSummarizing={isSummarizing}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            >
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Meeting Summary
                </h2>
                <SummaryDisplay summary={summary} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
