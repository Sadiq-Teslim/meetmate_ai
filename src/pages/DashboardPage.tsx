// src/pages/DashboardLayout.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { socket } from "../services/socketService";
// import { TranscriptLine } from "../types/transcript";

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
    <header className="sticky top-0 z-50 w-full p-4 border-b bg-slate-800/30 backdrop-blur-lg border-slate-700/50">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to="/" className="flex items-center space-x-3">
          <FaRegCircle className="text-xl text-blue-500" />
          <h1 className="text-xl font-bold text-slate-100">MeetMate AI</h1>
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
              className="w-8 h-8 border-2 rounded-full border-slate-600"
            />
          </div>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 w-48 mt-2 overflow-hidden border rounded-lg shadow-2xl top-full bg-slate-800 border-slate-700"
              >
                <Link
                  to="/profile"
                  className="flex items-center w-full px-4 py-2 space-x-3 text-left transition-colors text-slate-300 hover:bg-slate-700"
                >
                  <FaUserEdit /> <span>Edit Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 space-x-3 transition-colors text-slate-300 hover:bg-slate-700"
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
  // const [meetingId, setMeetingId] = useState<string | null>(null);
  // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const audioStreamRef = useRef<MediaStream | null>(null);

  // const [status, setStatus] = useState<ListeningStatus>("idle");
  // const [transcript, setTranscript] = useState<TranscriptLine[]>([
  //   { text: "Welcome! Press 'Connect to Live Meeting' to begin." },
  // ]);
  // const [qaPairs, setQaPairs] = useState<QaPair[]>([]);
  // const [summary, setSummary] = useState<string | null>(null);

  // const handleConnect = async () => {
  //   try {
  //     // 1. Create meeting
  //     const res = await apiUrl.post("/meetings", {
  //       title: "Hackathon Demo Meeting",
  //       date: new Date().toISOString(),
  //       startTime: new Date().toISOString(),
  //       metadata: { language: "en-US", audioQuality: "medium" },
  //     });
  //     setMeetingId(res.data.id);

  //     // 2. Get microphone
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     audioStreamRef.current = stream;

  //     // 3. Start recorder
  //     const recorder = new MediaRecorder(stream);
  //     mediaRecorderRef.current = recorder;
  //     recorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         socket.emit("audio_chunk", {
  //           meetingId: res.data.id,
  //           chunk: event.data,
  //         });
  //       }
  //     };
  //     recorder.start(1000);

  //     // 4. Update UI
  //     setStatus("listening");
  //     setTranscript([{ text: "Microphone connected! Listening..." }]);
  //     setQaPairs([]);
  //     setSummary(null);

  //     // 5. Notify backend
  //     socket.emit("start_listening", { meetingId: res.data.id });
  //   } catch (error) {
  //     console.error("Error starting meeting:", error);
  //     alert("Failed to start meeting. Please try again.");
  //   }
  // };

  return (
    <div className="space-y-4">
      <motion.button
        onClick={onConnect}
        disabled={status === "listening" || status === "stopped"}
        className="flex items-center justify-center w-full py-3 space-x-2 font-bold text-white transition-all rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed hover:saturate-150"
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
        className="flex items-center justify-center w-full py-3 space-x-2 font-semibold text-white transition-all rounded-lg shadow-lg bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex items-center justify-center w-full py-3 mt-4 space-x-2 font-bold text-black transition-all rounded-lg shadow-lg bg-amber-500 disabled:opacity-50 disabled:cursor-wait"
              whileHover={{ scale: !isSummarizing ? 1.03 : 1 }}
              whileTap={{ scale: !isSummarizing ? 0.98 : 1 }}
            >
              {isSummarizing ? (
                <>
                  <div className="w-5 h-5 border-2 border-black rounded-full border-t-transparent animate-spin" />
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

// LiveTranscriptionContainer.tsx
interface TranscriptPayload {
  text: string;
  isQuestion?: boolean;
}

const LiveTranscriptionContainer: React.FC = () => {
  const [lines, setLines] = useState<TranscriptLine[]>([]);

  useEffect(() => {
    const handleTranscription = (data: TranscriptPayload) => {
      setLines((prev) => [
        ...prev,
        { text: data.text, isQuestion: data.isQuestion ?? false },
      ]);
    };

    socket.on("transcription", handleTranscription);

    return () => {
      socket.off("transcription", handleTranscription);
    };
  }, []);

  return <TranscriptViewer lines={lines} />;
};

// const MeetingAssistant: React.FC = () => {
//   const [qaPairs, setQaPairs] = useState<QaPair[]>([]);
//   const [summary, setSummary] = useState<string | null>(null);

//   // Example: Call your backend API when you stop recording
//   const fetchAnalysis = async () => {
//     try {
//       const response = await fetch("/api/analyze-meeting", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ transcript: "meeting transcript text here" }),
//       });

//       const data = await response.json();

//       // assuming API returns { summary: "...", qaPairs: [{question, answer}] }
//       setSummary(data.summary || null);
//       setQaPairs(data.qaPairs || []);
//     } catch (error) {
//       console.error("Error fetching meeting analysis:", error);
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 gap-6 h-screen p-6 bg-slate-900 text-white">
//       <div className="border border-slate-700 rounded-lg p-4">
//         <h2 className="mb-4 text-xl font-bold">Meeting Q&A</h2>
//         <QAInterface qaPairs={qaPairs} />
//       </div>
//       <div className="border border-slate-700 rounded-lg p-4">
//         <h2 className="mb-4 text-xl font-bold">Meeting Summary</h2>
//         <SummaryDisplay summary={summary} />
//       </div>

//       <button
//         onClick={fetchAnalysis}
//         className="col-span-2 p-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
//       >
//         Analyze Meeting
//       </button>
//     </div>
//   );
// };

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
      className="pr-2 space-y-4 overflow-y-auto h-96"
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
              <FaQuestionCircle className="flex-shrink-0 mt-1 text-blue-400" />
            )}
            <p className="leading-relaxed text-slate-200">{line.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- CHILD COMPONENT: QAInterface ---
// const QAInterface: React.FC<{ qaPairs: QaPair[] }> = ({ qaPairs }) => {
//   return (
//     <div className="h-full space-y-4">
//       {qaPairs.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
//           <FaBrain className="mb-2 text-4xl" />
//           <p>AI-generated answers to detected questions will appear here.</p>
//         </div>
//       ) : (
//         <AnimatePresence>
//           {qaPairs.map((pair, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ delay: index * 0.1 }}
//               className="p-4 rounded-lg bg-slate-700/50"
//             >
//               <div className="flex items-start space-x-3">
//                 <FaQuestionCircle className="flex-shrink-0 mt-1 text-blue-400" />
//                 <p className="font-semibold text-slate-100">{pair.question}</p>
//               </div>
//               <div className="my-3 border-t border-slate-600" />
//               <div className="flex items-start space-x-3">
//                 <FaBrain className="flex-shrink-0 mt-1 text-green-400" />
//                 <p className="text-slate-300">{pair.answer}</p>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

const QAInterface: React.FC<{ qaPairs: QaPair[] }> = ({ qaPairs }) => {
  if (!qaPairs || qaPairs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <FaBrain className="mb-2 text-4xl" />
        <p>AI-generated answers to detected questions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="h-full space-y-4">
      <AnimatePresence>
        {qaPairs.map((pair, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-slate-700/50"
          >
            <div className="flex items-start space-x-3">
              <FaQuestionCircle className="flex-shrink-0 mt-1 text-blue-400" />
              <p className="font-semibold text-slate-100">{pair.question}</p>
            </div>
            <div className="my-3 border-t border-slate-600" />
            <div className="flex items-start space-x-3">
              <FaBrain className="flex-shrink-0 mt-1 text-green-400" />
              <p className="text-slate-300">{pair.answer}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- CHILD COMPONENT: SummaryDisplay ---
// const SummaryDisplay: React.FC<{ summary: string | null }> = ({ summary }) => {
//   if (!summary) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
//         <FaFileAlt className="mb-2 text-4xl" />
//         <p>
//           Your meeting summary will be generated here after you stop listening.
//         </p>
//       </div>
//     );
//   }

//   const keyPoints = summary
//     .split("\n")
//     .filter((line) => line.toLowerCase().startsWith("key point:"));
//   const actionItems = summary
//     .split("\n")
//     .filter((line) => line.toLowerCase().startsWith("action item:"));

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="flex items-center mb-2 space-x-2 text-lg font-bold text-slate-100">
//           <FaLightbulb className="text-amber-400" />
//           <span>Key Takeaways</span>
//         </h3>
//         <ul className="space-y-2 list-inside text-slate-300">
//           {keyPoints.map((point, index) => (
//             <li key={index}>{point.replace("Key Point:", "").trim()}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h3 className="flex items-center mb-2 space-x-2 text-lg font-bold text-slate-100">
//           <FaCheckCircle className="text-green-400" />
//           <span>Action Items</span>
//         </h3>
//         <ul className="space-y-2 list-inside text-slate-300">
//           {actionItems.map((item, index) => (
//             <li key={index}>{item.replace("Action Item:", "").trim()}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const SummaryDisplay: React.FC<{ summary: string | null }> = ({ summary }) => {
  if (!summary || summary.trim() === "") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <FaFileAlt className="mb-2 text-4xl" />
        <p>
          Your meeting summary will be generated here after you stop listening.
        </p>
      </div>
    );
  }

  const lines = summary.split("\n");
  const keyPoints = lines.filter((line) =>
    line.toLowerCase().startsWith("key point:")
  );
  const actionItems = lines.filter((line) =>
    line.toLowerCase().startsWith("action item:")
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center mb-2 space-x-2 text-lg font-bold text-slate-100">
          <FaLightbulb className="text-amber-400" />
          <span>Key Takeaways</span>
        </h3>
        <ul className="space-y-2 list-disc list-inside text-slate-300">
          {keyPoints.length > 0 ? (
            keyPoints.map((point, index) => (
              <li key={index}>{point.replace(/key point:/i, "").trim()}</li>
            ))
          ) : (
            <li className="italic text-slate-500">No key points detected.</li>
          )}
        </ul>
      </div>
      <div>
        <h3 className="flex items-center mb-2 space-x-2 text-lg font-bold text-slate-100">
          <FaCheckCircle className="text-green-400" />
          <span>Action Items</span>
        </h3>
        <ul className="space-y-2 list-disc list-inside text-slate-300">
          {actionItems.length > 0 ? (
            actionItems.map((item, index) => (
              <li key={index}>{item.replace(/action item:/i, "").trim()}</li>
            ))
          ) : (
            <li className="italic text-slate-500">No action items detected.</li>
          )}
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

  // useEffect(() => {
  //   socket.connect();

  //   socket.on("connect", () => setConnectionStatus("connected"));
  //   socket.on("disconnect", () => setConnectionStatus("disconnected"));

  //   const handleTranscriptUpdate = (data: {
  //     text: string;
  //     isQuestion?: boolean;
  //   }) => {
  //     setTranscript((prev) => [
  //       ...prev,
  //       { text: data.text, isQuestion: data.isQuestion || false },
  //     ]);
  //   };

  //   const handleAiAnswer = (data: { question: string; answer: string }) => {
  //     setQaPairs((prev) => [
  //       ...prev,
  //       { question: data.question, answer: data.answer },
  //     ]);
  //   };

  //   const handleSummaryGenerated = (data: { summary: string }) => {
  //     setSummary(data.summary);
  //     setIsSummarizing(false);
  //   };

  //   socket.on("transcript_update", handleTranscriptUpdate);
  //   socket.on("ai_answer", handleAiAnswer);
  //   socket.on("summary_generated", handleSummaryGenerated);

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("transcript_update", handleTranscriptUpdate);
  //     socket.off("ai_answer", handleAiAnswer);
  //     socket.off("summary_generated", handleSummaryGenerated);
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setConnectionStatus("connected"));
    socket.on("disconnect", () => setConnectionStatus("disconnected"));

    // Live transcript updates
    socket.on(
      "transcript_update",
      (data: { text: string; isQuestion?: boolean }) => {
        setTranscript((prev) => [
          ...prev,
          { text: data.text, isQuestion: data.isQuestion || false },
        ]);
      }
    );

    // AI answers
    socket.on("ai_answer", (data: { question: string; answer: string }) => {
      setQaPairs((prev) => [...prev, data]);
    });

    // Summaries
    socket.on("summary_generated", (data: { summary: string }) => {
      setSummary(data.summary);
      setIsSummarizing(false);
    });

    return () => {
      socket.disconnect();
      socket.off();
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
    <div className="min-h-screen font-sans text-slate-200">
      <Header connectionStatus={connectionStatus} />

      <main className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <AnimatePresence>
              {status === "listening" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col items-center justify-center p-6 border shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 rounded-2xl"
                >
                  <p className="mb-2 text-sm font-semibold text-slate-300">
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
              <div className="p-6 border shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 rounded-2xl">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  Live Transcript
                </h2>
                <LiveTranscriptionContainer />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <div className="p-6 border shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 rounded-2xl">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  AI Assistance
                </h2>
                <QAInterface qaPairs={qaPairs} />
              </div>
            </motion.div>
          </div>
          <div className="space-y-8 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            >
              <div className="p-6 border shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 rounded-2xl">
                <h2 className="mb-4 text-2xl font-bold text-white">Controls</h2>
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
              <div className="p-6 border shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 rounded-2xl">
                <h2 className="mb-4 text-2xl font-bold text-white">
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
