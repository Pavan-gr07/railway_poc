import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, MarkerF, useLoadScript, OverlayView, PolylineF } from '@react-google-maps/api';
import {
    Box, Paper, Typography, Button, IconButton, Chip, Stack, Drawer,
    List, ListItem, ListItemText, ListItemIcon, Switch, FormControlLabel,
    Collapse, CircularProgress, Tooltip, Badge, Menu, MenuItem, Divider
} from '@mui/material';
import {
    Layers, MapPin, Camera, Router, ChevronDown, ChevronUp, Train,
    Monitor, Filter, ZoomIn, ZoomOut, Maximize2, Navigation, Eye, EyeOff
} from 'lucide-react';

// Types
interface Device {
    id: string;
    name: string;
    type: 'camera' | 'display' | 'cdc' | 'router' | 'sensor';
    status: 'online' | 'offline' | 'warning';
    lat: number;
    lng: number;
    stationId: string;
}

interface Station {
    id: string;
    name: string;
    code: string;
    lat: number;
    lng: number;
    devices: Device[];
}

const GOOGLE_API_KEY = "AIzaSyB2jXz--ffrJ3iLAEFC8cBZMKPY1P7bRxM";
const LIBRARIES: any = ["places", "marker"];

// Mock Data - Replace with your API
const MOCK_STATIONS: Station[] = [
    {
        id: 'STN-001',
        name: 'Bangalore City Junction',
        code: 'SBC',
        lat: 12.9776,
        lng: 77.5719,
        devices: [
            { id: 'DEV-001', name: 'CDC Unit 1', type: 'cdc', status: 'online', lat: 12.9776, lng: 77.5719, stationId: 'STN-001' },
            { id: 'DEV-002', name: 'Display Board - Platform 1', type: 'display', status: 'online', lat: 12.9778, lng: 77.5721, stationId: 'STN-001' },
            { id: 'DEV-003', name: 'Display Board - Platform 2', type: 'display', status: 'online', lat: 12.9774, lng: 77.5717, stationId: 'STN-001' },
            { id: 'DEV-004', name: 'CCTV Camera 1', type: 'camera', status: 'online', lat: 12.9779, lng: 77.5722, stationId: 'STN-001' },
            { id: 'DEV-005', name: 'CCTV Camera 2', type: 'camera', status: 'warning', lat: 12.9773, lng: 77.5716, stationId: 'STN-001' },
        ]
    },
    {
        id: 'STN-002',
        name: 'Yeshwantpur Junction',
        code: 'YPR',
        lat: 13.0284,
        lng: 77.5434,
        devices: [
            { id: 'DEV-006', name: 'CDC Unit 1', type: 'cdc', status: 'online', lat: 13.0284, lng: 77.5434, stationId: 'STN-002' },
            { id: 'DEV-007', name: 'Display Board - Platform 1', type: 'display', status: 'online', lat: 13.0286, lng: 77.5436, stationId: 'STN-002' },
            { id: 'DEV-008', name: 'Display Board - Platform 2', type: 'display', status: 'offline', lat: 13.0282, lng: 77.5432, stationId: 'STN-002' },
            { id: 'DEV-009', name: 'CCTV Camera 1', type: 'camera', status: 'online', lat: 13.0287, lng: 77.5437, stationId: 'STN-002' },
        ]
    },
    {
        id: 'STN-003',
        name: 'Whitefield',
        code: 'WFD',
        lat: 12.9698,
        lng: 77.7499,
        devices: [
            { id: 'DEV-010', name: 'CDC Unit 1', type: 'cdc', status: 'online', lat: 12.9698, lng: 77.7499, stationId: 'STN-003' },
            { id: 'DEV-011', name: 'Display Board - Platform 1', type: 'display', status: 'online', lat: 12.9700, lng: 77.7501, stationId: 'STN-003' },
            { id: 'DEV-012', name: 'CCTV Camera 1', type: 'camera', status: 'online', lat: 12.9696, lng: 77.7497, stationId: 'STN-003' },
        ]
    },
    {
        id: 'STN-004',
        name: 'KR Puram',
        code: 'KRP',
        lat: 13.0089,
        lng: 77.6960,
        devices: [
            { id: 'DEV-013', name: 'CDC Unit 1', type: 'cdc', status: 'online', lat: 13.0089, lng: 77.6960, stationId: 'STN-004' },
            { id: 'DEV-014', name: 'Display Board - Platform 1', type: 'display', status: 'online', lat: 13.0091, lng: 77.6962, stationId: 'STN-004' },
            { id: 'DEV-015', name: 'Display Board - Platform 2', type: 'display', status: 'warning', lat: 13.0087, lng: 77.6958, stationId: 'STN-004' },
        ]
    }
];

export default function CNMSGISView() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: LIBRARIES,
    });

    const [stations] = useState<Station[]>(MOCK_STATIONS);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 });
    const [mapZoom, setMapZoom] = useState(11);
    const [drawerOpen, setDrawerOpen] = useState(true);

    // Layer visibility
    const [layers, setLayers] = useState({
        stations: true,
        cdc: true,
        displays: true,
        cameras: true,
        routers: true,
        sensors: true
    });

    // Station panel collapse states
    const [expandedStations, setExpandedStations] = useState<Record<string, boolean>>({});

    const mapRef = useRef<google.maps.Map | null>(null);

    // Toggle station expansion
    const toggleStation = (stationId: string) => {
        setExpandedStations(prev => ({
            ...prev,
            [stationId]: !prev[stationId]
        }));
    };

    // Navigate to station
    const focusOnStation = (station: Station) => {
        setMapCenter({ lat: station.lat, lng: station.lng });
        setMapZoom(15);
        setSelectedStation(station);
    };

    // Navigate to device
    const focusOnDevice = (device: Device) => {
        setMapCenter({ lat: device.lat, lng: device.lng });
        setMapZoom(17);
        const station = stations.find(s => s.id === device.stationId);
        setSelectedStation(station || null);
    };

    // Get device icon based on type and status
    const getDeviceIcon = (device: Device) => {
        const iconMap = {
            cdc: '🏢',
            display: '📺',
            camera: '📹',
            router: '📡',
            sensor: '📍'
        };

        const colorMap = {
            online: '#4caf50',
            offline: '#f44336',
            warning: '#ff9800'
        };

        const icon = iconMap[device.type];
        const color = colorMap[device.status];

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2"/>
                <text x="20" y="26" font-size="18" text-anchor="middle" fill="white">${icon}</text>
            </svg>
        `)}`;
    };

    // Get station icon
    const getStationIcon = (station: Station) => {
        const onlineCount = station.devices.filter(d => d.status === 'online').length;
        const totalCount = station.devices.length;
        const color = onlineCount === totalCount ? '#2196f3' : onlineCount > 0 ? '#ff9800' : '#f44336';

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="75">
                <path d="M 30 70 L 20 40 L 40 40 Z" fill="${color}"/>
                <circle cx="30" cy="30" r="28" fill="${color}" stroke="white" stroke-width="3"/>
                <text x="30" y="38" font-size="24" text-anchor="middle" fill="white" font-weight="bold">🚉</text>
                <rect x="10" y="5" width="40" height="16" rx="4" fill="white" fill-opacity="0.95" />
                <text x="30" y="16" font-size="10" text-anchor="middle" fill="${color}" font-weight="bold">${station.code}</text>
            </svg>
        `)}`;
    };

    // Filter devices based on layer visibility
    const getVisibleDevices = () => {
        return stations.flatMap(station =>
            station.devices.filter(device => {
                if (device.type === 'cdc') return layers.cdc;
                if (device.type === 'display') return layers.displays;
                if (device.type === 'camera') return layers.cameras;
                if (device.type === 'router') return layers.routers;
                if (device.type === 'sensor') return layers.sensors;
                return false;
            })
        );
    };

    // Get stats
    const getStats = () => {
        const allDevices = stations.flatMap(s => s.devices);
        return {
            totalStations: stations.length,
            totalDevices: allDevices.length,
            online: allDevices.filter(d => d.status === 'online').length,
            offline: allDevices.filter(d => d.status === 'offline').length,
            warning: allDevices.filter(d => d.status === 'warning').length,
            cdc: allDevices.filter(d => d.type === 'cdc').length,
            displays: allDevices.filter(d => d.type === 'display').length,
            cameras: allDevices.filter(d => d.type === 'camera').length,
        };
    };

    const stats = getStats();

    if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100vh', width: '100%', display: 'flex', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
            {/* Left Sidebar - Station List & Layers */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                sx={{
                    width: drawerOpen ? 360 : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 360,
                        boxSizing: 'border-box',
                        position: 'relative',
                        height: '100%',
                        border: 'none',
                        boxShadow: 2
                    },
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Layers size={24} />
                        CNMS - GIS View
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        Centralized Network Management
                    </Typography>
                </Box>

                {/* Statistics */}
                <Box sx={{ p: 2, bgcolor: '#fff', borderBottom: '1px solid #e0e0e0' }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        <Chip label={`${stats.totalStations} Stations`} size="small" color="primary" icon={<Train size={14} />} />
                        <Chip label={`${stats.totalDevices} Devices`} size="small" />
                        <Chip label={`${stats.online} Online`} size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
                        <Chip label={`${stats.offline} Offline`} size="small" sx={{ bgcolor: '#f44336', color: 'white' }} />
                        {stats.warning > 0 && <Chip label={`${stats.warning} Warning`} size="small" sx={{ bgcolor: '#ff9800', color: 'white' }} />}
                    </Stack>
                </Box>

                {/* Layer Controls */}
                <Box sx={{ p: 2, bgcolor: '#fafafa', borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Filter size={16} />
                        Layer Controls
                    </Typography>
                    <Stack spacing={0.5}>
                        <FormControlLabel
                            control={<Switch size="small" checked={layers.stations} onChange={(e) => setLayers({ ...layers, stations: e.target.checked })} />}
                            label={<Typography variant="body2">Stations ({stats.totalStations})</Typography>}
                        />
                        <FormControlLabel
                            control={<Switch size="small" checked={layers.cdc} onChange={(e) => setLayers({ ...layers, cdc: e.target.checked })} />}
                            label={<Typography variant="body2">CDC Units ({stats.cdc})</Typography>}
                        />
                        <FormControlLabel
                            control={<Switch size="small" checked={layers.displays} onChange={(e) => setLayers({ ...layers, displays: e.target.checked })} />}
                            label={<Typography variant="body2">Display Boards ({stats.displays})</Typography>}
                        />
                        <FormControlLabel
                            control={<Switch size="small" checked={layers.cameras} onChange={(e) => setLayers({ ...layers, cameras: e.target.checked })} />}
                            label={<Typography variant="body2">Cameras ({stats.cameras})</Typography>}
                        />
                    </Stack>
                </Box>

                {/* Station List */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Train size={16} />
                        Stations
                    </Typography>
                    <List dense>
                        {stations.map(station => {
                            const onlineDevices = station.devices.filter(d => d.status === 'online').length;
                            const isExpanded = expandedStations[station.id];

                            return (
                                <Paper key={station.id} sx={{ mb: 1, overflow: 'hidden' }}>
                                    <ListItem
                                        button
                                        onClick={() => focusOnStation(station)}
                                        sx={{
                                            bgcolor: selectedStation?.id === station.id ? 'action.selected' : 'transparent',
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            <Badge badgeContent={station.devices.length} color="primary">
                                                <Train size={20} />
                                            </Badge>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body2" fontWeight="bold">
                                                    {station.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="caption" color="text.secondary">
                                                    {station.code} • {onlineDevices}/{station.devices.length} Online
                                                </Typography>
                                            }
                                        />
                                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleStation(station.id); }}>
                                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </IconButton>
                                    </ListItem>

                                    <Collapse in={isExpanded}>
                                        <Box sx={{ pl: 6, pr: 2, pb: 1, bgcolor: '#fafafa' }}>
                                            {station.devices.map(device => (
                                                <Box
                                                    key={device.id}
                                                    onClick={() => focusOnDevice(device)}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        py: 0.5,
                                                        cursor: 'pointer',
                                                        '&:hover': { bgcolor: 'action.hover' },
                                                        borderRadius: 1
                                                    }}
                                                >
                                                    {device.type === 'cdc' && <Monitor size={14} />}
                                                    {device.type === 'display' && <Monitor size={14} />}
                                                    {device.type === 'camera' && <Camera size={14} />}
                                                    {device.type === 'router' && <Router size={14} />}
                                                    <Typography variant="caption">{device.name}</Typography>
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            bgcolor: device.status === 'online' ? '#4caf50' : device.status === 'offline' ? '#f44336' : '#ff9800',
                                                            ml: 'auto'
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Collapse>
                                </Paper>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            {/* Map Container */}
            <Box sx={{ flexGrow: 1, position: 'relative', height: '100%' }}>
                {/* Map Controls */}
                <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
                    <Stack spacing={1}>
                        <Tooltip title="Toggle Sidebar">
                            <IconButton
                                onClick={() => setDrawerOpen(!drawerOpen)}
                                sx={{ bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}
                            >
                                <Layers size={20} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Zoom In">
                            <IconButton
                                onClick={() => setMapZoom(prev => Math.min(prev + 1, 20))}
                                sx={{ bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}
                            >
                                <ZoomIn size={20} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Zoom Out">
                            <IconButton
                                onClick={() => setMapZoom(prev => Math.max(prev - 1, 3))}
                                sx={{ bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}
                            >
                                <ZoomOut size={20} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Fit All Stations">
                            <IconButton
                                onClick={() => {
                                    setMapCenter({ lat: 12.9716, lng: 77.5946 });
                                    setMapZoom(11);
                                }}
                                sx={{ bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}
                            >
                                <Maximize2 size={20} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                {/* Legend */}
                <Paper sx={{ position: 'absolute', bottom: 16, left: 16, p: 2, zIndex: 10, minWidth: 200 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Legend</Typography>
                    <Stack spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4caf50' }} />
                            <Typography variant="caption">Online</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800' }} />
                            <Typography variant="caption">Warning</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f44336' }} />
                            <Typography variant="caption">Offline</Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* Google Map */}
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={mapCenter}
                    zoom={mapZoom}
                    onLoad={(map) => { mapRef.current = map; }}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: false,
                        styles: [
                            {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                            }
                        ]
                    }}
                >
                    {/* Station Markers */}
                    {layers.stations && stations.map(station => (
                        <MarkerF
                            key={station.id}
                            position={{ lat: station.lat, lng: station.lng }}
                            onClick={() => focusOnStation(station)}
                            icon={{
                                url: getStationIcon(station),
                                anchor: new window.google.maps.Point(30, 70),
                                scaledSize: new window.google.maps.Size(60, 75)
                            }}
                        />
                    ))}

                    {/* Device Markers */}
                    {getVisibleDevices().map(device => (
                        <MarkerF
                            key={device.id}
                            position={{ lat: device.lat, lng: device.lng }}
                            onClick={() => focusOnDevice(device)}
                            icon={{
                                url: getDeviceIcon(device),
                                anchor: new window.google.maps.Point(20, 20),
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        />
                    ))}
                </GoogleMap>
            </Box>
        </Box>
    );
}