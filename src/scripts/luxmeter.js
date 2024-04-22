const video = document.getElementById('video');
const luxDisplay = document.getElementById('lux');

const constraints = {
  video: { facingMode: { exact: "environment" } } // Use the back camera
};

// Accessing Camera with back camera
// { video: true }
// or
// constraints
navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err) {
    console.error('Error accessing camera:', err);
  });

// Accessing Lux Meter
if ('AmbientLightSensor' in window) {
  const sensor = new AmbientLightSensor();
  sensor.onreading = () => {
    luxDisplay.textContent = sensor.illuminance;
  };
  sensor.onerror = (event) => {
    console.error('Error reading lux level:', event.error);
  };
  sensor.start();
} else {
  console.error('Ambient Light Sensor not supported.');
  // Provide fallback mechanism for devices that don't support the Ambient Light Sensor API
}


const captureInput = document.getElementById('captureInput');

captureInput.addEventListener('change', handleCapture);

function handleCapture(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const image = new Image();
    image.onload = function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      
      // Convert image to grayscale
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
      }
      context.putImageData(imageData, 0, 0);
      
      // Calculate average pixel value (brightness)
      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        totalBrightness += data[i];
      }
      const averageBrightness = totalBrightness / (image.width * image.height);

      // Map average brightness to estimated luminance (example mapping)
      const estimatedLux = mapToLuminance(averageBrightness);

      // Display estimated luminance
      luxDisplay.textContent = `${estimatedLux.toFixed(2)} lux`;
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function mapToLuminance(brightness) {
  // Example mapping function (adjust as needed)
  // Map average brightness to estimated luminance (example mapping)
  // This is a simple linear mapping for demonstration purposes
  const minBrightness = 0; // Minimum brightness observed in image analysis
  const maxBrightness = 255; // Maximum brightness observed in image analysis
  const minLux = 0; // Minimum luminance (lux)
  const maxLux = 1000; // Maximum luminance (lux)
  
  // Linear mapping formula: y = (x - minBrightness) * (maxLux - minLux) / (maxBrightness - minBrightness) + minLux
  return (brightness - minBrightness) * (maxLux - minLux) / (maxBrightness - minBrightness) + minLux;
}
