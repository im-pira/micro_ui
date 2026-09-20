import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePopUp from "./experiments/profile-pop/ProfilePopUp";
import BlackCardStack from "./experiments/black-card-stack/BlackCardStack";
import MacDoc from "./experiments/mac-doc/MacDoc";
import VoiceChatExpand from "./experiments/voice-chat-expand/VoiceChatExpand";
import SearchBox from "./experiments/search-box/SearchBox";
import Calender from "./experiments/calender/Calender";
import LoveToggle from "./experiments/love-toggle/LoveToggle";
import MusicPlayer from "./experiments/music-player/MusicPlayer";
import Knob from "./experiments/knob/Knob";
import WalletHolder from "./experiments/wallet-holder/WalletHolder";
import Folder from "./experiments/folder/Folder";
import ProfileCard from "./experiments/profile-card/ProfileCard";
import Shapes from "./experiments/shapes/Shapes";
import GradientFramework from "./experiments/gradient-framework/GradientFramework";
import ASCIILab from "./experiments/ascii-lab/ASCIILab";
import CameraControlPanel from "./experiments/camera-control-panel/CameraControlPanel";
import CameraLens from "./experiments/camera-lens/CameraLens";
import FeatureCard from "./experiments/feature-card/FeatureCard";
import DeleteButton from "./experiments/delete-button/DeleteButton";
import MatrixOrb from "./experiments/matrix-orb/MatrixOrb";
import SolanaDashboard from "./experiments/solana-dashboard/SolanaDashboard";
import NFTCard from "./experiments/NFT-card/NFTCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/experiments/mac-doc"
          element={<MacDoc />}
        />
        <Route
          path="/experiments/profile-popup"
          element={<ProfilePopUp />}
        />
        <Route
          path="/experiments/blackcard-stack"
          element={<BlackCardStack />}
        />
        <Route
          path="/experiments/voice-chat-expand"
          element={<VoiceChatExpand />}
        />
        <Route
          path="/experiments/search-box"
          element={<SearchBox />}
        />
        <Route
          path="/experiments/calender"
          element={<Calender />}
        />
        <Route
          path="/experiments/love-toggle"
          element={<LoveToggle />}
        />
        <Route
          path="/experiments/music-player"
          element={<MusicPlayer />}
        />
        <Route
          path="/experiments/knob"
          element={<Knob />}
        />
        <Route
          path="/experiments/wallet-holder"
          element={<WalletHolder />}
        />
        <Route
          path="/experiments/folder"
          element={<Folder />}
        />
        <Route
          path="/experiments/profile-card"
          element={<ProfileCard />}
        />
        <Route
          path="/experiments/shapes"
          element={<Shapes />}
        />
        <Route
          path="/experiments/gradient-framework"
          element={<GradientFramework />}
        />
        <Route
          path="/experiments/ascii-lab"
          element={<ASCIILab />}
        />
        <Route
          path="/experiments/camera-control-panel"
          element={<CameraControlPanel />}
        />
        <Route
          path="/experiments/camera-lens"
          element={<CameraLens />}
        />
        <Route
          path="/experiments/feature-card"
          element={<FeatureCard />}
        />
        <Route
          path="/experiments/delete-button"
          element={<DeleteButton />}
        />
        <Route
          path="/experiments/matrix-orb"
          element={<MatrixOrb />}
        />
        <Route
          path="/experiments/solana-dashboard"
          element={<SolanaDashboard />}
        />
        <Route
          path="/experiments/NFT-card"
          element={<NFTCard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;