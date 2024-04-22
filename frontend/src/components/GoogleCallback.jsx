import { useEffect } from "react";
import axiosClient from "../axios-client";
function GoogleCallback() {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          console.log("Authorization code received:", code);

          const { data } = await axiosClient.get(
            "/google/callback?code=${code}"
          );

          console.log("Google login response:", data);
        } else {
          console.error("No authorization code found in the URL");
        }
      } catch (error) {
        console.error("Error handling Google callback:", error);
      }
    };

    handleGoogleCallback();
  }, []);

  return null;
}

export default GoogleCallback;
