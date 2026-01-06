import { useEffect, useMemo, useState } from "react";
import { Eye, Volume2, Type, Contrast, Focus } from "lucide-react";
import { format } from "date-fns";

type EyeDifficulty = "easy" | "medium" | "hard";

const AccessibleDashboard = () => {
  const [fontScale, setFontScale] = useState(1.05);
  const [highContrast, setHighContrast] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [ttsStatus, setTtsStatus] = useState<"idle" | "speaking" | "unsupported">("idle");
  const [customText, setCustomText] = useState("");
  const [speechRate, setSpeechRate] = useState(1);
  const [wideSpacing, setWideSpacing] = useState(false);
  const [eyeCheckActive, setEyeCheckActive] = useState(false);
  const [eyeAnswers, setEyeAnswers] = useState<Record<string, string>>({});
  const [activeSource, setActiveSource] = useState<"sample" | "custom" | null>(null);
  const [activeTokenIndex, setActiveTokenIndex] = useState<number | null>(null);
  const [eyeDifficulty, setEyeDifficulty] = useState<EyeDifficulty>("medium");
  const [difficultyNote, setDifficultyNote] = useState<string | null>(null);
  const [visionHistory, setVisionHistory] = useState<Array<{ type: "vision" | "eye"; score: number; total: number; report: string; ts: number }>>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("visionHistory");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const visionQuestions = useMemo(
    () => [
      {
        id: "smallText",
        prompt: "I struggle to read small or low-contrast text.",
        options: ["Never", "Sometimes", "Often"],
        scores: { Never: 0, Sometimes: 1, Often: 2 },
      },
      {
        id: "glare",
        prompt: "Bright screens or glare make it hard to focus.",
        options: ["Never", "Sometimes", "Often"],
        scores: { Never: 0, Sometimes: 1, Often: 2 },
      },
      {
        id: "fatigue",
        prompt: "My eyes feel tired after short study sessions.",
        options: ["Never", "Sometimes", "Often"],
        scores: { Never: 0, Sometimes: 1, Often: 2 },
      },
      {
        id: "focusShift",
        prompt: "Switching between screen and paper blurs my vision.",
        options: ["Never", "Sometimes", "Often"],
        scores: { Never: 0, Sometimes: 1, Often: 2 },
      },
    ],
    []
  );
  const [visionAnswers, setVisionAnswers] = useState<Record<string, string>>({});

  const visionScore = useMemo(() => {
    return visionQuestions.reduce((sum, q) => {
      const ans = visionAnswers[q.id];
      return sum + (ans ? q.scores[ans as keyof typeof q.scores] : 0);
    }, 0);
  }, [visionAnswers, visionQuestions]);

  const visionResult = useMemo(() => {
    if (visionScore >= 6) {
      return "Consider enabling high contrast, increasing text size, and scheduling a professional eye exam.";
    }
    if (visionScore >= 3) {
      return "Try focus mode, larger text, and regular screen breaks. If discomfort continues, seek advice.";
    }
    return "You seem comfortable. Keep using breaks and good lighting to maintain eye comfort.";
  }, [visionScore]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("visionHistory", JSON.stringify(visionHistory.slice(-5)));
  }, [visionHistory]);

  const sampleText = useMemo(
    () =>
      "Today we will explore how photosynthesis turns sunlight into energy. Focus on the sequence: light absorption, energy transfer, and sugar creation.",
    []
  );

  const tokenize = (text: string) => {
    const tokens: Array<{ text: string; isWord: boolean; start: number; end: number }> = [];
    const regex = /\s+|[^\s]+/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const part = match[0];
      const start = match.index;
      tokens.push({ text: part, isWord: !/^\s+$/.test(part), start, end: start + part.length });
    }
    return tokens;
  };

  const findWordTokenIndex = (tokens: Array<{ text: string; isWord: boolean; start: number; end: number }>, charIndex: number) => {
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.isWord && charIndex >= t.start && charIndex < t.end) {
        return i;
      }
    }
    return null;
  };

  const sampleTokens = useMemo(() => tokenize(sampleText), [sampleText]);
  const customTokens = useMemo(() => tokenize(customText), [customText]);

  const eyeCheckQuestions = useMemo(() => {
    const blur = (level: EyeDifficulty) => {
      if (level === "easy") return "blur-[1px]";
      if (level === "hard") return "blur-[2.4px]";
      return "blur-[1.6px]";
    };

    const numberSize = eyeDifficulty === "hard" ? "text-4xl" : "text-5xl";
    const letterSize = eyeDifficulty === "hard" ? "text-3xl" : "text-4xl";

    return [
      {
        id: "shape",
        prompt: "In the blurred image, which shape is most visible?",
        options: ["Triangle", "Circle", "Square"],
        correct: "Circle",
        render: (
          <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/60 to-blue-500/60">
            <div className={`absolute inset-8 rounded-full bg-white/90 ${blur(eyeDifficulty)}`} aria-hidden />
            <span className="sr-only">Blurred circle on gradient</span>
          </div>
        ),
      },
      {
        id: "contrast",
        prompt: "What number do you see in the blurred card?",
        options: ["12", "16", "18"],
        correct: "16",
        render: (
          <div className="relative h-32 rounded-2xl bg-slate-900 flex items-center justify-center">
            <span className={`${numberSize} font-black text-emerald-200 ${blur(eyeDifficulty)} select-none`}>16</span>
            <span className="sr-only">Blurred number sixteen on dark background</span>
          </div>
        ),
      },
      {
        id: "direction",
        prompt: "Which direction is the blurred arrow pointing?",
        options: ["Left", "Up", "Right"],
        correct: "Right",
        render: (
          <div className="relative h-32 rounded-2xl bg-amber-200 flex items-center justify-center">
            <div className={`w-16 h-16 border-r-[18px] border-t-[12px] border-b-[12px] border-transparent border-r-amber-600 ${blur(eyeDifficulty)} rotate-0`} aria-hidden />
            <span className="sr-only">Blurred arrow pointing right</span>
          </div>
        ),
      },
      {
        id: "letters",
        prompt: "Which letters are shown in the blurred tile?",
        options: ["E F P", "L P N", "T O Z"],
        correct: "E F P",
        render: (
          <div className="relative h-32 rounded-2xl bg-indigo-900 flex items-center justify-center">
            <span className={`${letterSize} font-extrabold tracking-widest text-white ${blur(eyeDifficulty)} select-none`}>E F P</span>
            <span className="sr-only">Blurred letters E F P on dark background</span>
          </div>
        ),
      },
      {
        id: "color",
        prompt: "What color dominates the blurred patch?",
        options: ["Red", "Green", "Blue"],
        correct: "Green",
        render: (
          <div className="relative h-32 rounded-2xl bg-gradient-to-br from-green-500/70 via-green-400/70 to-emerald-500/70 flex items-center justify-center">
            <div className={`absolute inset-6 rounded-2xl bg-green-200/80 ${blur(eyeDifficulty)}`} aria-hidden />
            <span className="sr-only">Blurred green patch</span>
          </div>
        ),
      },
    ];
  }, [eyeDifficulty]);

  const eyeScore = useMemo(() => {
    const total = eyeCheckQuestions.length;
    const correctCount = eyeCheckQuestions.reduce((acc, q) => acc + (eyeAnswers[q.id] === q.correct ? 1 : 0), 0);
    const completed = Object.keys(eyeAnswers).length === total;
    let report: "ok" | "consult" | "incomplete" = "incomplete";
    if (completed) {
      report = correctCount >= 4 ? "ok" : "consult";
    }
    return { correctCount, total, report, completed };
  }, [eyeAnswers, eyeCheckQuestions]);

  const recordVisionRun = (entry: { type: "vision" | "eye"; score: number; total: number; report: string }) => {
    const newEntry = { ...entry, ts: Date.now() };
    setVisionHistory((prev) => [...prev.slice(-(5 - 1)), newEntry]);
  };

  const adjustEyeDifficulty = (score: number, total: number) => {
    const accuracy = total === 0 ? 0 : score / total;
    if (accuracy >= 0.8) {
      setEyeDifficulty((prev) => (prev === "hard" ? "hard" : prev === "medium" ? "hard" : "medium"));
      setDifficultyNote("Great job—next round will be a bit harder.");
    } else if (accuracy <= 0.4) {
      setEyeDifficulty((prev) => (prev === "easy" ? "easy" : "easy"));
      setDifficultyNote("We’ll ease it for the next round to reduce strain.");
    } else {
      setEyeDifficulty("medium");
      setDifficultyNote("Keeping difficulty balanced for the next round.");
    }

    // Reset previous selections so the next run starts clean.
    setEyeAnswers({});
    setEyeCheckActive(true);
  };

  const speakText = (text: string, rate = 1, source: "sample" | "custom") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setTtsStatus("unsupported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.onend = () => {
      setTtsStatus("idle");
      setActiveSource(null);
      setActiveTokenIndex(null);
    };

    utterance.onboundary = (event) => {
      if (event.name === "word" || typeof event.charIndex === "number") {
        const tokens = source === "sample" ? sampleTokens : customTokens;
        const tokenIndex = findWordTokenIndex(tokens, event.charIndex ?? 0);
        if (tokenIndex !== null) {
          setActiveTokenIndex(tokenIndex);
        }
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setTtsStatus("speaking");
    setActiveSource(source);
    setActiveTokenIndex(null);
  };

  const stopSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setTtsStatus("idle");
    setActiveSource(null);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    return () => {
      root.classList.remove("high-contrast");
    };
  }, [highContrast]);

  return (
    <main
      className={
        highContrast
          ? "min-h-screen bg-black text-yellow-50"
          : "min-h-screen bg-gradient-to-b from-background to-muted/40 text-foreground"
      }
    >
      <div className="container px-4 py-12 md:py-16 space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Eye className="h-4 w-4" aria-hidden />
              Accessible Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">Learning tools for low-vision learners</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Switch to high contrast, resize text, and hear lessons out loud. These controls are built to reduce strain and
              keep you oriented.
            </p>
          </div>
          <div className="flex flex-wrap gap-3" aria-label="Quick toggles">
            <button
              type="button"
              onClick={() => setHighContrast((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:shadow"
            >
              <Contrast className="h-4 w-4" aria-hidden />
              {highContrast ? "High contrast on" : "High contrast"}
            </button>
            <button
              type="button"
              onClick={() => setFocusMode((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:shadow"
            >
              <Focus className="h-4 w-4" aria-hidden />
              {focusMode ? "Focus mode on" : "Focus mode"}
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <article
              className={
                focusMode
                  ? "rounded-3xl border border-primary/40 bg-primary/5 p-6 shadow-lg"
                  : "rounded-3xl border border-border bg-card p-6 shadow-sm"
              }
              aria-label="Reading area"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Readable lesson</h2>
                  <p className="text-sm text-muted-foreground">Adjust text size and spacing for comfort.</p>
                </div>
                <div className="flex items-center gap-3" aria-label="Text controls">
                  <label className="flex items-center gap-2 text-sm" htmlFor="font-scale">
                    <Type className="h-4 w-4" aria-hidden />
                    Text size
                  </label>
                  <input
                    id="font-scale"
                    type="range"
                    min="0.9"
                    max="1.5"
                    step="0.05"
                    value={fontScale}
                    onChange={(e) => setFontScale(parseFloat(e.target.value))}
                    aria-valuemin={0.9}
                    aria-valuemax={1.5}
                    aria-valuenow={fontScale}
                    className="h-2 w-36 cursor-pointer rounded-full bg-muted"
                  />
                  <span className="text-xs text-muted-foreground" aria-live="polite">
                    {Math.round(fontScale * 100)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3" aria-label="Spacing aids">
                <button
                  type="button"
                  onClick={() => setWideSpacing((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-sm hover:shadow"
                >
                  {wideSpacing ? "Wide spacing on" : "Wide spacing"}
                </button>
              </div>

              <div
                className={`mt-4 space-y-3 leading-relaxed transition-colors ${
                  activeSource === "sample" && ttsStatus === "speaking"
                    ? "outline outline-2 outline-primary/80 bg-primary/10 shadow-md"
                    : ""
                }`}
                style={{
                  fontSize: `${fontScale}rem`,
                  lineHeight: focusMode ? 1.8 : 1.6,
                  letterSpacing: wideSpacing ? "0.04em" : undefined,
                  wordSpacing: wideSpacing ? "0.12em" : undefined,
                }}
              >
                <p className="flex flex-wrap gap-1">
                  {sampleTokens.map((token, idx) => (
                    <span
                      key={`${token.start}-${idx}`}
                      className={
                        token.isWord && activeSource === "sample" && ttsStatus === "speaking" && activeTokenIndex === idx
                          ? "bg-primary/30 px-1 rounded"
                          : undefined
                      }
                    >
                      {token.text}
                    </span>
                  ))}
                </p>
                <p className="text-muted-foreground text-sm">
                  Notice the key steps. If anything feels hard to see, toggle high contrast or enlarge the text until it feels right.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm" aria-label="Audio support">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Listen instead of reading</h2>
                  <p className="text-sm text-muted-foreground">Play or stop narration of the lesson text.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => speakText(sampleText, speechRate, "sample")}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow"
                  >
                    <Volume2 className="h-4 w-4" aria-hidden />
                    Play sample
                  </button>
                  <button
                    type="button"
                    onClick={stopSpeech}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:shadow"
                  >
                    Stop
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3" aria-label="Speech rate">
                  <label className="flex items-center gap-2 text-sm" htmlFor="speech-rate">
                    <Volume2 className="h-4 w-4" aria-hidden />
                    Speech speed
                  </label>
                  <input
                    id="speech-rate"
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.05"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    aria-valuemin={0.8}
                    aria-valuemax={1.3}
                    aria-valuenow={speechRate}
                    className="h-2 w-36 cursor-pointer rounded-full bg-muted"
                  />
                  <span className="text-xs text-muted-foreground" aria-live="polite">
                    {speechRate.toFixed(2)}x
                  </span>
                </div>

                <div className="space-y-2" aria-label="Paste your own text for speech">
                  <label className="text-sm font-semibold" htmlFor="custom-tts">
                    Paste text to listen
                  </label>
                  <textarea
                    id="custom-tts"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Paste any lesson, note, or summary here..."
                    className={`w-full rounded-2xl border bg-muted/60 p-3 text-sm leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-colors ${
                      activeSource === "custom" && ttsStatus === "speaking"
                        ? "border-primary outline outline-2 outline-primary/80 bg-primary/10 shadow-md"
                        : "border-border"
                    }`}
                    rows={4}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => customText.trim().length > 0 && speakText(customText, speechRate, "custom")}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow disabled:opacity-50"
                      disabled={customText.trim().length === 0}
                    >
                      <Volume2 className="h-4 w-4" aria-hidden />
                      Play pasted text
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomText("")}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:shadow"
                    >
                      Clear
                    </button>
                    <span className="text-xs text-muted-foreground" aria-live="polite">
                      {customText.length} characters
                    </span>
                  </div>
                  {customText.trim().length > 0 && (
                    <div
                      className={`mt-3 rounded-2xl border p-3 text-sm leading-relaxed transition-colors ${
                        activeSource === "custom" && ttsStatus === "speaking"
                          ? "border-primary outline outline-2 outline-primary/80 bg-primary/10 shadow-md"
                          : "border-border bg-muted/40"
                      }`}
                      aria-live="polite"
                    >
                      <div className="flex flex-wrap gap-1">
                        {customTokens.map((token, idx) => (
                          <span
                            key={`${token.start}-${idx}`}
                            className={
                              token.isWord && activeSource === "custom" && ttsStatus === "speaking" && activeTokenIndex === idx
                                ? "bg-primary/40 px-1 rounded"
                                : undefined
                            }
                          >
                            {token.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {ttsStatus === "unsupported" && "Speech is not available in this browser."}
                  {ttsStatus === "speaking" && "Playing audio..."}
                  {ttsStatus === "idle" && "Ready to play."}
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm" aria-label="Eye check">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Check your eye</h2>
                  <p className="text-sm text-muted-foreground">
                    Blurred pictorial prompts to gauge quick recognition. Current level: <span className="font-semibold capitalize">{eyeDifficulty}</span>.
                  </p>
                  {difficultyNote && <p className="text-xs text-amber-600 mt-1">{difficultyNote}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => setEyeCheckActive(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow"
                >
                  Start
                </button>
              </div>

              {eyeCheckActive && (
                <div className="mt-5 space-y-5">
                  {eyeCheckQuestions.map((q) => (
                    <div key={q.id} className="rounded-2xl border border-border p-4 space-y-3">
                      <div className="rounded-xl overflow-hidden">{q.render}</div>
                      <p className="text-sm font-semibold">{q.prompt}</p>
                      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={q.prompt}>
                        {q.options.map((opt) => (
                          <label
                            key={opt}
                            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm cursor-pointer ${
                              eyeAnswers[q.id] === opt ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`eye-${q.id}`}
                              value={opt}
                              className="h-3 w-3"
                              checked={eyeAnswers[q.id] === opt}
                              onChange={() => setEyeAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm" aria-live="polite">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Report</span>
                      <span className="text-xs text-muted-foreground">
                        Score: {eyeScore.correctCount} / {eyeScore.total}
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {!eyeScore.completed && "Answer all questions to see your result."}
                      {eyeScore.completed && eyeScore.report === "ok" &&
                        "Vision check looks OK for these prompts. Keep healthy screen habits and regular breaks."}
                      {eyeScore.completed && eyeScore.report === "consult" &&
                        "Results suggest difficulty. Enable high contrast, increase size, and consider consulting an eye care professional."}
                    </p>
                    {eyeScore.completed && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            recordVisionRun({
                              type: "eye",
                              score: eyeScore.correctCount,
                              total: eyeScore.total,
                              report: eyeScore.report,
                            })
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 font-semibold hover:shadow"
                        >
                          Save this run
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustEyeDifficulty(eyeScore.correctCount, eyeScore.total)}
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 font-semibold hover:shadow"
                        >
                          Adapt difficulty
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          </div>

          <aside className="space-y-4" aria-label="Assists">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Quick aids</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Press Tab to move between controls; Enter to activate.</li>
                <li>• Use Shift + Tab to move backwards.</li>
                <li>• Try high contrast with bold edges for clarity.</li>
                <li>• Focus mode keeps only the reading area visible.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold">Preferred setup</h3>
              <div className="flex items-center justify-between text-sm">
                <span>High contrast</span>
                <span className="font-semibold">{highContrast ? "On" : "Off"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Focus mode</span>
                <span className="font-semibold">{focusMode ? "On" : "Off"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Text size</span>
                <span className="font-semibold">{Math.round(fontScale * 100)}%</span>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold">Focus checklist</h3>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                I can read or hear the key idea.
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />
                I can repeat the steps aloud.
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />
                I know where to find the next lesson.
              </label>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4" aria-label="Vision self check">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Vision self-check</h3>
                  <p className="text-sm text-muted-foreground">Answer a few prompts to gauge eye comfort.</p>
                </div>
                <span className="text-xs rounded-full bg-primary/10 px-3 py-1 text-primary font-semibold">2 min</span>
              </div>
              <div className="space-y-3">
                {visionQuestions.map((q) => (
                  <fieldset key={q.id} className="space-y-2">
                    <legend className="text-sm font-semibold">{q.prompt}</legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={q.prompt}>
                      {q.options.map((opt) => (
                        <label
                          key={opt}
                          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm cursor-pointer ${
                            visionAnswers[q.id] === opt ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            className="h-3 w-3"
                            checked={visionAnswers[q.id] === opt}
                            onChange={() => setVisionAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className="rounded-2xl border border-border bg-muted/50 p-3 text-sm" aria-live="polite">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Result</span>
                  <span className="text-xs text-muted-foreground">Score: {visionScore} / {visionQuestions.length * 2}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{visionResult}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3" aria-label="Progress log">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Progress log</h3>
                <span className="text-xs text-muted-foreground">Last 5 runs</span>
              </div>
              {visionHistory.length === 0 && (
                <p className="text-sm text-muted-foreground">No saved runs yet.</p>
              )}
              <ul className="space-y-2 text-sm">
                {visionHistory
                  .slice(-5)
                  .reverse()
                  .map((item, idx) => (
                    <li key={item.ts + idx} className="flex items-center justify-between gap-3">
                      <div>
                        <span className="font-semibold capitalize">{item.type === "eye" ? "Eye check" : "Vision check"}</span>
                        <span className="text-muted-foreground ml-2">{format(item.ts, "MMM d, h:mma")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold">{item.score}/{item.total}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            item.report === "ok" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.report === "ok" ? "OK" : "Consult"}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default AccessibleDashboard;
