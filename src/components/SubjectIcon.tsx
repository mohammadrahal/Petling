import { Abacus, Book, Heart, Speech, Star, Waveform } from "@/components/Icons";
import type { SubjectKey } from "@/lib/companions";

const BY_SUBJECT: Record<SubjectKey, typeof Book> = {
  stories: Book,
  numbers: Abacus,
  letters: Speech,
  rhymes: Star,
  music: Waveform,
  calm: Heart,
};

export default function SubjectIcon({
  subject,
  className = "size-4",
}: {
  subject: SubjectKey;
  className?: string;
}) {
  const Icon = BY_SUBJECT[subject];
  return <Icon className={className} />;
}
