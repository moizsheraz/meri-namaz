"use client";
import { useState, useEffect } from "react";
import { Bell, Book, Compass, Heart, MessageCircle, Moon, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PrayerTimes = {
  Fajr?: string;
  Dhuhr?: string;
  Asr?: string;
  Maghrib?: string;
  Isha?: string;
  [key: string]: string | undefined; // Index signature to allow dynamic keys
};

export default function Home() {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>({});
  const [prayerProgress, setPrayerProgress] = useState<number>(0);
  const [completedPrayers, setCompletedPrayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchPrayerTimes();
    setPrayerProgress(Math.floor(Math.random() * 100));
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Lahore&country=Pakistan&method=2");
      const data = await response.json();
      setPrayerTimes(data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    let formattedHours = parseInt(hours, 10);
    const period = formattedHours >= 12 ? "PM" : "AM";
    formattedHours = formattedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const markAsDone = (prayer: string) => {
    setCompletedPrayers((prev) => new Set(prev).add(prayer));
    console.log(`${prayer} marked as done`);
  };

  const upcomingPrayer = prayers.find((prayer) => {
    const prayerTime = prayerTimes[prayer];
    if (!prayerTime) return false;
    const now = new Date();
    const [hours, minutes] = prayerTime.split(":").map(Number);
    const prayerDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return prayerDateTime > now;
  });

  return (
    <div className="min-h-screen bg-purple-50 text-purple-900 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meri Namaz</h1>
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assalamu Alaikum, Moiz Sheraz</CardTitle>
          <CardDescription>
            {formatDate(currentTime)} | {formatTime(currentTime.toLocaleTimeString("en-US", { hour12: false }))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-2">
            Next Namaz: <span className="text-purple-600 font-bold">{upcomingPrayer || "All prayers completed"}</span>
          </p>
          <Progress value={prayerProgress} className="w-full" />
          <p className="text-sm mt-2">You&#39;ve completed {prayerProgress}% of today&#39;s prayers</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today&#39;s Prayers</TabsTrigger>
          <TabsTrigger value="qaza">Qaza</TabsTrigger>
          <TabsTrigger value="hadith">Today&#39;s Hadith</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Prayer Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {prayers.map((prayer, index) => {
                const prayerTime = prayerTimes[prayer];
                const isUpcoming = prayer === upcomingPrayer;
                const isPast = index < prayers.indexOf(upcomingPrayer || "");
                return (
                  <div key={prayer} className="flex justify-between items-center mb-2">
                    <span className={isUpcoming ? "text-purple-600 font-bold" : ""}>{prayer}</span>
                    <div className="flex items-center gap-2">
                      <span>{prayerTime ? formatTime(prayerTime) : "--:--"}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => markAsDone(prayer)}
                        disabled={completedPrayers.has(prayer) || !isPast}
                      >
                        <CheckCircle className="w-4 h-4" /> {completedPrayers.has(prayer) ? "Done" : "Mark Done"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}