import { useState, useEffect, CSSProperties } from "react";

// Type Definitions
interface Device {
    name: string;
    type: "MLDB" | "PFD" | "AGDB" | "CGDB" | "Video Display";
    status: "online" | "warning" | "down";
    health: number;
}

interface Station {
    id: string;
    name: string;
    status: "online" | "warning" | "critical";
    location: string;
    devices: Device[];
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
}

type DeviceStatus = "online" | "warning" | "down" | "critical";

export default function NetworkTopology() {
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [transitioning, setTransitioning] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    // Generate particles for background effect
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 20 + 10,
        }));
        setParticles(newParticles);
    }, []);

    const stations: Station[] = [
        {
            id: "stA",
            name: "Station A",
            status: "online",
            location: "Terminal 1",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "online", health: 98 },
                { name: "PFD-01", type: "PFD", status: "online", health: 95 },
                { name: "AGDB-01", type: "AGDB", status: "warning", health: 72 },
                { name: "CGDB-01", type: "CGDB", status: "online", health: 100 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 88 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 92 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 97 },
                { name: "PFD-02", type: "PFD", status: "warning", health: 68 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 94 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 96 },
            ],
        },
        {
            id: "stB",
            name: "Station B",
            status: "warning",
            location: "Terminal 2",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "warning", health: 65 },
                { name: "PFD-01", type: "PFD", status: "online", health: 89 },
                { name: "AGDB-01", type: "AGDB", status: "online", health: 91 },
                { name: "CGDB-01", type: "CGDB", status: "warning", health: 70 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 85 },
                { name: "VDU-Display-02", type: "Video Display", status: "warning", health: 62 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 93 },
                { name: "PFD-02", type: "PFD", status: "online", health: 87 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 90 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 88 },
            ],
        },
        {
            id: "stC",
            name: "Station C",
            status: "critical",
            location: "Terminal 3",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "down", health: 12 },
                { name: "PFD-01", type: "PFD", status: "down", health: 8 },
                { name: "AGDB-01", type: "AGDB", status: "warning", health: 45 },
                { name: "CGDB-01", type: "CGDB", status: "online", health: 82 },
                { name: "VDU-Display-01", type: "Video Display", status: "down", health: 15 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 78 },
                { name: "MLDB-02", type: "MLDB", status: "warning", health: 58 },
                { name: "PFD-02", type: "PFD", status: "online", health: 84 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 91 },
                { name: "CGDB-02", type: "CGDB", status: "warning", health: 66 },
            ],
        },
        {
            id: "stD",
            name: "Station D",
            status: "online",
            location: "Terminal 4",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "online", health: 99 },
                { name: "PFD-01", type: "PFD", status: "online", health: 97 },
                { name: "AGDB-01", type: "AGDB", status: "online", health: 95 },
                { name: "CGDB-01", type: "CGDB", status: "online", health: 98 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 94 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 96 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 93 },
                { name: "PFD-02", type: "PFD", status: "online", health: 91 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 89 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 92 },
            ],
        },
        {
            id: "stE",
            name: "Station E",
            status: "online",
            location: "Terminal 5",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "online", health: 99 },
                { name: "PFD-01", type: "PFD", status: "online", health: 97 },
                { name: "AGDB-01", type: "AGDB", status: "online", health: 95 },
                { name: "CGDB-01", type: "CGDB", status: "online", health: 98 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 94 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 96 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 93 },
                { name: "PFD-02", type: "PFD", status: "online", health: 91 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 89 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 92 },
            ],
        },
        {
            id: "stF",
            name: "Station F",
            status: "online",
            location: "Terminal 6",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "online", health: 99 },
                { name: "PFD-01", type: "PFD", status: "online", health: 97 },
                { name: "AGDB-01", type: "AGDB", status: "online", health: 95 },
                { name: "CGDB-01", type: "CGDB", status: "online", health: 98 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 94 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 96 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 93 },
                { name: "PFD-02", type: "PFD", status: "online", health: 91 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 89 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 92 },
            ],
        },
        {
            id: "stG",
            name: "Station G",
            status: "online",
            location: "Terminal 7",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "down", health: 99 },
                { name: "PFD-01", type: "PFD", status: "online", health: 97 },
                { name: "AGDB-01", type: "AGDB", status: "online", health: 95 },
                { name: "CGDB-01", type: "CGDB", status: "down", health: 98 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 94 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 96 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 93 },
                { name: "PFD-02", type: "PFD", status: "down", health: 91 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 89 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 92 },
            ],
        },
        {
            id: "stH",
            name: "Station H",
            status: "online",
            location: "Terminal 8",
            devices: [
                { name: "MLDB-01", type: "MLDB", status: "online", health: 99 },
                { name: "PFD-01", type: "PFD", status: "online", health: 97 },
                { name: "AGDB-01", type: "AGDB", status: "online", health: 95 },
                { name: "CGDB-01", type: "CGDB", status: "online", health: 98 },
                { name: "VDU-Display-01", type: "Video Display", status: "online", health: 94 },
                { name: "VDU-Display-02", type: "Video Display", status: "online", health: 96 },
                { name: "MLDB-02", type: "MLDB", status: "online", health: 93 },
                { name: "PFD-02", type: "PFD", status: "online", health: 91 },
                { name: "AGDB-02", type: "AGDB", status: "online", health: 89 },
                { name: "CGDB-02", type: "CGDB", status: "online", health: 92 },
            ],
        },
    ];

    const getStatusColor = (status: DeviceStatus): string => {
        switch (status) {
            case "online":
                return "#10b981";
            case "warning":
                return "#f59e0b";
            case "down":
            case "critical":
                return "#ef4444";
            default:
                return "#6b7280";
        }
    };

    const getStationOverallStatus = (station: Station): DeviceStatus => {
        const downDevices = station.devices.filter((d) => d.status === "down").length;
        const warningDevices = station.devices.filter((d) => d.status === "warning").length;

        if (downDevices >= 3) return "critical";
        if (downDevices > 0 || warningDevices >= 3) return "warning";
        return "online";
    };

    const handleStationClick = (station: Station): void => {
        setTransitioning(true);
        setTimeout(() => {
            setSelectedStation(station);
            setTransitioning(false);
        }, 600);
    };

    const handleBackToTopology = (): void => {
        setTransitioning(true);
        setTimeout(() => {
            setSelectedStation(null);
            setSelectedDevice(null);
            setTransitioning(false);
        }, 600);
    };

    const handleDeviceClick = (device: Device): void => {
        setSelectedDevice(device);
    };

    const getDeviceIcon = (type: Device["type"]): string => {
        switch (type) {
            case "MLDB":
                return "🔌";
            case "PFD":
                return "⚡";
            case "AGDB":
                return "🎛️";
            case "CGDB":
                return "🖥️";
            case "Video Display":
                return "📺";
            default:
                return "📡";
        }
    };

    return (
        <div style={styles.app}>
            {/* Animated Particle Background */}
            {/* <div style={styles.particleContainer}>
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        style={{
                            ...styles.particle,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            animationDuration: `${particle.speed}s`,
                        }}
                    />
                ))}
            </div> */}

            {/* Transition Overlay */}
            {transitioning && (
                <div style={styles.transitionOverlay}>
                    <div style={styles.loader}></div>
                    <p style={styles.transitionText}>Establishing Connection...</p>
                </div>
            )}

            {/* TOPOLOGY VIEW */}
            {!selectedStation && (
                <div style={styles.topologyView}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>
                            <span style={styles.titleIcon}>🛰️</span>
                            EDGE NETWORK MANAGEMENT SYSTEM
                        </h1>
                        <div style={styles.subtitle}>Divisional HQ - Network Topology</div>
                    </div>

                    {/* Central HQ Node */}
                    <div style={styles.hqContainer}>
                        <div style={styles.hq}>
                            <div style={styles.hqPulse}></div>
                            <div style={styles.hqIcon}>🏢</div>
                            <div style={styles.hqLabel}>DIVISIONAL HQ</div>
                            <div style={styles.hqStatus}>MASTER NODE</div>
                        </div>
                    </div>

                    {/* Connection Lines */}
                    <svg style={styles.connectionSvg}>
                        {stations.map((station, idx) => {
                            const angle = (idx / stations.length) * 2 * Math.PI - Math.PI / 2;
                            const x1 = 50;
                            const y1 = 30;
                            const x2 = 50 + Math.cos(angle) * 35;
                            const y2 = 70 + Math.sin(angle) * 25;
                            return (
                                <line
                                    key={station.id}
                                    x1={`${x1}%`}
                                    y1={`${y1}%`}
                                    x2={`${x2}%`}
                                    y2={`${y2}%`}
                                    stroke={getStatusColor(getStationOverallStatus(station))}
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    style={styles.connectionLine}
                                />
                            );
                        })}
                    </svg>

                    {/* Stations arranged in a circle */}
                    <div style={styles.stationsContainer}>
                        {stations.map((station, idx) => {
                            const angle = (idx / stations.length) * 2 * Math.PI - Math.PI / 2;
                            const x = 50 + Math.cos(angle) * 35;
                            const y = 70 + Math.sin(angle) * 25;
                            const overallStatus = getStationOverallStatus(station);
                            const statusColor = getStatusColor(overallStatus);

                            return (
                                <div
                                    key={station.id}
                                    style={{
                                        ...styles.stationNode,
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        borderColor: statusColor,
                                        boxShadow: `0 0 30px ${statusColor}`,
                                    }}
                                    onClick={() => handleStationClick(station)}
                                >
                                    <div
                                        style={{
                                            ...styles.stationPulse,
                                            borderColor: statusColor,
                                        }}
                                    ></div>
                                    <div style={styles.stationIcon}>📍</div>
                                    <div style={styles.stationName}>{station.name}</div>
                                    <div style={styles.stationLocation}>{station.location}</div>
                                    <div
                                        style={{
                                            ...styles.stationStatus,
                                            color: statusColor,
                                        }}
                                    >
                                        {overallStatus.toUpperCase()}
                                    </div>
                                    <div style={styles.deviceCount}>
                                        {station.devices.length} Devices
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* STATION DETAIL VIEW */}
            {selectedStation && !selectedDevice && (
                <div style={styles.stationView}>
                    <button style={styles.backButton} onClick={handleBackToTopology}>
                        ⬅ Back to Topology
                    </button>

                    <div style={styles.stationHeader}>
                        <div style={styles.stationHeaderLeft}>
                            <h2 style={styles.stationTitle}>
                                📍 {selectedStation.name}
                            </h2>
                            <div style={styles.stationSubtitle}>
                                {selectedStation.location} • Edge Network Management
                            </div>
                        </div>
                        <div
                            style={{
                                ...styles.stationHeaderStatus,
                                backgroundColor: getStatusColor(
                                    getStationOverallStatus(selectedStation)
                                ),
                            }}
                        >
                            {getStationOverallStatus(selectedStation).toUpperCase()}
                        </div>
                    </div>

                    {/* Device Stats */}
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statValue}>
                                {selectedStation.devices.filter((d) => d.status === "online").length}
                            </div>
                            <div style={styles.statLabel}>Online</div>
                            <div style={{ ...styles.statBar, backgroundColor: "#10b981" }}></div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statValue}>
                                {selectedStation.devices.filter((d) => d.status === "warning").length}
                            </div>
                            <div style={styles.statLabel}>Warning</div>
                            <div style={{ ...styles.statBar, backgroundColor: "#f59e0b" }}></div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statValue}>
                                {selectedStation.devices.filter((d) => d.status === "down").length}
                            </div>
                            <div style={styles.statLabel}>Down</div>
                            <div style={{ ...styles.statBar, backgroundColor: "#ef4444" }}></div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statValue}>{selectedStation.devices.length}</div>
                            <div style={styles.statLabel}>Total Devices</div>
                            <div style={{ ...styles.statBar, backgroundColor: "#3b82f6" }}></div>
                        </div>
                    </div>

                    {/* Device Grid */}
                    <div style={styles.deviceGrid}>
                        {selectedStation.devices.map((device, idx) => (
                            <div
                                key={idx}
                                style={{
                                    ...styles.deviceCard,
                                    borderColor: getStatusColor(device.status),
                                    animationDelay: `${idx * 0.05}s`,
                                }}
                                onClick={() => handleDeviceClick(device)}
                            >
                                <div
                                    style={{
                                        ...styles.deviceGlow,
                                        backgroundColor: getStatusColor(device.status),
                                    }}
                                ></div>
                                <div style={styles.deviceIcon}>{getDeviceIcon(device.type)}</div>
                                <div style={styles.deviceName}>{device.name}</div>
                                <div style={styles.deviceType}>{device.type}</div>
                                <div style={styles.healthBar}>
                                    <div
                                        style={{
                                            ...styles.healthFill,
                                            width: `${device.health}%`,
                                            backgroundColor: getStatusColor(device.status),
                                        }}
                                    ></div>
                                </div>
                                <div style={styles.healthText}>{device.health}% Health</div>
                                <div
                                    style={{
                                        ...styles.deviceStatus,
                                        color: getStatusColor(device.status),
                                    }}
                                >
                                    ● {device.status.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DEVICE DETAIL VIEW */}
            {selectedDevice && (
                <div style={styles.deviceDetailOverlay} onClick={() => setSelectedDevice(null)}>
                    <div style={styles.deviceDetailPanel} onClick={(e) => e.stopPropagation()}>
                        <button
                            style={styles.closeButton}
                            onClick={() => setSelectedDevice(null)}
                        >
                            ✕
                        </button>

                        <div style={styles.deviceDetailHeader}>
                            <div style={styles.deviceDetailIcon}>
                                {getDeviceIcon(selectedDevice.type)}
                            </div>
                            <div>
                                <h3 style={styles.deviceDetailName}>{selectedDevice.name}</h3>
                                <div style={styles.deviceDetailType}>{selectedDevice.type}</div>
                            </div>
                            <div
                                style={{
                                    ...styles.deviceDetailStatus,
                                    backgroundColor: getStatusColor(selectedDevice.status),
                                }}
                            >
                                {selectedDevice.status.toUpperCase()}
                            </div>
                        </div>

                        <div style={styles.deviceDetailBody}>
                            <div style={styles.detailSection}>
                                <h4 style={styles.sectionTitle}>System Information</h4>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>IP Address:</span>
                                        <span style={styles.detailValue}>
                                            10.{Math.floor(Math.random() * 255)}.
                                            {Math.floor(Math.random() * 255)}.
                                            {Math.floor(Math.random() * 255)}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>MAC Address:</span>
                                        <span style={styles.detailValue}>
                                            {Array.from({ length: 6 }, () =>
                                                Math.floor(Math.random() * 256)
                                                    .toString(16)
                                                    .padStart(2, "0")
                                            ).join(":")}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Uptime:</span>
                                        <span style={styles.detailValue}>
                                            {Math.floor(Math.random() * 500)} hours
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Firmware:</span>
                                        <span style={styles.detailValue}>v2.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 20)}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h4 style={styles.sectionTitle}>Performance Metrics</h4>
                                <div style={styles.metricsGrid}>
                                    <div style={styles.metricCard}>
                                        <div style={styles.metricLabel}>CPU Usage</div>
                                        <div style={styles.metricValue}>
                                            {Math.floor(Math.random() * 40 + 30)}%
                                        </div>
                                        <div style={styles.metricBar}>
                                            <div
                                                style={{
                                                    ...styles.metricFill,
                                                    width: `${Math.floor(Math.random() * 40 + 30)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div style={styles.metricCard}>
                                        <div style={styles.metricLabel}>Memory</div>
                                        <div style={styles.metricValue}>
                                            {Math.floor(Math.random() * 30 + 40)}%
                                        </div>
                                        <div style={styles.metricBar}>
                                            <div
                                                style={{
                                                    ...styles.metricFill,
                                                    width: `${Math.floor(Math.random() * 30 + 40)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div style={styles.metricCard}>
                                        <div style={styles.metricLabel}>Network I/O</div>
                                        <div style={styles.metricValue}>
                                            {Math.floor(Math.random() * 800 + 200)} MB/s
                                        </div>
                                        <div style={styles.metricBar}>
                                            <div
                                                style={{
                                                    ...styles.metricFill,
                                                    width: `${Math.floor(Math.random() * 50 + 20)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h4 style={styles.sectionTitle}>Recent Events</h4>
                                <div style={styles.eventList}>
                                    <div style={styles.eventItem}>
                                        <span style={styles.eventTime}>2 min ago</span>
                                        <span style={styles.eventText}>SNMP poll successful</span>
                                        <span style={{ ...styles.eventDot, backgroundColor: "#10b981" }}>
                                            ●
                                        </span>
                                    </div>
                                    <div style={styles.eventItem}>
                                        <span style={styles.eventTime}>15 min ago</span>
                                        <span style={styles.eventText}>Heartbeat received</span>
                                        <span style={{ ...styles.eventDot, backgroundColor: "#10b981" }}>
                                            ●
                                        </span>
                                    </div>
                                    <div style={styles.eventItem}>
                                        <span style={styles.eventTime}>1 hour ago</span>
                                        <span style={styles.eventText}>
                                            {selectedDevice.status === "warning"
                                                ? "Warning: High CPU usage detected"
                                                : selectedDevice.status === "down"
                                                    ? "Critical: Device unreachable"
                                                    : "System check completed"}
                                        </span>
                                        <span
                                            style={{
                                                ...styles.eventDot,
                                                backgroundColor: getStatusColor(selectedDevice.status),
                                            }}
                                        >
                                            ●
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ==================== STYLES ==================== */

const styles: { [key: string]: CSSProperties } = {
    app: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
        color: "#fff",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
    },

    // Particles
    particleContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
    },
    particle: {
        position: "absolute",
        backgroundColor: "#3b82f6",
        borderRadius: "50%",
        opacity: 0.3,
        animation: "float 20s infinite linear",
    },

    // Transition Overlay
    transitionOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeIn 0.3s ease",
    },
    loader: {
        width: 60,
        height: 60,
        border: "4px solid rgba(59, 130, 246, 0.1)",
        borderTop: "4px solid #3b82f6",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    transitionText: {
        marginTop: 20,
        fontSize: 16,
        color: "#3b82f6",
        letterSpacing: 2,
    },

    // Topology View
    topologyView: {
        position: "relative",
        minHeight: "100vh",
        padding: 40,
        zIndex: 1,
        animation: "zoomIn 0.8s ease",
    },
    header: {
        textAlign: "center",
        marginBottom: 60,
    },
    title: {
        fontSize: 42,
        fontWeight: 700,
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 10,
        letterSpacing: 2,
    },
    titleIcon: {
        marginRight: 15,
    },
    subtitle: {
        fontSize: 16,
        color: "#94a3b8",
        letterSpacing: 3,
        textTransform: "uppercase",
    },

    // HQ Node
    hqContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 80,
    },
    hq: {
        position: "relative",
        width: 200,
        height: 200,
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        borderRadius: "50%",
        border: "3px solid #3b82f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 60px rgba(59, 130, 246, 0.6)",
        animation: "pulse 3s infinite",
    },
    hqPulse: {
        position: "absolute",
        width: "120%",
        height: "120%",
        border: "2px solid #3b82f6",
        borderRadius: "50%",
        animation: "ping 2s infinite",
    },
    hqIcon: {
        fontSize: 48,
        marginBottom: 10,
    },
    hqLabel: {
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 1,
        marginBottom: 5,
    },
    hqStatus: {
        fontSize: 11,
        color: "#3b82f6",
        letterSpacing: 1,
    },

    // Connection Lines
    connectionSvg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
    },
    connectionLine: {
        animation: "dash 3s linear infinite",
    },

    // Stations
    stationsContainer: {
        position: "relative",
        height: 600,
    },
    stationNode: {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        width: 180,
        padding: 20,
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        borderRadius: 20,
        border: "2px solid",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        animation: "fadeInUp 0.8s ease",
        zIndex: 1,
    },
    stationPulse: {
        position: "absolute",
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        border: "2px solid",
        borderRadius: 20,
        animation: "ping 2s infinite",
        pointerEvents: "none",
    },
    stationIcon: {
        fontSize: 32,
        textAlign: "center",
        marginBottom: 10,
    },
    stationName: {
        fontSize: 18,
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 5,
    },
    stationLocation: {
        fontSize: 12,
        color: "#94a3b8",
        textAlign: "center",
        marginBottom: 10,
    },
    stationStatus: {
        fontSize: 12,
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 5,
        letterSpacing: 1,
    },
    deviceCount: {
        fontSize: 11,
        color: "#64748b",
        textAlign: "center",
    },

    // Station Detail View
    stationView: {
        position: "relative",
        minHeight: "100vh",
        padding: 40,
        zIndex: 1,
        animation: "slideInRight 0.6s ease",
    },
    backButton: {
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        color: "#fff",
        border: "2px solid #3b82f6",
        padding: "12px 24px",
        borderRadius: 12,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600,
        transition: "all 0.3s ease",
        marginBottom: 30,
    },
    stationHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
        padding: 30,
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        borderRadius: 20,
        border: "1px solid #334155",
    },
    stationHeaderLeft: {
        flex: 1,
    },
    stationTitle: {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: 8,
    },
    stationSubtitle: {
        fontSize: 14,
        color: "#94a3b8",
        letterSpacing: 1,
    },
    stationHeaderStatus: {
        padding: "10px 20px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 1,
    },

    // Stats Grid
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
        marginBottom: 40,
    },
    statCard: {
        padding: 24,
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        borderRadius: 16,
        border: "1px solid #334155",
        position: "relative",
        overflow: "hidden",
    },
    statValue: {
        fontSize: 42,
        fontWeight: 700,
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 14,
        color: "#94a3b8",
        marginBottom: 12,
    },
    statBar: {
        height: 4,
        borderRadius: 2,
        animation: "slideInLeft 1s ease",
    },

    // Device Grid
    deviceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20,
    },
    deviceCard: {
        position: "relative",
        padding: 24,
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        borderRadius: 16,
        border: "2px solid",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        animation: "fadeInUp 0.6s ease both",
        overflow: "hidden",
    },
    deviceGlow: {
        position: "absolute",
        top: -50,
        right: -50,
        width: 100,
        height: 100,
        borderRadius: "50%",
        filter: "blur(40px)",
        opacity: 0.2,
    },
    deviceIcon: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 12,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 6,
        textAlign: "center",
    },
    deviceType: {
        fontSize: 12,
        color: "#94a3b8",
        marginBottom: 16,
        textAlign: "center",
    },
    healthBar: {
        width: "100%",
        height: 8,
        background: "#1e293b",
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 8,
    },
    healthFill: {
        height: "100%",
        transition: "width 1s ease",
        borderRadius: 4,
    },
    healthText: {
        fontSize: 12,
        color: "#94a3b8",
        textAlign: "center",
        marginBottom: 12,
    },
    deviceStatus: {
        fontSize: 12,
        fontWeight: 700,
        textAlign: "center",
        letterSpacing: 1,
    },

    // Device Detail Modal
    deviceDetailOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
        animation: "fadeIn 0.3s ease",
    },
    deviceDetailPanel: {
        width: "100%",
        maxWidth: 900,
        maxHeight: "90vh",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        borderRadius: 24,
        border: "2px solid #3b82f6",
        overflow: "auto",
        position: "relative",
        animation: "scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        background: "#ef4444",
        border: "none",
        borderRadius: "50%",
        color: "#fff",
        fontSize: 20,
        cursor: "pointer",
        transition: "all 0.3s ease",
        zIndex: 1,
    },
    deviceDetailHeader: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: 40,
        borderBottom: "1px solid #334155",
    },
    deviceDetailIcon: {
        fontSize: 64,
    },
    deviceDetailName: {
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 4,
    },
    deviceDetailType: {
        fontSize: 14,
        color: "#94a3b8",
    },
    deviceDetailStatus: {
        marginLeft: "auto",
        padding: "10px 20px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 1,
    },
    deviceDetailBody: {
        padding: 40,
    },
    detailSection: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 20,
        color: "#3b82f6",
    },
    detailGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 16,
    },
    detailItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: 16,
        background: "#0f172a",
        borderRadius: 12,
        border: "1px solid #334155",
    },
    detailLabel: {
        fontSize: 14,
        color: "#94a3b8",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
    },
    metricsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
    },
    metricCard: {
        padding: 20,
        background: "#0f172a",
        borderRadius: 12,
        border: "1px solid #334155",
    },
    metricLabel: {
        fontSize: 12,
        color: "#94a3b8",
        marginBottom: 8,
    },
    metricValue: {
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 12,
    },
    metricBar: {
        width: "100%",
        height: 6,
        background: "#1e293b",
        borderRadius: 3,
        overflow: "hidden",
    },
    metricFill: {
        height: "100%",
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
        borderRadius: 3,
        transition: "width 1s ease",
    },
    eventList: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    eventItem: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: 16,
        background: "#0f172a",
        borderRadius: 12,
        border: "1px solid #334155",
    },
    eventTime: {
        fontSize: 12,
        color: "#64748b",
        minWidth: 80,
    },
    eventText: {
        fontSize: 14,
        flex: 1,
    },
    eventDot: {
        fontSize: 20,
    },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes ping {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(1.2); opacity: 0; }
  }
  
  @keyframes dash {
    to { stroke-dashoffset: -20; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes zoomIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInLeft {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  
  div[style*="stationNode"]:hover {
    transform: translate(-50%, -50%) scale(1.1) !important;
  }
  
  div[style*="deviceCard"]:hover {
    transform: translateY(-10px) scale(1.05) !important;
  }
  
  div[style*="backButton"]:hover,
  div[style*="closeButton"]:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
`;
document.head.appendChild(styleSheet);