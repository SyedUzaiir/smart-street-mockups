import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Map from "@/components/Map";
import { 
  Camera, 
  MapPin, 
  Home, 
  Plus, 
  FileText, 
  User,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

const CitizenApp = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    coordinates: [number, number];
    address: string;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleLocationSelect = (coordinates: [number, number], address: string) => {
    setSelectedLocation({ coordinates, address });
  };

  const userReports = [
    {
      id: "SR-2024-001",
      category: "Road Issues",
      location: "Main St & 5th Ave", 
      date: "Jan 15, 2024",
      status: "In Progress",
      statusColor: "bg-warning"
    },
    {
      id: "SR-2024-002",
      category: "Lighting",
      location: "Central Park North",
      date: "Jan 12, 2024", 
      status: "Resolved",
      statusColor: "bg-success"
    },
    {
      id: "SR-2024-003",
      category: "Sanitation",
      location: "Oak Street",
      date: "Jan 10, 2024",
      status: "Submitted",
      statusColor: "bg-accent"
    }
  ];

  const issueCategories = [
    { name: "Road Issues", icon: "🚗", color: "bg-red-100 text-red-800" },
    { name: "Lighting", icon: "💡", color: "bg-yellow-100 text-yellow-800" },
    { name: "Sanitation", icon: "🗑️", color: "bg-green-100 text-green-800" },
    { name: "Parks", icon: "🌳", color: "bg-emerald-100 text-emerald-800" },
    { name: "Traffic", icon: "🚦", color: "bg-blue-100 text-blue-800" },
    { name: "Other", icon: "📋", color: "bg-gray-100 text-gray-800" }
  ];

  return (
    <div className="bg-background">
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-elevated overflow-hidden" style={{minHeight: '800px'}}>
        {/* Mobile Header */}
        <div className="bg-gradient-header text-primary-foreground p-4 text-center">
          <h2 className="text-lg font-bold">SmartStreet Citizen</h2>
          <p className="text-sm opacity-90">Report Issues in Your Community</p>
        </div>

        {/* Screen Content - New Report */}
        <div className="p-4 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Report New Issue</h3>
            <p className="text-muted-foreground text-sm">Help improve your community</p>
          </div>

          {/* Photo Upload */}
          <Card className="p-4 shadow-card">
            <div className="bg-muted rounded-lg p-8 border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">Take a photo of the issue</p>
                <p className="text-sm text-muted-foreground">Tap to open camera</p>
              </div>
            </div>
          </Card>

          {/* Location Selection */}
          <div className="space-y-2">
            <label className="font-medium text-foreground">Select Location</label>
            <Map
              onLocationSelect={handleLocationSelect}
              height="200px"
              interactive={true}
            />
            {selectedLocation && (
              <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-foreground text-sm">{selectedLocation.address}</span>
              </div>
            )}
          </div>

          {/* Issue Category */}
          <div className="space-y-3">
            <label className="font-medium text-foreground">Issue Category</label>
            <div className="grid grid-cols-2 gap-3">
              {issueCategories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedCategory === category.name 
                      ? 'border-primary bg-primary/10' 
                      : `border-transparent hover:border-primary ${category.color}`
                  }`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="font-medium text-foreground">Description (Optional)</label>
            <Textarea 
              placeholder="Describe the issue in detail..."
              className="min-h-20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3 text-lg font-semibold">
            Submit Report
          </Button>

          {/* My Reports Section */}
          <div className="border-t pt-6 mt-8">
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              My Reports
            </h4>
            
            <div className="space-y-3">
              {userReports.map((report, index) => (
                <Card key={index} className="p-4 shadow-card hover:shadow-elevated transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{report.id}</span>
                        <Badge className={`${report.statusColor} text-white text-xs`}>
                          {report.status}
                        </Badge>
                      </div>
                      <h5 className="font-medium text-foreground">{report.category}</h5>
                      <p className="text-sm text-muted-foreground">{report.location}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {report.date}
                      </div>
                    </div>
                    <div className="ml-2">
                      {report.status === "Resolved" && (
                        <CheckCircle className="h-6 w-6 text-success" />
                      )}
                      {report.status === "In Progress" && (
                        <Clock className="h-6 w-6 text-warning" />
                      )}
                      {report.status === "Submitted" && (
                        <AlertTriangle className="h-6 w-6 text-accent" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t">
          <div className="flex justify-around py-3">
            <button className="flex flex-col items-center space-y-1 text-muted-foreground">
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-primary">
              <div className="bg-primary rounded-full p-2">
                <Plus className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium">Report</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-muted-foreground">
              <FileText className="h-6 w-6" />
              <span className="text-xs">My Reports</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-muted-foreground">
              <User className="h-6 w-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenApp;