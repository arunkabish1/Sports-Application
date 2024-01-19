import { Outlet } from "react-router-dom"
import Appbar from "./Appbar"

const AccountLayout = () => {

  return (
    <>
     <Appbar />
      <main>
          <Outlet />
      </main>
    </>
  )
}

export default AccountLayout