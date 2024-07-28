interface MyPageTemplateProps {
    user: {
        name: string;
        email: string;
    };
    updateUserName: (newName: string) => void;
}

const MyPageTemplate: React.FC<MyPageTemplateProps> = ({
    user,
    updateUserName,
}) => {
    return (
        <div>
            <h1>My Page</h1>
        </div>
    );
};

export default MyPageTemplate;
