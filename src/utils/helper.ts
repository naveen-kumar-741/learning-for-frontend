import { fetchAuthSession } from "aws-amplify/auth";
import moment from "moment";

export const getUser = async () => {
  try {
    const userData = await fetchAuthSession();

    localStorage.setItem(
      "jwtToken",
      userData.tokens?.accessToken.toString() ?? ""
    );
    if (userData?.tokens?.accessToken?.payload?.exp) {
      localStorage.setItem(
        "expiryTime",
        moment(new Date(userData?.tokens?.accessToken?.payload?.exp * 1000))
          .utc()
          .format()
      );
    }
    localStorage.setItem(
      "idToken",
      userData?.tokens?.idToken?.toString() ?? ""
    );

    return userData;
  } catch {
    return console.log("Not signed in");
  }
};

export const getRandomColor = () => {
  let color = "#";
  const letters = "0123456789ABCDEF";
  let isLightColor = true;

  // Keep generating a random color until it's not too close to white
  while (isLightColor) {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // Check if the color is too light by converting it to RGB and ensuring it's not white
    isLightColor = isColorTooLight(color);
  }
  return color;
};

// Function to check if a color is too light (close to white)
const isColorTooLight = (hexColor: string) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate brightness of the color (simple average of RGB values)
  const brightness = (r + g + b) / 3;
  return brightness > 200; // Define a threshold for "light" colors (adjustable)
};

export const generateDataUrl = (initials: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    canvas.width = 40;
    canvas.height = 40;

    // Background color
    context.fillStyle = getRandomColor();
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Text settings
    context.font = `20px Arial`;
    context.fillStyle = "#fff";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Draw initials
    context.fillText(initials, canvas.width / 2, canvas.height / 2);

    // Get the data URL from the canvas
    const dataUrl = canvas.toDataURL("image/png");
    return dataUrl;
  }
};
