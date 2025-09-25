import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Map from "@/components/Map";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Camera, 
  User,
  Calendar,
  Filter,
  Search
} from "lucide-react";

const AdminDashboard = () => {
  const kpiData = [
    { title: "New Reports", value: "23", icon: AlertTriangle, color: "text-accent" },
    { title: "In Progress", value: "45", icon: Clock, color: "text-warning" },
    { title: "Resolved Today", value: "78", icon: CheckCircle, color: "text-success" },
    { title: "Overdue", value: "12", icon: Users, color: "text-destructive" },
  ];

  const recentIssues = [
    {
      id: "SR-2024-001",
      category: "Road Issues",
      location: "Main St & 5th Ave",
      coordinates: [-74.006, 40.7128] as [number, number],
      date: "2024-01-15",
      status: "New",
      assignedTo: "John Smith",
      statusColor: "bg-accent"
    },
    {
      id: "SR-2024-002", 
      category: "Lighting",
      location: "Central Park North",
      coordinates: [-73.958, 40.7829] as [number, number],
      date: "2024-01-14",
      status: "In Progress",
      assignedTo: "Sarah Johnson",
      statusColor: "bg-warning"
    },
    {
      id: "SR-2024-003",
      category: "Sanitation",
      location: "Oak Street",
      coordinates: [-74.015, 40.7089] as [number, number],
      date: "2024-01-14", 
      status: "Resolved",
      assignedTo: "Mike Wilson",
      statusColor: "bg-success"
    },
    {
      id: "SR-2024-004",
      category: "Traffic",
      location: "Highway 101",
      coordinates: [-73.995, 40.7489] as [number, number],
      date: "2024-01-13",
      status: "Overdue",
      assignedTo: "Lisa Brown",
      statusColor: "bg-destructive"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground p-4 shadow-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">SmartStreet Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-90">Welcome, Admin</span>
            <Button variant="secondary" size="sm">Sign Out</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-elevated transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{kpi.title}</p>
                  <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map */}
            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold mb-4">Issue Location Map</h2>
              <Map
                markers={recentIssues.map(issue => ({
                  coordinates: issue.coordinates,
                  title: `${issue.id} - ${issue.category}`,
                  description: `${issue.location} - ${issue.status}`,
                  color: issue.status === 'Resolved' ? '#22c55e' : 
                         issue.status === 'In Progress' ? '#f59e0b' : 
                         issue.status === 'Overdue' ? '#ef4444' : '#3b82f6'
                }))}
                height="300px"
                interactive={true}
                center={[-74.006, 40.7128]}
                zoom={11}
              />
            </Card>

            {/* Issue Management Table */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Issue Management</h2>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="road">Road Issues</SelectItem>
                      <SelectItem value="lighting">Lighting</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search reports..." className="pl-10 w-48" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Report ID</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Location</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Assigned To</th>
                      <th className="text-left p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentIssues.map((issue, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-mono text-sm">{issue.id}</td>
                        <td className="p-3">{issue.category}</td>
                        <td className="p-3">{issue.location}</td>
                        <td className="p-3">{issue.date}</td>
                        <td className="p-3">
                          <Badge className={`${issue.statusColor} text-white`}>
                            {issue.status}
                          </Badge>
                        </td>
                        <td className="p-3">{issue.assignedTo}</td>
                        <td className="p-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">View</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Issue Details - {issue.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="font-medium">Category:</label>
                                    <p className="text-muted-foreground">{issue.category}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Location:</label>
                                    <p className="text-muted-foreground">{issue.location}</p>
                                  </div>
                                </div>
                                
                                <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-48">
                                  <div className="text-center text-muted-foreground">
                                    <Camera className="h-12 w-12 mx-auto mb-2" />
                                    <p>Citizen Submitted Photo</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="font-medium">Description:</label>
                                  <p className="text-muted-foreground mt-1">
                                    Large pothole on Main Street causing traffic issues. Multiple vehicles have reported damage.
                                  </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Change Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="resolved">Resolved</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Assign Worker" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="john">John Smith</SelectItem>
                                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                      <SelectItem value="mike">Mike Wilson</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex space-x-2">
                                  <Button className="bg-primary hover:bg-primary-hover">Update Issue</Button>
                                  <Button variant="outline">Send Notification</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-success rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Issue SR-2024-003 resolved</p>
                    <p className="text-muted-foreground">by Mike Wilson • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent rounded-full p-1">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">New report submitted</p>
                    <p className="text-muted-foreground">Road Issues • 3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary rounded-full p-1">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Worker assigned</p>
                    <p className="text-muted-foreground">Sarah Johnson to SR-2024-002</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Reports Today</span>
                  <span className="font-semibold">34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Response Time</span>
                  <span className="font-semibold">4.2 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold text-success">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Workers</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;