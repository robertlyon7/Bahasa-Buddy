interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizData {
  [key: string]: QuizQuestion[]
}

const quizData: QuizData = {
  greetings: [
    {
      id: "greet-1",
      question: "How do you say 'Hello' in Javanese?",
      options: ["Sugeng enjing", "Sugeng rawuh", "Matur nuwun"],
      correctAnswer: "Sugeng rawuh",
    },
    {
      id: "greet-2",
      question: "What does 'Sugeng enjing' mean?",
      options: ["Good night", "Good morning", "Good afternoon"],
      correctAnswer: "Good morning",
    },
    {
      id: "greet-3",
      question: "How do you say 'Thank you' in Javanese?",
      options: ["Nyuwun sewu", "Matur nuwun", "Sugeng tindak"],
      correctAnswer: "Matur nuwun",
    },
    {
      id: "greet-4",
      question: "What is the Javanese phrase for 'How are you?'",
      options: ["Panjenengan saking pundi?", "Sugeng tindak", "Pripun kabare?"],
      correctAnswer: "Pripun kabare?",
    },
    {
      id: "greet-5",
      question: "How do you say 'Goodbye' in Javanese?",
      options: ["Sugeng tindak", "Matur nuwun", "Sugeng rawuh"],
      correctAnswer: "Sugeng tindak",
    },
  ],
  numbers: [
    {
      id: "num-1",
      question: "What is the Javanese word for 'One'?",
      options: ["Loro", "Siji", "Telu"],
      correctAnswer: "Siji",
    },
    {
      id: "num-2",
      question: "How do you say 'Two' in Javanese?",
      options: ["Siji", "Loro", "Papat"],
      correctAnswer: "Loro",
    },
    {
      id: "num-3",
      question: "What is the Javanese word for 'Five'?",
      options: ["Lima", "Papat", "Enem"],
      correctAnswer: "Lima",
    },
    {
      id: "num-4",
      question: "How do you count to three in Javanese?",
      options: ["Siji, loro, telu", "Siji, telu, papat", "Loro, telu, papat"],
      correctAnswer: "Siji, loro, telu",
    },
    {
      id: "num-5",
      question: "What is the Javanese word for 'Ten'?",
      options: ["Sanga", "Wolu", "Sepuluh"],
      correctAnswer: "Sepuluh",
    },
  ],
  "basic-sentences": [
    {
      id: "sent-1",
      question: "How do you say 'My name is...' in Javanese?",
      options: ["Jenengku...", "Aku saka...", "Umurku..."],
      correctAnswer: "Jenengku...",
    },
    {
      id: "sent-2",
      question: "What does 'Aku seneng ketemu kowe' mean?",
      options: ["I am from here", "I am happy to meet you", "I don't understand"],
      correctAnswer: "I am happy to meet you",
    },
    {
      id: "sent-3",
      question: "How do you ask 'Where are you from?' in Javanese?",
      options: ["Kowe arep menyang ngendi?", "Kowe saka ngendi?", "Kowe wis mangan?"],
      correctAnswer: "Kowe saka ngendi?",
    },
    {
      id: "sent-4",
      question: "What is the correct way to say 'I don't understand' in Javanese?",
      options: ["Aku ora ngerti", "Aku ora isa", "Aku wis ngerti"],
      correctAnswer: "Aku ora ngerti",
    },
    {
      id: "sent-5",
      question: "How do you say 'I am learning Javanese' in Javanese?",
      options: ["Aku sinau basa Jawa", "Aku ora isa basa Jawa", "Aku seneng basa Jawa"],
      correctAnswer: "Aku sinau basa Jawa",
    },
  ],
  "family-members": [
    {
      id: "fam-1",
      question: "What is the Javanese word for 'Father'?",
      options: ["Ibu", "Bapak", "Adik"],
      correctAnswer: "Bapak",
    },
    {
      id: "fam-2",
      question: "How do you say 'Mother' in Javanese?",
      options: ["Ibu", "Mbak", "Simbah"],
      correctAnswer: "Ibu",
    },
    {
      id: "fam-3",
      question: "What is the Javanese word for 'Older sibling'?",
      options: ["Adik", "Kakang/Mbakyu", "Anak"],
      correctAnswer: "Kakang/Mbakyu",
    },
    {
      id: "fam-4",
      question: "How do you say 'Younger sibling' in Javanese?",
      options: ["Adik", "Mbak", "Pakdhe"],
      correctAnswer: "Adik",
    },
    {
      id: "fam-5",
      question: "What is the Javanese word for 'Grandparent'?",
      options: ["Paklik", "Bulik", "Simbah"],
      correctAnswer: "Simbah",
    },
  ],
  "food-and-drinks": [
    {
      id: "food-1",
      question: "What is 'Sega' in Javanese?",
      options: ["Water", "Rice", "Vegetable"],
      correctAnswer: "Rice",
    },
    {
      id: "food-2",
      question: "How do you say 'Water' in Javanese?",
      options: ["Banyu", "Wedang", "Jangan"],
      correctAnswer: "Banyu",
    },
    {
      id: "food-3",
      question: "What is the Javanese word for 'Vegetable'?",
      options: ["Iwak", "Jangan", "Panganan"],
      correctAnswer: "Jangan",
    },
    {
      id: "food-4",
      question: "How do you say 'I am hungry' in Javanese?",
      options: ["Aku ngelak", "Aku kesel", "Aku ngelih"],
      correctAnswer: "Aku ngelih",
    },
    {
      id: "food-5",
      question: "What is the Javanese word for 'Delicious'?",
      options: ["Enak", "Asin", "Legi"],
      correctAnswer: "Enak",
    },
  ],
  "daily-activities": [
    {
      id: "act-1",
      question: "How do you say 'I am sleeping' in Javanese?",
      options: ["Aku turu", "Aku mangan", "Aku mlaku"],
      correctAnswer: "Aku turu",
    },
    {
      id: "act-2",
      question: "What is the Javanese word for 'To eat'?",
      options: ["Turu", "Mangan", "Mlaku"],
      correctAnswer: "Mangan",
    },
    {
      id: "act-3",
      question: "How do you say 'I am going to school' in Javanese?",
      options: ["Aku lunga menyang sekolah", "Aku mulih saka sekolah", "Aku sinau ing sekolah"],
      correctAnswer: "Aku lunga menyang sekolah",
    },
    {
      id: "act-4",
      question: "What does 'Aku lagi adus' mean?",
      options: ["I am cooking", "I am bathing", "I am reading"],
      correctAnswer: "I am bathing",
    },
    {
      id: "act-5",
      question: "How do you say 'I am working' in Javanese?",
      options: ["Aku nyambut gawe", "Aku dolan", "Aku turu"],
      correctAnswer: "Aku nyambut gawe",
    },
  ],
}

export function getQuizData(lessonId: string): QuizQuestion[] | null {
  return quizData[lessonId] || null
}
