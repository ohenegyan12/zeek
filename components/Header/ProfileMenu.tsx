import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";
import Icon from "@/components/Icon";

const ProfileMenu = () => {
    return (
        <Menu>
            <MenuButton className="flex items-center gap-2 outline-none max-md:gap-0">
                <div className="flex justify-center items-center shrink-0 size-8 bg-primary-100 rounded-full">
                    <Icon className="!size-4 fill-primary-500" name="user" />
                </div>
                <div className="text-body-sm text-left max-md:hidden">
                    <div className="font-semibold text-gray-900">Robert Johnson</div>
                    <div className="text-gray-500">Super Admin</div>
                </div>
            </MenuButton>
            <MenuItems
                className="z-20 w-48 mt-2 origin-top-right bg-white border border-gray-100 rounded-xl shadow-[0_1rem_2rem_-0.0625rem_rgba(128,136,151,0.20)] transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 p-2"
                anchor="bottom end"
                transition
                modal={false}
            >
                <div>
                    <MenuItem>
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-body-md font-medium text-gray-700 transition-colors data-[focus]:bg-gray-50 data-[focus]:text-gray-900"
                        >
                            <Icon name="user" className="!size-4 fill-gray-500" />
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href="/settings"
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-body-md font-medium text-gray-700 transition-colors data-[focus]:bg-gray-50 data-[focus]:text-gray-900"
                        >
                            <Icon name="gear" className="!size-4 fill-gray-500" />
                            Settings
                        </Link>
                    </MenuItem>
                </div>
                <div className="h-px my-1 bg-gray-100 mx-2"></div>
                <MenuItem>
                    <Link
                        href="/login"
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-body-md font-medium text-error-100 transition-colors data-[focus]:bg-error-50"
                    >
                        <Icon name="logout" className="!size-4 fill-error-100" />
                        Logout
                    </Link>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default ProfileMenu;
