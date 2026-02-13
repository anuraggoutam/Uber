import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

import { axiosAPI } from "@/lib/axiosAPI";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (item) {
        console.log(`${key} was used 🔐`);
      } else {
        console.log(`No values stored under key: ${key}`);
      }

      return item;
    } catch (error) {
      console.error("SecureStore get item error:", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore save item error:", error);
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp } =
      await startOAuthFlow({
        redirectUrl: Linking.createURL("/(root)/(tabs)/home"),
      });

    if (!createdSessionId || !setActive) {
      return {
        success: false,
        message: "OAuth session was not created",
      };
    }

    
    await setActive({ session: createdSessionId });


    if (signUp?.createdUserId) {
      await axiosAPI("/(api)/user", {
        method: "POST",
        data: {
          name: `${signUp.firstName ?? ""} ${signUp.lastName ?? ""}`.trim(),
          email: signUp.emailAddress,
          clerkId: signUp.createdUserId,
        },
      });
    }

    return {
      success: true,
      code: "success",
      message: "You have successfully signed in with Google",
    };
  } catch (err: any) {
    console.error("Google OAuth Error:", err);

    return {
      success: false,
      code: err?.code,
      message:
        err?.errors?.[0]?.longMessage ||
        "Google sign-in failed",
    };
  }
};
