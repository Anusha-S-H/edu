export interface SummaryResult {
  originalText: string;
  summary: string;
  keyPoints: string[];
  wordCount: {
    original: number;
    summary: number;
  };
  compressionRatio: number;
}

/**
 * Generates a summary of the provided text using a simple extractive summarization approach
 * In a production app, this would use an AI API like OpenAI, Cohere, or Hugging Face
 */
export function summarizeNotes(text: string, summaryLength: "short" | "medium" | "long" = "medium"): SummaryResult {
  if (!text.trim()) {
    throw new Error("No text provided");
  }

  const originalWordCount = text.split(/\s+/).length;

  // Determine target summary length
  let targetPercentage: number;
  switch (summaryLength) {
    case "short":
      targetPercentage = 0.3; // 30% of original
      break;
    case "medium":
      targetPercentage = 0.5; // 50% of original
      break;
    case "long":
      targetPercentage = 0.7; // 70% of original
      break;
    default:
      targetPercentage = 0.5;
  }

  const targetWordCount = Math.max(50, Math.round(originalWordCount * targetPercentage));

  // Extract sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const cleanSentences = sentences.map((s) => s.trim()).filter((s) => s.length > 0);

  if (cleanSentences.length === 0) {
    return {
      originalText: text,
      summary: text,
      keyPoints: [],
      wordCount: {
        original: originalWordCount,
        summary: originalWordCount,
      },
      compressionRatio: 1,
    };
  }

  // Score sentences based on keyword frequency
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq: { [key: string]: number } = {};

  words.forEach((word) => {
    // Filter out common stop words
    const stopWords = [
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "must",
      "can",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "from",
      "as",
      "if",
      "this",
      "that",
      "it",
      "that",
    ];

    if (!stopWords.includes(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Score sentences
  const sentenceScores: { sentence: string; score: number; index: number }[] = cleanSentences.map(
    (sentence, index) => {
      const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      let score = 0;

      sentenceWords.forEach((word) => {
        score += wordFreq[word] || 0;
      });

      // Boost score for earlier sentences
      score += (cleanSentences.length - index) * 0.5;

      return { sentence: sentence.trim(), score, index };
    }
  );

  // Select sentences for summary
  const selectedSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, Math.ceil(cleanSentences.length * targetPercentage)))
    .sort((a, b) => a.index - b.index)
    .map((s) => s.sentence);

  const summaryText = selectedSentences.join(" ");
  const summaryWordCount = summaryText.split(/\s+/).length;

  // Extract key points - sentences with highest scores
  const keyPoints = sentenceScores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(5, Math.ceil(cleanSentences.length * 0.3)))
    .map((s) => s.sentence.replace(/[.!?]+$/, ""));

  return {
    originalText: text,
    summary: summaryText,
    keyPoints,
    wordCount: {
      original: originalWordCount,
      summary: summaryWordCount,
    },
    compressionRatio: Math.round((summaryWordCount / originalWordCount) * 100) / 100,
  };
}

/**
 * Extracts main topics from text
 */
export function extractTopics(text: string): string[] {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq: { [key: string]: number } = {};

  const stopWords = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "can",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "as",
    "if",
    "this",
    "that",
    "it",
    "it",
  ];

  words.forEach((word) => {
    if (!stopWords.includes(word) && word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  return Object.entries(wordFreq)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
}
