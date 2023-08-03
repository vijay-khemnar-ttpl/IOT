import { useRoutes } from 'react-router-dom';

// routes
import { LoginRoutes } from '../allroutes/auth_routes';

// ==============================|| ROUTING RENDER ||============================== //

// Use a valid function declaration or an arrow function expression
const ThemeRoutes = () => {
    return useRoutes(LoginRoutes); // Remove the array brackets around AuthRoutes
};

export default ThemeRoutes;
