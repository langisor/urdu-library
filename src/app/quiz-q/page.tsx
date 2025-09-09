import MultiChoiceQuiz from "./_components/multi-choice-quiz";

const quizData = [
  {
    id: "5HMuoTqOKhP3R5QGHUi-7FymFZENB_t3",
    audioFile: "/media/mondly/audios/5HMuoTqOKhP3R5QGHUi-7FymFZENB_t3",
    text: "یہ میری بہن ہے۔",
    correctAnswerId: "5HMuoTqOKhP3R5QGHUi-7FymFZENB_t3",
    isAnswered: false,
    options: ["هذه أختي.", "هذا أخي.", "هذه أمي."],
  },
  {
    id: "8cxxZ8_5G6x2V5Eclfx9wuffVh-gtMvW",
    audioFile: "/media/mondly/audios/8cxxZ8_5G6x2V5Eclfx9wuffVh-gtMvW",
    text: "یہ میرا بھائی ہے۔",
    correctAnswerId: "8cxxZ8_5G6x2V5Eclfx9wuffVh-gtMvW",
    isAnswered: false,
    options: ["هذه أختي.", "هذا أخي.", "هذه أمي."],
  },
  {
    id: "rr4F-RQSFvcednSiF4LvBDvAHY52xr50",
    audioFile: "/media/mondly/audios/rr4F-RQSFvcednSiF4LvBDvAHY52xr50",
    text: "یہ میری والدہ ہیں۔",
    correctAnswerId: "rr4F-RQSFvcednSiF4LvBDvAHY52xr50",
    isAnswered: false,
    options: ["هذه أختي.", "هذا أخي.", "هذه أمي."],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <MultiChoiceQuiz questions={quizData} />
    </div>
  );
}
