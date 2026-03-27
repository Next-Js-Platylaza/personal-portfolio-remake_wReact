type WordCategory = keyof SentenceGenerator['words'];

class SentenceGenerator {
  // Using 'private' instead of '#' for standard TS privacy, 
  // or keep '#' if you prefer hard runtime privacy.
  private readonly words = {
    moods: ["happy", "sad", "excited", "calm", "curious", "angry"],
    animalNouns: ["cat", "dog", "lion", "elephant", "rabbit", "bird", "shark", "whale", "tiger", "wolf"],
    personNouns: ["teacher", "doctor", "engineer", "artist", "scientist", "child", "parent", "athlete", "driver"],
    thingNouns: ["car", "phone", "book", "table", "computer", "lamp", "pen", "watch", "bicycle", "chair"],
    placeNouns: ["city", "village", "forest", "mountain", "beach", "park", "restaurant", "school", "market"],
    abstractNouns: ["idea", "truth", "love", "fear", "hope", "honor", "anger", "joy", "beauty", "justice"],
    animalVerbs: ["run", "hunt", "fly", "crawl", "pounce", "swim", "roar", "chirp", "climb", "scratch"],
    personVerbs: ["teach", "build", "study", "create", "help", "lead", "sing", "play", "read", "drive"],
    thingVerbs: ["ring", "break", "shine", "open", "close", "fall", "move", "roll", "buzz", "click"],
    placeVerbs: ["thrive", "bustle", "grow", "decline", "expand", "flourish", "shrink", "quiet"],
    abstractVerbs: ["exist", "inspire", "believe", "create", "imagine", "feel", "learn", "dream", "reflect"],
    animalSizes: ["big", "small", "huge", "tiny", "massive", "minute"],
    personSizes: ["tall", "short", "strong", "weak"],
    thingSizes: ["large", "compact", "bulky", "lightweight"],
    placeSizes: ["spacious", "cramped", "vast", "narrow"],
    abstractSizes: ["ample", "minimal"],
    animalColors: ["red", "blue", "green", "yellow", "purple", "white"],
    personColors: ["black", "gray", "orange"],
    thingColors: ["colorful", "monochrome"],
    placeColors: ["lush", "bare"],
    abstractColors: ["vibrant", "muted"],
    animalManner: ["quickly", "slowly", "carefully", "gracefully", "awkwardly", "boldly", "silently", "eagerly"],
    personManner: ["quickly", "slowly", "patiently", "energetically", "calmly"],
    thingManner: ["smoothly", "noisily", "softly", "gently"],
    placeManner: ["quietly", "bustlingly", "peacefully"],
    abstractManner: ["freely", "gracefully"],
    personSubjects: ["I", "you", "he", "she", "it", "we", "they"],
    personObjects: ["me", "you", "him", "her", "it", "us", "them"],
    animalSubjects: ["he", "she", "it", "they"],
    thingSubjects: ["it", "they"],
    placeSubjects: ["it", "they"],
    abstractSubjects: ["it", "they"],
    prepositions: ["on", "in", "under", "over", "beside", "between", "around", "against", "through"],
    conjunctions: ["and", "but", "or", "so", "because", "although", "while", "if", "since", "unless"],
    questionWords: ["who", "what", "where", "when", "why", "how"] // Added as it was missing but used in structures
  };

  private readonly sentenceStructures: WordCategory[][] = [
    ["moods", "personSubjects", "personVerbs", "thingNouns"],
    ["animalNouns", "animalVerbs", "animalSizes"],
    ["thingNouns", "thingVerbs", "thingColors"],
    ["placeNouns", "placeVerbs", "placeSizes"],
    ["abstractNouns", "abstractVerbs", "abstractSizes"],
    ["thingSizes", "thingNouns", "thingVerbs", "thingManner"],
    ["animalColors", "animalNouns", "animalVerbs", "animalManner"],
    ["personSizes", "personNouns", "personVerbs", "personManner"],
    ["personSubjects", "personVerbs", "thingNouns"],
    ["animalSubjects", "animalVerbs", "thingNouns"],
    ["thingNouns", "thingVerbs", "abstractNouns"],
    ["personSubjects", "personVerbs", "prepositions", "placeNouns"],
    ["animalNouns", "animalVerbs", "prepositions", "thingNouns"],
    ["animalNouns", "animalVerbs", "conjunctions", "personSubjects", "personVerbs"],
    ["personSubjects", "personVerbs", "thingManner", "prepositions", "placeNouns"],
    ["questionWords", "personSubjects", "personVerbs", "thingNouns"],
    ["personSubjects", "conjunctions", "animalNouns", "animalVerbs"],
    ["personSubjects", "personVerbs", "abstractNouns", "abstractVerbs"],
    ["abstractSubjects", "abstractVerbs", "thingManner", "prepositions", "thingNouns"],
  ];

public generateSentences(size: number): string {
    const targetSize = Math.floor(Number(size));
    if (isNaN(targetSize) || targetSize < 1) {
      throw new Error("Number of words must be a positive integer.");
    }

    let sentences: string[] = [];
    let totalWords = 0;
    
    let iterations = 0;
    const MAX_ITERATIONS = 1000; 

    while (totalWords < targetSize && iterations < MAX_ITERATIONS) {
      iterations++;

      const structure = this.sentenceStructures[Math.floor(Math.random() * this.sentenceStructures.length)];
      
      let sentence = this.buildSentence(structure).replace(/\s{2,}/g, " ").trim();
      
      if (!sentence) {
        sentence = "lorem"; 
      }

      let wordsArray = sentence.split(" ");
      const wordCount = wordsArray.length;

      if (wordCount + totalWords > targetSize) {
        const remainingNeeded = targetSize - totalWords;
        wordsArray = wordsArray.slice(0, remainingNeeded);
        sentence = wordsArray.join(" ");
      }

      if (wordsArray.length > 0) {
        sentences.push(sentence);
        totalWords += wordsArray.length;
      }
    }

    return sentences.join(" ").replace(/\s{2,}/g, " ").trim();
  }

  private buildSentence(structure: WordCategory[]): string {
    return structure
      .map((part) => {
        const wordList = this.words[part];
        return wordList ? this.getRandomWord(wordList) : "";
      })
      .join(" ");
  }

  private getRandomWord(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }
}

/**
 * Generates a string of pseudo-sensible lorem ipsum text.
 * @param size The total number of words to generate.
 */
export function sensiLorem(size: number): string {
  const generator = new SentenceGenerator();
  return generator.generateSentences(size);
}

export default sensiLorem;