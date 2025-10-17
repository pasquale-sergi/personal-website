export const projects = [
  {
  id: 1,
  title: 'Sentinella',
  description: 'Sentinella is an AI IoT device that tracks environment parameters and alerts user based on anomaly detected by AI.',
  tags: ['Vue', 'Java', 'PostgreSQL', 'Hardware', '3D Printing', 'AI', 'Pytorch', 'Tensorflow', 'MQTT', 'C'],
  year: 2025,
   link: ['https://www.sentinella.xyz','https://github.com/pasquale-sergi/Sentinella'],
  content: `
# Sentinella: Intelligent Environmental Monitoring

An AI-powered IoT system that learns your environment and detects anomalies before they become problems.

## The Challenge

Traditional environmental monitoring systems rely on static thresholds. Too rigid, too many false alarms, and they miss context-specific anomalies that matter.

## The Solution

Sentinella combines embedded AI with adaptive learning. Deploy it anywhere, let it calibrate to *your* environment, then watch it intelligently detect deviations that signal real issues.

### How It Works

**Phase 1: Smart Calibration**
- The system learns your environment's "normal" baseline over 24 hours
- Captures the unique fingerprint of temperature, humidity, pressure, and air quality patterns specific to your space

**Phase 2: Proactive Detection**
- An optimized AI model continuously analyzes incoming sensor data
- Calculates reconstruction error—how far reality deviates from learned patterns
- Issues intelligent alerts when genuine anomalies occur, not false positives

## Real-World Impact

- **Facilities Monitoring**: Detect HVAC failures before they affect comfort or damage equipment
- **Server Rooms**: Catch environmental drift that could lead to hardware failure
- **Industrial Spaces**: Identify process anomalies that manual monitoring would miss
- **Research Labs**: Maintain critical environmental conditions with automated oversight

## Technology Highlights

- **Hardware**: ESP32 + BME680 sensor for robust, power-efficient sensing
- **AI**: TensorFlow Lite Micro autoencoder for on-device intelligence—no cloud dependency
- **Architecture**: Full-stack design from embedded firmware to cloud analytics
- **Scalability**: Built to deploy across multiple environments with centralized management

## The Innovation

Most IoT systems collect data. Sentinella *understands* data. By adapting to each unique environment and focusing on meaningful deviations, it transforms raw sensor readings into actionable intelligence.

---

**Want the full technical deep-dive?** Visit [sentinella.xyz](https://sentinella.xyz) for architecture, hardware and software details.
    `,
  },

]