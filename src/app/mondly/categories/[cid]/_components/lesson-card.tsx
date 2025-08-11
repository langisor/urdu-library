import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LessonCardProps {
  id: string | number;
  title: string;
  description: string;
  status: LessonStatus;
  progress: number;
  link: string;
  isVocabularyCard?: boolean;
}
type LessonStatus = "مكتمل" | "قيد التقدم" | "لم يبدأ" | "معطل";
/**
 * A responsive and modern card component for displaying a lesson.
 *
 * @param {object} props - The component props.
 * @param {string|number} props.id - The unique ID of the lesson.
 * @param {string} props.title - The title of the lesson.
 * @param {string} props.description - A short description of the lesson.
 * @param {string} props.status - The current status of the lesson (e.g., 'مكتمل', 'قيد التقدم').
 * @param {number} props.progress - The completion percentage of the lesson (0-100).
 * @param {string} props.link - The URL to navigate to when the card is clicked.
 * @param {boolean} [props.isVocabularyCard=false] - Flag to apply unique styling for the vocabulary card.
 */
export default function LessonCard({
  id,
  title,
  description,
  status,
  progress,
  link,
  isVocabularyCard = false,
}: LessonCardProps) {
  // Determine badge color based on status
  const getStatusVariant = (status: LessonStatus) => {
    switch (status) {
      case "مكتمل":
        return "success";
      case "قيد التقدم":
        return "secondary";
      case "معطل":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Custom styling for the success badge if needed
  const successBadgeStyle =
    status === "مكتمل" ? "bg-green-500 text-white hover:bg-green-600" : "";

  // Custom styling for the progress bar color
  const getProgressColorClass = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 50) return "bg-blue-500";
    return "bg-yellow-500";
  };

  return (
    <a href={link} className="w-full max-w-sm">
      <Card
        className={`h-full p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          isVocabularyCard ? "bg-teal-50 border-teal-500 border-2" : ""
        }`}
        dir="rtl"
      >
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <Badge
            className="absolute bottom-0 left-0 transform -translate-x-1/2 text-xs bg-blue-600 text-white"
            variant="secondary"
          >
            ID: {id}
          </Badge>
          <CardTitle className="text-2xl font-bold tracking-tight text-right">
            {title}
          </CardTitle>
          <Badge
            variant={"destructive"}
            className={`capitalize text-center text-xl rounded-full ${successBadgeStyle}`}
          >
            {status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-gray-500 leading-relaxed text-right">
            {description}
          </CardDescription>
          <div className="flex items-center justify-start space-x-2 space-x-reverse">
            <span className="text-sm font-medium text-gray-700">
              {progress}%
            </span>
            <Progress
              value={progress}
              className={`h-2 ${getProgressColorClass(progress)}`}
            />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
