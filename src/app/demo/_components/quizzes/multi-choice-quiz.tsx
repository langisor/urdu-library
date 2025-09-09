"use client";
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Volume2, Star } from "lucide-react"

interface QuizQuestion {
  id: string
  audioFile: string
  text: string
  correctAnswerId: string
  isAnswered: boolean
  options: string[]
}

interface MultiChoiceQuizProps {
  questions: QuizQuestion[]
}

export default function MultiChoiceQuiz({ questions }: MultiChoiceQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (optionIndex: number) => {
    if (showFeedback) return
    setSelectedAnswer(optionIndex.toString())
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const correct =
      (selectedAnswer === "0" && currentQuestion.correctAnswerId === currentQuestion.id) ||
      (selectedAnswer === "1" && currentQuestion.correctAnswerId === currentQuestion.id) ||
      (selectedAnswer === "2" && currentQuestion.correctAnswerId === currentQuestion.id)

    // For demo purposes, we'll assume the correct answer is always the first option that matches the question
    const correctAnswerIndex = currentQuestion.options.findIndex((option, index) => {
      if (currentQuestion.text.includes("بہن")) return option.includes("أختي")
      if (currentQuestion.text.includes("بھائی")) return option.includes("أخي")
      if (currentQuestion.text.includes("والدہ")) return option.includes("أمي")
      return false
    })

    const isAnswerCorrect = Number.parseInt(selectedAnswer) === correctAnswerIndex
    setIsCorrect(isAnswerCorrect)
    setShowFeedback(true)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }
  }

  const handleContinue = () => {
    if (isLastQuestion) {
      // Quiz completed
      alert(`Quiz completed! Score: ${score}/${questions.length}`)
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setIsCorrect(false)
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error)
    }
  }

  const getStarRating = () => {
    const totalStars = 3
    const filledStars = Math.min(Math.ceil((score / questions.length) * totalStars), totalStars)

    return Array.from({ length: totalStars }, (_, index) => (
      <Star
        key={index}
        className={`w-8 h-8 ${index < filledStars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <X className="w-6 h-6" />
        </Button>

        <div className="flex items-center gap-2">{getStarRating()}</div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Volume2 className="w-6 h-6" />
          </Button>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="relative z-10 px-6 mt-8">
        {/* Question Number */}
        <div className="text-right mb-4">
          <span className="text-lg font-medium">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Question Text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={playAudio}
              className="text-white hover:bg-white/20 flex-shrink-0"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
            <p className="text-xl font-medium text-right" dir="rtl">
              {currentQuestion.text}
            </p>
          </div>
        </div>

        {/* Audio element */}
        <audio ref={audioRef} preload="none">
          <source src={currentQuestion.audioFile} type="audio/mpeg" />
        </audio>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                selectedAnswer === index.toString()
                  ? showFeedback
                    ? isCorrect && selectedAnswer === index.toString()
                      ? "bg-green-500 text-white"
                      : !isCorrect && selectedAnswer === index.toString()
                        ? "bg-red-500 text-white"
                        : "bg-blue-400 text-white"
                    : "bg-blue-400 text-white"
                  : "bg-blue-400/80 text-white hover:bg-blue-400"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index.toString() ? "border-white bg-white" : "border-white"
                }`}
              >
                {selectedAnswer === index.toString() && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
              </div>
              <span className="text-lg text-right flex-1" dir="rtl">
                {option}
              </span>
            </button>
          ))}
        </div>

        {/* Feedback Messages */}
        {showFeedback && (
          <div className="mb-6">
            {isCorrect ? (
              <div className="bg-green-500 text-white p-4 rounded-lg flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-right flex-1" dir="rtl">
                  {"صحیح! بہترین"}
                </span>
              </div>
            ) : (
              <div className="bg-red-500 text-white p-4 rounded-lg flex items-center gap-3">
                <X className="w-6 h-6" />
                <span className="text-right flex-1" dir="rtl">
                  {"الأسف، غیر صحیح"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-semibold px-12 py-3 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"تأكيد"}
            </Button>
          ) : (
            <Button
              onClick={handleContinue}
              className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-semibold px-12 py-3 rounded-full text-lg"
            >
              {isLastQuestion ? "إنهاء" : "استمر"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
