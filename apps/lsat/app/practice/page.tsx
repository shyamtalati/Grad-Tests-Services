import data from '@/data/practice_questions.json';
import PracticeClient from './PracticeClient';

export default function PracticePage() {
  return <PracticeClient tests={data.tests as never} />;
}
