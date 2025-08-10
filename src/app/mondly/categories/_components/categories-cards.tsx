"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, MessageCircle, GraduationCap, TestTube } from "lucide-react";
import Link from "next/link";
interface Category {
  id: number;
  name: string;
  countLesson: number;
  countDialogue: number;
  countVocabulary: number;
  countOxfordTest: number;
  countDone: number;
  disabled: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const progressVariants = {
  initial: { width: 0 },
  animate: (value: number) => ({
    width: `${value}%`,
    transition: { duration: 0.8, ease: "easeOut" },
  }),
};

export function CategoriesCards({ categories }: { categories: Category[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateProgress = (category: Category) => {
    const total =
      category.countLesson +
      category.countDialogue +
      category.countVocabulary +
      category.countOxfordTest;
    return (category.countDone / total) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background to-muted p-8 text-right"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-foreground"
        >
          الأقسام
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <Link href={`/categories/${category.id}`}>
                  <Card
                    className={`p-6 h-full ${
                      category.disabled ? "opacity-60" : ""
                    } hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/90`}
                  >
                    <div className="flex flex-col h-full">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-between items-start mb-4"
                      >
                        <h2 className="text-xl font-semibold text-foreground">
                          {category.name}
                        </h2>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {category.disabled ? (
                            <Badge variant="secondary">Locked</Badge>
                          ) : (
                            <Badge variant="default">Available</Badge>
                          )}
                        </motion.div>
                      </motion.div>

                      <div className="flex-grow">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {[
                            {
                              icon: Book,
                              count: category.countLesson,
                              label: "Lessons",
                            },
                            {
                              icon: MessageCircle,
                              count: category.countDialogue,
                              label: "Dialogue",
                            },
                            {
                              icon: GraduationCap,
                              count: category.countVocabulary,
                              label: "Vocab",
                            },
                            {
                              icon: TestTube,
                              count: category.countOxfordTest,
                              label: "Tests",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2"
                              variants={iconVariants}
                              initial="initial"
                              animate="animate"
                              whileHover={{ scale: 1.05 }}
                            >
                              <item.icon className="w-4 h-4 text-primary" />
                              <span className="text-sm">
                                {item.count} {item.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        className="mt-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {Math.round(calculateProgress(category))}%
                          </motion.span>
                        </div>
                        <Progress
                          value={calculateProgress(category)}
                          className="h-2 relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${calculateProgress(category)}%`,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </Progress>
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
