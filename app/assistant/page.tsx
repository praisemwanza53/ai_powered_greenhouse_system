import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FarmerAssistant } from "@/components/farmer-assistant"

export default function AssistantPage() {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Farmer Assistant</h1>
        <p className="text-muted-foreground">Get expert farming advice and crop management assistance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-220px)] min-h-[500px]">
            <CardHeader>
              <CardTitle>Farming Assistant</CardTitle>
              <CardDescription>
                Ask questions about crop care, irrigation, pest management, or get recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FarmerAssistant />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
              <CardDescription>Try asking about:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-left" size="sm">
                How often should I water my vanilla orchids?
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" size="sm">
                What's the best fertilizer for saffron crocus?
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" size="sm">
                How do I treat powdery mildew on my plants?
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" size="sm">
                When is the best time to harvest saffron?
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" size="sm">
                How can I improve soil drainage in my greenhouse?
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Farming Insights</CardTitle>
              <CardDescription>AI-generated recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm">Irrigation Recommendation</h3>
                <p className="text-sm text-muted-foreground">
                  Based on soil moisture trends, consider reducing irrigation frequency in Zone 2 by 15% to prevent root
                  rot.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Pest Alert</h3>
                <p className="text-sm text-muted-foreground">
                  Current humidity and temperature in Zone 1 are ideal for spider mite development. Consider
                  preventative measures.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Harvest Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Saffron crocus in Zone 2 should be ready for harvest in approximately 7-10 days based on current
                  growth patterns.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
