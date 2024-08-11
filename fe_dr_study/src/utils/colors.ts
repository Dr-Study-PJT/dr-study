export const getBackgroundColorRandomPastel = () => {
    const colors = [
        'bg-pink-200 hover:bg-pink-400 tranistion-colors duration-300', // 파스텔톤 핑크
        'bg-dr-coral-50 hover:bg-dr-coral-100 tranistion-colors duration-300', // dr-coral
        'bg-blue-200 hover:bg-blue-400 tranistion-colors duration-300', // 파스텔톤 블루
        'bg-green-200 hover:bg-green-400 tranistion-colors duration-300', // 파스텔톤 그린
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
