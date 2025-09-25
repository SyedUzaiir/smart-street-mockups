import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Map from "@/components/Map";
import { 
  MapPin, 
  Camera, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Navigation,
  FileText,
  Upload
} from "lucide-react";

const FieldWorkerApp = () => {
  const assignedTasks = [
    {
      id: "SR-2024-001",
      category: "Road Issues",
      location: "Main St & 5th Ave",
      coordinates: [-74.006, 40.7128] as [number, number],
      priority: "High",
      priorityColor: "bg-destructive",
      description: "Large pothole causing traffic issues",
      distance: "0.5 miles"
    },
    {
      id: "SR-2024-002", 
      category: "Lighting",
      location: "Central Park North",
      coordinates: [-73.958, 40.7829] as [number, number],
      priority: "Medium",
      priorityColor: "bg-warning",
      description: "Streetlight not working",
      distance: "1.2 miles"
    },
    {
      id: "SR-2024-003",
      category: "Sanitation", 
      location: "Oak Street",
      coordinates: [-74.015, 40.7089] as [number, number],
      priority: "Low",
      priorityColor: "bg-success",
      description: "Overflowing trash bin",
      distance: "2.1 miles"
    }
  ];

  return (
    <div className="bg-background">
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-elevated overflow-hidden" style={{minHeight: '800px'}}>
        {/* Mobile Header */}
        <div className="bg-gradient-header text-primary-foreground p-4 text-center">
          <h2 className="text-lg font-bold">SmartStreet Worker</h2>
          <p className="text-sm opacity-90">Field Task Management</p>
        </div>

        {/* Worker Dashboard */}
        <div className="p-4 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center shadow-card">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">Today's Tasks</div>
            </Card>
            <Card className="p-3 text-center shadow-card">
              <div className="text-2xl font-bold text-success">5</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </Card>
            <Card className="p-3 text-center shadow-card">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </Card>
          </div>

          {/* My Tasks */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              My Tasks
            </h3>

            <div className="space-y-3">
              {assignedTasks.map((task, index) => (
                <Card key={index} className="p-4 shadow-card hover:shadow-elevated transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm text-muted-foreground">{task.id}</span>
                          <Badge className={`${task.priorityColor} text-white text-xs`}>
                            {task.priority}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{task.category}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {task.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Navigation className="h-3 w-3 mr-1" />
                          {task.distance} away
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary-hover">
                        Start Work
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Task Detail View */}
          <Card className="p-4 shadow-card border-2 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-foreground">Current Task: SR-2024-001</h4>
                <Badge className="bg-warning text-warning-foreground">In Progress</Badge>
              </div>

              {/* GPS Navigation */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">GPS Navigation</span>
                  <Navigation className="h-5 w-5 text-primary" />
                </div>
                <Map
                  markers={[{
                    coordinates: assignedTasks[0].coordinates,
                    title: assignedTasks[0].location,
                    description: assignedTasks[0].description,
                    color: '#3b82f6'
                  }]}
                  height="150px"
                  interactive={false}
                  center={assignedTasks[0].coordinates}
                  zoom={15}
                />
              </div>

              {/* Original Report */}
              <div>
                <h5 className="font-medium text-foreground mb-2">Original Citizen Report</h5>
                <div className="bg-muted rounded-lg p-3">
                  <div className="bg-background rounded h-24 mb-2 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Large pothole on Main Street causing traffic issues. Multiple vehicles have reported damage."
                  </p>
                </div>
              </div>

              {/* Work Documentation */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Proof of Work</h5>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload 'Before' Photo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload 'After' Photo
                  </Button>
                </div>
              </div>

              {/* Status Updates */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Mark as Invalid
                </Button>
                <Button className="w-full bg-success hover:bg-success-hover text-success-foreground">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t p-3">
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-1" />
              Tasks
            </Button>
            <Button variant="outline" className="flex-1">
              <MapPin className="h-4 w-4 mr-1" />
              Map
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary-hover">
              <Camera className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldWorkerApp;