"use client";

import {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { EmotionWheel } from "../predict/emotion-wheel";

const PredictPage = () => {
  const [sentence, setSentence] = useState("");
  interface Result {
    probabilities: Record<string, number>;
    filtered_emotions: Record<string, number>;
  }

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = sentence.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card className="bg-[#242424] border-none shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                className="w-full p-4 bg-[#2a2a2a] border-none text-white placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[200px] text-lg"
                placeholder="Enter your text here..."
              />
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
                
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#242424] border-none shadow-lg">
          <CardContent className="p-6">
            {result ? (
              <div className="space-y-6">
                <EmotionWheel emotions={result.probabilities} />
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Total number of words: {wordCount}</span>
                    <span>
                      Overall emotion:{" "}
                      <span className="text-orange-400">
                        {Object.entries(result.filtered_emotions).sort(
                          ([, a], [, b]) => (b as number) - (a as number)
                        )[0]?.[0] || "N/A"}
                      </span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Selected sentence dominant emotion:{" "}
                    <span className="text-orange-400">
                      {Object.entries(result.filtered_emotions).sort(
                        ([, a], [, b]) => (b as number) - (a as number)
                      )[0]?.[0] || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-400">
                Enter text and click Analyze to see emotions
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictPage;

