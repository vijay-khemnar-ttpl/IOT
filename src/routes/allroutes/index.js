import { useRoutes } from 'react-router-dom';

// routes
import { AllRoutes } from './all_routes';

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = () => {
    return useRoutes(AllRoutes);
};

export default ThemeRoutes;
