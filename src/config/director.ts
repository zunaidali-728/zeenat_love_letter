export const directorConfig = {
  mode: "birthday-apology", // 'proposal', 'anniversary', 'birthday', 'birthday-apology'
  
  // Future extensibility for different narrative arcs
  narratives: {
    "birthday-apology": {
      act1Title: "Who is my favorite person?",
      act4Title: "I know I'm the biggest idiot...",
      act4Question: "Will you forgive your idiot husband and let me spend the rest of my life making it up to you?",
      act4Yes: "Yes! ❤️",
      act4No: "No 💔",
      act5Signature: "Md Zunaid Ali"
    },
    "proposal": {
      act1Title: "Who holds my heart?",
      act4Title: "I have one more question...",
      act4Question: "Will You Marry Me?",
      act4Yes: "YES ❤️",
      act4No: "NO 💔",
      act5Signature: "Forever Yours"
    }
  }
};
