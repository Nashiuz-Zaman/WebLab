//react
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import MobileNavigation from "./components/mobileNavbar/mobileNavigation/MobileNavigation";
import Home from "./pages/Home/Home";
import NoContent from "./components/noContent/NoContent";
import MobileFooter from "./components/mobileFooter/MobileFooter";
import DesktopFooter from "./components/desktopFooter/DesktopFooter";
import LoginSignup from "./components/loginSignup/LoginSignup";

//custom hooks
import useMediaQueryContext from "./hooks/useMediaQueryContext";

//image source
import buildingsSmall from "./assets/buildings-small.webp";
import buildingsLarge from "./assets/buildings.webp";

//data
import {
  navigationOptions,
  notFinishedPaths,
  additionalButtons,
  textButtonWithImageInfoArray,
} from "./data/NavigationMenuData";

import {
  logoButtonDataPrimary,
  logoButtonDataDarktext,
  footerBottomOptions,
  footerTopOptions,
  addressData,
} from "./data/FooterData";

//styles
import "./basicStyles/App.css";

export default function App() {
  const { mediaQueryFinalState } = useMediaQueryContext();

  return (
    <div className="App">
      <BrowserRouter>
        <MobileNavigation
          navigationOptionsArray={navigationOptions}
          buttonInfoArray={additionalButtons}
          textButtonWithImageInfoArray={textButtonWithImageInfoArray}
          brandName={
            <>
              Web<span className="highlighted">Lab</span>
            </>
          }
        />

        <LoginSignup onlyLogin={true} />

        <Routes>
          <Route path="/" element={<Home />} />
          {notFinishedPaths.map((path) => {
            return (
              <Route key={path} path={`/${path}`} element={<NoContent />} />
            );
          })}
        </Routes>

        {(mediaQueryFinalState.mobileMatches ||
          mediaQueryFinalState.smallTabletMatches) && (
          <MobileFooter
            appName={"WebLab"}
            developer={"Nashiuz Zaman"}
            bottomOptionsArray={footerBottomOptions}
            logoButtonsArray={logoButtonDataPrimary}
            normalOptionsArray={footerTopOptions}
            addressData={addressData}
            imageSource={buildingsSmall}
            companyName={
              <>
                Web<span className="highlighted">Lab</span>
              </>
            }
          />
        )}

        {(mediaQueryFinalState.largeTabletMatches ||
          mediaQueryFinalState.computerScreenMatches) && (
          <DesktopFooter
            appName={"WebLab"}
            developer={"Nashiuz Zaman"}
            bottomOptionsArray={footerBottomOptions}
            logoButtonsArray={logoButtonDataDarktext}
            normalOptionsArray={footerTopOptions}
            addressData={addressData}
            imageSource={buildingsLarge}
            companyName={
              <>
                Web<span className="highlighted">Lab</span>
              </>
            }
          />
        )}
      </BrowserRouter>
    </div>
  );
}
