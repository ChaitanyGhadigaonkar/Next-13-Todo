import { ThemeContext } from "@/app/context/ThemeProvider";
import { MoonStar, SunMoon } from "lucide-react";
import { useContext } from "react";
import ButtonComponent from "./ButtonComponent";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="absolute bottom-5 right-2 sm:contents cursor-pointer">
      <ButtonComponent variant="icon">
        {theme === "dark" ? (
          <MoonStar
            color="white"
            width={25}
            height={25}
            onClick={() => setTheme("light")}
          />
        ) : (
          <SunMoon
            color="black"
            width={25}
            height={25}
            onClick={() => setTheme("dark")}
          />
        )}
      </ButtonComponent>
    </div>
  );
};

export default ToggleThemeButton;
