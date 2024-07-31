import ConferenceTemplate from '@/components/template/conference/ConferenceTemplate';

const ConferencePage = ({ params }: any) => {
    return <ConferenceTemplate conferenceId={params.conference_id} />;
};

export default ConferencePage;
