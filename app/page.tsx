   "use client"
import { useState, useEffect } from 'react'
import { Bell, Book, Compass, Heart, MessageCircle, Moon, Sun } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
const [currentTime, setCurrentTime] = useState(new Date())
  const [prayerProgress, setPrayerProgress] = useState(0)
useEffect(() => {
  const timer = setInterval(() => setCurrentTime(new Date()), 1000)
  return () => clearInterval(timer)
}, [])
useEffect(() => {
  // Simulating prayer progress
  setPrayerProgress(Math.floor(Math.random() * 100))
}, [])

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
  return (
   <>
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
          <CardDescription>{formatDate(currentTime)} | {formatTime(currentTime)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-2">Next Namaz: Maghrib in 1 hour 15 minutes</p>
          <Progress value={prayerProgress} className="w-full" />
          <p className="text-sm mt-2">You've completed {prayerProgress}% of today's prayers</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today's Prayers</TabsTrigger>
          <TabsTrigger value="qaza">Qaza</TabsTrigger>
          <TabsTrigger value="hadith">Today's Hadith</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Prayer Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {prayers.map((prayer, index) => (
                <div key={prayer} className="flex justify-between items-center mb-2">
                  <span>{prayer}</span>
                  <span className={index === 0 ? "text-green-600" : index === 1 ? "text-purple-600 font-bold" : ""}>
                    {index === 0 ? "Done" : index === 1 ? "Next" : "Pending"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="qaza">
          <Card>
            <CardHeader>
              <CardTitle>Missed Prayers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have 2 missed prayers this week.</p>
              <Button className="mt-4">Log Qaza Prayer</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hadith">
          <Card>
            <CardHeader>
              <CardTitle>Hadith of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p>"The best of you are those who are best to their families, and I am the best to my family."</p>
              <p className="text-sm mt-2">- Sunan al-Tirmidhī 3895</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Prayer Consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs mb-1">{day}</div>
                <div 
                  className={`w-8 h-8 rounded-full mx-auto ${
                    index < 5 ? 'bg-purple-600' : 'bg-purple-200'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qibla Direction</CardTitle>
            <Compass className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">278°</div>
            <p className="text-xs text-purple-600">Tap to open compass</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasbeeh Counter</CardTitle>
            <Moon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <p className="text-xs text-purple-600">Tap to increment</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Dua of the Day</CardTitle>
          <Book className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <p className="text-sm">اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى</p>
          <p className="text-xs mt-2">
            "O Allah, I ask You for guidance, piety, chastity and self-sufficiency"
          </p>
        </CardContent>
      </Card>

      <div className="fixed bottom-4 right-4">
        <Button size="icon" className="rounded-full bg-purple-600 text-white">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
   </>
  );
}
