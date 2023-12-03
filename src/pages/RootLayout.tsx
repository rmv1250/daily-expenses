import NavigationBar from "../components/navigation/NavigationBar.tsx";
import {Outlet} from "react-router-dom";


const RootLayout = ()=>{
  return <>
    <NavigationBar />
    <main>
      <Outlet />
    </main>
  </>
}

export default RootLayout;