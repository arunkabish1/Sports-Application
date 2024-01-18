import { Outlet } from "react-router-dom"
import Appbar from "./Appbar"

const AccountLayout = () => {

  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto py-6">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout