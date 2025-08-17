"use client";

import React, { useState, CSSProperties } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postPositionData, adjectivesData } from "./data";

interface PostpositionItem {
  desc: string;
  example: string;
  latin: string;
}

interface AdjectiveItem {
  pos: string;
  comp: string;
  sup: string;
}
type TTab = "introduction" | "nouns" | "verbs" | "modifiers" | "connectors";
export default function Grammar() {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<TTab>("introduction");

  // State for the Postpositions section
  const [postpositionData, setPostpositionData] =
    useState<Record<string, PostpositionItem>>(postPositionData);
  const [selectedPostposition, setSelectedPostposition] = useState<
    string | null
  >(null);

  // State for the Adjectives section
  const [adjectives, setAdjectives] =
    useState<Record<string, AdjectiveItem>>(adjectivesData);
  const [selectedAdjective, setSelectedAdjective] = useState<string>(
    "اچھا"
  );

  // Function to handle tab changes
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName as TTab);
    setSelectedPostposition(null); // Reset selection when changing tabs
  };

  // Handler for postposition button clicks
  const handlePostpositionClick = (key: string) => {
    setSelectedPostposition(key);
  };

  // Handler for adjective select changes
  const handleAdjectiveChange = (value: string) => {
    setSelectedAdjective(value);
  };

  // CSS styles defined as a CSSProperties object
  const urduFont: CSSProperties = {
    fontFamily: "'Noto Naskh Arabic', serif",
    fontSize: "1.25rem",
    lineHeight: 1.8,
    direction: "rtl",
  };

  const card: CSSProperties = {
    backgroundColor: "#FFFFFF",
    borderRadius: "0.75rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  };

  const postpositionBtnActive: CSSProperties = {
    backgroundColor: "#D97706",
    color: "white",
    transform: "scale(1.05)",
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-700 mb-2">
            Parts of Speech (
            <span style={urduFont} lang="ur">
              اجزاء کلام
            </span>
            )
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            An Interactive Guide to Urdu Grammar
          </p>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="flex justify-center flex-wrap mb-8">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="nouns">Nouns</TabsTrigger>
            <TabsTrigger value="verbs">Verbs</TabsTrigger>
            <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
            <TabsTrigger value="connectors">Connectors</TabsTrigger>
          </TabsList>

          {/* Introduction Section */}
          <TabsContent value="introduction">
            <div id="introduction-content">
              <div className="p-6 md:p-8" style={card}>
                <h2 className="text-3xl font-bold text-amber-800 mb-4">
                  Introduction: Words Are the Workers That Build Sentences!
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This interactive guide presents the different types of
                  "workers" (parts of speech) in the Urdu language and their
                  functions. Understanding these roles is the first step to
                  mastering the construction of correct and expressive
                  sentences. Through the following sections, you will explore
                  nouns that name our world, verbs that describe action and
                  state, adjectives that add color and detail, and other
                  grammatical tools that tie everything together.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Nouns and Pronouns Section */}
          <TabsContent value="nouns">
            <div id="nouns-content">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800">
                  Nouns (
                  <span style={urduFont} lang="ur">
                    اسم
                  </span>
                  ) and Pronouns (
                  <span style={urduFont} lang="ur">
                    ضمیر
                  </span>
                  )
                </h2>
                <p className="mt-2 text-gray-600">
                  Nouns name people, places, and things, while pronouns replace
                  them to avoid repetition.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6" style={card}>
                  <h3 className="font-bold text-xl mb-3 text-amber-700">
                    Types of Nouns
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <strong>
                        Common Noun (
                        <span style={urduFont} lang="ur">
                          اسم عام
                        </span>
                        ):
                      </strong>{" "}
                      General names like{" "}
                      <span style={urduFont} lang="ur">
                        شہر
                      </span>{" "}
                      (city),{" "}
                      <span style={urduFont} lang="ur">
                        درخت
                      </span>{" "}
                      (tree).
                    </li>
                    <li>
                      <strong>
                        Proper Noun (
                        <span style={urduFont} lang="ur">
                          اسم خاص
                        </span>
                        ):
                      </strong>{" "}
                      Specific names like{" "}
                      <span style={urduFont} lang="ur">
                        علی
                      </span>{" "}
                      (Ali),{" "}
                      <span style={urduFont} lang="ur">
                        پاکستان
                      </span>{" "}
                      (Pakistan).
                    </li>
                  </ul>
                </div>
                <div className="p-6" style={card}>
                  <h3 className="font-bold text-xl mb-3 text-amber-700">
                    Gender in Nouns
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <strong>
                        Masculine (
                        <span style={urduFont} lang="ur">
                          مذکر
                        </span>
                        ):
                      </strong>{" "}
                      E.g.,{" "}
                      <span style={urduFont} lang="ur">
                        کمرہ
                      </span>{" "}
                      (room),{" "}
                      <span style={urduFont} lang="ur">
                        دروازہ
                      </span>{" "}
                      (door).
                    </li>
                    <li>
                      <strong>
                        Feminine (
                        <span style={urduFont} lang="ur">
                          مونث
                        </span>
                        ):
                      </strong>{" "}
                      Often ends in "-i" or "-at", e.g.,{" "}
                      <span style={urduFont} lang="ur">
                        کرسی
                      </span>{" "}
                      (chair),{" "}
                      <span style={urduFont} lang="ur">
                        حقیقت
                      </span>{" "}
                      (reality).
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 mt-8" style={card}>
                <h3 className="font-bold text-xl mb-3 text-center text-amber-700">
                  Essential Pronouns
                </h3>
                <p className="text-center mb-6">
                  Pronouns replace nouns. Explore the different types and their
                  forms.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-amber-50">
                      <tr>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 font-semibold">Personal</td>
                        <td className="p-4" style={urduFont} lang="ur">
                          میں, تم, آپ, وہ, ہم
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-semibold">Possessive</td>
                        <td className="p-4" style={urduFont} lang="ur">
                          میرا, تمہارا, اس کا, ان کا
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-semibold">Demonstrative</td>
                        <td className="p-4" style={urduFont} lang="ur">
                          یہ, وہ
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">Interrogative</td>
                        <td className="p-4" style={urduFont} lang="ur">
                          کون, کیا
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Verbs Section */}
          <TabsContent value="verbs">
            <div id="verbs-content">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800">
                  Verbs (
                  <span style={urduFont} lang="ur">
                    فعل
                  </span>
                  ) and Participles
                </h2>
                <p className="mt-2 text-gray-600">
                  Verbs are words of action and state. Explore how they work in
                  Urdu.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6" style={card}>
                  <h3 className="font-bold text-xl mb-3 text-amber-700">
                    Transitive and Intransitive Verbs
                  </h3>
                  <p className="mb-2">
                    <strong>
                      Transitive (
                      <span style={urduFont} lang="ur">
                        متعدی
                      </span>
                      ):
                    </strong>{" "}
                    Requires a direct object.
                  </p>
                  <p
                    className="bg-gray-100 p-2 rounded"
                    style={urduFont}
                    lang="ur"
                  >
                    علی نے **کتاب** پڑھی۔ (Ali read the **book**)
                  </p>
                  <p className="mt-4 mb-2">
                    <strong>
                      Intransitive (
                      <span style={urduFont} lang="ur">
                        لازم
                      </span>
                      ):
                    </strong>{" "}
                    Does not require an object.
                  </p>
                  <p
                    className="bg-gray-100 p-2 rounded"
                    style={urduFont}
                    lang="ur"
                  >
                    علی سو گیا۔ (Ali slept)
                  </p>
                </div>
                <div className="p-6" style={card}>
                  <h3 className="font-bold text-xl mb-3 text-amber-700">
                    Participles
                  </h3>
                  <p className="mb-2">
                    <strong>
                      Agentive Participle (
                      <span style={urduFont} lang="ur">
                        اسم فاعل
                      </span>
                      ):
                    </strong>{" "}
                    Describes the one who performs the action.
                  </p>
                  <p
                    className="bg-gray-100 p-2 rounded"
                    style={urduFont}
                    lang="ur"
                  >
                    پڑھنے والا لڑکا (The reading boy)
                  </p>
                  <p className="mt-4 mb-2">
                    <strong>
                      Patientive Participle (
                      <span style={urduFont} lang="ur">
                        اسم مفعول
                      </span>
                      ):
                    </strong>{" "}
                    Describes what receives the action.
                  </p>
                  <p
                    className="bg-gray-100 p-2 rounded"
                    style={urduFont}
                    lang="ur"
                  >
                    پڑھی ہوئی کتاب (The read book)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Modifiers Section */}
          <TabsContent value="modifiers">
            <div id="modifiers-content">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800">
                  Adjectives (
                  <span style={urduFont} lang="ur">
                    صفت
                  </span>
                  ) and Adverbs (
                  <span style={urduFont} lang="ur">
                    متعلق فعل
                  </span>
                  )
                </h2>
                <p className="mt-2 text-gray-600">
                  These words add detail and depth to your sentences by
                  describing nouns and verbs.
                </p>
              </div>
              <div className="p-6" style={card}>
                <h3 className="font-bold text-xl mb-4 text-center text-amber-700">
                  Interactive Adjective Comparison Tool
                </h3>
                <p className="text-center mb-6">
                  Choose an adjective and see how it changes for comparative and
                  superlative forms.
                </p>
                <div className="flex justify-center items-center gap-4 mb-6">
                  <label htmlFor="adjective-select" className="font-medium">
                    Choose an adjective:
                  </label>
                  <Select
                    value={selectedAdjective as string}
                    onValueChange={handleAdjectiveChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an adjective" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(adjectives).map((key) => (
                        <SelectItem key={key} value={key}>
                          {key} (
                          {adjectives[key].pos.includes("اچھا")
                            ? "Good"
                            : adjectives[key].pos.includes("بڑا")
                            ? "Big"
                            : "Beautiful"}
                          )
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div
                  id="adjective-examples"
                  className="grid sm:grid-cols-3 gap-4 text-center"
                >
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold">Positive</h4>
                    <p className="text-lg mt-2" style={urduFont} lang="ur">
                      {adjectives[selectedAdjective].pos}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold">Comparative</h4>
                    <p className="text-lg mt-2" style={urduFont} lang="ur">
                      {adjectives[selectedAdjective].comp}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold">Superlative</h4>
                    <p className="text-lg mt-2" style={urduFont} lang="ur">
                      {adjectives[selectedAdjective].sup}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 mt-8" style={card}>
                <h3 className="font-bold text-xl mb-3 text-center text-amber-700">
                  Types of Adverbs
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <h4 className="font-semibold">
                      Manner (
                      <span style={urduFont} lang="ur">
                        کیفیت
                      </span>
                      )
                    </h4>
                    <p style={urduFont} lang="ur">
                      تیزی سے (Quickly)
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold">
                      Time (
                      <span style={urduFont} lang="ur">
                        وقت
                      </span>
                      )
                    </h4>
                    <p style={urduFont} lang="ur">
                      آج (Today)
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold">
                      Place (
                      <span style={urduFont} lang="ur">
                        مقام
                      </span>
                      )
                    </h4>
                    <p style={urduFont} lang="ur">
                      یہاں (Here)
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold">
                      Degree (
                      <span style={urduFont} lang="ur">
                        مقدار
                      </span>
                      )
                    </h4>
                    <p style={urduFont} lang="ur">
                      بہت (Very)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Connectors Section */}
          <TabsContent value="connectors">
            <div id="connectors-content">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800">
                  Connectors (
                  <span style={urduFont} lang="ur">
                    حروف
                  </span>
                  )
                </h2>
                <p className="mt-2 text-gray-600">
                  These small words are essential for linking ideas and showing
                  the relationships between sentence parts.
                </p>
              </div>
              <div className="p-6" style={card}>
                <h3 className="font-bold text-xl mb-4 text-center text-amber-700">
                  Interactive Postpositions Tool
                </h3>
                <p className="text-center mb-6">
                  Urdu relies heavily on postpositions. Click a postposition
                  below to see its definition and an example sentence.
                </p>
                <div
                  id="postpositions-container"
                  className="flex flex-wrap justify-center gap-3 mb-6"
                >
                  {Object.keys(postpositionData).map((key) => (
                    <button
                      key={key}
                      onClick={() => handlePostpositionClick(key)}
                      className={`postposition-btn urdu-font bg-amber-100 text-amber-800 font-semibold py-2 px-4 rounded-full`}
                      style={
                        selectedPostposition === key
                          ? postpositionBtnActive
                          : {}
                      }
                    >
                      {key}
                    </button>
                  ))}
                </div>
                {selectedPostposition && (
                  <div
                    id="postposition-example-card"
                    className="p-6 bg-amber-50 rounded-lg text-center"
                  >
                    <h4
                      id="postposition-title"
                      className="font-bold text-2xl urdu-font text-amber-800 mb-2"
                      lang="ur"
                    >
                      {selectedPostposition}
                    </h4>
                    <p id="postposition-description" className="mb-4">
                      {postpositionData[selectedPostposition].desc}
                    </p>
                    <p
                      id="postposition-example-urdu"
                      className="urdu-font text-xl mb-2"
                      lang="ur"
                    >
                      {postpositionData[selectedPostposition].example}
                    </p>
                    <p
                      id="postposition-example-latin"
                      className="italic text-gray-600"
                    >
                      {postpositionData[selectedPostposition].latin}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
