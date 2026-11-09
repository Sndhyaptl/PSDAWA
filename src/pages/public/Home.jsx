import HomeHero from "../../components/home/HomeHero";
import AboutPreview from "../../components/home/AboutPreview";
import MissionVision from "../../components/home/MissionVision";
import ActivitiesSection from "../../components/home/ActivitiesSection";
import CommitteeOverview from "../../components/home/CommitteeOverview";
import LatestNotices from "../../components/home/LatestNotices";
import MembershipCTA from "../../components/home/MembershipCTA";

import "../../styles/home.css";

function Home() {

    return (
        <div className="home-page">

            <HomeHero />

            <AboutPreview />

            <MissionVision />

            <ActivitiesSection />

            <CommitteeOverview />

            {/* <LatestNotices notices={[]} /> */}

            {/* <MembershipCTA /> */}

        </div>
    );
}

export default Home;