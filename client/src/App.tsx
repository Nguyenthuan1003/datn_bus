import { useRoutes } from 'react-router-dom';
import DefaulLayoutComponent from './app/container/defaul-layout/defaul-layout.component';
import DefaulHomeComponent from './app/container/defaul-home/defaul-home.component';
import { clientRouter } from './app/modules/client/router';


function App() {
  let element: any = useRoutes([
    {
      path: '/',
      element: <DefaulLayoutComponent />,
      children: [
        {
          path: '',
          element: <DefaulHomeComponent />,
          children: clientRouter
        }
      ]
    }
  ])

  return element
}

export default App