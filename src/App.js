import './App.css';
import { useRoutes } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { RequireAuth } from './components/RequireAuth';
import MenuAdmin  from './pages/admin/MenuAdmin';
import { Supplies } from './pages/admin/Supplies';
import { Products } from './pages/admin/Products';
import { AddSupply } from './pages/admin/Recipes/AddSupply';


function App() {
  const routes = useRoutes([
    {
      path: "/",
      element : <HomePage></HomePage>,
      children : [
        {
          index: true,
          element : <LoginPage></LoginPage>
        },
        
        {
          path: "/admin",
          element : <RequireAuth><MenuAdmin /></RequireAuth>,
          children:[
            {
              path:"/admin/products",
              element : <RequireAuth><Products/></RequireAuth>
            },
            {
              path:"/admin/supplies",
              element : <RequireAuth><Supplies /></RequireAuth>
            },
            {
              path:"/admin/details-product/:id",
              element : <RequireAuth><AddSupply/></RequireAuth>
            },
            
          ]
        },
        
      ]
    },
  ]);

  return routes;
}

export default App;