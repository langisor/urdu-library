import {
  ReadingIcon,
  WritingIcon,
  GrammarIcon,
  ListeningIcon,
  SpeakingIcon,
  InterpersonalIcon,
} from "./icons";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

interface Activity {
  name: string;
  description: string;
  icon: React.FC<IconProps>;
  color: string;
}

export function Activities() {
  const activities: Activity[] = [
    {
      name: "Reading",
      description: "Comprehension and analysis of written texts",
      icon: ReadingIcon,
      color: "#4A90E2",
    },
    {
      name: "Writing",
      description: "Creating and composing written content",
      icon: WritingIcon,
      color: "#F39C12",
    },
    {
      name: "Grammar",
      description: "Understanding language structure and rules",
      icon: GrammarIcon,
      color: "#2E86AB",
    },
    {
      name: "Listening",
      description: "Audio comprehension and processing",
      icon: ListeningIcon,
      color: "#8E44AD",
    },
    {
      name: "Speaking",
      description: "Oral communication and expression",
      icon: SpeakingIcon,
      color: "#3498DB",
    },
    {
      name: "Interpersonal",
      description: "Social interaction and communication",
      icon: InterpersonalIcon,
      color: "#27AE60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Educational Activity Icons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive set of icons for language learning and educational
            activities, designed for modern React applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.name}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="p-4 rounded-full shadow-md"
                    style={{ backgroundColor: `${activity.color}15` }}
                  >
                    <IconComponent size={48} color={activity.color} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {activity.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Icon Size Examples */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Different Icon Sizes
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <ReadingIcon size={16} />
              <p className="text-sm text-gray-600 mt-2">16px</p>
            </div>
            <div className="text-center">
              <WritingIcon size={24} />
              <p className="text-sm text-gray-600 mt-2">24px</p>
            </div>
            <div className="text-center">
              <GrammarIcon size={32} />
              <p className="text-sm text-gray-600 mt-2">32px</p>
            </div>
            <div className="text-center">
              <ListeningIcon size={48} />
              <p className="text-sm text-gray-600 mt-2">48px</p>
            </div>
            <div className="text-center">
              <SpeakingIcon size={64} />
              <p className="text-sm text-gray-600 mt-2">64px</p>
            </div>
            <div className="text-center">
              <InterpersonalIcon size={80} />
              <p className="text-sm text-gray-600 mt-2">80px</p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Usage Examples
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Import Icons:
              </h3>
              <code className="text-sm bg-gray-800 text-green-400 p-3 rounded block">
                {`import { ReadingIcon, WritingIcon } from './components/Icons';`}
              </code>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Use with custom props:
              </h3>
              <code className="text-sm bg-gray-800 text-green-400 p-3 rounded block">
                {`<ReadingIcon size={32} color="#FF6B6B" className="hover:scale-110" />`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
