import axios from "axios";

interface Response {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    plName: string;
    plOrbsmax: string;
    stSpectype: string;
    stBrightness: string;
    innerBoundHabitableZone: string;
    outerBoundHabitableZone: string;
    habitablePercent: string;
    coronaGraphAffect: string;
  }[];
  success: boolean;
}

export const getPlanetHabitable = async (
  hostName: string | undefined,
  diameter: number
) => {
  try {
    if (!hostName) return null;
    const data = await axios.get<Response>(
      `${
        import.meta.env.VITE_API_URL
      }/systems?hostName=${hostName}&d=${diameter}`
    );
    if (data.data.isSuccess) {
      console.log(data.data.result);
      return data.data.result;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
