import ApplicationLogo from '@/Components/App/ApplicationLogo';
import Navbar from '@/Components/App/Navbar';
import Dropdown from '@/Components/Core/Dropdown';
import NavLink from '@/Components/Core/NavLink';
import ResponsiveNavLink from '@/Components/Core/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function AuthenticatedLayout({
   
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const props= usePage().props;
    const user = usePage().props.auth.user;
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />

            {props.error && (
                <div className='container mx-auto px-8 mt-8' >
                    <div className='alert alert-error'>
                        {props.error}
                    </div>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
