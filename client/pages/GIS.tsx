import React, { useState, useRef } from 'react';
import { GoogleMap, MarkerF, useLoadScript, OverlayView } from '@react-google-maps/api';
import {
    Box, Paper, Typography, TextField, Button, Card, CardContent, IconButton,
    Divider, Stack, CircularProgress
} from '@mui/material';
import {
    Camera, Router, Trash2, ChevronLeft, GripVertical, Menu as MenuIcon,
} from 'lucide-react';

// Define Types
interface Device {
    id: string;
    name: string;
    type: 'sensor' | 'camera' | 'router';
    lat?: number;
    lng?: number;
}

interface ContextMenu {
    mouseX: number;
    mouseY: number;
    deviceId: string;
}

const GOOGLE_API_KEY = "AIzaSyB2jXz--ffrJ3iLAEFC8cBZMKPY1P7bRxM"; // Use environment variables for production
const LIBRARIES: any = ["places"];

export default function GIS() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: LIBRARIES,
    });

    const [inventory, setInventory] = useState<Device[]>([
        { id: "DEV-001", name: "Jio Sensor A", type: 'sensor' },
        { id: "DEV-002", name: "Jio Camera B", type: 'camera' },
        { id: "DEV-003", name: "Jio Router C", type: 'router' }
    ]);
    const [placedDevices, setPlacedDevices] = useState<Required<Device>[]>([]);
    const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 });
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
    const [formCoords, setFormCoords] = useState({ lat: '', lng: '' });
    const [draggedItem, setDraggedItem] = useState<Device | null>(null);

    const mapRef = useRef<google.maps.Map | null>(null);
    const overlayRef = useRef<any>(null);

    // Drag and Drop Logic
    const handleDragStartFromDrawer = (device: Device) => {
        setDraggedItem(device);
    };

    const handleDropOnMap = (e: React.DragEvent) => {
        e.preventDefault();
        if (!draggedItem || !overlayRef.current || !mapRef.current) return;

        const projection = overlayRef.current.getProjection();
        const mapDiv = mapRef.current.getDiv();
        const rect = mapDiv.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const latLng = projection.fromContainerPixelToLatLng(new window.google.maps.Point(x, y));

        if (latLng) {
            setPlacedDevices(prev => [...prev, {
                ...(draggedItem as Required<Device>),
                lat: latLng.lat(),
                lng: latLng.lng()
            }]);
            setInventory(prev => prev.filter(item => item.id !== draggedItem.id));
        }
        setDraggedItem(null);
    };

    const updateCoordinatesManually = () => {
        const newLat = parseFloat(formCoords.lat);
        const newLng = parseFloat(formCoords.lng);

        if (!isNaN(newLat) && !isNaN(newLng) && contextMenu) {
            setPlacedDevices(prev => prev.map(d =>
                d.id === contextMenu.deviceId ? { ...d, lat: newLat, lng: newLng } : d
            ));
            setMapCenter({ lat: newLat, lng: newLng });
        }
        setContextMenu(null);
    };

    const getDeviceIcon = (name: string) => {
        const icon = name.toLowerCase().includes('camera') ? '📹' : name.toLowerCase().includes('router') ? '📡' : '📍';
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect x="0" y="0" width="100" height="22" rx="4" fill="black" fill-opacity="0.8" />
        <path d="M 50 85 L 42 55 L 58 55 Z" fill="#1976d2"/>
        <circle cx="50" cy="45" r="20" fill="#1976d2" stroke="white" stroke-width="2"/>
        <text x="50" y="52" font-size="22" text-anchor="middle" fill="white">${icon}</text>
      </svg>`)}`;
    };

    if (!isLoaded) return (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box sx={{
            height: 'calc(100vh - 64px)', // Adjust based on your TopBar height
            width: '100%',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Map Area */}
            <Box
                sx={{ flexGrow: 1, position: 'relative' }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropOnMap}
            >
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={mapCenter}
                    zoom={13}
                    onLoad={(map) => { mapRef.current = map; }}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                >
                    <OverlayView
                        position={mapCenter}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        onLoad={ow => overlayRef.current = ow}
                    >
                        <div />
                    </OverlayView>

                    {placedDevices.map((device) => (
                        <MarkerF
                            key={device.id}
                            position={{ lat: device.lat, lng: device.lng }}
                            draggable={true}
                            onDragEnd={(e) => {
                                if (!e.latLng) return;
                                const lat = e.latLng.lat();
                                const lng = e.latLng.lng();
                                setPlacedDevices(prev => prev.map(d => d.id === device.id ? { ...d, lat, lng } : d));
                            }}
                            onRightClick={(e: any) => {
                                setFormCoords({ lat: device.lat.toFixed(6), lng: device.lng.toFixed(6) });
                                setContextMenu({
                                    mouseX: e.domEvent.clientX,
                                    mouseY: e.domEvent.clientY,
                                    deviceId: device.id
                                });
                            }}
                            icon={{
                                url: getDeviceIcon(device.name),
                                anchor: new window.google.maps.Point(50, 85),
                            }}
                        />
                    ))}
                </GoogleMap>

                {/* Internal Toggle Button (Visible when sidebar is closed) */}
                {!sidebarOpen && (
                    <IconButton
                        onClick={() => setSidebarOpen(true)}
                        sx={{ position: 'absolute', right: 20, top: 20, zIndex: 10, bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}
                    >
                        <MenuIcon size={20} />
                    </IconButton>
                )}
            </Box>

            {/* Inline Right Sidebar (Replaces the Persistent Drawer) */}
            <Box sx={{
                width: sidebarOpen ? 340 : 0,
                transition: 'width 0.3s ease',
                height: '100%',
                bgcolor: 'background.paper',
                borderLeft: sidebarOpen ? '1px solid' : 'none',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 340 }}>
                    <Typography variant="subtitle1" fontWeight="bold">GIS Assets</Typography>
                    <IconButton onClick={() => setSidebarOpen(false)} color="inherit" size="small">
                        <ChevronLeft style={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                </Box>

                <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1, minWidth: 340 }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">AVAILABLE ASSETS</Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                        {inventory.map(d => (
                            <Card
                                key={d.id}
                                draggable
                                onDragStart={() => handleDragStartFromDrawer(d)}
                                sx={{ cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
                            >
                                <CardContent sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2, '&:last-child': { pb: 1.5 } }}>
                                    <GripVertical size={16} color="#ccc" />
                                    {d.type === 'camera' ? <Camera size={18} /> : <Router size={18} />}
                                    <Typography variant="body2">{d.name}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="caption" fontWeight="bold" color="text.secondary">DEPLOYED ON MAP</Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                        {placedDevices.map(d => (
                            <Paper key={d.id} variant="outlined" sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" fontWeight="bold">{d.name}</Typography>
                                    <Typography variant="caption" color="primary">{d.lat.toFixed(4)}, {d.lng.toFixed(4)}</Typography>
                                </Box>
                                <IconButton size="small" color="error" onClick={() => {
                                    setPlacedDevices(prev => prev.filter(p => p.id !== d.id));
                                    setInventory(prev => [...prev, d]);
                                }}>
                                    <Trash2 size={16} />
                                </IconButton>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* Precision Edit Menu */}
            {contextMenu && (
                <Paper
                    sx={{
                        position: 'fixed',
                        top: contextMenu.mouseY,
                        left: contextMenu.mouseX,
                        zIndex: 2000,
                        p: 2,
                        width: 250,
                        boxShadow: 4,
                        borderRadius: 2
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="subtitle2" fontWeight="bold">Adjust Coordinates</Typography>
                        <Stack direction="row" spacing={1}>
                            <TextField label="Lat" size="small" value={formCoords.lat} onChange={(e) => setFormCoords({ ...formCoords, lat: e.target.value })} />
                            <TextField label="Lng" size="small" value={formCoords.lng} onChange={(e) => setFormCoords({ ...formCoords, lng: e.target.value })} />
                        </Stack>
                        <Button variant="contained" size="small" onClick={updateCoordinatesManually}>Update Location</Button>
                        <Button variant="text" size="small" color="inherit" onClick={() => setContextMenu(null)}>Cancel</Button>
                    </Stack>
                </Paper>
            )}
        </Box>
    );
}