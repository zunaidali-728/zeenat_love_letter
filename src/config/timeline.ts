export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "t1",
    date: "The First Hello",
    title: "Where it all began",
    description: "That one simple conversation that changed my entire world forever."
  },
  {
    id: "t2",
    date: "The Realization",
    title: "Falling for you",
    description: "The moment I looked at you and knew, there was no turning back."
  },
  {
    id: "t3",
    date: "Countless Memories",
    title: "Building our world",
    description: "Through the laughs, the tears, and every silent moment we shared."
  },
  {
    id: "t4",
    date: "Today",
    title: "Still falling for you",
    description: "Every single day, I find a new reason to love you even more."
  }
];
