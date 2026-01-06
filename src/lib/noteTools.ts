export interface BulletPoints {
  originalText: string;
  bulletPoints: string[];
}

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

export interface FlashCardSet {
  title: string;
  cards: FlashCard[];
  createdAt: Date;
}

/**
 * Generates bullet points from text
 */
export function generateBulletPoints(text: string): BulletPoints {
  if (!text.trim()) {
    throw new Error("No text provided");
  }

  // Split by sentences and line breaks
  const sentences = text
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Filter out very short sentences and create bullet points
  const bulletPoints = sentences
    .filter((s) => s.split(/\s+/).length >= 3) // At least 3 words
    .map((s) => {
      // Capitalize first letter
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .slice(0, 10); // Limit to 10 bullet points

  return {
    originalText: text,
    bulletPoints,
  };
}

/**
 * Generates flash cards from text using Q&A extraction
 */
export function generateFlashCards(text: string, title: string = "Study Set"): FlashCardSet {
  if (!text.trim()) {
    throw new Error("No text provided");
  }

  const sentences = text
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  const cards: FlashCard[] = [];

  // Create Q&A pairs from sentences
  for (let i = 0; i < sentences.length; i += 2) {
    if (i + 1 < sentences.length) {
      const question = sentences[i];
      const answer = sentences[i + 1];

      // Skip if sentences are too similar or too short
      if (
        question.length > 20 &&
        answer.length > 20 &&
        question.toLowerCase() !== answer.toLowerCase()
      ) {
        cards.push({
          id: `card_${i}`,
          question: question.endsWith("?") ? question : question + "?",
          answer: answer,
        });
      }
    }
  }

  // If not enough cards, create definition-based cards from key terms
  if (cards.length < 3) {
    const words = text
      .toLowerCase()
      .match(/\b[a-z]{5,}\b/g)
      ?.slice(0, 5) || [];
    const uniqueWords = [...new Set(words)];

    uniqueWords.forEach((word, index) => {
      cards.push({
        id: `card_def_${index}`,
        question: `What is ${word}?`,
        answer: `${word.charAt(0).toUpperCase() + word.slice(1)} is a key term related to the study material.`,
      });
    });
  }

  return {
    title,
    cards: cards.slice(0, 10), // Limit to 10 cards
    createdAt: new Date(),
  };
}

/**
 * Export flash cards to JSON
 */
export function exportFlashCardsJSON(cardSet: FlashCardSet): string {
  return JSON.stringify(cardSet, null, 2);
}

/**
 * Export flash cards to CSV
 */
export function exportFlashCardsCSV(cardSet: FlashCardSet): string {
  let csv = "Question,Answer\n";
  cardSet.cards.forEach((card) => {
    const question = `"${card.question.replace(/"/g, '""')}"`;
    const answer = `"${card.answer.replace(/"/g, '""')}"`;
    csv += `${question},${answer}\n`;
  });
  return csv;
}
