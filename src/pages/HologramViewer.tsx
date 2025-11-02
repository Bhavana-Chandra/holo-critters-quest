import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import animalsData from "@/data/animals.json";

type HabitatType = "Forest" | "Ocean" | "Desert" | "Arctic";

const HologramViewer = () => {
  const navigate = useNavigate();
  const { habitat, animalId } = useParams<{ habitat: HabitatType; animalId: string }>();

  const animals = habitat ? animalsData[habitat] : [];
  const animal = animals.find(a => a.id === animalId);

  if (!animal || !habitat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Animal not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/animal/${habitat}/${animalId}`)}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {animal.name}
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{animal.name} Hologram</h1>
            <p className="text-white/70">Place your pyramid on the screen for 3D effect</p>
          </div>

          {/* Hologram Display - 4-Panel Pyramid View */}
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {/* Top */}
              <div className="col-span-2 bg-gradient-to-b from-white/5 to-transparent flex items-end justify-center pb-4">
                <div className="text-6xl transform rotate-180">
                  {getAnimalEmoji(animal.name)}
                </div>
              </div>
              
              {/* Left */}
              <div className="bg-gradient-to-r from-white/5 to-transparent flex items-center justify-end pr-4">
                <div className="text-6xl transform -rotate-90">
                  {getAnimalEmoji(animal.name)}
                </div>
              </div>
              
              {/* Right */}
              <div className="bg-gradient-to-l from-white/5 to-transparent flex items-center justify-start pl-4">
                <div className="text-6xl transform rotate-90">
                  {getAnimalEmoji(animal.name)}
                </div>
              </div>
              
              {/* Bottom */}
              <div className="col-span-2 bg-gradient-to-t from-white/5 to-transparent flex items-start justify-center pt-4">
                <div className="text-6xl">
                  {getAnimalEmoji(animal.name)}
                </div>
              </div>
            </div>

            {/* Center info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <p className="text-sm font-medium">Place pyramid here</p>
              </div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Hologram Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-xs">
                  1
                </div>
                <p>Position your transparent pyramid (Pepper's Ghost pyramid) at the center of the screen where indicated.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-xs">
                  2
                </div>
                <p>The four orientations of the animal will reflect off the pyramid's sides to create a 3D holographic effect.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-xs">
                  3
                </div>
                <p>View from above the pyramid to see the animal appear to float in 3D space!</p>
              </div>
              <div className="mt-4 p-3 bg-primary/20 rounded-lg border border-primary/30">
                <p className="text-xs">
                  💡 <strong>Tip:</strong> Dim your room lights and increase screen brightness for the best holographic effect.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              className="flex-1"
              variant="secondary"
              onClick={() => navigate(`/animal/${habitat}/${animalId}`)}
            >
              Learn More About {animal.name}
            </Button>
            <Button 
              className="flex-1 bg-gradient-hero"
              onClick={() => navigate(`/quiz/${habitat}`)}
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get animal emoji for visualization
const getAnimalEmoji = (name: string): string => {
  const emojiMap: Record<string, string> = {
    "Bengal Tiger": "🐅",
    "Asian Elephant": "🐘",
    "Red Panda": "🐼",
    "Bottlenose Dolphin": "🐬",
    "Green Sea Turtle": "🐢",
    "Great White Shark": "🦈",
    "Dromedary Camel": "🐪",
    "Fennec Fox": "🦊",
    "Meerkat": "🦦",
    "Polar Bear": "🐻‍❄️",
    "Arctic Fox": "🦊",
    "Emperor Penguin": "🐧"
  };
  return emojiMap[name] || "🦁";
};

export default HologramViewer;
