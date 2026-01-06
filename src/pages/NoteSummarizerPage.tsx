import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  ArrowLeft,
  Copy,
  Download,
  Loader2,
  AlertCircle,
  List,
  BookMarked,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { summarizeNotes, extractTopics, type SummaryResult } from "@/lib/notesSummarizer";
import { generateBulletPoints, generateFlashCards, exportFlashCardsJSON, exportFlashCardsCSV, type FlashCardSet } from "@/lib/noteTools";
import { toast } from "sonner";

const NoteSummarizerPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "long">("medium");
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [flashCards, setFlashCards] = useState<FlashCardSet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setError("Please enter some notes to summarize");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = summarizeNotes(notes, summaryLength);
      setSummary(result);
      
      // Also generate bullet points and flash cards
      const bullets = generateBulletPoints(notes);
      setBulletPoints(bullets.bulletPoints);
      
      const cards = generateFlashCards(notes, "Study Set");
      setFlashCards(cards);
      
      setActiveTab("summary");
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to summarize notes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!summary) return;

    const content = `NOTES SUMMARY
Generated: ${new Date().toLocaleDateString()}

ORIGINAL NOTES:
${summary.originalText}

SUMMARY:
${summary.summary}

KEY POINTS:
${summary.keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

STATISTICS:
- Original word count: ${summary.wordCount.original}
- Summary word count: ${summary.wordCount.summary}
- Compression ratio: ${(summary.compressionRatio * 100).toFixed(1)}%
`;

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", "notes-summary.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Summary downloaded!");
  };

  const handleExportFlashCards = (format: "json" | "csv") => {
    if (!flashCards) return;

    let content: string;
    let filename: string;

    if (format === "json") {
      content = exportFlashCardsJSON(flashCards);
      filename = "flashcards.json";
    } else {
      content = exportFlashCardsCSV(flashCards);
      filename = "flashcards.csv";
    }

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Flash cards exported as ${format.toUpperCase()}!`);
  };

  const handleNextCard = () => {
    if (flashCards && currentCardIndex < flashCards.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Notes Summarizer</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card border-slate-700 p-6 h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Paste Your Notes</h2>
                <p className="text-sm text-slate-400">
                  Enter or paste your notes below to generate a summary
                </p>
              </div>

              <Textarea
                placeholder="Paste your notes here... (minimum 20 characters)"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setError(null);
                }}
                className="flex-1 mb-4 bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:bg-white"
              />

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Summary Length
                  </label>
                  <Select value={summaryLength} onValueChange={(value) => setSummaryLength(value as any)}>
                    <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-300">
                      <SelectItem value="short">Short (30% of original)</SelectItem>
                      <SelectItem value="medium">Medium (50% of original)</SelectItem>
                      <SelectItem value="long">Long (70% of original)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <Alert className="bg-red-900/20 border-red-700">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <AlertDescription className="text-red-400">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleSummarize}
                  disabled={isLoading || !notes.trim()}
                  className="w-full gradient-primary text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    "Summarize Notes"
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {summary && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-200 border border-slate-300">
                  <TabsTrigger value="summary" className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="bullets" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Bullets
                  </TabsTrigger>
                  <TabsTrigger value="flashcards" className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4" />
                    Flash Cards
                  </TabsTrigger>
                </TabsList>

                {/* Summary Tab */}
                <TabsContent value="summary" className="space-y-4 mt-4">
                  {/* Summary */}
                  <Card className="glass-card border-slate-300 bg-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">AI Summary</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(summary.summary)}
                        className="text-slate-700 hover:bg-slate-100"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {summary.summary}
                    </p>
                    <div className="text-xs text-slate-600">
                      {summary.wordCount.summary} words • {(summary.compressionRatio * 100).toFixed(1)}% of original
                    </div>
                  </Card>

                  {/* Key Points */}
                  <Card className="glass-card border-slate-300 bg-white p-6">
                    <h3 className="text-lg font-semibold mb-4 text-slate-900">Key Points</h3>
                    <div className="space-y-2">
                      {summary.keyPoints.map((point, index) => (
                        <div
                          key={index}
                          className="p-3 bg-purple-50 rounded-lg border border-purple-200"
                        >
                          <p className="text-sm text-slate-700">{point}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Topics */}
                  {extractTopics(notes).length > 0 && (
                    <Card className="glass-card border-slate-300 bg-white p-6">
                      <h3 className="text-lg font-semibold mb-4 text-slate-900">Topics Detected</h3>
                      <div className="flex flex-wrap gap-2">
                        {extractTopics(notes).map((topic, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Statistics */}
                  <Card className="glass-card border-slate-300 bg-white p-6">
                    <h3 className="text-lg font-semibold mb-4 text-slate-900">Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Original</p>
                        <p className="text-xl font-bold text-slate-900">
                          {summary.wordCount.original}
                        </p>
                        <p className="text-xs text-slate-600">words</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Summary</p>
                        <p className="text-xl font-bold text-slate-900">
                          {summary.wordCount.summary}
                        </p>
                        <p className="text-xs text-slate-600">words</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Compression</p>
                        <p className="text-xl font-bold text-purple-600">
                          {(summary.compressionRatio * 100).toFixed(1)}%
                        </p>
                        <p className="text-xs text-slate-600">ratio</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Reduction</p>
                        <p className="text-xl font-bold text-blue-600">
                          {(
                            ((summary.wordCount.original - summary.wordCount.summary) /
                              summary.wordCount.original) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                        <p className="text-xs text-slate-600">reduction</p>
                      </div>
                    </div>
                  </Card>

                  {/* Download Button */}
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Summary
                  </Button>
                </TabsContent>

                {/* Bullet Points Tab */}
                <TabsContent value="bullets" className="space-y-4 mt-4">
                  <Card className="glass-card border-slate-300 bg-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Bullet Points</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(bulletPoints.map(b => `• ${b}`).join("\n"))}
                        className="text-slate-700 hover:bg-slate-100"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {bulletPoints.map((bullet, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Flash Cards Tab */}
                <TabsContent value="flashcards" className="space-y-4 mt-4">
                  {flashCards && flashCards.cards.length > 0 ? (
                    <>
                      {/* Flash Card */}
                      <Card 
                        className="glass-card border-slate-300 bg-white p-8 min-h-64 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setIsFlipped(!isFlipped)}
                      >
                        <div className="text-center flex-1 flex items-center justify-center">
                          <div>
                            <p className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-semibold">
                              {isFlipped ? "Answer" : "Question"}
                            </p>
                            <p className="text-xl font-semibold text-slate-900">
                              {isFlipped
                                ? flashCards.cards[currentCardIndex].answer
                                : flashCards.cards[currentCardIndex].question}
                            </p>
                          </div>
                        </div>
                        <div className="text-center text-xs text-slate-500">
                          Click to {isFlipped ? "see question" : "reveal answer"}
                        </div>
                      </Card>

                      {/* Card Navigation */}
                      <div className="flex items-center justify-between gap-4">
                        <Button
                          onClick={handlePrevCard}
                          disabled={currentCardIndex === 0}
                          variant="outline"
                          className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                          Previous
                        </Button>
                        <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-medium">
                          {currentCardIndex + 1} / {flashCards.cards.length}
                        </div>
                        <Button
                          onClick={handleNextCard}
                          disabled={currentCardIndex === flashCards.cards.length - 1}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next
                        </Button>
                      </div>

                      {/* Export Options */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleExportFlashCards("json")}
                          variant="outline"
                          className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export JSON
                        </Button>
                        <Button
                          onClick={() => handleExportFlashCards("csv")}
                          variant="outline"
                          className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export CSV
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Card className="glass-card border-slate-300 bg-white p-8 text-center">
                      <BookMarked className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">No flash cards generated</p>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            )}

            {!summary && !isLoading && (
              <Card className="glass-card border-slate-300 bg-white p-12 flex items-center justify-center text-center h-96">
                <div>
                  <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
                  <p className="text-slate-600">
                    Enter your notes and click "Summarize" to see results here
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NoteSummarizerPage;
