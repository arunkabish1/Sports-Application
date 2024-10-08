import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, CogIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import { Fragment, useState, useEffect } from "react";
import PreferencesForm from "../../pages/preference/PreferencesForm";
import PasswordForm from "../../pages/changepass/passwordchange";

const Appbar = () => {
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setToken(authToken);
    }
  }, []);

  const openPreferencesModal = () => {
    setShowPreferencesModal(true);
  };

  const closePreferencesModal = () => {
    setShowPreferencesModal(false);
  };
  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const Navigation = token
    ? [
        { name: "Sign Out", href: "/logout" },
        { name: "Change Password", onClick: openPasswordModal },
      ]
    : [
        { name: "Sign In", href: "/signin" },
        { name: "Sign Up", href: "/signup" },
      ];

  const classNames = (...classes: string[]): string =>
    classes.filter(Boolean).join(" ");

  return (
    <div>
      <Disclosure as="nav" className="">
        {({}) => (
          <div className="bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-end gap-2 h-16">
                <div className=" mr-auto">
                  <img src={logo} alt="Logo" className="h-10" />
                </div>
                {token && (
                  <div className="md:flex items-center space-x-4">
                    <button
                      onClick={openPreferencesModal}
                      className="text-white focus:outline-none"
                    >
                      <div className="mr-1 flex gap-1">
                        <CogIcon className="h-9 w-9 text-white cursor-pointer" />
                      </div>
                    </button>
                  </div>
                )}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                      <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {Navigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              onClick={item.onClick}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
      {showPreferencesModal && (
        <PreferencesForm onClose={closePreferencesModal} />
      )}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <PasswordForm onClose={closePasswordModal} />
        </div>
      )}
    </div>
  );
};

export default Appbar;
