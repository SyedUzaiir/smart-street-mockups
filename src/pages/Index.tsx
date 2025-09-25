import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from "@/components/AdminDashboard";
import CitizenApp from "@/components/CitizenApp";
import FieldWorkerApp from "@/components/FieldWorkerApp";
import { 
  Users, 
  Smartphone, 
  HardHat, 
  MapPin, 
  CheckCircle, 
  Clock,
  Building,
  Shield
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="bg-gradient-header text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Building className="h-12 w-12 mr-3" />
            <h1 className="text-4xl font-bold">SmartStreet</h1>
          </div>
          <p className="text-xl opacity-90 mb-6">Municipal Issue Management Platform</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Connecting citizens, municipal administrators, and field workers to efficiently 
            manage and resolve community issues across the city.
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Municipal Dashboard</h3>
              <p className="text-sm opacity-90">Comprehensive admin interface for managing city-wide issues</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <Smartphone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Citizen Reporting</h3>
              <p className="text-sm opacity-90">Easy mobile app for residents to report local issues</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <HardHat className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Field Worker Tools</h3>
              <p className="text-sm opacity-90">Mobile task management for municipal workers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Platform Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Card className="p-6 shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">2,847</div>
              <div className="text-muted-foreground">Issues Resolved</div>
            </Card>
            <Card className="p-6 shadow-card">
              <div className="text-3xl font-bold text-success mb-2">94%</div>
              <div className="text-muted-foreground">Resolution Rate</div>
            </Card>
            <Card className="p-6 shadow-card">
              <div className="text-3xl font-bold text-secondary mb-2">4.2</div>
              <div className="text-muted-foreground">Avg Response (hrs)</div>
            </Card>
            <Card className="p-6 shadow-card">
              <div className="text-3xl font-bold text-accent mb-2">15,234</div>
              <div className="text-muted-foreground">Active Citizens</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Platform Interfaces */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Complete Platform Overview</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore all three interfaces of the SmartStreet platform - from municipal administration 
              to citizen engagement and field operations.
            </p>
          </div>

          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 max-w-md mx-auto">
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </TabsTrigger>
              <TabsTrigger value="citizen" className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4" />
                <span>Citizen</span>
              </TabsTrigger>
              <TabsTrigger value="worker" className="flex items-center space-x-2">
                <HardHat className="h-4 w-4" />
                <span>Worker</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <Card className="p-6 shadow-card mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Municipal Administrator Dashboard</h3>
                    <p className="text-muted-foreground">Comprehensive management interface for city officials</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Real-time issue tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Interactive city map</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-secondary" />
                    <span>Worker assignment tools</span>
                  </div>
                </div>
              </Card>
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="citizen">
              <Card className="p-6 shadow-card mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-secondary/10 rounded-lg p-2">
                    <Smartphone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Citizen Mobile Application</h3>
                    <p className="text-muted-foreground">Easy reporting and tracking for community members</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Photo-based reporting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>GPS location detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span>Real-time status updates</span>
                  </div>
                </div>
              </Card>
              <div className="flex justify-center">
                <CitizenApp />
              </div>
            </TabsContent>

            <TabsContent value="worker">
              <Card className="p-6 shadow-card mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <HardHat className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Field Worker Mobile Interface</h3>
                    <p className="text-muted-foreground">Task management and progress tracking for municipal workers</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Task assignment tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>GPS navigation to sites</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-secondary" />
                    <span>Progress documentation</span>
                  </div>
                </div>
              </Card>
              <div className="flex justify-center">
                <FieldWorkerApp />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Building className="h-8 w-8 mr-2" />
            <h3 className="text-2xl font-bold">SmartStreet</h3>
          </div>
          <p className="text-background/80 mb-6">
            Empowering communities through efficient municipal issue management
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#" className="hover:text-background/60 transition-colors">About</a>
            <a href="#" className="hover:text-background/60 transition-colors">Contact</a>
            <a href="#" className="hover:text-background/60 transition-colors">Support</a>
            <a href="#" className="hover:text-background/60 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
