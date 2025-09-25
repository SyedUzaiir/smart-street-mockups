import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapProps {
  onLocationSelect?: (coordinates: [number, number], address: string) => void;
  markers?: Array<{
    coordinates: [number, number];
    title: string;
    description?: string;
    color?: string;
  }>;
  height?: string;
  interactive?: boolean;
  center?: [number, number];
  zoom?: number;
}

const Map: React.FC<MapProps> = ({
  onLocationSelect,
  markers = [],
  height = "300px",
  interactive = true,
  center = [-74.006, 40.7128], // NYC default
  zoom = 12
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
      interactive: interactive
    });

    // Add navigation controls
    if (interactive) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Add markers
    markers.forEach((marker) => {
      if (!map.current) return;
      
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = marker.color || '#3B82F6';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold">${marker.title}</h3>
          ${marker.description ? `<p class="text-sm text-gray-600">${marker.description}</p>` : ''}
        </div>`
      );

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    // Handle click for location selection
    if (onLocationSelect && interactive) {
      map.current.on('click', async (e) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        
        // Reverse geocoding to get address
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxToken}`
          );
          const data = await response.json();
          const address = data.features[0]?.place_name || `${coordinates[1]}, ${coordinates[0]}`;
          
          onLocationSelect(coordinates, address);
        } catch (error) {
          console.error('Geocoding error:', error);
          onLocationSelect(coordinates, `${coordinates[1]}, ${coordinates[0]}`);
        }
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, markers, onLocationSelect, interactive, center, zoom]);

  if (showTokenInput) {
    return (
      <div className="p-4 border rounded-lg bg-muted">
        <h3 className="font-medium mb-2">Mapbox Configuration Required</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Enter your Mapbox public token to enable maps. Get one from{' '}
          <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={() => {
              if (mapboxToken.startsWith('pk.')) {
                setShowTokenInput(false);
              }
            }}
            disabled={!mapboxToken.startsWith('pk.')}
          >
            Enable Maps
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        style={{ height }} 
        className="w-full rounded-lg overflow-hidden shadow-card"
      />
      {onLocationSelect && (
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground shadow">
          Click to select location
        </div>
      )}
    </div>
  );
};

export default Map;