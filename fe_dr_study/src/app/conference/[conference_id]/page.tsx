import ConferenceTemplate from '@/components/template/conference/ConferenceTemplate';

interface ConferencePageProps {
    params: {
        conference_id: number;
    };
}

const ConferencePage: React.FC<ConferencePageProps> = ({ params }) => {
    return <ConferenceTemplate conferenceId={params.conference_id} />;
};

export default ConferencePage;
