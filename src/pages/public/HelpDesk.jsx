
import HelpDeskHero from "../../components/helpdesk/HelpDeskHero";
import HelpDeskServices from "../../components/helpdesk/HelpDeskServices";
import HelpDeskHierarchy from "../../components/helpdesk/HelpDeskHierarchy";
import HelpDeskResponsibilities from "../../components/helpdesk/HelpDeskResponsibilities";
import ComplaintProcess from "../../components/helpdesk/ComplaintProcess";
import HelpDeskCTA from "../../components/helpdesk/HelpDeskCTA";

import "../../styles/helpdesk-page.css";

function HelpDesk() {
    return (
        <main className="organization-helpdesk-page">
            <HelpDeskHero />
            <HelpDeskServices />
            <HelpDeskHierarchy />
            <HelpDeskResponsibilities />
            <ComplaintProcess />
            <HelpDeskCTA />
        </main>
    );
}

export default HelpDesk;
