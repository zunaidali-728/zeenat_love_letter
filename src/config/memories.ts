export interface Memory {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  date: string;
  place: string;
  quote: string;
  shayari: string;
}

export const memories: Memory[] = [
  {
    id: "m1",
    image: "/images/couple/1.jpg",
    title: "The Beginning",
    subtitle: "When everything changed",
    date: "14th February",
    place: "Our favorite place",
    quote: "You didn't just walk into my life; you became my life.",
    shayari: "Teri muskurahat se shuru hoti hai har subah meri, tu hi meri pehli aur aakhiri khwahish hai.",
  },
  {
    id: "m2",
    image: "/images/couple/2.jpg",
    title: "Endless Laughter",
    subtitle: "The way you smile",
    date: "Summer Days",
    place: "By the sunset",
    quote: "A day without your smile is a day wasted.",
    shayari: "Meri khushiyon ki wajah ho tum, mere har dard ki dawa ho tum.",
  },
  {
    id: "m3",
    image: "/images/couple/3.jpg",
    title: "Holding Hands",
    subtitle: "Through thick and thin",
    date: "A quiet evening",
    place: "Walking together",
    quote: "I found my home in your arms.",
    shayari: "Haath thaam kar chalna, bas yahi ek guzaarish hai waqt se.",
  },
  {
    id: "m4",
    image: "/images/couple/4.jpg",
    title: "The Simple Moments",
    subtitle: "Just you and me",
    date: "Late night talks",
    place: "On the terrace",
    quote: "With you, doing nothing means everything.",
    shayari: "Tere saath beeta har lamha, sadiyon sa lagta hai aur phir bhi kam lagta hai.",
  },
  {
    id: "m5",
    image: "/images/couple/5.jpg",
    title: "Forever",
    subtitle: "And always",
    date: "Today & Tomorrow",
    place: "In my heart",
    quote: "I love you more than words can say, and more than actions can show.",
    shayari: "Tum bas saath rehna, baaki duniya ki koi zarurat nahi mujhe.",
  }
];
